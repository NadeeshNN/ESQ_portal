/*
    Password Field
    -------------
    Harrison    May 2020


    A normal text field with a show button to toggle password being hidden

    PROPS
    --------------
      disabled
      error
      variant
      value
      name
      label
      width
      shrink - set to true if the field shrinks to accomodate the icon
      onChange(event)
      onKeyDown(event)

 */

import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import BasicField from './BasicField';

const styles = {
    container: {
        "flexWrap": "nowrap"
    }
}

export default class PassField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    render() {
        const width = this.props.shrink ? this.props.width : this.props.width + 48


        return (
            <section style={styles.container}>
                <BasicField {...this.props}
                    type={this.state.show ? "text" : "password"}
                    width={width}
                />
                <IconButton
                    onClick={() => {
                        this.setState({
                            show: !this.state.show,
                        });
                    }}
                    style={{
                        height: 40,
                        width: 40
                    }}
                >
                    {this.state.show ?
                        <VisibilityOff />
                        :
                        <Visibility />
                    }
                </IconButton>
            </section>
        )
    }
}