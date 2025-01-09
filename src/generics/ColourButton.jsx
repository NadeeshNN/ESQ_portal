/*
    Password Field
    -------------
    Harrison    June 2020


    A coloured button always set to the primary colour

    PROPS
    --------------
      text
      icon
      width
      style
      variant - {contained*, outlined}
      disabled
      colour - will be the apps primary colour if not set. Needs to be in hex form
      onClick()

 */

import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import { hexToRGBA } from './GeneralFunctions';
import { COLOURS } from "./Config";

export class ColourButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            normalStyle: null,
            hoverStyle: null,
            style: null,
        };
    }

    setColours = () => {
        var backgroundColor = COLOURS[0];
        var colour = "#ffffff";
        var hoverColour = this.props.colour;

        //if disabled show grey, else if colour is overriden use that colour, else use the usual primary colour
        if (this.props.variant === "outlined") {
            backgroundColor = "#ffffff";
            if (this.props.disabled) {
                colour = COLOURS[3];
            } else if (this.props.colour) {
                colour = this.props.colour;
            } else {
                colour = COLOURS[0];
            }
        } else {//Default contained
            if (this.props.disabled) {
                backgroundColor = COLOURS[3];
            } else if (this.props.colour) {
                backgroundColor = this.props.colour;
            }
        }

        if (this.props.colour) {
            hoverColour = hexToRGBA(hoverColour, 0.6);
        } else {
            if (this.props.variant === "outlined") {
                hoverColour = hexToRGBA(colour, 0.6);
            } else {
                hoverColour = hexToRGBA(backgroundColor, 0.6);
            }
        }

        let style = {
            color: colour,
            backgroundColor: backgroundColor,
            width: this.props.width ? this.props.width : '100%',
            minWidth: this.props.width ? this.props.width : '100%',
            maxWidth: this.props.width ? this.props.width : '100%',
            //borderRadius: 500,
            outline: "none",
            borderColor: this.props.variant !== "outlined" ? backgroundColor : colour,
        };
        let hoverStyle = {
            color: this.props.variant !== "outlined" ? colour : hoverColour,
            backgroundColor: this.props.disabled ? backgroundColor : this.props.variant === "outlined" ? "white" : hoverColour,
            width: this.props.width ? this.props.width : '100%',
            minWidth: this.props.width ? this.props.width : '100%',
            maxWidth: this.props.width ? this.props.width : '100%',
            outline: "none",
            //borderRadius: 500,
            borderColor: this.props.variant !== "outlined" ? colour : hoverColour,
        }

        if (this.props.style) {
            style = { ...style, ...this.props.style };
            hoverStyle = { ...hoverStyle, ...this.props.style };
        }

        this.setState({
            normalStyle: style,
            hoverStyle: hoverStyle,
            style: style
        });
    }

    componentDidMount() {
        this.setColours();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.disabled !== this.props.disabled) {
            this.setColours();
        }
    }

    render() {

        return (
            <Button
                id={this.props.id}
                data-testid={this.props.id}
                disabled={this.props.disabled}
                variant={this.props.variant}
                disableElevation
                style={this.state.style}
                onMouseEnter={() => {
                    this.setState({
                        style: this.state.hoverStyle,
                    });
                }}
                onMouseLeave={() => {
                    this.setState({
                        style: this.state.normalStyle,
                    });
                }}
                onClick={this.props.onClick}
            >
                {this.props.text &&
                    <Typography>
                        {this.props.text}
                    </Typography>
                }

                {this.props.icon}
            </Button>

        );
    }
}

export default (ColourButton);
