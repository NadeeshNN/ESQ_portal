/*
    Dots Button
    -------------
    Harrison Feldman    Dec 2019


    An empty button showing "...", used mostly for pagination

    PROPS
    --------------
      None
 */

import React, { Component } from 'react';
import { Button } from '@material-ui/core';//Inputs

export class DotsButton extends Component {
    render() {
        return (
            <Button
                disabled
                style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    minWidth: 40
                }}
            >
                ...
            </Button >
        );

    }


}