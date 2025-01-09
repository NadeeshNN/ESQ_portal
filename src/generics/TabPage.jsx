/*
    TAB PAGE
    -------------
    Harrison F    Jan 2020

    Generic Tab page with a 'new' CRUD button, peer table and details page
    

    PROPS
    --------------
    *title
    *moduleName - (Passed in automatically by detailsPage) must match the role name. Used for analysing role permissions
    *getAllUrl - What the peertable uses to fetch
    *allDataFormat - Format of the peertable
    mode - what to show at the top of the tab { crud (default), assign} 
    errMsg - If this value is changed, the value will showup in a snackbar
    infoTxt (optional) - Red text shown at top of tab

    allPageSize - Size of the peertable, default 5
    bump - if this is changed the table will repopulate
    onRowClick(row) - When a peertable row is clicked this is triggered

    -- If getUrl is provided --
    idColumn - the column that is used as the main parameter in the getUrl.

    
    -- IF EXTERNAL MODULE ALREADY EXISTS --
        detailsPage - The pre-existing module (e.g. <AccountDetails mode="create"/>)

        no need to pass in onClose or onBump. This is already dynamically added

    -- ELSE IF EXTERNAL MODULE DOESNT EXIST --
        -- Details Page --
        defaultObj - default details object
        detailsFormat - refer to DetailsPage.js for more info

        getUrl - leave without the param at the end. Requires the idColumn prop
        createUrl
        saveUrl
        deleteUrl


        tabs - [
            {
                name
                component
            }
        ]

    -- Assign mode --
    getAllAssignableUrl - used in the assignable lookup
    assignLookupFormat - {
            codeField: {name: ,label:}, The format of the code column
            descField: {name: ,label:} The format of the description column
        }
    assignUrl - leave the variable parameter empty. Assign to param can be passed in filled (e.g. action/method?param1=&param2=const )
    unassignUrl - leave the variable parameter empty. Assign to param can be passed in filled (e.g. action/method?param1=&param2=const )
    unassignIdField (optional) - Name of the field if not using rowId

    onHandleAssign([]) - triggered when all requested assigned items are selected and returns an array of selected ids
    onHandleUnassign(row) - triggered when a row named "unassign" is clicked

    -- CRUD Mode --
    crudOptions
    onCRUD() - only triggered if custom crudOptions are used
    
    onBump() - Triggered when any values change

 */

import React, { Component } from 'react';
import CRUD from './fields/CRUD';
import PeerTable from './table/PeerTable';
import { Dialog, DialogContent } from '@material-ui/core';
import DetailsPage from './DetailsPage';
import Lookup from './Lookup';
import { checkRoleAuth, getSubValue, isEmpty } from './GeneralFunctions';
import { Lunchbox } from './Lunchbox';
import { apiGetCall, apiOtherCall } from './APIFunctions';

const styles = {

};

export default class TabPage extends Component {

    constructor(props) {
        super(props);

        let dataFormat = this.props.allDataFormat;
        if (this.props.mode === "assign" && checkRoleAuth(this.props.moduleName, "IsUpdateEnabled")) {
            dataFormat.push({
                name: "unassign",
                format: "delete"
            });
        }

        this.state = {
            tabMode: this.props.mode ? this.props.mode : "crud",
            detailsOpen: false,
            openSnacks: [],
            lookupOpen: false,
            allDataFormat: dataFormat,
            mode: "create",
            bump: false,
            rowId: "",
            tblData: [],
            defaultObj: this.props.defaultObj,
        }
    }



    handleClick = (row, col) => {
        //If this was the unassign button, unassign it
        if (col.name === "unassign") {
            this.handleUnassign(row);
            return;
        }

        //If a custom rowClick was passed in, trigger it
        if (this.props.onRowClick) {
            this.props.onRowClick(row);
        }


        //If there is a getUrl or this is a prebuilt details page
        if (this.props.getUrl || this.props.detailsPage) {
            this.setState({
                mode: "edit",
                detailsOpen: true,
                rowId: getSubValue(row, "", this.props.idColumn ? this.props.idColumn : "RowId")
            });
        } else {//Just use the table row as the passed in object
            this.setState({
                mode: "edit",
                defaultObj: row,
                detailsOpen: true,
            });
        }
    }



    handleLookup = (rows) => {
        this.setState({
            lookupOpen: false
        });

        //Nothing was selected or cancel was pressed
        if (isEmpty(rows)) { return; }

        //Default assign using a url
        if (this.props.assignUrl) {
            for (let i in rows) {
                this.POSTassign(rows[i], returnedVal => {
                    if (returnedVal === rows[rows.length - 1].value) {
                        this.GETdata();
                    }
                });
            }
        }

        //Custom assignment handling
        if (this.props.onHandleAssign) {
            this.props.onHandleAssign(rows);
        }
    }

    handleUnassign = (row) => {
        if (this.props.onHandleUnassign) {
            this.props.onHandleUnassign(row);
        } else {
            this.DELETEunassign(row);
        }
    }


    handleUnassignAll = () => {
        //First confirm if the user is sure
        if (window.confirm("Are you sure you want to unassign all?")) {
            //For every row, unassign it
            for (let i in this.state.tblData) {
                this.handleUnassign(this.state.tblData[i]);
            }
        }


        //Refetch the new data
        this.GETdata();
    }

    createUrl = (url, row, isUnassign) => {
        let newUrl = "";
        /*
         URL should come with a missing param.
         The position of the param can be found by looking for a param=&

         To do this split the url from 
         
         action/method?param1=value1&param2=value2   
            into 
         [    action/method?param1   ,   value1&param2    ,    value2]

         if one of the values are empty then arr[i] will start with "&" and is thus the param that must be filled with the RowId
         
         */

        //If the missing param comes first
        if (url.includes("=&")) {
            url = url.split("=");
            for (let i = 1; i < url.length; i++) {//Dont bother looking at action/method?param1
                if (url[i][0] === "&") {
                    if (isUnassign) {
                        if (this.props.unassignIdField) {
                            url[i] = getSubValue(row, false, this.props.unassignIdField) + url[i];
                        } else {

                            url[i] = row.RowId + url[i];
                        }
                    } else {

                        url[i] = row.value + url[i];
                    }
                }
                break;//There should only be one missing param. Might as well break here
            }

            //Re stitch the url
            newUrl = url[0];
            for (let i = 1; i < url.length; i++ in url) {
                newUrl += "=" + url[i];
            }

        }

        //Else if the last parameter is missing
        else if (url[url.length - 1] === "=") {
            //Just tack the value onto the end
            if (isUnassign) {
                if (this.props.unassignIdField) {
                    newUrl = url + getSubValue(row, false, this.props.unassignIdField)
                } else {

                    newUrl = url + row.RowId;
                }
            } else {

            newUrl = url + row.value;
            }
        }

        return newUrl;
    }

    GETdata = () => {
        const callback = data => {
            this.setState({
                tblData: data,
            });
        }

        apiGetCall(this.props.getAllUrl, callback, () => { }, true);
    }

    POSTassign = (row, returnCallback) => {
        const url = this.createUrl(this.props.assignUrl, row);
        let openSnacks = this.state.openSnacks;



        const error = e => {
            openSnacks.push(0);

            this.setState({
                errMsg: e.DetailMessage,
                openSnacks: openSnacks
            });
        }

        const callback = d => {
            openSnacks.push(1);

            if (this.props.onBump) {
                this.props.onBump();
            }


            returnCallback(row.value);
            this.setState({
                openSnacks: openSnacks,
                bump: !this.state.bump
            });


        }
        apiOtherCall(url, "POST", callback, error);

    }

    DELETEunassign = (row) => {
        const url = this.createUrl(this.props.unassignUrl, row, true);
        let openSnacks = this.state.openSnacks;


        const error = e => {
            openSnacks.push(0);

            this.setState({
                errMsg: e.DetailMessage,
                openSnacks: openSnacks
            });
        }

        const callback = d => {
            openSnacks.push(2);

            if (this.props.onBump) {
                this.props.onBump();
            }

            this.setState({
                openSnacks: openSnacks,
                bump: !this.state.bump
            });
        }

        apiOtherCall(url, "DELETE", callback, error);

    }

    componentDidMount() {
        this.GETdata();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errMsg !== this.props.errMsg) {//If a new errMsg has come in
            let openSnacks = this.state.openSnacks;
            openSnacks.push(0);
            this.setState({
                openSnacks: openSnacks
            });
        }

        if (prevProps.bump !== this.props.bump) {

            this.GETdata();
            this.setState({
                bump: !this.state.bump
            })
        } else if (prevState.bump !== this.state.bump) {
            this.GETdata();

        }
    }


    render() {
        const { tabMode } = this.state;
        const snacks = [
            {
                label: `Error: ${this.props.errMsg}`,
                colour: "red"
            },
            {
                label: "Assignment successful",
                colour: "green"
            },
            {
                label: "Removed assignment",
                colour: "green"
            }
        ];
        let detailsPage = this.props.detailsPage;
        if (detailsPage) {
            const onClose = () => this.setState({
                detailsOpen: false,
                bump: !this.state.bump
            });
            const onBump = () => this.setState({
                bump: !this.state.bump
            });
            detailsPage = {
                ...detailsPage,
                ...{
                    props: {
                        ...detailsPage.props,
                        ...{
                            mode: this.state.mode,
                            rowId: this.state.rowId,
                            onBump: onBump,
                            onClose: onClose
                        }
                    }
                }
            }
        }

        return (
            <article>
                {/*Info Txt*/}
                {this.props.infoTxt &&
                    <p style={styles.infoTxt} > {this.props.infoTxt}</p>
                }

                {tabMode === "crud" && this.props.createUrl && checkRoleAuth(this.props.moduleName, "IsUpdateEnabled") &&
                    <CRUD
                        options={[
                            {
                                label: "New",
                                colour: localStorage.getItem("primaryColour")
                            }
                        ]}
                        onClick={() => {
                            this.setState({
                                detailsOpen: true,
                                mode: "create"
                            })
                        }}
                    />
                }
                {tabMode === "assign" && (this.props.onHandleAssign || !isEmpty(this.props.assignUrl)) && checkRoleAuth(this.props.moduleName, "IsUpdateEnabled") &&
                    <CRUD
                        options={[
                            {
                                label: "Assign",
                                colour: localStorage.getItem("primaryColour")
                            },
                            {
                                label: "Unassign All",
                                colour: "red",
                                disabled: this.state.tblData.length === 0 || isEmpty(this.props.unassignUrl),
                            }
                        ]}
                        onClick={(id) => {
                            if (id === "Assign") {
                                this.setState({
                                    lookupOpen: true,
                                })
                            } else {
                                this.handleUnassignAll();
                            }
                        }}
                    />
                }



                {/*All*/}
                <PeerTable
                    clickable
                    data={this.state.tblData}
                    dataFormat={this.state.allDataFormat}
                    pageSize={this.props.allPageSize ? this.props.allPageSize : 5}
                    bump={this.state.bump}
                    name={this.props.title}
                    onClick={this.handleClick}
                    onDelete={this.handleUnassign}
                />

                {/*Details*/}
                <Dialog
                    open={this.state.detailsOpen}
                    onClose={() => this.setState({
                        detailsOpen: false,
                        bump: !this.state.bump
                    })}
                    fullWidth={true}
                    maxWidth={'lg'}
                >
                    <DialogContent
                        style={{
                            padding: 0,
                        }}
                    >
                        {/*External details page exists*/}
                        {detailsPage}

                        { /*No external details page*/}
                        {!this.props.detailsPage &&
                            <DetailsPage
                            title={this.props.title}
                            moduleName={this.props.moduleName}
                                mode={this.state.mode}
                                bump={this.state.bump}
                                defaultObj={this.state.defaultObj}
                                format={this.props.detailsFormat}
                                getUrl={`${this.props.getUrl}${this.state.rowId}`}
                                createUrl={this.props.createUrl}
                                saveUrl={this.props.saveUrl}
                                deleteUrl={this.props.deleteUrl}
                                idField={this.props.idColumn}
                                tabs={this.props.tabs}
                                crudOptions={this.props.crudOptions}
                                onBump={() => {
                                    this.setState({
                                        bump: !this.state.bump
                                    })
                                }}
                                onCRUD={this.props.onCRUD}
                                onClose={() => this.setState({
                                    detailsOpen: false,
                                    bump: !this.state.bump
                                })}
                            />
                        }
                    </DialogContent>
                </Dialog>

                {/*Lookup*/}
                {tabMode === "assign" &&
                    <Dialog
                        open={this.state.lookupOpen}
                        onClose={() => this.setState({
                            lookupOpen: false,
                        })}
                        fullWidth={true}
                        maxWidth={'lg'}

                    >
                        <DialogContent
                            style={{
                                padding: 0,
                            }}
                        >
                            <Lookup
                                url={this.props.getAllAssignableUrl}
                                codeField={this.props.assignLookupFormat.codeField}
                                descField={this.props.assignLookupFormat.descField}
                                extraField={this.props.assignLookupFormat.extraField}
                                multivalue
                                currentValues=""
                                onClick={this.handleLookup}
                            />
                        </DialogContent>
                    </Dialog>
                }

                <Lunchbox
                    openSnacks={this.state.openSnacks}
                    snacks={snacks}
                    onClose={(id) => {
                        var openSnacks = this.state.openSnacks;
                        openSnacks.splice(id, 1);
                        this.setState({ openSnacks: openSnacks });
                    }}
                />

            </article>
        );
    }
}
