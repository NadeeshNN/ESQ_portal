/*
    TABLE BUFFER
    -------------
    Harrison    Jan 2020


    A circular progress bar to indicate that data is still populating

    PROPS
    --------------
      None
 */

import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import { COLOURS } from "../Config.jsx";


export default class TableBuffer extends Component {


    render() {

        return (
            <div
                style={{
                    paddingLeft: '1%',
                }}
            >
                <CircularProgress
                    style={{
                        color: COLOURS[1],
                    }}
                />
            </div>
        );
    }
}
