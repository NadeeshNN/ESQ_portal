/*
    Name
    -------------
    Harrison F    June 2022


    

    PROPS
    --------------
    url - if passing by url
    dataKey - if the data is within a child of the body, this is the name of the child
    data - if not using url
    bump
    columns - the format of the table

      
 */


import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";
import { apiGetCall } from "../APIFunctions";

const pageSize = 10;

export default class PeerTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageSize: pageSize,
    };
  }

  formatFromAPI = (da) => {
    for (let i in da) {
      //Store the id coming from the backend in the rowId column
      if (da[i].id) {
        da[i].rowId = da[i].id;
      }
      da[i].id = i;
    }

    this.setState({
      data: da,
    });
  };

  GETdata = () => {
    const url = this.props.url;
    this.setState({
      data: [],
    });

    const callback = (da) => {
      if (this.props.dataKey) {
        da = da[this.props.dataKey];
      }

      this.formatFromAPI(da);
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };

  componentDidMount() {
    if (this.props.data) {
      this.formatFromAPI(this.props.data);
    } else if (this.props.url) {
      this.GETdata();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bump !== this.props.bump) {
      if (this.props.url) {
        this.GETdata();
      }
    } else if (prevProps.data !== this.props.data) {
      this.formatFromAPI(this.props.data);
    }
  }
  setPageSize = (newPageSize) => {
    this.setState({
      pageSize: newPageSize,
    });
  };

  render() {
    return (
      <DataGrid
        experimentalFeatures={{ columnGrouping: true }}
        autoHeight
        rows={this.state.data}
        pageSize={this.state.pageSize}
        onPageSizeChange={this.setPageSize}
        //rowsPerPageOptions={[10, 20, 50, 75, 100]}
        sortIconStyle={{ color: "" }}
        // sortModel={[
        //   {
        //     field: "DriverCode",
        //     defalutsort: "acend", // set initial sort direction to descending
        //   },
        // ]}
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "#5e6974",
            color: "white",
            borderLeft: "1px solid",
          },
          " &  .MuiDataGrid-cell": {
            borderBottom: "1px solid ",
            borderLeft: "0.5px solid ",
            borderColor: "#abb8c3",
          },
          "& .super-app.positive": {
            backgroundColor: "rgba(157, 255, 118, 0.49)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.negative": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app--fontsmall": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "400",
            fontSize: "8",
          },
          "& .super-app--textalign": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "400",
            fontSize: "12",
            textAlign: "right",
          },
        }}
        disableColumnMenu
        onCellClick={this.props.onCellClick}
        {...this.props}
      />
    );
  }
}
