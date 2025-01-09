import React, { Component } from "react";
import PeerTable2 from "src/generics/table/PeerTable2";
import { apiGetCall } from "src/generics/APIFunctions";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CircularProgress } from "@mui/material";
import { API_URL } from "src/components/util/config";

export default class CheckListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkListDetails: [],
      DriverCode: [[this.props.DriverCode]],
      field: [[this.props.field]],
      isLoading: true,
    };
  }
  // fetch url begin
  componentDidMount = () => {
    this.fecthtruckData();
  };

  fecthtruckData = () => {
    this.setState({
      isLoading: true,
    });
    const url = `${API_URL}checklist/checklistdetails?driverCode=${this.props.DriverCode}&date=${this.props.field}`;
    this.setState({
      checkListDetails: [],
    });

    const callback = (checkList) => {
      this.setState({
        checkListDetails: checkList.ResultSet,
        isLoading: false,
      });
    };
    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };

  render() {
    return (
      <div>
        <CCard>
          <CCardHeader className="headerEQModal">
            Check List response - Driver Code: {this.state.DriverCode}| Date :{" "}
            {this.state.field}
          </CCardHeader>
          <CCardBody>
            {!this.state.isLoading ? (
              <PeerTable2
                name="CheckList Details"
                data={
                  this.state.checkListDetails == null
                    ? []
                    : this.state.checkListDetails
                }
                //  TableHead sx={{ display: "table-header-group" }}
                pageSize={10}
                rowHeight={38}
                headerHeight={39}
                field={this.props.field}
                DriverCode={this.props.DriverCode}
                columns={[
                  {
                    field: "Checklist_code",
                    headerName: "Checklist Code",
                    sortable: true,
                    width: 130,
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",
                  },
                  {
                    field: "Question",
                    headerName: "Description",
                    sortable: true,
                    width: 760,
                    overflow: "auto",
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",
                    cellClassName: "checklistQuestions",
                  },
                  {
                    field: "Response",
                    headerName: "Response",
                    sortable: true,
                    width: 100,
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",
                    valueGetter: (params) => {
                      this.state.Response = params.row.Response;
                      if (params.row.Response == "Y") {
                        return "Yes";
                      }
                      if (params.row.Response == "N") {
                        return "No";
                      }
                      if (params.row.Response == "N/A") {
                        return "N/A";
                      } else {
                        return "";
                      }
                    },
                  },
                  {
                    field: "Checklist_status",
                    headerName: "Status",
                    sortable: true,
                    width: 100,
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",

                    valueGetter: (params) => {
                      if (params.row.Answer_expected == params.row.Response) {
                        return "PASS";
                      } else {
                        return "FAILED";
                      }
                    },
                  },
                ]}
              />
            ) : (
              <CircularProgress />
            )}
          </CCardBody>
        </CCard>
      </div>
    );
  }
}
