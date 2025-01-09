/*
    DETAILS PAGE
    -------------
    Harrison F    Jan 2020


    

    PROPS
    --------------
    *title
    *moduleName - must match the role name. Used for analysing role permissions
    *mode - {create,edit,readonly}
    *defaultObj 

    *format - 
    [
        //Each column
        [
            //Each row
            [
                //Each field
                {
                    name
                    label
                    disabled - either "true", "edit" to disable if in edit more or "attribute operation value" for dynamic disabling (e.g. "StateCode > 5")
                    createHidden - hide if in create mode
                    editHidden - hide if in edit mode
                    required
                    requirements - {
                        ---- if using eval ----
                        val - name of the value from the field that will be used
                        operator - e.g. "<="
                        req - required value

                        ---- if using regex ----
                        val - "regex"
                        req - regex code
                    }
                    requirementErrTexts - What is shown if the requirement is not met
                    multiline
                    lines - useful for limiting multiline fields
                    hideLabel - only shows the input field
                    width - default 180

                    type - {date, time, password, lookup, select, check, empty, label, website}, leave empty if no special type
                    shrink - set to true if the field shrinks to accomodate the icon
            
                       -- Stuff for lookup or select fields --
                      options - If hardcoded select values, otherwise use the url method
                      url
                      paramField - If the url parameter comes from a field, 
                                    leave the end of the url (the parameter value) empty and set this to the name of the field the param comes from
                      paramIsOption - If the field the parameter comes from is a select or lookup field
                     
                      dataFormat - the format of the table in the lookup dialog
                      {
                          codeField: {name: ,label:}, The format of the code column. This is the value the field will save as
                          descField: {name: ,label:} The format of the description column. If select this is the value the field will show as
                      }

                      bumpFields - the names of the fields that needs to be repopulated if this field changes value
                      overwrites - Only available for select fields
                      [
                        {
                            isSelect - is this overwriting a select fields options. Only available if the overwrite comes from getLov API
                            newValue - name of the select/lookup row field the new value comes from. Leave empty if this is a select
                            field - name of the field that is being changed
                        }
                      ]
                      getLov - set to true if the overwrites come from the GetListOfValuesByType API

                      multivalue - Can multiple items be selected/deselected - for lookup only
                      selByValue - if true, items will be checked if the value column matches, otherwise items are checked if the code column matches

                      radios
                },
                {
                    Same as above
                }
            ]
        ]
    ]

     E.G
     Field1 [    ]   Field2 [    ]      Title    [            ]
     Field3 [    ]   Field4 [    ]      Comments [            ]
     Field5 [    ]   Field6 [    ]               [            ]
     
     [
        [
            [{field1},{field2}],
            [{field3},{field4}],
            [{field5},{field6}],
        ]
     ,
        [
            {title}
            {comments},
        ]
     ]

    *** FOR FORMATTING PURPOSES RIGHT FIELDS (e.g title and comments) NEED TO HAVE HIDELABEL SET TO TRUE ***

    

    getUrl
    createUrl
    saveUrl
    deleteUrl - make sure to leave without the parameter

    usePut - set to true to use PUT instead of POST when saving
    dontPostFormat - set to true if no formatting should happen after a create/save call

    dataKey - if the api returns on object of an object
    formKey - if sending objects in forms, set this to the name of the object in the form that the API is getting from
    idField (optional) - default "RowId" tells the deleteAPI which row to delete based of this field value
    
    

    bump - if value changes will repopulate the select fields
    clearBump - if toggled will reset values to the default object

    isAdmin - Set to true if this is a system admin page. Allows higher privileges.
    dontPad - if set to true, the container wont use outer padding

    crudOptions
    noCRUDassume - dont assume properties for CRUD
    onCRUD(label) - only triggered if custom crudOptions are used

    tabs - [
        {
            -- see TabPage.js for props
        }
    ]

    onChange(newObj, changed field name) - triggered every time a change occurs
    onReturnFormatted (optional) - returns the formatted object
    onBump - triggered when a row is added or deleted
    onSave - triggered when a save is successful
    onDelete - triggered on a successful delete
    onClose()
      
 */

import React, { Component } from 'react';
import { apiOtherCall, apiGetCall, apiPostCall } from './APIFunctions';
import Lunchbox from './Lunchbox';
import { formatISOFromDate, isEmpty, formatSelect, formatMaterialUIFromDate, formatLookup, getSubValue, setSubValue, checkRoleAuth, formatAMPMdatetimeFromDate, isInvalidPassword } from './GeneralFunctions';
import CRUD from './fields/CRUD';
import LabelInput from './fields/LabelInput';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import { COLOURS } from "./Config.jsx";

const fieldWidth = 180;
const styles = {
    appBar: {
        backgroundColor: COLOURS[0],
    },
    tabs: {
    },
    tabIndicator: {
        backgroundColor: localStorage.getItem("tertiaryColour")
    },
    doubleFields: {//Required to fit two checkboxes in the space of 1 field
        width: fieldWidth + 150,
        marginRight: 40,
    },
    rightField: {
        marginBottom: "3%"
    }
};

const autoCRUD = ["New", "Create", "Save", "Delete", "Close"]


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <article
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            style={{ backgroundColor: "#eeeeee" }}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </article>
    );
}

export default class DetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            obj: JSON.parse(JSON.stringify(this.props.defaultObj)),
            errMsg: "",
            openSnacks: [],
            selOptions: {},
            crudOptions: [],
            tab: 0,
            id: 0,
            shrunkenPage: false,
        }
    }

    handleCrud = (label) => {
        switch (label) {
            case "Create":
                this.handleCreate();
                break;
            case "New":
                this.createCRUD("create")
                this.setState({
                    obj: this.props.defaultObj,
                    mode: "create"
                });
                break;
            case "Save":
                this.handleSave();
                break;
            case "Save as new":
                this.handleCreate();
                break;
            case "Close":
                this.props.onClose();
                break;
            case "Delete":
                this.DELETEobj();
                break;
            default:
                break;
        }
    }

    handleChange = (ev) => {
        let obj = this.state.obj;
        obj = setSubValue(obj, ev.target.name, ev.target.value)

        this.onChange(obj, ev.target.name);

        this.setState({
            obj: obj
        });
    }

    handleDatetime = (date, fieldname) => {
        let obj = this.state.obj;
        obj = setSubValue(obj, fieldname, formatAMPMdatetimeFromDate(date.toDate()))

        this.onChange(obj, fieldname);

        this.setState({
            obj: obj
        });
    }

    handleSelect = (selOption, ev, field) => {
        let obj = this.state.obj;
        obj = setSubValue(obj, ev.name, selOption)

        //Overwrite required fields
        if (field.overwrites) {
            if (field.getLov) {//Do the overwrites come from the GetLovByType API?
                this.GETlov(selOption, field);
            } else {//The overwrites come from the selected option
                for (let i in field.overwrites) {
                    if (field.overwrites[i].newValue === "") {//If this field just needs to be reset
                        obj = setSubValue(obj, field.overwrites[i].field, "")
                    } else {//Otherwise take a value from the newValue field
                        obj = setSubValue(obj, field.overwrites[i].field, selOption[field.overwrites[i].newValue])
                    }
                }
            }
        }

        if (field.bumpFields) {
            this.handleBumpFields(field.bumpFields, obj);
        }

        this.onChange(obj, ev.name);

        this.setState({
            obj: obj
        });
    }

    handleLookup = (field, row) => {
        if (row === null) { return; }
        let obj = this.state.obj;

        obj = setSubValue(obj, field.name, row);

        if (field.bumpFields) {
            this.handleBumpFields(field.bumpFields, obj);
        }

        this.onChange(obj, field.name);

        this.setState({
            obj: obj
        });
    }



    handleCheck = (ev) => {
        let obj = this.state.obj;

        obj = setSubValue(obj, ev.target.name, !getSubValue(obj, ev.target));

        this.onChange(obj, ev.target.name);

        this.setState({
            obj: obj
        });
    }

    handleCreate = () => {
        let data = this.formatToAPI();
        if (data) {
            this.POSTcreateObj(data);
        }
    }

    handleSave = () => {
        let data = this.formatToAPI();
        if (data) {
            if (this.props.onBeforeSave) {
                this.props.onBeforeSave()
            }
            this.POSTsaveObj(data);
        }
    }

    handleTab = (ev, newTab) => {
        this.setState({
            tab: newTab
        });
    }

    handleBumpFields = (bumpFields, newData) => {
        let format = this.props.format;

        for (let k in bumpFields) {
            //Search through left fields
            for (let i in format[0]) {//For each left section rows
                for (let j in format[0][i]) {//For each field

                    if (format[0][i][j].name === bumpFields[k]) {//If this field needs to be bumped
                        this.formatField(format[0][i][j], newData);//Bump it
                    }

                }
            }

            //Search through right fields
            if (format.length > 1) {
                for (let j in format[1]) {//For each field
                    if (format[1][j].name === bumpFields[k]) {//If this field needs to be bumped
                        this.formatField(format[1][j], newData);//Bump it
                    }

                }
            }
        }
    }

    onChange = (obj, changedFieldName) => {
        if (this.props.onChange) {
            this.props.onChange(obj, changedFieldName);
        }
    }

    //Finds and fetches all selectable options
    populateSelOptions = (newData) => {
        const format = this.props.format;
        let field = {};

        //Search through left fields
        for (let i in format[0]) {//For each left section rows
            for (let j in format[0][i]) {//For each field
                field = format[0][i][j];

                if (field.type === "select") {
                    this.GETselectOptions(field, newData);
                }
            }
        }

        //Search through right fields
        if (format.length > 1) {
            for (let j in format[1]) {//For each field
                field = format[1][j];

                if (field.type === "select") {
                    this.GETselectOptions(field, newData);
                }
            }
        }
    }

    formatUrl = field => {
        const obj = this.state.obj;
        if (field.paramField) {//Url has a parameter from another field
            const paramField = getSubValue(obj, "", field.paramField);//Value of the paramField
            if (field.paramIsOption) {//Parameter is a lookup or select value
                if (paramField.value) {//This field has already been converted to a {value, label} object
                    if (isEmpty(paramField.value)) { return ""; }//If the parameters value is empty
                    return field.url + paramField.value;

                } else {//This field is still a single non object value
                    return field.url + paramField;
                }
            } else {//Parameter is a simple value
                return field.url + paramField;
            }
        } else {//There is no extra parameter needed
            return field.url;
        }
    }

    formatToAPI = () => {
        const format = this.props.format;
        let data = JSON.parse(JSON.stringify(this.state.obj));//Decouple from the state

        let field = {};
        for (let i in format[0]) {//For each left section rows
            for (let j in format[0][i]) {//For each field
                field = format[0][i][j];

                if (!((field.createHidden && this.state.mode === "create") || (field.editHidden && this.state.mode === "edit"))) {
                    //Check required fields
                    if (field.required && isEmpty(getSubValue(data, "", field.name))) {
                        //If the field is currently on the screen

                        let openSnacks = this.state.openSnacks;
                        openSnacks.push(0);

                        this.setState({
                            errMsg: `${field.name} cannot be empty`,
                            openSnacks: openSnacks
                        });
                        return false;
                    }

                    //Check valid password
                    if (field.type === "password") {
                        const invalidPass = isInvalidPassword(getSubValue(data, "", field.name))
                        if (invalidPass) {
                            let errMsg = ""
                            switch (invalidPass) {
                                case "1":
                                    errMsg = "must be minimum 8 characters"
                                    break;
                                case "2":
                                    errMsg = "must contain both uppercase and lowercase letters"
                                    break;
                                case "3":
                                    errMsg = "must contain a mixture of letters and numbers"
                                    break;
                                case "4":
                                    errMsg = "must include at least one special character, e.g. ! @ # ? }"
                                    break;
                                default:
                                    break;
                            }
                            let openSnacks = this.state.openSnacks;
                            openSnacks.push(0);

                            this.setState({
                                errMsg: `${field.name} ${errMsg}`,
                                openSnacks: openSnacks
                            });
                            return false;
                        }
                    }
                    //Check requirement
                    if (field.requirements) {
                        for (let k in field.requirements) {
                            const reqs = field.requirements[k]
                            //Check using regex
                            if (reqs.val === "regex") {
                                if (RegExp(reqs.req).test(getSubValue(data, "", field.name))) {
                                    let openSnacks = this.state.openSnacks;
                                    openSnacks.push(0);

                                    this.setState({
                                        errMsg: `${field.name} ${field.requirementErrTexts[k]}`,
                                        openSnacks: openSnacks
                                    });
                                    return false;
                                }
                            }
                            //eval(value operator requirement)
                            else if (!eval(`${getSubValue(data, "", field.name)[reqs.val]} ${reqs.operator} ${reqs.req}`)) {
                                let openSnacks = this.state.openSnacks;
                                openSnacks.push(0);

                                this.setState({
                                    errMsg: `${field.name} ${field.requirementErrTexts[k]}`,
                                    openSnacks: openSnacks
                                });
                                return false;
                            }
                        }
                    }
                }

                //Convert selects into single values and dates into ISO
                if (field.type === "select") {
                    data = setSubValue(data, field.name, getSubValue(data, "", field.name).value);
                } else if (field.type === "date") {
                    data = setSubValue(data, field.name, formatISOFromDate(getSubValue(data, "", field.name)));
                } else if (field.type === "datetime") {
                    const date = getSubValue(data, field);
                    const day = date.substr(0, 2);
                    const month = date.substr(3, 2);
                    const rest = date.substr(5, date.length)

                    data = setSubValue(data, field.name, formatISOFromDate(`${month}/${day}${rest}`))

                } else if (field.type === "lookup") {
                    if (field.multivalue) {
                        let lookupArr = [];
                        for (let i in getSubValue(data, "", field.name)) {
                            lookupArr.push(getSubValue(data, "", field.name)[i].value);
                        }

                        data = setSubValue(data, field.name, lookupArr);
                    } else {
                        data = setSubValue(data, field.name, getSubValue(data, "", field.name).value);
                    }
                } else if (field.type === "password") {


                    data = setSubValue(data, field.name, getSubValue(data, "", field.name));
                }



            }
        }

        //Format right section
        if (format.length > 1) {
            for (let j in format[1]) {//For each field
                field = format[1][j];

                //Convert selects into single values and dates into ISO
                if (field.type === "select") {
                    data = setSubValue(data, field.name, getSubValue(data, "", field.name).value);
                } else if (field.type === "date" || field.type === "datetime") {
                    data = setSubValue(data, field.name, formatISOFromDate(getSubValue(data, "", field.name)));
                }

                //Check required fields
                if (field.required && isEmpty(getSubValue(data, "", field.name))) {
                    let openSnacks = this.state.openSnacks;
                    openSnacks.push(0);

                    this.setState({
                        errMsg: `${field.name} cannot be empty`,
                        openSnacks: openSnacks
                    });
                    return false;
                }


            }
        }

        data.updated = formatISOFromDate(new Date())
        data.updatedBy = JSON.parse(localStorage.getItem("user")).username;
        data.created = formatISOFromDate(new Date())
        data.createdBy = JSON.parse(localStorage.getItem("user")).username
        return data;
    }


    //Formats the select from either the hardcoded options list or given url
    formatSelectLocal = (field, newData) => {
        if (field.options) {//Passed by hardcoded options
            newData = setSubValue(
                newData,
                field.name,
                formatSelect(
                    getSubValue(newData, field),
                    field.options,
                    field.selByValue
                )
            )
        } else if (field.url) {//Options come from API
            this.GETselectOptions(field, newData, (options, curField) => {
                newData = setSubValue(
                    newData,
                    curField.name,
                    formatSelect(getSubValue(newData, curField), options, curField.selByValue)
                )

                this.setState({
                    obj: newData,
                });
            });
        } else {//No options available
            newData = setSubValue(
                newData,
                field.name,
                { label: "None Selected", value: "" }
            )
        }
    }

    formatField = (field, newData) => {
        const format = this.props.format;

        //FORMAT SELECT
        if (field.type === "select") {
            this.formatSelectLocal(field, newData);

            //FORMAT DATE
        } else if (field.type === "date") {
            newData = setSubValue(
                newData,
                field.name,
                formatMaterialUIFromDate(new Date(getSubValue(newData, field)))
            )

            //FORMAT DATETIME
        } else if (field.type === "datetime") {
            newData = setSubValue(
                newData,
                field.name,
                formatAMPMdatetimeFromDate(new Date(getSubValue(newData, field)))
            )


            //FORMAT LOOKUP
        } else if (field.type === "lookup") {
            if (isEmpty(getSubValue(newData, field))) {//If the value is empty, set as an empty value/label object
                newData = setSubValue(
                    newData,
                    field.name,
                    { value: "", label: "" }
                );
            } else {
                const callback = (newVal, fieldName) => {

                    let paramChild = {};
                    //Set the new found value;
                    newData = setSubValue(
                        newData,
                        fieldName,
                        newVal
                    );


                    //Check if another field is relying on this fields new value
                    for (let k in format[0]) {
                        for (let l in format[0][k]) {
                            paramChild = format[0][k][l]
                            if (paramChild.paramField === fieldName) {//If this child takes values from the parent filed
                                if (paramChild.type === "select") {//Child is select
                                    this.formatSelectLocal(field, newData);

                                } else if (paramChild.type === "lookup") {//Child is lookup

                                    formatLookup(
                                        getSubValue(newData, paramChild),
                                        paramChild.name,
                                        this.formatUrl(paramChild),
                                        paramChild.dataFormat,
                                        paramChild.selByValue,
                                        paramChild.multivalue,
                                        callback
                                    );

                                }
                            }
                        }
                    }

                    //Same as above except for right fields
                    if (format.length > 1) {
                        for (let k in format[1]) {
                            paramChild = format[1][k];
                            if (paramChild.paramField === fieldName) {
                                if (paramChild.type === "select") {
                                    this.formatSelectLocal(paramChild, newData);
                                } else if (paramChild.type === "lookup") {
                                    formatLookup(
                                        getSubValue(newData, paramChild),
                                        paramChild.name,
                                        this.formatUrl(paramChild),
                                        paramChild.dataFormat,
                                        paramChild.selByValue,
                                        paramChild.multivalue,
                                        callback
                                    );
                                }
                            }
                        }
                    }

                    this.setState({
                        obj: newData,
                    });
                }
                formatLookup(
                    getSubValue(newData, field),
                    field.name,
                    this.formatUrl(field),
                    field.dataFormat,
                    field.selByValue,
                    field.multivalue,
                    callback
                );
            }
        }


        return newData;
    }

    formatFromAPI = async newData => {
        const format = this.props.format;
        let field = {};
        for (let i in format[0]) {//For each left section rows
            for (let j in format[0][i]) {//For each field
                field = format[0][i][j];

                newData = this.formatField(field, newData);
            }
        }

        //Format right section
        if (format.length > 1) {
            for (let j in format[1]) {//For each field
                field = format[1][j];

                newData = this.formatField(field, newData);
            }
        }

        if (this.props.onReturnFormatted) {
            this.props.onReturnFormatted(newData);
        }

        this.setState({
            obj: newData,
            id: this.props.idField ? getSubValue(newData, "", this.props.idField) : newData.RowId,
        });
        this.createCRUD(this.state.mode);
    }

    GETselectOptions = (field, newData, returnCallback) => {
        field = JSON.parse(JSON.stringify(field));
        let selOptions = this.state.selOptions;
        //If options are hard coded, don't fetch from a url
        if (field.options) {
            selOptions[field.name] = field.options;
            return;
        } else if (!field.url) {//If there are no options or url then just save an empty array
            selOptions[field.name] = [];

            this.setState({
                selOptions: selOptions
            });
            return;
        }

        //If this url is left without a parameter value just take the primary key of the object
        if (field.paramField) {
            field.url = this.formatUrl(field);
        }
        else if (field.url[field.url.length - 1] === "=") {
            //If there is a custom primary key then use that. Otherwise assume the primary key is the RowId
            field.url += this.props.idField ? getSubValue(newData, "", this.props.idField) : newData.RowId;
        }

        const error = e => {
            let openSnacks = this.state.openSnacks;
            openSnacks.push(0);

            this.setState({
                errMsg: e.DetailMessage,
                openSnacks: openSnacks
            });
        }

        const callback = arr => {

            //Format the array into {value, label} pairs
            for (let i in arr) {
                if (field.dataFormat) {//If there are specified code/desc fields
                    arr[i].label = getSubValue(arr[i], field.dataFormat.descField);
                    arr[i].value = getSubValue(arr[i], field.dataFormat.codeField);

                } else {//Assume Value and RowId
                    arr[i].label = arr[i].Name;
                    if (arr[i].Value) {
                        arr[i].value = arr[i].Value;
                    } else {
                        arr[i].value = arr[i].RowId;
                    }
                }
            }
            selOptions[field.name] = arr;
            this.setState({
                selOptions: selOptions,
            });

            if (returnCallback) {
                returnCallback(arr, field);//Return the new list of options
            }
        }
        apiGetCall(field.url, callback, error, true);
    }

    GETlov = (selOption, field) => {
        let openSnacks = this.state.openSnacks;
        const url = `lov/GetListOfValuesByType?lovType=${selOption.value}`;

        const error = e => {
            openSnacks.push(0);

            this.setState({
                errMsg: e.DetailMessage,
                openSnacks: openSnacks
            });
        }

        const callback = data => {
            let obj = this.state.obj;
            let selOptions = this.state.selOptions;

            //Format the data into selectable options
            for (let i in data) {
                data[i].label = data[i].Name;
                data[i].value = data[i].Value;
            }

            for (let i in field.overwrites) {//For every field that needs overwriting
                if (field.overwrites[i].isSelect) {
                    selOptions[field.overwrites[i].field] = data;
                } else {

                    if (field.overwrites[i].newValue === "") {//If this field just needs to be reset
                        obj = setSubValue(
                            obj,
                            field.overwrites[i].field,
                            ""
                        );
                    } else {//Otherwise take a value from the newValue field
                        obj = setSubValue(
                            obj,
                            field.overwrites[i].field,
                            getSubValue(
                                data,
                                "",
                                field.overwrites[i].newValue
                            )
                        );
                    }
                }
            }

            this.setState({
                obj: obj,
                selOptions: selOptions
            });
        }

        apiGetCall(url, callback, error, true);
    }

    GETobj = () => {
        let openSnacks = this.state.openSnacks;

        const error = e => {
            openSnacks.push(0);

            this.setState({
                openSnacks: openSnacks,
                errMsg: e
            });
        }

        const callbck = data => {
            if (data.DataList) {
                data = data.DataList[0];
            }
            if (this.props.dataKey) {
                data = data[this.props.dataKey]
            }

            this.formatFromAPI(data);
        }

        apiGetCall(this.props.getUrl, callbck, error, false);
    }

    POSTcreateObj = (data) => {
        let openSnacks = this.state.openSnacks;

        const error = e => {
            openSnacks.push(0);

            this.setState({
                openSnacks: openSnacks,
                errMsg: e
            });
        }

        const callback = newData => {
            openSnacks.push(1);
            if (this.props.dataKey) {
                newData = newData[this.props.dataKey]
            }
            if (!this.props.dontPostFormat) {
                this.formatFromAPI(newData);
            }

            if (this.props.onBump) {
                this.props.onBump(newData);
            }

            this.createCRUD("edit")
            this.setState({
                errMsg: "",
                mode: "edit",
            });
        }

        if (this.props.formKey) {
            let form = new FormData()
            form.append(this.props.formKey, JSON.stringify(data))
            form.append("docketImgFile", null)
            data = form
        } else {
            data = JSON.stringify(data)
        }



        apiPostCall(this.props.createUrl, "POST", data, callback, error);
    }

    POSTsaveObj = (data) => {
        let openSnacks = this.state.openSnacks;

        //Error
        const error = e => {
            openSnacks.push(0);

            this.setState({
                openSnacks: openSnacks,
                errMsg: e
            });
        }

        //Success
        const callback = newData => {
            openSnacks.push(2);
            //Reformat data
            if (this.props.dataKey) {
                newData = newData[this.props.dataKey]
            }
            if (!this.props.dontPostFormat) {
                this.formatFromAPI(newData);
            }

            //Bump
            if (this.props.onBump) {
                this.props.onBump(newData);
            }

            //Recreate CRUD
            this.createCRUD(this.state.mode)

            //Save through props
            if (this.props.onSave) {
                this.props.onSave()
            }
            this.setState({
                errMsg: "",
                openSnacks: openSnacks
            });
        }


        if (this.props.formKey) {
            let form = new FormData()
            for (let key in data) {
                form.append(key, data[key])
            }
            data = form
        } else {
            data = JSON.stringify(data)
        }

        apiPostCall(this.props.saveUrl, this.props.usePut ? "PUT" : "POST", data, callback, error);
    }

    DELETEobj = () => {
        let openSnacks = this.state.openSnacks;

        const error = e => {
            openSnacks.push(0);

            this.setState({
                openSnacks: openSnacks,
                errMsg: e
            });
        }

        const callback = data => {
            openSnacks.push(3);

            if (this.props.onBump) {
                this.props.onBump(this.props.defaultObj);
            }

            this.createCRUD("create")
            this.setState({
                openSnacks: openSnacks,
                mode: "create",
                obj: this.props.defaultObj,
                errMsg: "",
            });

            if (this.props.onDelete) {
                this.props.onDelete()
            }
        }

        if (window.confirm(`Are you sure you want to delete this ${this.props.title}?`)) {
            apiOtherCall(`${this.props.deleteUrl}${this.state.id}`, "DELETE", callback, error);
        }
    }

    isDisabled = clause => {
        if (this.state.mode === "readonly") {//In readonly mode all fields are disabled
            return true;
        } if (clause === false || !clause) {//Simple enabled
            return false;
        } else if (clause === true) {//Simple disabled
            return true;
        } else if (clause === "edit" || clause === "create") {//Mode based

            return this.state.mode === clause;
        } else if (!isEmpty(clause)) {//eval based ("attribute operation value")
            clause = clause.split(" ");
            let attribute = getSubValue(this.state.obj, "", clause[0]);
            if (!attribute) {//If prop doesnt exist
                return false
            }
            if (attribute.value) {
                attribute = attribute.value
            }
            return (eval(`${attribute} ${clause[1]} ${clause[2]}`));
        }
    }

    createCRUD = (mode) => {
        let crudOptions = [];


        //If readonly, user should only be able to close the page
        if (mode === "readonly") {
            crudOptions.push({
                label: "Close",
                colour: "#aaaaaa",
            });

            return crudOptions;
        }

        if (this.props.crudOptions) {//Custom CRUD options
            crudOptions = JSON.parse(JSON.stringify(this.props.crudOptions));


            //Custom based disabling
            for (let opt of crudOptions) {
                opt.disabled = this.isDisabled(opt.disabled)
            }

            //If assuming properties
            if (!this.props.noCRUDassume) {
                for (let opt of crudOptions) {//For every custom option
                    if (opt.label === "Create") {
                        opt.label = mode === "create" ? "Create" : "New";
                        opt.colour = COLOURS[0]
                    } else if (opt.label === "Save") {
                        opt.disabled = mode === "create"
                        opt.colour = COLOURS[1]
                    } else if (opt.label === "Close") {
                        opt.colour = "#aaaaaa"
                    } else if (opt.label === "Delete") {
                        opt.disabled = opt.disabled ? opt.disabled : mode === "create"//If doesnt already have a value, disable on create
                        opt.colour = "red"
                    }


                }
            }




        }
        else {//Default CRUD options

            //Is a create call possible?
            if ((this.props.createUrl && checkRoleAuth(this.props.moduleName, "IsNewEnabled")) || this.props.isAdmin) {
                crudOptions.push({
                    label: mode === "create" ? "Create" : "New",
                    colour: COLOURS[0]
                });


            }

            //Is a save call possible?
            if ((this.props.saveUrl && checkRoleAuth(this.props.moduleName, "IsUpdateEnabled")) || this.props.isAdmin) {
                crudOptions.push({
                    label: "Save",
                    disabled: mode === "create",//Can't save a non-DB object
                    colour: COLOURS[1]
                });
            }

            //Is create possible?
            if ((this.props.createUrl && checkRoleAuth(this.props.moduleName, "IsNewEnabled")) || this.props.isAdmin) {
                crudOptions.push({
                    label: "Save as new",
                    disabled: mode === "create",//Can't save a non-DB object
                    colour: COLOURS[1]
                });
            }


            //Is a delete call possible?
            if ((this.props.deleteUrl && checkRoleAuth(this.props.moduleName, "IsDeleteEnabled")) || this.props.isAdmin) {
                crudOptions.push({
                    label: "Delete",
                    disabled: mode === "create",//Cant delete a non-DB object
                    colour: "red"
                });
            }

            crudOptions.push({
                label: "Close",
                colour: "#aaaaaa",
            });
        }

        this.setState({
            crudOptions: crudOptions
        });
    }

    componentDidMount() {
        //Set module to readonly
        /*
        if (checkRoleAuth(this.props.moduleName, "IsReadOnly")) {
            this.setState({
                mode: "readonly"
            });
        }
        */

        if (this.props.mode !== "create") {
            //Fields need to be populated. If there is a provided url, use that to populate the fields. Otherwise just format the default object
            if (this.props.getUrl && this.props.getUrl !== "undefined") {
                this.GETobj();
            } else {
                this.formatFromAPI(JSON.parse(JSON.stringify(this.props.defaultObj)));
            }
        } else {
            this.formatFromAPI(JSON.parse(JSON.stringify(this.props.defaultObj)));
            this.populateSelOptions(this.props.defaultObj);
        }

        //If there are right fields
        if (this.props.format.length > 1) {

            //If the right fields are lower than the left fields then the left fields should grow to 100% width, otherwise they should be 65%
            if (document.getElementById(`rightFields${this.props.title}`).offsetTop > document.getElementById(`leftFields${this.props.title}`).offsetTop) {
                this.setState({
                    shrunkenPage: true,
                });
            }
        }

        this.createCRUD(this.state.mode);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.bump !== this.props.bump) {//Repopulate select options
            this.populateSelOptions(this.state.obj);
            if (!isEmpty(this.props.getUrl)) {
                this.GETobj();
            } else {
                this.formatFromAPI(JSON.parse(JSON.stringify(this.props.defaultObj)));
            }
        } else if (prevProps.defaultObj !== this.props.defaultObj) {//Change default object
            this.setState({
                obj: JSON.parse(JSON.stringify(this.props.defaultObj)),
            });
            ;
        } else if (prevProps.clearBump !== this.props.clearBump) {//Reset to default object
            this.setState({
                obj: JSON.parse(JSON.stringify(this.props.defaultObj)),
            });
        }
    }

    render() {
        const { obj, crudOptions } = this.state;
        const snacks = [
            {
                label: `Error: ${this.state.errMsg}`,
                colour: "red"
            },
            {
                label: `${this.props.title} Created`,
                colour: "green"
            },
            {
                label: `${this.props.title} Saved`,
                colour: "green"
            },
            {
                label: `${this.props.title} Deleted`,
                colour: "green"
            },
        ];

        let title = this.state.mode !== "create" ? "Edit " : "New "
        title += this.props.title


        const createField = (field, rightField) => {

            if (field.createHidden && this.state.mode === "create") {//Hide in create mode
                return (<LabelInput width={fieldWidth} type="empty" />);
            } else if (field.editHidden && this.state.mode !== "create") {//Hide in edit/readonly mode
                return (<LabelInput width={fieldWidth} type="empty" />);
            } else if (field.type && field.type === "image") {
                field.image = {
                    ...field.image,
                    ...{
                        props: {
                            ...field.image.props,
                            ...{
                                width: fieldWidth + 150
                            }
                        }
                    }
                };
                return (field.image);
            }

            let width = 0;
            if (field.width) {
                width = field.width;
            } else if (field.rightField) {
                if (field.type) {
                    width = fieldWidth;
                } else {
                    width = fieldWidth + 150;
                }
            } else {
                width = fieldWidth;
            }

            return (
                <LabelInput
                    name={field.name}
                    label={field.label}
                    value={getSubValue(obj, field)}
                    disabled={this.isDisabled(field.disabled)}
                    error={this.state.errMsg.includes(field.name)}
                    dontAutoComplete={field.dontAutoComplete}
                    variant="outlined"
                    required={field.required}
                    multiline={field.multiline}
                    lines={field.lines}
                    bold={field.type === "label"}

                    //If this is a right field but doesnt have a type then grow it
                    width={width}
                    hideLabel={field.hideLabel}
                    type={field.type}
                    shrink={field.shrink}
                    options={field.type === "select" ? field.options ? field.options : this.state.selOptions[field.name] : null}
                    /* If select {
                     *      if hardcoded options {
                     *          use the hardcoded options
                     *      }else{
                     *          use the options from the given API
                     *      }
                     * }else{
                     *      options are not given as they are not needed
                     * }
                    */
                    url={this.formatUrl(field)}//If the parameter comes from a field then use that fields value.
                    dataFormat={field.dataFormat}
                    multivalue={field.multivalue}
                    selByValue={field.selByValue}
                    radios={field.radios}
                    onChange={(val1, val2) => {
                        //val1 is usually the event but if its 'select' then val1 is selectedOption and val2 is event

                        if (field.type === "lookup") {//Lookup
                            this.handleLookup(field, val1);
                        } else if (field.type === "select") {//Select
                            this.handleSelect(val1, val2, field);
                        } else if (field.type === "check") {//Checkbox
                            this.handleCheck(val1);
                        } else if (field.type === "datetime") {//Datetime

                            this.handleDatetime(val1, field.name)
                        } else {//Normal typeable field
                            this.handleChange(val1);
                        }
                    }}
                />
            );
        }

        return (
            <article
                className="dialog"
                style={{
                    padding: this.props.dontPad ? 0 : "",
                }}
            >
                {/*Title*/}
                <p className="selfCenter largeTxt">{title}</p>

                {/*CRUD*/}
                {(!this.props.crudOptions || this.props.crudOptions.length > 0) &&
                    <section className="between">
                        <CRUD
                            options={crudOptions}
                            mode={this.state.mode}
                            onClick={(label) => {
                                if (this.props.crudOptions) {//If custom CRUD is used then just return a function call, otherwise assume default functions
                                    if (autoCRUD.includes(label)) {//If this label is auto managed
                                        this.handleCrud(label)
                                    } else {//Just return the label
                                        this.props.onCRUD(label);
                                    }
                                } else {
                                    this.handleCrud(label);
                                }
                            }}
                        />

                        {/*Audit*/}
                        {/*this.state.mode === "edit" &&
                            <Audit data={obj} />
                        */}
                    </section>
                }

                {/*Body*/}
                <section className="around wrap">
                    {/*Left rows*/}
                    <article
                        id={`leftFields${this.props.title}`}
                        style={{
                            //If there are right fields and they can fit side-by-side then shrink the left fields
                            width: this.state.shrunkenPage ? "100%" : this.props.format.length > 1 ? "65%" : "100%"
                        }}
                    >
                        {this.props.format[0].map(row => (
                            <div key={this.props.format[0].indexOf(row)}>
                                {row.length < 3 &&
                                    <section key={this.props.format[0].indexOf(row)} className="around">

                                        { /*If this is just a label for the next section of rows*/}
                                        {row[0].type === "label" &&
                                            <section
                                                className="around fullWidth"
                                                style={{
                                                    height: 40,
                                                    marginTop: "2%"
                                                }}
                                            >
                                                { /*Show the labe*/}
                                                <div key={row[0].label} >
                                                    {createField(row[0])}
                                                </div>

                                                { /*Extra div for padding purposes*/}
                                                <div key={row[0].label + row[0].label} >
                                                    {createField({ type: "empty" })}
                                                </div>
                                            </section>
                                        }
                                        {/*Field*/}
                                        {row[0].type !== "label" && row.map(field => (
                                            <div key={row.indexOf(field)}>
                                                {createField(field)}
                                            </div>
                                        ))}
                                    </section>
                                }
                                {row.length === 3 &&
                                    <section key={this.props.format[0].indexOf(row)} className="around">
                                        {/*First field*/}
                                        {createField(row[0])}

                                        <section className="between" style={styles.doubleFields} >
                                            {createField(row[1])}
                                            {createField(row[2])}
                                        </section>
                                    </section>
                                }
                            </div>
                        ))}
                    </article>

                    {/*Right fields*/}
                    {
                        this.props.format.length > 1 &&
                        <article id={`rightFields${this.props.title}`}>
                            {this.props.format[1].map(field => (
                                <div key={this.props.format[1].indexOf(field)} style={styles.rightField}>
                                    {createField(field, true)}
                                </div>
                            ))}
                        </article>
                    }
                </section>

                {/*Tab buttons*/}
                {this.props.tabs && this.state.mode !== "create" &&
                    <article>
                        <AppBar position="static" style={styles.appBar}>
                            <Tabs
                                className="between"
                                value={this.state.tab}
                                onChange={this.handleTab}
                                scrollButtons="auto"
                                variant="scrollable"
                                TabIndicatorProps={{
                                    style: styles.tabIndicator
                                }}
                            >
                                {this.props.tabs.map(tab => (
                                    <Tab key={this.props.tabs.indexOf(tab)} label={tab.name} />
                                ))}
                            </Tabs>
                        </AppBar>

                        {this.props.tabs.map(tab => (
                            <TabPanel
                                value={this.state.tab}
                                index={this.props.tabs.indexOf(tab)}
                                key={this.props.tabs.indexOf(tab)}

                            >
                                {{
                                    ...tab.component,
                                    ...{
                                        props: {
                                            ...tab.component.props,
                                            ...{
                                                isAdmin: this.props.isAdmin,
                                                moduleName: this.props.moduleName
                                            }
                                        }
                                    }
                                }}
                            </TabPanel>
                        ))}
                    </article>
                }

                {/*Feedback*/}
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
