/*
    Close Btn
    -------------
    Harrison F    Nov 2021


    

    PROPS
    --------------
    onClose()
      
 */

import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { Component } from 'react';

const styles = {
    btn: {
        position: "absolute",
        right: "1%"
    }
}
export default class CloseBtn extends Component {

    render() {
        return (
            <section className="end" style={styles.btn}>
                <IconButton onClick={this.props.onClick} >
                    <Close />
                </IconButton>
            </section>
        );
    }
}
