/*
    EXCEL EXPORT
    -------------
    Harrison    Jan 2020


    Allows the exporting to an excel sheet given data and a table name.

    PROPS
    --------------
      rows* - the data to be exported
      tableName* - the name of the table
      strongFormats [
          fieldName:
          format: {date, time, text}
      ]
 */

import React, { Component } from 'react';
import { splitCamel, copyArrByValue } from '../GeneralFunctions';
import { CSVLink } from "react-csv";
import moment from 'moment';
import { Tooltip, IconButton } from '@material-ui/core';
import { isMobileOnly } from 'react-device-detect';
import { GetApp } from '@material-ui/icons';
import { ColourButton } from '../ColourButton';

export class ExcelExport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: [],
        };
    }

    //Creates the headers
    populateHeaders() {
        var keyNames = Object.keys(this.props.rows[0]);//Create an array of names of each row
        var headers = [];
        for (var name in keyNames) {//For every name, put into headers the non-camel-cased string as a label and the keyNames as the key
            headers.push({ label: splitCamel(keyNames[name]), key: keyNames[name] });
        }

        this.setState({
            headers: headers,
        });
    }

    //Creates the data and fixes them to the assumed formats
    fixData(data) {
        const formatDate = (d) => moment(d).format('DD-MM-YY');//Get the date
        const formatTime = (d) => moment(d).format('hh:mm a');//Get the time

        var rows = copyArrByValue(data);
        var keyNames = Object.keys(rows[0]);
        ; for (var key in keyNames) {
            let keyName = splitCamel(keyNames[key]).toUpperCase();//Convert the keyName into a standard (non-camelCase, UPPERCASE) format.
            if (keyName.includes(" DATE") || keyName.includes("DATE ")) {//If date is the first or last word
                for (let row in rows) {
                    rows[row][keyNames[key]] = formatDate(rows[row][keyNames[key]]);//format this data as a date
                }
            }
            else if (keyName.includes(" TIME") || keyName.includes("TIME ")) {//If this header (without camelCase) includes the word time
                for (let row in rows) {
                    rows[row][keyNames[key]] = formatTime(rows[row][keyNames[key]]);//format this data as a time
                }
            }
        }

        return rows;
    }

    strongFormatData = () => {
        const formatDate = (d) => moment(d).format('DD-MM-YY');//Get the date
        const formatTime = (d) => moment(d).format('hh:mm a');//Get the time

        var data = this.props.rows;
        for (let i in this.props.strongFormat) {//For every strong format
            const format = this.props.strongFormat[i];
            for (let j in data) {//For every row of data
                switch (format.format) {
                    case "date":
                        data[j][format.fieldName] = formatDate(data[j][format.fieldName]);//Convert this rows column to date
                        data[j].altered = true;
                        break;
                    case "time":
                        data[j][format.fieldName] = formatTime(data[j][format.fieldName]);//Convert this rows column to time
                        data[j].altered = true;
                        break;
                    case "text":
                        data[j].altered = true;//No need to change the format but mark as altered so that it is not changed later
                        break;
                    default:
                        break;
                }
            }
        }
        return data;
    }

    formatData = () => {
        var data = this.strongFormatData();
        data = this.fixData(data);

        return data;
    }

    componentDidMount() {
        if (this.props.rows && this.props.rows.length > 0) {
            this.populateHeaders();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.rows !== prevProps.rows && this.props.rows.length > 0) {
            this.populateHeaders();
        }
    }


    render() {
        const data = this.strongFormatData();

        return (
            <div>
                <CSVLink
                    filename={`${this.props.tableName}.csv`}
                    data={data}
                    headers={this.state.headers}
                >
                    <Tooltip
                        title="Download Data"
                    >
                        <div>
                            {isMobileOnly &&
                                <IconButton>
                                    <GetApp />
                                </IconButton>
                            }
                            {!isMobileOnly &&
                                <ColourButton
                                    width={35}
                                    colour={localStorage.getItem("tertiaryColour")}
                                    icon={
                                        <GetApp
                                            className="whiteIcon"
                                        />
                                    }
                                />
                            }
                        </div>
                    </Tooltip>
                </CSVLink>
            </div>
        );
    }
}


export default (ExcelExport);