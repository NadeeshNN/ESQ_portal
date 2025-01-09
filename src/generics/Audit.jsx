/*
    Name
    -------------
    Harrison F    June 2020


    

    PROPS
    --------------
    data - the object that contains the created and updated fields

      
 */

import React, { Component } from 'react';
import { Stepper, Step, StepLabel, IconButton, Dialog, DialogContent } from '@material-ui/core';
import { Info, Add, Edit } from '@material-ui/icons';
import { formatDateFromDate } from './GeneralFunctions';
import { COLOURS } from "./Config.jsx";

const styles = {
    createdIcon: {
        backgroundImage: `linear-gradient( 95deg,${COLOURS[0]} 0%, ${COLOURS[1]} 100%)`,
        borderRadius: 50,
        width: 40,
        height: 40
    },
    updatedIcon: {
        backgroundImage: `linear-gradient( 95deg,${COLOURS[1]} 0%, ${COLOURS[2]} 100%)`,
        borderRadius: 50,
        width: 40,
        height: 40
    },
};

function AddIcon() {
    return (
        <article style={styles.createdIcon} className="center itemsCenter">
            <Add />
        </article>
    );
}

function EditIcon() {
    return (
        <article style={styles.updatedIcon} className="center itemsCenter">
            <Edit />
        </article>
    );
}

export default class Audit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            data: {}
        }
    }

    formatData = () => {
        let data = JSON.parse(JSON.stringify(this.props.data));//Decouple the data from the props
        data.Created = formatDateFromDate(new Date(data.created));
        data.Updated = formatDateFromDate(new Date(data.updated));

        this.setState({
            data: data
        });
    }

    componentDidMount() {
            this.formatData();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.data.Updated !== this.props.data.Updated ||
            prevProps.data.Created !== this.props.data.Created
        ) {
            this.formatData();
        }
    }

    render() {
        const data = this.state.data;

        return (
            <article>
                {/*Audit Button*/}
                <IconButton
                    onClick={() => {
                        this.setState({
                            dialogOpen: true
                        });
                    }}
                >
                    <Info />
                </IconButton>

                {/*Dialog*/}
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={() => this.setState({
                        dialogOpen: false
                    })}
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogContent
                        style={{
                            padding: 0,
                        }}
                    >
                        {/*Dialog Content*/}
                        <article>
                            <Stepper>
                                <Step key="Created">
                                    <StepLabel StepIconComponent={AddIcon}>Created: {data.Created} by {data.createdBy}</StepLabel>
                                </Step>
                                <Step key="Updated">
                                    <StepLabel StepIconComponent={EditIcon}>Updated: {data.Updated} by {data.updatedBy}</StepLabel>
                                </Step>
                            </Stepper>
                        </article>
                    </DialogContent>
                </Dialog>

            </article>
        );
    }
}
