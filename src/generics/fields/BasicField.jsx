/*
    Name
    -------------
    Harrison F    June 2020


    

    PROPS
    --------------
      
 */

import { TextField } from "@material-ui/core";
import React, { Component } from "react";

const neglectTypes = ["timeN"];
export default class BasicField extends Component {
  render() {
    const type = () => {
      if (this.props.type) {
        if (!neglectTypes.includes(this.props.type)) {
          return this.props.type;
        } else {
          return "text";
        }
      } else {
        return "text";
      }
    };

    return (
      <div style={this.props.style}>
        <TextField
          {...this.props}
          variant={this.props.variant ? this.props.variant : "outlined"}
          label={!this.props.hideLabel ? this.props.label : null}
          type={type()}
          style={{
            width: this.props.width,
            margin: 0,
            height: this.props.multiline ? 25 * this.props.lines : 40,
            backgroundColor: this.props.disabled ? "#eeeeee" : "#ffffff",
          }}
          margin="dense"
          value={this.props.value === null ? "" : this.props.value}
          autoComplete={this.props.dontAutoComplete ? "new-password" : ""}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            "data-testid": this.props.id,
            step: this.props.step,
          }}
        />
      </div>
    );
  }
}
