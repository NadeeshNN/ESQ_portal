/*
    Name
    -------------
    Harrison F    June 2020


    

    PROPS
    --------------
      
 */

import { DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { Component } from 'react';
import { formatDateFromTime, reverseDate } from '../GeneralFunctions';
import BasicField from './BasicField';

class JustTimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    render() {
        const views = () => {
            if (this.props.type === "HH:mm") {
                return ["hours", "minutes"]
            } else if (this.props.type === "mm:ss") {
                return ["minutes"]
            }
        }

        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    {...this.props}
                    ampm={false}
                    inputFormat={this.props.type}
                    views={views()}
                    value={formatDateFromTime(this.props.value, this.props.type)}
                    renderInput={(props) =>
                        <BasicField {...{ ...props, ...this.props }} />
                    }
                    onOpen={() => { this.setState({ open: true }) }}
                    onClose={() => { this.setState({ open: false }) }}
                    open={this.state.open}
                />
            </LocalizationProvider>
        );
    }
}

class Datetime extends Component {
    formatDate = (d) => {
        d = d.split(' ')
        d[0] = reverseDate(d[0], true)

        return `${d[0]} ${d[1]}`
    }

    render() {
        const newProps = { ...this.props }
        newProps.value = this.formatDate(newProps.value)

        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    {...newProps}
                    inputFormat={"dd/MM/yyyy HH:mm"}
                    renderInput={(props) =>
                        <BasicField {...{ ...props, ...this.props }} />
                    }
                />
            </LocalizationProvider>
        );
    }
}

export { Datetime, JustTimePicker }
