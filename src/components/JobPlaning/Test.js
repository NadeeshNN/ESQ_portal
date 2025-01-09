import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { API_URL } from "src/components/util/config";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CRow, CCol } from "@coreui/react";
const rows = [
  {
    id: 1,
    customerDetails: "TOTAL CONSTRUCTION",
    timeRequired: "9/01/2024 12:00:00 AM",
    loadingTime: "2024-01-09T11:00:00+11:00",
    deliveryAddress: "594 GEELONG RD",
    suburb: "BROOKLYN",
    uom: "T",
    orderQty: 28,
    delQty: 42.84,
    balQty: -14.84,
    material: "20R3WM",
    quarry: "050",
    truckDescription: "TANDEM X 2",
    jobStatus: "T",
    truckType: "24TW",
    customerOrderNo: "BK1",
    wt: "No",
    orderDate: "2024-01-09T00:00:00+11:00",
  },
  // Add more rows here...
];

const columns = [
   // { field: "CustomerName", headerName: "Customer Details", width: 200 },
    { field: "CustomerName", headerName: "Customer Details", width: 220, renderCell: (params) => <div className="">{params.value}</div>},
    
    { field: "OrderTime", headerName: "Order Time", width: 130 , renderCell: (params) => {
      if (!params.value) return ""; // Handle empty or undefined values
      const datePart = params.value.substring(0, 10); // Extracts the date part: "09-01-2024"
      const timePart = params.value.substring(10); // Extracts the time part: "09:17"
      const hours = parseInt(timePart.split(":")[0], 10);
      const minutes = timePart.split(":")[1];
      const period = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12; // Converts 24-hour time to 12-hour time
      return `${datePart}. ${formattedHours}:${minutes} ${period}`;
    },},
    { field: "EndLoadingTime", headerName: "End Loading Time", width: 150 , renderCell: (params) => {
      const time = params.value?.split("T")[1]?.split("+")[0]; // Extracts the time portion
      return <div>{time}</div>;
    },},
    { field: "DeliveryAddress", headerName: "Delivery Address", width: 200 },
    { field: "City", headerName: "City", width: 150 },
    { field: "Uom", headerName: "UOM", width: 80 , noTextField: true},
    { field: "OrderQty", headerName: "Order Qty", width: 80 ,noTextField: true},
    { field: "DelQty", headerName: "Del Qty", width: 80 , noTextField: true},
    { field: "BoQty", headerName: "Bo Qty", width: 100 , noTextField: true},
    { field: "CatDescription", headerName: "Material", width: 150 },
    { field: "Postcode", headerName: "Postcode", width: 100 },
    { field: "TruckTypeDisplay", headerName: "Truck Type", width: 100 },
    { field: "Status", headerName: "Status", width: 80 },
    { field: "TruckAlloc", headerName: "Truck Allocation", width: 100 },
    { field: "CustOrderNo", headerName: "Customer Order No", width: 200 },
    { field: "WaitingFlg", headerName: "Waiting Flag", width: 100 },
    { field: "OrderDate", headerName: "Order Date", width: 100,  
      renderCell: (params) => {
      const date = params.value?.split("T")[0]; // Extracts the date portion
      return <div>{date}</div>;
    }, },
];



const TestTable = (props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({
    customerDetails: "",
    timeRequired: "",
    loadingTime: "",
    deliveryAddress: "",
    suburb: "",
    uom: "",
    orderQty: "",
    delQty: "",
    balQty: "",
    material: "",
    quarry: "",
    truckDescription: "",
    jobStatus: "",
    truckType: "",
    customerOrderNo: "",
    wt: "",
    orderDate: "",
  });
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [filtersjobPlan, setFiltersJobPlan] = useState({
    jobPlanFilter: {
      SorderNo: 0,
      JobName: "",
      CustName: "",
      CustOrderNo: "",
      CustDetails: "",
      DateRequired: "",
      DeliveryTime: "",
      DeliveryEndTime: "",
      CatlogCode: "",
      SupplierStore: "",
      DeliveryAddress: "",
      Suburb: "",
      TruckTypeDisplay: "",
      QuoteFlg: false,
    },
    regionFilter: { AllRegion: true,      
        NoRegion: false,
        EastRegion: false,
        WestRegion: false,
        SouthRegion: false,
        NorthRegion: false},
    dateFrom: "2023-01-08",
    dateTo: "2023-01-08",
    completedJobToggle: 0,
    HideCompletedJob: false,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [doubleClickedRow, setDoubleClickedRow] = useState(null); // Track double-clicked row
  const {handlejobplaningtableDoubleclick} = props;

 
  // const handleSelectionChange = (newSelection) => {
  //   // Update the selected rows state when selection changes
  //   setSelectedRows(newSelection);
  // };
  const handleRowDoubleClick = (val,val2,val3) => {
    handlejobplaningtableDoubleclick(val,val2)
    setDoubleClickedRow(val3.id); // Update the state with the double-clicked row ID
  };
 


  useEffect(() => {
    GetDatafromCustomerCode();
  }, []);

  const GetDatafromCustomerCode = () => {
    //setLoading(true);
    fetch(`${API_URL}jobplan/getJobplanDetail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtersjobPlan),
    })
      .then((res) => res.json())
      .then((data) => {
        const Data = data.ResultSet[0];
        const jobplanData = Data?.JobPlanDetailList;
        console.log("array",jobplanData);
        const jobplanDataWithId = jobplanData.map((item, index) => ({
            ...item,
            id: index + 1, // Add a unique id starting from 1
          }));
        setRows(jobplanDataWithId);
        setFilteredRows(jobplanDataWithId)
        //setProductTabledata(productTableData);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        //setLoading(false);
      });
  };
  const handleColumnFilterChange = (column, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [column]: value };
      return newFilters;
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = rows.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );

    setFilteredRows(filtered);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      setHeaderVisible(false); // Hide filter input when scrolling down
    } else {
      setHeaderVisible(true); // Show filter input when scrolling up
    }
  };

  const toggleHeaderEdit = () => {
    setIsEditingHeader(!isEditingHeader);
  };

  const handleInputChange = (column, value) => {
    handleColumnFilterChange(column, value);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const filtered = rows.filter((row) =>
      Object.keys(filters).every((key) =>
        row[key]?.toString().toLowerCase().includes(filters[key]?.toLowerCase())
      )
    );
    setFilteredRows(filtered);
  }, [filters]);

  const renderColumnHeaders = () => {
    return columns.map((col) => {
      return {
        ...col,
        renderHeader: () => {
          if (isEditingHeader) {
            return (
              <TextField
                id="filled-search"
                type="search"
                label={col.headerName}
                value={filters[col.field] || ""}
                onChange={(e) => handleInputChange(col.field, e.target.value)}
                fullWidth
                size="small"          
                      variant="filled"
                      
                      focused
                      sx={{
                        '& .MuiFilledInput-root': {
                         // backgroundColor: '#777474', // Optional: change background color of input
                          //color: 'white', // Set input text color to white
                        },
                        '& .MuiInputLabel-root': {
                         // color: 'white !important', // Set label text color to white
                        },
                        '& .MuiFilledInput-input': {
                         // color: 'white', // Set the input text color to white
                        },
                      }}
              />
             
            );
          }
          return <span>{col.headerName}</span>;
        },
      };
    });
  };

  const getRowClassName = (params) => {
    const jobColor = params.row.JobColor || "default";
    const isSelected = selectedRows.includes(params.row.id); // Assuming `id` is the unique identifier for each row
    return `highlight-row-${jobColor} ${isSelected ? 'userselectedrows_job' : ''}`;
  };
  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection); // Update selected rows
    if (doubleClickedRow && !newSelection.includes(doubleClickedRow)) {
      setDoubleClickedRow(null); // Reset double-clicked row if unselected
    }
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      {/* Global Search and Header Edit Button */}
      <div
        style={{
          transition: "top 0.3s", // Smooth transition for the header
          position: "sticky",
          top: headerVisible ? "0" : "-100px", // Slide out the filter input and header
          backgroundColor: "#fff", // Background color for header
          zIndex: 999,
          padding: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Global Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              style={{ marginBottom: "10px" }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleHeaderEdit}
            >
              {isEditingHeader ? "Apply Filter" : "Edit Header"}
            </Button>
          </Grid>
        </Grid> */}
      </div>

      <DataGrid
      onRowDoubleClick={(params) =>
        handleRowDoubleClick(params.row.SorderNo, params.row,params)
      }
      componentsProps={{
        toolbar: {
          sx: {
            backgroundColor: '#666868', // Change toolbar background color
            color: '#ffffff', // Change toolbar text color
            '& .MuiButtonBase-root': {
              color: '#ffffff', 
            },
          },
        },
      }}
     
      selectionModel={selectedRows}
     
      components={{ Toolbar: GridToolbar }}
        rows={filteredRows}
        //columns={renderColumnHeaders()} // Render dynamic headers with TextField for editing
        columns={columns.map((col) => ({
            ...col,
            renderHeader: () =>
                       
                  <TextField
                id="filled-search"
                type="search"
                // disabled={col.noTextField ? col.noTextField : false} 
                label={col.headerName}
                value={filters[col.field] || ""}
                onChange={(e) => handleInputChange(col.field, e.target.value)}
                fullWidth
                size="small"          
                      variant="filled"
                      // variant="standard"
                      focused
                      sx={{
                        minWidth: "150px", 
                        '& .MuiFilledInput-root': {
                          backgroundColor: '#fff', // Optional: change background color of input
                          color: 'black', // Set input text color to white
                        },
                        '& .MuiInputLabel-root': {
                          color: 'black !important', // Set label text color to white
                          fontWeight: "bold",
                          fontSize:"18px"

                        },
                        '& .MuiFilledInput-input': {
                          color: 'black', // Set the input text color to white
                        },
                      }}
              />
            
          }))}
        pageSize={30}
        rowsPerPageOptions={[10, 20, 50]}
        onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
        checkboxSelection
        // getRowClassName={getRowClassName} 
        getRowClassName={(params) => {
          // If the row is selected, apply the custom class
          // if (selectedRows.includes(params.id)) {
          //   return 'userselectedrows_job';
          // }
          if (params.id === doubleClickedRow) {
            return 'double-clicked-row'; // Apply class for double-clicked row
          }
          const jobColor = params.row.JobColor || "default";
          return `highlight-row-${jobColor}`;
        }}
        rowHeight={26} // Adjust row height
        headerHeight={60} // Adjust header height to fit input
        sx={{
          '& .MuiDataGrid-menuIcon': {
      display: 'none', // Specifically hides the three dots menu icon
    }, 
         '& .MuiDataGrid-columnHeader--sortable .MuiDataGrid-iconButtonContainer': {
      display: 'none', // Hides sorting icons
    },
    '& .double-clicked-row': {
          backgroundColor: '#ffa726', // Different style for double-clicked row
          color: 'black',
        },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
                overflow: "visible", // Prevent clipping of content
              },
          "& .MuiDataGrid-columnHeaders": {
           backgroundColor: "#ebedef", // Header background color
            color: "#ffffff", // Header text color
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold", // Optional: Make header titles bold
          },
          "& .MuiCheckbox-root": {
            color: "black !important", // Change checkbox color to black
            
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "black !important", // Change checked checkbox color to black
          },
          "& .MuiDataGrid-cell": {
            fontSize: "12px", // Set the font size of cell content
            fontWeight: "medium",
          },
          "& .MuiDataGrid-row": {
            fontSize: "12px", // Set the font size of row content
          },
         " & .MuiDataGrid-row.Mui-selected": {
          backgroundColor: "rgb(42, 77, 95) !important", /* Change to desired background color */
            color: "white", /* Set text color */
          },
          "& .MuiCheckbox-root.Mui-checked": {
          color: "white !important", // Change checked checkbox color
        },
          // Add row highlighting styles here
    "& .highlight-row-CYAN": {
        backgroundColor: "#A3DDF5",
      },
      "& .highlight-row-YELLOW": {
        backgroundColor: "yellow",
      },
      "& .highlight-row-PALE_RED": {
        backgroundColor: "lightcoral",
      },
      "& .highlight-row-default": {
        backgroundColor: "transparent",
      },
      // "& .userselectedrows_job": {
      //   backgroundColor: "#07708b",
      //   zIndex: 9999,
      //   color: "white",
      //   fontWeight: "500",
      //   cursor: "pointer",
      // },
     
    //   "& .MuiDataGrid-sortIcon": { 
    //     display: "none",
    //   },
        }}
      />

<CRow
        className="mb-0 mt-4 w-3/4"
        style={
          {
            // width: "60%",
          }
        }
      >
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                cursor: "pointer",
                height: "15px",
                backgroundColor: "#A8E6A1",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">NEW</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                cursor: "pointer",
                height: "15px",
                backgroundColor: "#F9E79F",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">IN PROGRESS</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                cursor: "pointer",
                backgroundColor: "#A3DDF5",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">FINISHED</h7>
          </div>
        </CCol>

        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                cursor: "pointer",
                backgroundColor: "#2E5EAA",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">URGENT</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                cursor: "pointer",
                backgroundColor: "#FBEAEA",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">TBC</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                backgroundColor: "#F5B7B1",
                cursor: "pointer",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">ON HOLD</h7>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default TestTable;
