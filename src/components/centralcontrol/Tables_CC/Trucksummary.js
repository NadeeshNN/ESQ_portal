import React, { Component } from "react";
import PeerTable2 from "src/generics/table/PeerTable2";
import { apiGetCall } from "src/generics/APIFunctions";
import { API_URL } from "src/components/util/config";

export default class Trucksummary extends Component {
  state = {
    onfieldtruck: [],
    jobOrderFilterValue: "",
    customerFilterValue: "",
    pageSize: 20,
  };
  componentDidMount = () => {
    this.fecthtruckData();
  };

  fecthtruckData = () => {
    const url = `${API_URL}centralcontol/trucksummary`;

    this.setState({
      onfieldtruck: [],
      // customersite:[]
    });

    const callback = (truck) => {
      this.setState({
        onfieldtruck: truck.ResultSet,
      });
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };
  handleJobOrderFilterChange = (event) => {
    this.setState({
      jobOrderFilterValue: event.target.value,
    });
  };

  handleCustomerFilterChange = (event) => {
    this.setState({
      customerFilterValue: event.target.value,
    });
  };

  formatValueDecimal = (e) => {
    let value = Number(e);
    return value.toFixed(2);
  };

  setPageSize = (newPageSize) => {
    this.setState({
      pageSize: newPageSize,
    });
  };
  render() {
    const { onfieldtruck, jobOrderFilterValue, customerFilterValue } =
      this.state;
    const filteredData = onfieldtruck
      ? onfieldtruck.filter((row) => {
          const jobOrderMatch = row.Sorder_no.toLowerCase().includes(
            jobOrderFilterValue.toLowerCase()
          );
          const customerMatch = row.CustomerCode.toLowerCase().includes(
            customerFilterValue.toLowerCase()
          );
          return jobOrderMatch && customerMatch;
        })
      : [];
    return (
      <div>
        <div
          style={{
            marginBottom: "5px",
            position: "foxed",
            float: "left",
            left: 0,
          }}
        >
          <input
            type="text"
            placeholder="JobOrder"
            value={jobOrderFilterValue}
            onChange={this.handleJobOrderFilterChange}
            style={{ width: "90px", fontSize: "11px" }}
          />
          <input
            type="text"
            placeholder="Customer"
            value={customerFilterValue}
            onChange={this.handleCustomerFilterChange}
            style={{ width: "80px", fontSize: "11px" }}
          />
        </div>
        <PeerTable2
          name="truck summary"
          data={filteredData}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.setPageSize}
          rowsPerPageOptions={[10, 20, 50, 75, 100]}
          rowHeight={27}
          headerHeight={32}
          sortIconStyle={{ color: "white" }}
          style={{ fontSize: "12px", width: "100%" }}
          componentsProps={{
            pagination: {
              sx: {
               
                "& .MuiSelect-select": {
                
                  transform: "translateY(20%)",
                },
                
              },
            },
          }}
          columns={[
            {
              field: "Sorder_no",
              headerName: "Job Order",
              sortable: true,
              width: 90,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
            },
            {
              field: "CustomerCode",
              headerName: "Customer",
              sortable: true,
              width: 80,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
              cellClassName: "trucksummary_customer",
              flexGrow: 1,
            },
            {
              field: "CustomerName",
              headerName: "Customer Name",
              sortable: true,
              width: 230,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
            },
            {
              field: "Catlog_code",
              headerName: "Material",
              sortable: true,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
              width: 90,
              align: "right",
            },
            {
              field: "CustomerSite",
              headerName: "Customer Site",
              sortable: true,
              width: 260,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
              wrapText: true,
            },
            {
              field: "DeliveredQty",
              headerName: "Delivered Qty",
              sortable: true,
              width: 110,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
              align: "right",
              valueGetter: (params) =>
                this.formatValueDecimal(`${params.row.DeliveredQty}`),
            },
            {
              field: "RemainingQty",
              headerName: "Remaining Qty",
              sortable: true,
              width: 110,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
              align: "right",
              valueGetter: (params) =>
                this.formatValueDecimal(`${params.row.RemainingQty}`),
            },
            {
              field: "RemainingLoad",
              headerName: "Remaining Load",
              sortable: true,
              width: 110,
              headerAlign: "center",
              headerClassName: "super-app-theme--header",
              align: "right",
              valueGetter: (params) =>
                this.formatValueDecimal(`${params.row.RemainingLoad}`),
            },
          ]}
        />
      </div>
    );
  }
}
