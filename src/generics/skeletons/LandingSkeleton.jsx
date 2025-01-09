/*
    SKELETON LANDING PAGE
    -------------
    Harrison F    Mar 2021

    Default page for creating a master page with a details dialog.
    Will not work without altering to match requirements of the page
    

    PROPS
    --------------
      
 */

import React, { Component } from 'react';
import { Title } from '../generics/Title';
import PeerTable from '../generics/table/PeerTable';
import { Dialog, DialogContent } from '@material-ui/core';




export default class Name extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: "create",
            detailsOpen: false,
            rowId: 0,
            bump: false,
        };
    }

    handleRow = (row) => {
        this.setState({
            detailsOpen: true,
            rowId: row.RowId,
            mode: "edit",
        });
    }

    render() {
        return (
            <article className="paper">
                <Title
                    label=""
                    icon={}
                    buttonLabel="Create Item"
                    buttonVariant="contained"
                    onBtnClick={() => {
                        this.setState({
                            mode: "create",
                            detailsOpen: true,
                        });
                    }}
                />

                {/*Table*/}
                <PeerTable
                    clickable
                    hasFiltersBox
                    url={`${API_URL}`}
                    dataFormat={allFormat}
                    name=""
                    pageSize={10}
                    bump={this.state.bump}
                    onClick={this.handleRow}
                />

                {/*Details*/}
                <Dialog
                    open={this.state.detailsOpen}
                    onClose={() => this.setState({ detailsOpen: false, bump: !this.state.bump })}
                    fullWidth={true}
                    maxWidth={'lg'}
                >
                    <DialogContent
                        style={{
                            padding: 0,
                        }}
                    >
                    </DialogContent>
                </Dialog>

            </article>
        );
    }
}

//Main
const allFormat = [
]