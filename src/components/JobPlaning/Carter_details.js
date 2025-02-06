import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import { Tooltip } from "@mui/material";
import Nexgen_Alert from "../ReusableComponents_ESQ/Nexgen_Alert";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';




export default function Carter_details(props) {
  const [loading, setLoading] = useState(false);
  const [carterDetails, setCarterDetails] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    Code: props.customerCode || "",
    Description: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const {selectedRowEquipedCode}= props;


  


  // const { JobplanData } = props;
  const {selectedRowJobdata}=props;
  const {
    SorderNo = 0,
    CatlogCode = "",
    Uom = "",
    SupplierStore = "",
    TruckType = "",
    OperationType = "Q",
    CarterEquipCode = "",
    BoQty= 0
  } = selectedRowJobdata ?? {};


  const handleFilterChange = (column, value) => {
    let newValue = value;
    newValue = value.toUpperCase();
    // }
    setFilters({
      ...filters,
      [column]: newValue,
    });
  };


  useEffect(()=>{
    setSelectedRows([]) 
  },[selectedRowEquipedCode])
  useEffect(()=>{
    setSelectedRows([]) 
  },[])

  useEffect(() => {
    setSelectedRows([])
    const Token = localStorage.getItem("AccessToken");
    setLoading(true);
    // Fetch data from the API
    fetch(
      `${API_URL}jobplan/loadCarterDetail?sorderNo=${SorderNo}&operationType=${OperationType}&uom=${Uom}&catlogCode=${CatlogCode}&supplierStore=${SupplierStore}&truckType=${TruckType}&carterEquipCode=${CarterEquipCode}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload(true);

          throw new Error("Unauthorized access - 401");
        }
        
        return response.json();
      })
      .then((data) => {
        const datar = data.ResultSet;  
        setCarterDetails(datar)
        // setAlertType("info");
        // setAlertMessage(msg);
        // setShowAlert(true);
        // Assuming data is an array of objects like you provided
        //setCarterDetails(contacts);
        addEquipcodetoArray(datar)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setLoading(false);
      });
    

     


  }, [selectedRowJobdata]);

const addEquipcodetoArray=(carterDetails)=>{

  const equipCodesIndex = carterDetails
  .map((item, index) => (selectedRowEquipedCode?.includes(item?.EquipCode) ? index : null)) // Map to indices or null
  .filter((index) => index !== null); 
  console.log("equipCodesIndex",equipCodesIndex)
  setSelectedRows([...selectedRows, equipCodesIndex]);
}




  // const filteredData = carterDetails
  //   ? carterDetails.filter((row) => {
  //       const CodeMatch = row.Code.toUpperCase().includes(filters.Code);
  //       const DescriptionMatch = row.Description.toUpperCase().includes(
  //         filters.Description
  //       );

  //       return CodeMatch && DescriptionMatch;
  //     })
  //   : [];




   // https://testapi.essendonquarries.com.au/api/jobplan/loadCarterDetail?
   //sorderNo=0&operationType=Q&uom=&catlogCode=&supplierStore=&truckType=&carterEquipCode=



  // const handleRowCheck = (row) => {
  //   props.handleAssigndocktrowclick(row)

 
  // };

  const handleCheckboxClick = (index,item) => {


    // handleRowCheck(item,index)
  


    if (selectedRowJobdata.length === 0) {
      window.alert("Please select the quote");
      // toast.info(("Please select the quote"), {
      //   //position: "bottom-right",
      //   position: "top-right",
      //   autoClose: 1000, // Duration in milliseconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   pauseOnFocusLoss: true,
      //   theme:"colored",
      // });
      
      return;
    }
    if (selectedRows.includes(index)) {
      // Remove the row from the selected array if it's already selected
      setSelectedRows(selectedRows.filter((i) => i !== index));
      item.Check = false;     
      props.handleAssigndocktrowclick(item)
     
     
     // props.handleDeleteAssignedDockect()

    } else {
      if (selectedRowJobdata?.BoQty !=0) {
        setSelectedRows([...selectedRows, index]);
        item.Check = true;
        props.handleAssigndocktrowclick(item)
      } else if(selectedRowEquipedCode?.includes(item.EquipCode)){
        item.Check = false;       
        props.handleAssigndocktrowclick(item)
      }
      else{
        setAlertType("error");
        setAlertMessage("Can not Assign carter! Job is completed");
        setShowAlert(true);
      }
    }
  };

  const getHighlightColor = (highlightColor) => {
    switch (highlightColor) {
      case "PALE_GREEN":
        return "lightgreen"; // CSS color for PALE_GREEN
      case "YELLOW":
        return "yellow";  
        case "PALE_RED":
        return "lightcoral";    // CSS color for YELLOW
      // Add more cases as needed
      default:
        return "transparent"; // Default color if no match
    }
  };

  const  handleBulkAllocationbtnClick=(item)=>{
  props.handleBulkAllocationButtonClick("BulkAllocation",item);
  }



  return (
    // <CCard
    //   className="routehistoryGlass"
    //   style={{ width: "85vh", height: "70%", color: "white" }}
    // >
    //   <CCardHeader className="headerEQModal"> Customer Code lookup</CCardHeader>
    //   <CCardBody style={{ alignItems: "center" }}>
    // <div  style={{ justifyContent: "center" }}>
    <div className="dividercards">
       {showAlert && (
        <Nexgen_Alert
          AlertTitle={alertTitle}
          severity={alertType}
          AlertMessage={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="JObPlaningTables" style={{ width: "100%", overflowX: "auto" , maxWidth:"100%" , marginRight:"10px"}}>
        <table
          class="tableQt-ProductTable"
          style={{ marginTop: "10px", width: "100%" }}
        >
          <thead
             class="tableQt-ProductTable-grey-header"
            style={{
              position: "sticky",
              top: "0",
              fontSize: "11px",
              zIndex:"49"
            }}
          >
            <tr>
              <th
                colSpan="1"
                style={{
                  backgroundColor: "white",
                  //border: "2px solid white",
                }}
              ></th>
              {/* <th style={{ width: "35%" }}>
                <input
                  type="text"
                  placeholder="Customer Code"
                  value={filters.Code}
                  onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th> */}
              <th style={{ width: "35%" }}>
                <input
                  type="text"
                  placeholder="Equip Code"
                  value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th
                colSpan="4"
                style={{
                  backgroundColor: "white",
                  //border: "2px solid white",
                }}
              ></th>
            </tr>
            <tr  style={{
              
              top: "-1",
              
            }}>
        
              <th style={{ width: "10%" }}>Sel</th>
            
              
              <th style={{ width: "35%" }}>Cartor</th>
              <th style={{ width: "65%" }}>Location</th>
              <th style={{ width: "65%" }}>
                Opera <br></br> Type
              </th>
              <th style={{ width: "75%"}}>Type</th>
              <th style={{ width: "60%"}}>Options</th>
            </tr>
          </thead> 
          <tbody>
            {loading && (
              <tr>
                <td colSpan="2">
                  <LinearProgress style={{ width: "100%" }} />
                </td>
              </tr>
            )}
            {!loading &&
              (carterDetails?.length >0 ? (
                carterDetails.map((item, index) => (
                  <tr
                    key={index}
                   
                    // className={`siteThover-effect ${
                    //   selectedRowEquipedCode?.includes(item.EquipCode)
                    //     ? "doubleclicked_rows"
                    //     : selectedRows.includes(index)
                    //     ? "userselectedrows_job"
                    //     : ""
                    // }`}
                    className={`siteThover-effect ${
                      selectedRows?.includes(index)
                        ? "userselectedrows_job"
                        : ""
                       
                    }`}
                    
                    style={{
                      fontSize: "9px",
                      height: "5px",
                      marginBottom: "0px",
                      padding: "0px",
                      marginTop: "0px",
                     
                    }}
                  
                    //onClick={() => handleRowCheck(item,index)}
                  >
                    {/* {BoQty !=0 && */}
                    <td      
                        style={{
                          padding: "2px",
                          textAlign: "center",
                          // borderRight: "1px solid grey",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index) 
                            || 
                            selectedRowEquipedCode?.includes(item.EquipCode) // if checked then add that to selectedrow array
                            }
                            
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event when clicking the checkbox
                            handleCheckboxClick(index,item); // Trigger checkbox logic
                            
                          }} />
                      

                       
                      </td>  
{/* } */}
                      <td  
  //                     style={{
  // backgroundColor: selectedRowEquipedCode?.includes(item.EquipCode)
  //   ? "rgb(34, 35, 36)" // Background for rows in selectedRowEquipedCode
  //   : selectedRows.includes(index)
  //   ? "transparent" // Transparent background if the row is selected
  //   : getHighlightColor(item.HighlightColor) || "transparent", // Apply highlight color or fallback
  // position: "relative", // Keeps the row positioned relatively
  // cursor: "pointer", //
                    //  }}
                      style={{
                        backgroundColor: selectedRows.includes(index)
                          ? "transparent" // Background for rows in selectedRowEquipedCode
                          : getHighlightColor(item.HighlightColor) || "transparent",
                       
                        position: "relative", // Keeps the row positioned relatively
                        cursor: "pointer", //
                                            }}





                     
                       >
                      {item.EquipCode}</td>
                     <td>{item.Location}</td>

                     <td>{item.OperationType}</td>
                     <td style={{
                          padding: "2px",
                          textAlign: "center",
                          // borderRight: "1px solid grey",
                        }}>{item.Type}</td>      

<td style={{
                          padding: "2px",
                          textAlign: "center",
                          // borderRight: "1px solid grey",
                        }}>{
                          <Tooltip title="Bulk Allocation" arrow>
    <AssignmentReturnedIcon 
      fontSize="small"      // Smaller icon
      style={{ fontSize: "14px" }} // Fine-tuned size
      onClick={()=>handleBulkAllocationbtnClick(item)}
    />
  </Tooltip>
                          }</td> 

                        {/* <td>
                        <Tooltip title="Bulk Allocation">
                          <AssignmentReturnedIcon
                            className="deletebtn "
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer", // Add cursor style to make it look clickable
                              padding: "0", // Remove padding
                              outline: "none", // Remove outline
                              // width: "30px",
                              height: "15px",
                              marginLeft: "10px",
                              marginTop: "-2px",
                            }}
                            // onClick={() =>
                              
                            // }
                          />
                        </Tooltip>
                      </td> */}
                                
                    {/* <td>{item.Description}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No data available</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    //   </CCardBody>{" "}
    // </CCard>
  );
}
