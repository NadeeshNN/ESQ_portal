/*
    SKELETON DETAILS PAGE
    -------------
    Harrison F    April 2021

    Default page for creating a details page with a details dialog.
    Will not work without altering to match requirements of the page
    

    PROPS
    --------------
      mode
      rowId
      onBump
      onClose
 */

import React, { Component } from 'react';
import { API_URL } from '../generics/Config';
import DetailsPage from '../generics/DetailsPage';
import TabPage from '../generics/TabPage';


export default class Name extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <DetailsPage
                title=""
                mode={this.props.mode}
                defaultObj={defaultObj}
                format={detailsFormat}
                getUrl={`${API_URL}`}
                createUrl={`${API_URL}`}
                saveUrl={`${API_URL}`}
                deleteUrl={`${API_URL}`}
                tabs={[
                    {
                        name: "Attributes",
                        component: <TabPage
                            title=""
                            getAllUrl={`${API_URL}`}
                            allDataFormat={ }
                            allPageSize={5}
                            defaultObj={ }
                            detailsFormat={ }
                            createUrl={`${API_URL}`}
                            saveUrl={`${API_URL}`}
                            deleteUrl={`${API_URL}`}
                        />

                    },
                ]}
                onBump={this.props.onBump}
                onClose={this.props.onClose}
            />
        );
    }
}

//Main
const detailsFormat = [
    //Left Columns
    [
        //Row
        [
            //Field
            {}
        ]
    ],
    //Right Columns
    [
        //Field
        {
        }
    ],
];
const defaultObj = {
};