/*
    Log Pagination buttons
    -------------
    Harrison F    Jan 2022


    

    PROPS
    --------------
    prevDisabled
    nextDisabled
    onClick(mode) - {0 = First, 1 = Prev, 2 = Next, 3 = Last}
      
 */

import { ButtonGroup, Button } from '@material-ui/core';
import { NavigateBefore, NavigateNext, SkipNext, SkipPrevious } from '@material-ui/icons';
import React, { Component } from 'react';

export default class LogPagination extends Component {

    render() {
        return (
            <section>
                <ButtonGroup>
                    {/*First*/}
                    <Button
                        disabled={this.props.prevDisabled}
                        onClick={() => {
                            this.props.onClick(0)
                        }}
                    >
                        <SkipPrevious />
                    </Button>

                    {/*Previous*/}
                    <Button
                        disabled={this.props.prevDisabled}
                        onClick={() => {
                            this.props.onClick(1)
                        }}
                    >
                        <NavigateBefore />
                    </Button>

                    {/*Next*/}
                    <Button
                        disabled={this.props.nextDisabled}
                        onClick={() => {
                            this.props.onClick(2)
                        }}
                    >
                        <NavigateNext />
                    </Button>

                    {/*Last*/}
                    <Button
                        disabled={this.props.nextDisabled}
                        onClick={() => {
                            this.props.onClick(3)
                        }}
                    >
                        <SkipNext />
                    </Button>
                </ButtonGroup>
            </section>
        );
    }
}
