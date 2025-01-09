/*
    Label Input
    -------------
    Harrison    May 2020


    A label/ input form group

    PROPS
    --------------
      name
      label
      value
      disabled
      error
      variant - default "outlined"
      required
      multiline
      lines - useful for limiting multiline fields
      width
      bold
      rightLabel - align label to the right
      hideLabel - only shows the input field
      dontAutocomplete
        


      type - {date, password, lookup, select, check, empty, website, label, textOnly}, leave empty if no special type
      shrink - set to true if the field shrinks to accomodate the icon
      options - required if type is 'select'

       -- Stuff for lookup fields --
      url
      dataFormat - the format of the table in the lookup dialog
      {
          codeField: {name: ,label:}, The format of the code column
          descField: {name: ,label:} The format of the description column
          (optional) extraField: {name: ,label:} An additional column
      }

      multivalue - Can multiple items be selected/deselected
      currentValues - if multivalue is true, set this param to the string of current values (e.g. "L001, L002, GT")
      selByValue - if true, items will be checked if the description column matches, otherwise items are checked if the code column matches

      radios
      ----------------

      onChange(event)
      onKeyDown(event)

 */

import React, { Component } from "react";
import {
  TextField,
  Checkbox,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Chip,
} from "@material-ui/core";
import { TextField as NewTextField } from "@mui/material/";
import Select from "react-select";
import LookupField from "./LookupField";
import PassField from "./PassField";
import "react-datetime/css/react-datetime.css";
import "../styles/generics.css";
import { Language, Mail } from "@material-ui/icons";
import { isEmpty, stringToColorCode } from "../GeneralFunctions";
import { COLOURS } from "../Config.jsx";
import { Datetime, JustTimePicker } from "./Datetime";
import BasicField from "./BasicField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ColourButton } from "../ColourButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Stack from "@mui/material/Stack";
import locale from "date-fns/locale/en-AU";
import PeerTable2 from "../table/PeerTable2";
//Fields that have a button next to the field
const buttonFields = ["website", "email"];
const pageSize = 10;

export class LabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colour: {},
    };
  }

  handleWebsite = () => {
    const address = this.props.value;
    if (!isEmpty(address)) {
      if (address.substr(0, 4) === "http") {
        //If the entire address is used then just use that address
        window.open(address, "_blank");
      } else {
        //Otherwise assume the website is https
        window.open(`https://${address}`, "_blank");
      }
    }
  };

  getTagColours = () => {
    if (isEmpty(this.props.value)) {
      return;
    }
    const colour = stringToColorCode(
      this.props.value.toString().replace(/ /g, "")
    );
    this.setState({
      colour: colour,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (this.props.type === "tag") {
        this.getTagColours();
      }
    }
  }

  render() {
    let totalWidth = 0;
    let labelWidth = 0;
    /*        if (!this.props.hideLabel) {
                    if (this.props.type === "check" && this.props.shrink) {
                        width = "";
                    } else {
                        width = 115 + this.props.width
                    }
                } else {
                    width = "";
                }
        */
    if (this.props.hideLabel) {
      labelWidth = 0;
    } else if (this.props.type === "check" && this.props.shrink) {
      labelWidth = 0;
    } else if (this.props.type === "label") {
      labelWidth = 105;
    } else {
      labelWidth = 105;
    }

    totalWidth = labelWidth + this.props.width;
    if (!this.props.shrink) {
      totalWidth += 48;
    }

    const style = {
      ...{
        margin: this.props.type === "label" ? 0 : "",
        width: totalWidth,
        flexWrap: "nowrap",
      },
      ...this.props.style,
    };
    return (
      <section className="formGroup" style={style}>
        {/*Label*/}
        {!this.props.hideLabel && (
          <article
            className={`${
              this.props.multiline
                ? "start fullHeight"
                : this.props.type === "label"
                ? "selfEnd"
                : "center"
            }`}
            style={{
              height: this.props.multiline ? "" : 40,
              alignSelf: "flex-start",
              justifyContent: this.props.type === "label" ? "flex-end" : "",
            }}
          >
            <p
              className={"formLabel smallTxt"}
              style={{
                fontWeight: this.props.bold ? "bold" : "normal",
                fontSize: this.props.type === "label" ? 14 : "",
                marginBottom: 0,
                marginRight: this.props.rightLabel ? "20%" : 0,
                alignSelf: "center",
                textAlign: this.props.rightLabel ? "end" : "start",
                width: labelWidth,
              }}
            >
              {this.props.label}
              {this.props.required && <sup style={{ color: "red" }}>*</sup>}
            </p>
          </article>
        )}

        {/*Normal*/}
        {(!this.props.type ||
          this.props.type === "date" ||
          this.props.type === "time" ||
          this.props.type === "number") && (
          <BasicField
            {...this.props}
            step={this.props.step}
            hideLabel={!this.props.hideLabel}
          />
        )}

        {/*DateTime*/}
        {this.props.type === "datetime" && <Datetime {...this.props} />}
        {/*Time Hours or Minutes*/}
        {["HH:mm", "mm:ss"].includes(this.props.type) && (
          <JustTimePicker {...this.props} />
        )}
        {/*Password*/}
        {this.props.type === "password" && <PassField {...this.props} />}

        {/*Radios*/}
        {this.props.type === "radios" && (
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="radio"
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
            >
              {this.props.radioValueList.map((radio) => (
                <FormControlLabel
                  key={this.props.radioValueList.indexOf(radio)}
                  value={radio.value}
                  control={<Radio />}
                  disabled={this.props.disabled}
                  label={radio.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {/*Select*/}
        {this.props.type === "select" && (
          <Select
            // menuPortalTarget={document.body}
            // menuPosition={"fixed"}
            isDisabled={this.props.disabled}
            error={this.props.error}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
                overflowY: "visible",
              }),
              control: (base) => ({
                ...base,
                flex: 1,
                width: this.props.width,
                height: 40,
                minHeight: 40,
              }),
            }}
            margin="dense"
            name={this.props.name}
            options={this.props.options}
            value={this.props.value}
            onChange={this.props.onChange}
            // getOptionLabel={this.props.label}
            // getOptionValue={this.props.label}
          />
        )}

        {/*New MUI Date Time Picker*/}
        {this.props.type === "datetimenew" && (
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
            <Stack spacing={3} width={this.props.width}>
              <DesktopDateTimePicker
                inputFormat="dd/MM/yyyy hh:mm aa"
                variant={this.props.variant ? this.props.variant : "outlined"}
                disabled={this.props.disabled}
                name={this.props.name}
                label={this.props.label}
                value={this.props.value}
                minDate={this.props.value}
                maxDate={this.props.value}
                onChange={this.props.onChange}
                renderInput={(params) => <NewTextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        )}

        {/*Check*/}
        {this.props.type === "check" && (
          <Checkbox
            name={this.props.name}
            disabled={this.props.disabled}
            onClick={this.props.onChange}
            checked={this.props.value ? true : false}
            style={{
              color: this.props.disabled ? "#c1c1c1" : COLOURS[0],
              margin: 0,
              marginRight:
                this.props.width > 250 ? this.props.width - 250 : 130,
            }}
          />
        )}

        {/*Lookup*/}
        {this.props.type === "lookup" && (
          <LookupField
            {...this.props}
            dataFormat={this.props.dataFormat}
            data={this.props.data}
            variant={this.props.variant ? this.props.variant : "outlined"}
          />
        )}

        {/*Website || Email || Date*/}
        {buttonFields.includes(this.props.type) && (
          <section
            style={{
              width: this.props.shrink
                ? this.props.width
                : this.props.width + 48,
              minWidth: this.props.shrink
                ? this.props.width
                : this.props.width + 48,
              marginRight: this.props.shrink ? 0 : -48,
            }}
          >
            <TextField
              disabled={this.props.disabled}
              variant={this.props.variant ? this.props.variant : "outlined"}
              label={this.props.hideLabel ? this.props.label : null}
              error={this.props.error}
              type={this.props.type ? this.props.type : "text"}
              name={this.props.name}
              style={{
                width: this.props.shrink
                  ? this.props.width - 48
                  : this.props.width,
                minWidth: this.props.shrink
                  ? this.props.width - 48
                  : this.props.width,
                margin: 0,
                height: this.props.multiline ? 25 * this.props.lines : 20,
              }}
              margin="dense"
              className="formInput"
              multiline={this.props.multiline}
              rowsMax={this.props.lines ? this.props.lines : 1}
              rows={this.props.lines ? this.props.lines : 1}
              value={this.props.value}
              onChange={this.props.onChange}
              onKeyDown={this.props.onKeyDown}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/*Website*/}
            {this.props.type === "website" && (
              <IconButton onClick={this.handleWebsite}>
                <Language />
              </IconButton>
            )}

            {/*Email*/}
            {this.props.type === "email" && (
              <IconButton href={`mailto:${this.props.value}`}>
                <Mail />
              </IconButton>
            )}
          </section>
        )}

        {/*Text Only*/}
        {this.props.type === "textOnly" && (
          <article
            className="center"
            style={{
              marginLeft: "3%",
            }}
          >
            <p
              style={{
                minWidth: this.props.width,
                margin: 0,
              }}
            >
              {this.props.value}
            </p>
          </article>
        )}
        {/*Empty invisible field for formatting*/}
        {this.props.type === "empty" && (
          <div style={{ width: this.props.width }}></div>
        )}

        {/*Tag*/}
        {this.props.type === "tag" && (
          <Chip
            label={this.props.value}
            style={{
              backgroundColor: this.state.colour.background,
              color: this.state.colour.foreground,
            }}
          />
        )}

        {/*Button field for formatting*/}
        {this.props.type === "button" && (
          <ColourButton
            text={this.props.label}
            width={150}
            variant="outlined"
            onClick={this.props.onClick}
          />
        )}

        {/*Table Grid View*/}
        {this.props.type === "dataGrid" && (
          <PeerTable2
            name={this.props.name}
            data={this.props.tblData}
            columns={this.props.dataFormat}
            pageSize={pageSize}
            disableSelectionOnClick
            onCellEditCommit={(e) => {
              this.props.onChange(e);
            }}
          />
        )}
      </section>
    );
  }
}

export default LabelInput;
