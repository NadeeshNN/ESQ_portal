/*
    Lookup 2.0
    -------------
    Harrison F    June 2020

    New and improved lookup table

    

    PROPS
    --------------
    url
    dataKey
    dataFormat
    valueField - name of the field that returns the final value
    currentValues - current values of the field
    multivalue
    onSelect(values)
    onClose()
      
 */

import React, { Component } from "react";
import { apiGetCall } from "../APIFunctions";
import ColourButton from "../ColourButton";
import { COLOURS, HOVER_COLOR, PAGE_SIZE } from "../Config";
import { isEmpty } from "../GeneralFunctions";
import PeerTable2 from "../table/PeerTable2";

const styles = {
  applyBtn: {
    marginRight: "1%",
  },
};

export default class Lookup2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tblData: [],
    };
  }

  handleRow = (row) => {
    const id = row.id
    row = row.row
    //If multivalue, just return the selected row
    if (!this.props.multivalue) {
      this.props.onSelect(row[this.props.valueField]);
      return;
    }


    let { tblData } = this.state;
    if (tblData[id].checked) {
      tblData[id].checked = !tblData[id].checked;
    } else {
      tblData[id].checked = true;
    }

    this.setState({
      tblData: tblData,
    });
  };

  handleApply = () => {
    let values = "";

    //Add the value of every row that is checked
    this.state.tblData.map((row) => {
      if (row.checked) {
        values += `,${row[this.props.valueField]}`;
      }
    });

    //Remove the ',' from the first value
    if (values.length > 0) {
      values = values.substring(1, values.length);
    }

    this.props.onSelect(values);
  };

  GETdata = () => {
    const callback = (d) => {
      if (this.props.dataKey) {
        d = d[this.props.dataKey];
      }
      if (typeof d[0] !== "object") {
        for (let i in d) {
          d[i] = { val: d[i] };

          if (this.props.multivalue) {
            d[i].checked =
              this.props.currentValues &&
              this.props.currentValues.includes(d[i].val);
          }
        }
      }

      if (isEmpty(d)) { d = [] }

      this.setState({
        tblData: d,
      });
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(this.props.url, callback, error);
  };

  componentDidMount() {

    
    if (this.props.url) {
      this.GETdata();

      
    }
    else{

      this.setState({tblData:this.props.data})
    }
  }

  render() {
  
    if (this.state.tblData === null) {
      return null
    }



    return (
      <article className="paper dialog">
        <PeerTable2
          checkboxSelection={this.props.multivalue}
          name={this.props.url}
          data={this.state.tblData}
          columns={this.props.dataFormat}
          hideDetails
          hideFiltersBox
          clickable
          dontDownload
          pageSize={PAGE_SIZE}
          onCellClick={this.handleRow}
        />


        <section className="end">
          {/*Apply Btn*/}
          {this.props.multivalue && (
            <ColourButton
              style={styles.applyBtn}
              text="Apply"
              width={100}
              colour={COLOURS[0]}
              onClick={this.handleApply}
            />
          )}

          {/*Close Btn*/}
          <ColourButton
            text="Close"
            width={100}
            colour={HOVER_COLOR}
            onClick={this.props.onClose}
          />
        </section>
      </article>
    );
  }
}
