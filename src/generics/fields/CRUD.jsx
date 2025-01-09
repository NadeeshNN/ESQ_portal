/*
    Name
    -------------
    Harrison F    Jan 2021

    A buttongroup to hold custom yet standardised crud buttons
    

    PROPS
    --------------
    options: [  - If this prop is not used, default crud buttons are available
        {
            label
            disabled
            colour
        }
    ]
    mode - {edit/create/readonly} , will disable the default save and delete buttons if in create mode
    onClick(label) - when a button is clicked, the corresponding id of the button is returned
      
 */

import React, { Component } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { COLOURS } from "../Config.jsx";

const styles = {
    crud: {
        marginBottom: "3%"
    },
    btn: {
    }
};



export default class CRUD extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: []
        }
    }

    setOptions = () => {

        if (this.props.options) {
            this.setState({
                options: this.props.options
            });
        } else {
            let defaultCRUD = [];

            //New and SaveAsNew
            defaultCRUD.push(
                {
                    label: this.props.mode ? this.props.mode === "create" ? "Create" : "New" : "Create",
                    colour: COLOURS[0],
                },
                {
                    label: "Save as new",
                    colour: COLOURS[1],
                    disabled: this.props.mode && this.props.mode === "create"
                },
            )

            //Save
            defaultCRUD.push(
                {
                    label: "Save",
                    colour: COLOURS[1],
                    disabled: this.props.mode && this.props.mode === "create"
                }
            );

            //Close
            defaultCRUD.push(
                {
                    label: "Close",
                    colour: "#c1c1c1"
                }
            );

            //Delete
            defaultCRUD.push(
                {
                    label: "Delete",
                    colour: "red",
                    disabled: this.props.mode && this.props.mode === "create"
                }
            );

            this.setState({
                options: defaultCRUD
            });
        }
    }

    componentDidMount() {
        this.setOptions();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mode !== this.props.mode) {
            this.setOptions();
        } else if (prevProps.options !== this.props.options) {
            this.setOptions();
        }
    }

    render() {



        const options = this.state.options;

        return (
            <ButtonGroup disableElevation style={styles.crud}>
                {options.map(btn => (
                    <Button
                        key={options.indexOf(btn)}
                        style={{
                            ...styles.btn,
                            ...{
                                color: btn.disabled ? "#dddddd" : btn.colour
                            }
                        }}
                        disabled={this.props.mode === "readonly" || btn.disabled}
                        onClick={() => {
                            this.props.onClick(btn.label)
                        }}
                    >
                        {btn.label}
                    </Button>
                ))}
            </ButtonGroup>
        );
    }
}
