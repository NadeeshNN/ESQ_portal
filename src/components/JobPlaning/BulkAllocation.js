
import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";

const BulkAllocation = () => {
  const headers = [
    'Select',
    'Docket Status',
    'Truck Status',
    'Docket',
    'Manual Docket',
    'Quarry Docket No',
    'Quarry',
    'Carter Type',
    'New Truck Type',
    'Short Fee',
    'Driver Short Fee',
    'Carter',
    'Material Code',
    'Alloc Qty', // This header will be styled in red
    'Pickup Qty',
    'Delivered Qty',
    'Waiting Time',
    'Cust Order No',
    'Cartage Cost',
    'Distance',
    'Notes and Approx Time',
    'Send to Truck', // Hidden in UI, but still renders data
    'Send SMS', // Hidden in UI, but still renders data
    'SMS Count',
    'Additional Charge', // Displays button with label "Add"
    'Notify Customer',
    'Picked up Complete',
    'Delivery Docket Completion',
    'Remove Driver Short Fee',
    'Remove Short Fee',
    'Charge Return Fee'
  ];

  
  const checkboxColumns = [
    26, // Notify Customer
    27, // Picked up Complete
    28, // Delivery Docket Completion
    29, // Remove Driver Short Fee
    30, // Remove Short Fee
    31  // Charge Return Fee
  ];

  // Sample data - replace with actual data as needed
  const sampleData = [
    
    ['','Assigned', 'Allocated', '#12345', 'MD001', 'QD001', 'Quarry A', 'Type A', 'New', '$100', '$10',
     'Carter A', 'MC001', '10', '5', '5', '10','2 hours', 'CO001', '100 km', 'N/A', 'Yes', '.', '.',
     '3', 'Add', 'Yes', 'No', 'Yes', 'No', 'No', 'No', '$20'],
  
    // Add more rows as needed
  ];

  return (
    <CCard
      //className="routehistoryGlass"
      style={{   }}
    >
      <CCardHeader className="headerEQModal"> Bulk Allocation </CCardHeader>
      <CCardBody>
    <div className="row"  style={{ margin: 0, maxWidth:"800px", minWidth:"700px"  }}>
              <div className="col-8 col-lg-8 ">
    <div className="p-1 dividercards JobPlanningTables bg-white">
    <div className="custom-data-table-container"  style={{ width: "100%", overflowX: "auto" , maxWidth:"330px"}}>
      <table className="custom-data-table">
        <tbody className="custom-data-tbody" >
          {headers.map((header, headerIndex) => (
            <tr key={headerIndex}>
              <td className="custom-data-header"
               style={{ width:"120px",
               fontWeight: 'semi-bold', 
               textAlign: 'right', 
               height:"21px",
               minWidth:"120px" ,
             // position:"absolute",
              //backgroundColor: headerIndex === 21 || headerIndex === 22 ? 'rgb(117, 117, 117)' : 'rgb(117, 117, 117)',
                    // visibility: headerIndex === 21 || headerIndex === 22 ? 'visible' : 'visible'

              
               
               }}>
              {header}
                {/* {headerIndex === 21 || headerIndex === 22 ? '' : header}  */}
              
              </td>
              
              {sampleData.map((rowData, rowIndex) => (
                  <td key={rowIndex} className="custom-data-cell">
                    {headerIndex === 0 ? (
                      <input type="checkbox" style={{ textAlign: 'left', margin: "5px" }} />
                    ) : checkboxColumns.includes(headerIndex) ? (
                      <>
                        <span>{headerIndex <= 28 ? 'No' : 'Yes'}</span>
                        <input
                          type="checkbox"
                          checked={
                            (headerIndex > 28 && rowData[headerIndex] === 'Yes') ||
                            (headerIndex <= 28 && rowData[headerIndex] === 'No')
                          }
                          style={{ marginLeft: "5px" }}
                          readOnly
                        />
                      </>
                    ) : headerIndex === 21  ? (
                   
                        <button style={{ margin: "0px" }}>Send to Truck</button>
                       
                      
                    )
                    : headerIndex === 22  ? (
                   
                      <button style={{ margin: "0px" }}>Send SMS</button>
                     
                    
                  )
                    
                     : headerIndex === 24 ? (
                      <button style={{ margin: "0px" }}>Add</button>
                    ) : (
                      rowData[headerIndex] // Render normal data for other columns
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  <div className="col-4 col-lg-4 ">

    
  </div>
  </div>
  </CCardBody>{" "}
  </CCard>
  );
};

export default BulkAllocation;

