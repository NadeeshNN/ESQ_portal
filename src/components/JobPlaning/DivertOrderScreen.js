import React from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import {
    createTheme,
    ThemeProvider,
    TextField,
    Box,
    Typography,
    Grid,
    Button,
  } from "@mui/material";

const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              height: "24px", // Smaller height for the input field
              fontSize: "12px", // Smaller font size
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px 8px", // Adjust padding for input
            },
            "& .MuiInputLabel-root": {
              fontSize: "10px", // Smaller font size for labels
              transform: "translate(12px, 6px) scale(1)", // Center the label at the top
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(12px, -6px) scale(0.85)", // Shift label to the right and top when shrunk
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // Default border color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // Black on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black", // Black when focused
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: "black", // Black color for the shrunk label
            },
            fontSize: "8px", // Smaller helper text font size
          },
        },
      },
    },
  });
export default function DivertOrderScreen(props) {
  const {divertTableData } = props;

  const dataArray = Array.isArray(divertTableData) ? divertTableData : Object.values(divertTableData);
  const divertOrderdata = [
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    {
      set: <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />,
      orderNo: "12345",
      jobName: "Job A",
      customerOrderNo: "67890",
      customerDetail: "John Doe",
      deliveryOn: "2025-01-20",
      timeRequired: "2 hours",
      loadingTime: "30 mins",
      material: "Concrete",
      catalogCode: "CAT001",
      quarry: "Quarry A",
      quarryCode: "QRY123",
      deliveryAddress: "123 street",
      addressTemp: "Temporary Address",
    },
    
    


    
    
  ];

  return (
    <CCard className="dividercards " style={{maxHeight:"770px", width:"155vh"}}>
      <CCardHeader className="headerEQModal">Divert Order Screen</CCardHeader>
      <CCardBody>
      <div className="row" style={{ margin: 0, minHeight:"320px", marginBottom:"10px" }}>
  <div 
  style={{
    maxHeight: "400px", // Set maximum height for vertical scrolling
    overflowY: "auto",  // Enable vertical scrolling
    overflowX: "auto",  // Enable horizontal scrolling
    width: "100%",      // Ensure the table fits within the container
    border: "1px solid #ddd", // Optional: Border for the scroll container
    maxHeight: "350px",  // Ensure the row doesn't exceed a certain height
    //overflowY: "auto" 
  }}
  >
    <table
       class="tableQt-ProductTable"
      style={{
        margin: 0,
        width: "100%",
        borderCollapse: "collapse",
        // height:"400px"
      }}
    >
      <thead
        className="tableQt-ProductTable-grey-header"
        style={{
          height: "3px",
          position: "sticky",
          top: "0",
          fontSize: "11px",
          // width: "1200px",
          backgroundColor: "#f4f4f4", // Light header background color
          fontWeight: "bold",
          zIndex:999
        }}
      >
        <tr>
          <th style={{ width: "40px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Sel</th>
          <th style={{ width: "60px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Order No</th>
          <th style={{ width: "70px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Job Name</th>
          <th style={{ width: "80px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Customer OrderNo</th>
          <th style={{ width: "60px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Customer Detail</th>
          <th style={{ width: "70px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Delivery On</th>
          <th style={{ width: "100px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Time Required</th>
          <th style={{ width: "60px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Loading Time</th>
          <th style={{ width: "60px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Material</th>
          <th style={{ width: "60px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Catalog Code</th>
          <th style={{ width: "50px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Quarry</th>
          <th style={{ width: "60px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Quarry Code</th>
          <th style={{ width: "60px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Delivery Address</th>
          <th style={{ width: "170px", border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Address Temp</th>
        </tr>
      </thead>
      <tbody 
       style={{
        height: "1px",
        position: "sticky",
        top: "0",
        fontSize: "10px",
        width: "1200px",
        backgroundColor: "#f4f4f4", // Light header background color
        fontWeight: "bold",
      }}
      >
        {dataArray?.map((row, index) => (
          <tr 
   
            key={index}
            style={{
              // height: "30px",
              backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff", // Alternating row colors
            }}
          >
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.Check}
              <input
                          type="checkbox"
                          checked={row?.Check} />
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.SorderNo}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.JobName}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.CustOrderNo}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.CustDetails}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.DeliveryTime}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.DeliveryEndTime}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.EndLoadingTime}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.CatlogCode}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.CatlogCode}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.SupplierCode}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.SupplierCode}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.DeliveryAddress}
            </td>
            <td style={{ border: "1px solid #ddd", textAlign: "center", padding: "0px" }}>
              {row.AddressTemp}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
</div>

        <div >
        <CRow
        className="mb-7 mt-3 w-3/4 bg-gray-100 p-1 rounded-md ml-1"
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

        <Box
  sx={{
    display: "flex", // Set flex display
    gap: "20px", // Add spacing between the two boxes
    //justifyContent: "space-between", // Space the boxes evenly
    flexWrap: "wrap", // Ensure proper wrapping on smaller screens
    marginBottom:"10px"
  }}
>
  {/* First Box */}
  <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: "4px",
            borderRadius: "10px",
            margin: "5px",
            padding: "10px",
            backgroundColor: "#f9f9f9", // Optional background
            width: "470px",
            border: "1px solid #ddd",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="600"
            fontSize="12px"
            sx={{ marginBottom: "7px" }}
          >
            Quarry Details
          </Typography>

          {/* Form Inputs */}
          <Grid container spacing={1}>
            {/* Address */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }} // Smaller label size
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }} // Smaller input text size
                //value={selectedRowJobdata?.AddressTemp}
              />
            </Grid>

            {/* City and State */}
            <Grid item xs={6}>
              <TextField
                label="City"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
                //value={selectedRowJobdata?.City}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
                //value={selectedRowJobdata?.State}
              />
            </Grid>

            {/* Contact and Phone */}
            <Grid item xs={6}>
              <TextField
                label="Contact"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
              />
            </Grid>
          
          </Grid>
        </Box>
        <Box
          sx={{
            marginTop: "4px",
            borderRadius: "10px",
            margin: "5px",
            padding: "10px",
            backgroundColor: "#f9f9f9", // Optional background
            width: "470px",
            border: "1px solid #ddd",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="600"
            fontSize="12px"
            sx={{ marginBottom: "7px" }}
          >
            Delivery Details
          </Typography>

          {/* Form Inputs */}
          <Grid container spacing={1}>
            {/* Address */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }} // Smaller label size
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }} // Smaller input text size
                //value={selectedRowJobdata?.AddressTemp}
              />
            </Grid>

            {/* City and State */}
            <Grid item xs={6}>
              <TextField
                label="City"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
                //value={selectedRowJobdata?.City}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
                //value={selectedRowJobdata?.State}
              />
            </Grid>

            {/* Contact and Phone */}
            <Grid item xs={6}>
              <TextField
                label="Contact"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
              />
            </Grid>
          
          </Grid>
        </Box>
        <Box display="flex" gap={1}  className="right-0 mt-24 ml-10">
      <Button
        variant="contained"
        size="small"
        startIcon={<DeleteIcon  />}
        sx={{
          backgroundColor: "#f8d7da",
          color: "#721c24",
          height: "32px",
          textTransform: "none",
          minWidth: "100px",
          "&:hover": {
            backgroundColor: "#f5c6cb",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px #c82333", // Darker red outline
          },
        }}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        size="small"
        startIcon={<DescriptionIcon />}
        sx={{
          backgroundColor: "#d4edda",
          color: "#155724",
          height: "32px",
          textTransform: "none",
          minWidth: "100px",
          "&:hover": {
            backgroundColor: "#c3e6cb",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px #1e7e34", // Darker green outline
          },
        }}
      >
        Select
      </Button>
    </Box>


      </ThemeProvider>






 
 
  
  {/* <div style={{ display: "grid",  gridTemplateRows: "auto auto auto", gap: "20px" }}>

  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className="legend-color-box"
        style={{
          width: "35px",
          cursor: "pointer",
          height: "15px",
          backgroundColor: "#A8E6A1",
          marginRight: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Hover effect
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      ></div>
      <h7 className="boxtext2 m-0 ml-0" style={{ fontWeight: "bold", color: "#333" }}>NEW</h7>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className="legend-color-box"
        style={{
          width: "35px",
          cursor: "pointer",
          height: "15px",
          backgroundColor: "#F9E79F",
          marginRight: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Hover effect
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      ></div>
      <h7 className="boxtext2 m-0 ml-0" style={{ fontWeight: "bold", color: "#333" }}>IN PROGRESS</h7>
    </div>
  </div>


  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className="legend-color-box"
        style={{
          width: "35px",
          cursor: "pointer",
          height: "15px",
          backgroundColor: "#A3DDF5",
          marginRight: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Hover effect
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      ></div>
      <h7 className="boxtext2 m-0 ml-0" style={{ fontWeight: "bold", color: "#333" }}>FINISHED</h7>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className="legend-color-box"
        style={{
          width: "35px",
          cursor: "pointer",
          height: "15px",
          backgroundColor: "#2E5EAA",
          marginRight: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Hover effect
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      ></div>
      <h7 className="boxtext2 m-0 ml-0" style={{ fontWeight: "bold", color: "#333" }}>URGENT</h7>
    </div>
  </div>


  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className="legend-color-box"
        style={{
          width: "35px",
          cursor: "pointer",
          height: "15px",
          backgroundColor: "#FBEAEA",
          marginRight: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Hover effect
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      ></div>
      <h7 className="boxtext2 m-0 ml-0" style={{ fontWeight: "bold", color: "#333" }}>TBC</h7>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className="legend-color-box"
        style={{
          width: "35px",
          cursor: "pointer",
          height: "15px",
          backgroundColor: "#F5B7B1",
          marginRight: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Hover effect
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      ></div>
      <h7 className="boxtext2 m-0 ml-0" style={{ fontWeight: "bold", color: "#333" }}>ON HOLD</h7>
    </div>
  </div>
</div> */}


</Box>


             

        </div>

              
     

      </CCardBody>
    </CCard>
  );
}