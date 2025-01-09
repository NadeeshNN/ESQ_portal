/*
    Lookup Field
    -------------
    Harrison    June 2020


    A normal text field with a search button to open a lookup dialog

    PROPS
    --------------
      disabled
      error
      variant
      value
      name
      label
      width

      hideLabel
      multivalue

      shrink - set to true if the field shrinks to accomodate the icon
      url - the api to lookup
      dataKey
      dataFormat - the format of the table in the lookup dialog. See PeerTable for options

      onChange(event) - returns "val" or "val1,val2,..., valN"
      onKeyDown(event)

 */

import React, { Component } from "react";
import {
  TextField,
  IconButton,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import Lookup2 from "./Lookup2";

export class LookupField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookupOpen: false,
    };
  }

  handleClick = (row, field) => {
    this.props.onChange(row, field);
    this.setState({
      lookupOpen: false,
    });
  };

  render() {
    return (
      <section
        style={{
          width: this.props.shrink ? this.props.width : this.props.width + 28,
          minWidth: this.props.shrink
            ? this.props.width
            : this.props.width + 28,
          marginRight: this.props.shrink ? 0 : -48,
        }}
      >
        <TextField
          disabled={this.props.editable ? false : true}
          variant={this.props.variant}
          label={this.props.hideLabel ? this.props.label : null}
          type={
            this.props.lookupInputType ? this.props.lookupInputType : "text"
          }
          error={this.props.error}
          name={this.props.name}
          style={{
            width: this.props.shrink ? this.props.width - 28 : this.props.width,
            minWidth: this.props.shrink
              ? this.props.width - 28
              : this.props.width,
            margin: 0,
            minHeight: 40,
          }}
          inputProps={{
            style: {
              backgroundColor: this.props.disabled ? "#eeeeee" : "#ffffff",
            },
          }}
          className="formInput"
          margin="dense"
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          InputLabelProps={{ shrink: true }}
        />
        {!this.props.hideIcon && (
          <IconButton
            disabled={this.props.disabled}
            onClick={() => {
              this.setState({ lookupOpen: true });
            }}
            style={{
              height: 40,
              width: 40,
              position: "absolute",
            }}
          >
            <Search />
          </IconButton>
        )}
        {/*Lookup Page*/}
        <Dialog
          open={this.state.lookupOpen}
          onClose={() => this.setState({ lookupOpen: false })}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogContent
            style={{
              padding: 0,
            }}
          >
            <Lookup2
              {...this.props}
              data={this.props.data}
              dataFormat={this.props.dataFormat}
              onSelect={(values) => {
                this.setState({
                  lookupOpen: false,
                });
                this.props.onChange(values);
              }}
              onClose={() => {
                this.setState({
                  lookupOpen: false,
                });
              }}
            />
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}

export default LookupField;
