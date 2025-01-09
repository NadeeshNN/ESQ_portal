import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
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
  const {selectedRowEquipedCode}= props;
  const { JobplanData } = props;
  const{selectedRowJobdata}=props;


  const handleFilterChange = (column, value) => {
    let newValue = value;
    newValue = value.toUpperCase();
    // }
    setFilters({
      ...filters,
      [column]: newValue,
    });
  };

  useEffect(() => {
    const Token = localStorage.getItem("AccessToken");
    setLoading(true);
    // Fetch data from the API
    fetch(
      `${API_URL}jobplan/loadCarterDetail?sorderNo=0&operationType=Q&uom=&catlogCode=&supplierStore=&truckType=&carterEquipCode=`,
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
        // Assuming data is an array of objects like you provided
        //setCarterDetails(contacts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setLoading(false);
      });
  }, []);

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



  const handleRowClick = (custCode) => {
    // Store the selected "Quote No" in session storage
    //sessionStorage.setItem("selectedCustCode", custCode);
    // if (props.onClose) {
    //   props.onClose();
    // }
  };

  const handleCheckboxClick = (index) => {
    console.log("INDEX",selectedRowJobdata!=="",selectedRowJobdata)
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
    } else {
      // Add the row to the selected array
      setSelectedRows([...selectedRows, index]);
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

  
  return (
    // <CCard
    //   className="routehistoryGlass"
    //   style={{ width: "85vh", height: "70%", color: "white" }}
    // >
    //   <CCardHeader className="headerEQModal"> Customer Code lookup</CCardHeader>
    //   <CCardBody style={{ alignItems: "center" }}>
    // <div  style={{ justifyContent: "center" }}>
    <div className="dividercards">
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
              <th style={{ width: "10%" }}>sel</th>
              <th style={{ width: "35%" }}>Cartor</th>
              <th style={{ width: "65%" }}>Location</th>
              <th style={{ width: "65%" }}>
                Opera <br></br> type
              </th>
              <th style={{ width: "75%"}}>Type</th>
              <th style={{ width: "200px"}}></th>
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
                   
                    className={`siteThover-effect ${
                      selectedRowEquipedCode?.includes(item.EquipCode)
                        ? "doubleclicked_rows"
                        : selectedRows.includes(index)
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
                    onClick={() => handleCheckboxClick(index)}
                  >
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
                            selectedRowEquipedCode?.includes(item.EquipCode)
                            }
                             // Sync checkbox state
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event when clicking the checkbox
                            handleCheckboxClick(index); // Trigger checkbox logic
                          }} />
                        {/* {item && item.Supplier_name && ( */}

                        {/* )} */}
                      </td>  
                      <td  style={{
  backgroundColor: selectedRowEquipedCode?.includes(item.EquipCode)
    ? "rgb(34, 35, 36)" // Background for rows in selectedRowEquipedCode
    : selectedRows.includes(index)
    ? "transparent" // Transparent background if the row is selected
    : getHighlightColor(item.HighlightColor) || "transparent", // Apply highlight color or fallback
  position: "relative", // Keeps the row positioned relatively
  cursor: "pointer", //
                      }}
                      //  onMouseEnter={(e) => {
                      //   e.currentTarget.style.backgroundColor = 'lightgray'; // Color on hover
                      // }}
                      // onMouseLeave={(e) => {
                      //   // Reset to selected color or original highlight color on hover out
                      //   e.currentTarget.style.backgroundColor =getHighlightColor(item.HighlightColor)
                      // }}
                       >
                      {item.EquipCode}</td>
                     <td>{item.Location}</td>

                     <td>{item.OperationType}</td>
                     <td style={{
                          padding: "2px",
                          textAlign: "center",
                          // borderRight: "1px solid grey",
                        }}>{item.Type}</td>      

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
