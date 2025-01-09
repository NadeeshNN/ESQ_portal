// import React from "react";

// export default function Job_meterialDetails() {
//   return <div>Job_meterialDetails</div>;
// }
import React from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState } from "react";
import { useEffect } from "react";
import {
  CInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@material-ui/core";

import Nexgen_Alert from "src/components/ReusableComponents_ESQ/Nexgen_Alert";

export default function Job_meterialDetails(props) {
  const [selectedProducttableData, setSelectedProducttableData] = useState([]);
  const [jobCostDetails, setJobCostDetails] = useState([]);
  const [supplierProductTableData, setSupplierProductTableData] = useState([]);
  // const [selectedOption, setSelectedOption] = useState("SERVICE");
  const [loading, setLoading] = useState(false);
  const [editedProductSell, setEditedProductSell] = useState("");
  const [editedProductProfit, setEditedProductProfit] = useState("");
  const [editedProductSellIndex, setEditedProductSellIndex] = useState(-1);
  const [editedProductProfitIndex, setEditedProductProfitIndex] = useState(-1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const { quoteno } = props;
  const { SupProductDetails } = props;
  const { joborderfetch } = props;
  const { QuoteNew } = props;
  const { MaterialListfromSorderNO } = props;
  const {setMaterialListfromSorderNO} = props;
  const { custCode } = props;
  const { rowdeleted } = props;
  const { PaymentDetails } = props;
  const { soderNo } = props;
  const { qouteclicked } = props;
  const { MaterialListQTNo } = props;
  const { paymentDetailsQTNo } = props;
  const { MaterialListJobOrderLink } = props;
  const { paymentDetailsJobOrderLink } = props;
  const { selectedOption } = props;

  useEffect(() => {
    //browse using qoutation
    setJobCostDetails(paymentDetailsJobOrderLink);
    setSelectedProducttableData(MaterialListJobOrderLink);
    console.log("test1", MaterialListJobOrderLink);
  }, [joborderfetch, paymentDetailsJobOrderLink, MaterialListJobOrderLink]);

  useEffect(() => {
    //browse using qoutation
    setJobCostDetails(paymentDetailsQTNo);
    setSelectedProducttableData(MaterialListQTNo);
    console.log("test2", MaterialListJobOrderLink);
  }, [MaterialListQTNo, paymentDetailsQTNo]);

  useEffect(() => {
    setJobCostDetails(PaymentDetails);
  }, [PaymentDetails]);

  useEffect(() => {
    if (QuoteNew === true) {
      // setSupplierProductTableData([]);
      // setSelectedProducttableData([]);
      setMaterialListfromSorderNO([])
    }
    console.log(quoteno);
    if (quoteno !== "" && qouteclicked !== true) {
      // getSelectedProducttableData();
      setSelectedProducttableData(MaterialListfromSorderNO)
    }
    // if (quoteno === 0 && qouteclicked !== true) {
    //   getSelectedProducttableData();
    // }
  }, [
    quoteno,
     props.QuoteNew
    ]);

  useEffect(() => {
    // Assuming SupProductDetails is an object

    if (SupProductDetails && QuoteNew === false) {
      setSupplierProductTableData(SupProductDetails);
    }
    const newItems = SupProductDetails;

    if (newItems && Array.isArray(selectedProducttableData)) {
      const shouldAddItems = newItems.filter((newItem) => {
        const itemExists = selectedProducttableData.some(
          (item) =>
            (item.Catalog_code === newItem.Catalog_code &&
              item.Truck_type === newItem.Truck_type) ||
            (item.Catalog_code === newItem.Catalog_code &&
              item.Truck_type === newItem.Truck_type)
        );

        if (itemExists) {
          setAlertType("warning");
          setAlertMessage("Item already exists!");
          setShowAlert(true);
          //window.alert("Item already exists!");
        }

        return !itemExists;
      });

      if (shouldAddItems.length > 0) {
        // If there are items to add, create a copy of selectedProducttableData and add them
        const updatedSelectedProducttableData = [
          ...selectedProducttableData,
          ...shouldAddItems,
        ];

        // Set the updated array as the new selectedProducttableData
        setSelectedProducttableData(updatedSelectedProducttableData);
        sessionStorage.setItem(
          "savemodelMaterialList_JobOrder",
          JSON.stringify(updatedSelectedProducttableData)
        );
      }
    } else {
      const updatedSelectedProducttableData = Array.isArray(
        selectedProducttableData
      )
        ? [...selectedProducttableData]
        : [];
      setSelectedProducttableData(updatedSelectedProducttableData);
      sessionStorage.setItem(
        "savemodelMaterialList_JobOrder",
        JSON.stringify(updatedSelectedProducttableData)
      );
    }
    getRerenderedTableData("N");
  }, [SupProductDetails]);

  const getRerenderedTableData = async (status, rowID, DataType) => {
    rowdeleted("deleting");
    const savedModelMaterialList = sessionStorage.getItem(
      "savemodelMaterialList_JobOrder"
    );
    let matetialList;

    try {
      matetialList = savedModelMaterialList
        ? JSON.parse(savedModelMaterialList)
        : [];
    } catch (error) {
      console.error("Error parsing JSON:", error);
      matetialList = []; // Handle the error by providing a default value
    }

    try {
      const indicesCount = Object.keys(matetialList).length;
      const lastArrayIndex =
        indicesCount > 0 ? Object.keys(matetialList)[indicesCount - 1] : null; // last array is the newly added one

      let dynamicIndex;

      if (status === "N") {
        dynamicIndex = lastArrayIndex;
        if (dynamicIndex === null) {
          dynamicIndex = -1;
        }
      } else if (status === "U") {
        dynamicIndex = rowID;
      } else {
        dynamicIndex = -1;
      }
      let opttype = localStorage.getItem("QouteGroup");
      // Set optType to selectedOption if available, otherwise use value from localStorage
      let optTypeToUse = selectedOption ? selectedOption : opttype;

      const response = await fetch(
        `${API_URL}joborder/recalproductinfo?rowid=${dynamicIndex}&status=${status}&datatype=${DataType}&custcode=${custCode}&prodgroup=${optTypeToUse}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matetialList),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //setSelectedProducttableData([]);
      const data = await response.json();
      const datar = data.ResultSet[0].MaterialList;
      const updatedDetails = data.ResultSet[0].JobCostDetail;
      setSelectedProducttableData(datar);
      sessionStorage.setItem(
        "savemodelMaterialList_JobOrder",
        JSON.stringify(datar)
      );
      setJobCostDetails(updatedDetails);
      sessionStorage.setItem("JobCostDetails", JSON.stringify(updatedDetails));
      rowdeleted("deleted");
      // Set calculatedData
      //setcalculatedData(datar);

      // Handle the click after setting the state
      //handleRowClick(datar, rowIndex);
    } catch (err) {
      console.error("Error in getCalculatedTableData:", err.message);
    } finally {
    }
  };
  const getSelectedProducttableData = () => {
    if (!soderNo) {
      return;
    }
    if (qouteclicked === true) {
      return;
    }

    // setSelectedProducttableData(SupProductData); // added 21/1
    // setLoading(true);

    const sorder_No = sessionStorage.getItem("selectedSorderNo");

    fetch(
      `${API_URL}joborder/getjoborder?sorderno=${sorder_No}&invoiceflg=false`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet[0];
        if (!datar) {
          setAlertType("warning");
          setAlertMessage("invalid Sorder NO");
          setShowAlert(true);
          //window.alert("invalid Sorder NO");
          // setLoading(false);
          return;
        }
        const TableData = datar.MaterialList;
        setSelectedProducttableData(TableData);
        sessionStorage.setItem(
          "savemodelMaterialList_JobOrder",
          JSON.stringify(TableData)
        );
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        // setLoading(false);
      });
  };

  const calculatesum = (val1, val2) => {
    const sum = val1 + val2;

    return sum.toFixed(2);
  };
  const cartagecostcal = (val1, val2) => {
    const Value = val1 * val2;
    return Value.toFixed(2);
  };
  const GrandExctcal = (val1, val2, val3) => {
    const Value = val1 * val2 + val3;
    return Value.toFixed(2);
  };
  const GrandCostcal = (val1, val2, val3, val4) => {
    // calculate grandcost total
    if (val4 === 1) {
      const Value = val1 * val2 + val3;
      return Value.toFixed(2);
    }

    //
  };

  const calProductProfit = (val1, val2, val3) => {
    const Value = val1 - (val2 + val3);
    return Value.toFixed(2);
  };

  const calProductProfitArraySelected = (val1, val2, val3) => {
    let Value;
    if (val1 !== 0) {
      Value = val1;
    } else if (val2 !== 0) {
      Value = (val3 * val2) / 100;
    }

    return Value;
  };

  const handleRowClick = (rowDetails, rowIndex) => {};

  const changeProductSell = (value, row, index) => {
    setEditedProductSell(value);
    setEditedProductSellIndex(index);

    const updatedData = [...selectedProducttableData];
    updatedData[index].Product_sell = value;
    setSelectedProducttableData(updatedData);
  };

  const changeProductProfit = (value, row, index) => {
    setEditedProductProfit(value);
    setEditedProductProfitIndex(index);

    const updatedData = [...selectedProducttableData];
    updatedData[index].Product_profit = value;
    setSelectedProducttableData(updatedData);
  };

  const deleteSelectedProducttableData = (
    trucktype,
    productCode,
    Supplier_store,
    supplierCode,
    item,
    index
  ) => {
    //setLoading(true);
    let sorderNo;

    const sorder_No = sessionStorage.getItem("selectedSorderNo");
    if (sorder_No === null || sorder_No === undefined || sorder_No === 0) {
      //sorderNo = 0;
      DeleteRowSessionStorage(item, index);
      setAlertType("success");
      setAlertMessage("selected product deleted successfully");
      setShowAlert(true);
      //window.alert("selected product deleted successfully.");
      return;
      // return;
    } else {
      sorderNo = sorder_No;
    }

    //http://localhost:8322/api/

    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(
      `${API_URL}joborder/deletejoborderproduct?sorderno=${sorderNo}&trucktype=${trucktype}&catlog_code=${productCode}&supplier_store=${Supplier_store}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const returnMsg = data.ReturnMessage[0];
        const returnCount = data.ReturnCount;
        console.log("returnCount", returnCount);
        if (returnCount > 0) {
          setAlertType("info");
          setAlertMessage(returnMsg);
          setShowAlert(true);
          //window.alert(returnMsg);
          // const confirmed = window.confirm(returnMsg);
          // if (!confirmed) {
          // User cancelled, no need to continue
          return;
          // }
        } else {
          console.log("DELTE data", data);
          DeleteRowSessionStorage(item, index);
          setAlertType("success");
          setAlertMessage("selected product deleted successfully.");
          setShowAlert(true);
          //window.alert("selected product deleted successfully.");
        }
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        //setLoading(false);
      });
  };

  const DeleteRowSessionStorage = (item, index) => {
    // Remove the row at the specified index from selectedProducttableData
    selectedProducttableData.splice(index, 1);

    // Reflect the deletion in the state
    setSelectedProducttableData([...selectedProducttableData]);

    // Remove the matching item from sessionStorage
    const storedSelectedSupplierProducts =
      JSON.parse(sessionStorage.getItem("selectedSupplierProduct_job")) || [];

    // Find the index of the item to be removed based on Catalog_code and Supplier_name
    const itemIndexToRemove = storedSelectedSupplierProducts.findIndex(
      (storedItem) =>
        storedItem.Catalog_code === item.Catalog_code &&
        storedItem.Supplier_name === item.Supplier_name
    );

    if (itemIndexToRemove !== -1) {
      // Remove the item from the array
      storedSelectedSupplierProducts.splice(itemIndexToRemove, 1);

      // Update sessionStorage
      sessionStorage.setItem(
        "selectedSupplierProduct_job",
        JSON.stringify(storedSelectedSupplierProducts)
      );
    }

    // Remove the matching item from savemodelSelectedProducts in sessionStorage
    const savedModelSelectedProducts =
      JSON.parse(sessionStorage.getItem("savemodelMaterialList_JobOrder")) ||
      [];

    const modelItemIndexToRemove = savedModelSelectedProducts.findIndex(
      (modelItem) =>
        modelItem.Catalog_code === item.Catalog_code &&
        modelItem.Supplier_name === item.Supplier_name
    );

    if (modelItemIndexToRemove !== -1) {
      // Remove the item from the array
      savedModelSelectedProducts.splice(modelItemIndexToRemove, 1);

      // Update sessionStorage
      sessionStorage.setItem(
        "savemodelMaterialList_JobOrder",
        JSON.stringify(savedModelSelectedProducts)
      );
    }

    getRerenderedTableData("N");
    if (selectedProducttableData.length === 0) {
      getRerenderedTableData("N");
      // If all rows are deleted, make jobcostdetails in session empty
      sessionStorage.setItem("JobCostDetails", JSON.stringify([]));
      setJobCostDetails("");
    }
  };

  const handleDeleteRow = (item, index) => {
    // if (item.Supplier_name) {
    DeleteRowSessionStorage(item, index);
  };
  const changeMaterialDetails = (e, value, row, index, column) => {
    const updatedData = [...selectedProducttableData];
    updatedData[index][column] = value;
    setSelectedProducttableData(updatedData);
    sessionStorage.setItem(
      "savemodelMaterialList_JobOrder",
      JSON.stringify(updatedData)
    );
  };
  const handleKeyPress = (e, value, row, index, column) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getRerenderedTableData("U", index, column);
    }
  };
  const handleCheckboxChange = (index) => {
    // Clone the array to avoid directly modifying the state
    const updatedArray = [...selectedProducttableData];

    // Invert the RecSelected value at the specified index
    updatedArray[index].RecSelected = !updatedArray[index].RecSelected;
    // Update the state with the modified array
    setSelectedProducttableData(updatedArray);
    sessionStorage.setItem(
      "savemodelMaterialList_JobOrder",
      JSON.stringify(updatedArray)
    );
  };

  const handleCheckAllChange = () => {
    const allChecked = selectedProducttableData.every(
      (product) => product.RecSelected
    );

    const updatedData = selectedProducttableData.map((product) => ({
      ...product,
      RecSelected: !allChecked,
    }));
    setSelectedProducttableData(updatedData);
    sessionStorage.setItem(
      "savemodelMaterialList_JobOrder",
      JSON.stringify(updatedData)
    );
  };

  return (
    <div className="dividercards">
      {showAlert && (
        <Nexgen_Alert
          AlertTitle={alertTitle}
          severity={alertType}
          AlertMessage={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div
        // className="QuotationNoTable"
        className="JB-SelectedProductTable"
        //style={{ overflowY: "auto", maxWidth: "100%", marginTop: "0%" }}
      >
        <h6
          style={{
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          Material Details
        </h6>
        <table class="tableQt-ProductTable">
          <thead
            class="tableQt-ProductTable-grey-header"
            style={{
              height: "3px",
              position: "sticky",
              top: "0",
              fontSize: "11px",
            }}
          >
            <tr>
              {/* <th style={{ width: "40px" }}>Sel</th> */}
              <th style={{ width: "40px" }}>Qty</th>
              <th style={{ width: "110px" }}>No Of Truck</th>
              <th style={{ width: "60px" }}>Truck Type</th>
              <th style={{ width: "80px" }}>Product Code</th>
              <th style={{ width: "150px" }}>Quarry No</th>
              <th style={{ width: "200px" }}>Quarry Name</th>
              <th style={{ width: "200px" }}>Description</th>
              <th style={{ width: "60px" }}>UOM</th>
              <th style={{ width: "80px" }}>Distance(Km)</th>
              <th style={{ width: "100px" }}>Current Product Cost($)</th>
              <th style={{ width: "100px" }}>Cartage Cost($)</th>
              <th style={{ width: "100px" }}>Total Cost Prod + Cartage($)</th>
              <th style={{ width: "40px" }}>Margin($)</th>
              <th style={{ width: "100px" }}>Unit Sell Price($)</th>
              <th style={{ width: "100px" }}>Short Load Qty</th>
              <th style={{ width: "100px" }}>Short Load Fee($)</th>
              {/* <th style={{ width: "100px" }}>Cartage Margin</th>
              <th style={{ width: "100px" }}>Cartage Sell</th> */}
              {/* <th style={{ width: "100px" }}>Cartage Cost Total</th> */}
              <th style={{ width: "180px" }}>Grand Total Qty Exc GST</th>
              <th style={{ width: "180px" }}>Grand Total Qty Cost inc GST</th>
              <th style={{ width: "30px" }}>
                <Tooltip title="check all">
                  <input
                    type="checkbox"
                    //className="marginR10"
                    onChange={() => handleCheckAllChange()}
                    checked={selectedProducttableData.every(
                      (index) => index.RecSelected
                    )}
                  />
                </Tooltip>
              </th>
              <th style={{ width: "50px" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="19">
                  <LinearProgress style={{ width: "100%" }} />
                </td>
              </tr>
            )}
            {!loading &&
              (selectedProducttableData?.length > 0 ? (
                selectedProducttableData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={`row2hover-effect ${
                        item && item.Supplier_name ? "userselectedrows" : ""
                      }`}
                      style={{
                        fontSize: "9px",
                        height: "5px",
                        marginBottom: "0px",
                        padding: "0px",
                        marginTop: "0px",
                      }}
                      onClick={() => handleRowClick(item, index)}
                    >
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        <input
                          className="cellcolor_yellow"
                          type="text"
                          style={{
                            width: "60px",
                            height: "15px",
                            textAlign: "right",
                          }}
                          value={
                            item && typeof item.Order_qty !== "undefined"
                              ? item.Order_qty
                              : ""
                          }
                          onKeyDown={(e) =>
                            handleKeyPress(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Order_qty"
                            )
                          }
                          onChange={(e) =>
                            changeMaterialDetails(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Order_qty"
                            )
                          }
                        />
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid grey",
                          // padding: "2px",
                          // textAlign: "right",
                        }}
                      >
                        {item && item.NoofTruck ? item.NoofTruck : ""}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        {item && item.Truck_type
                          ? item.Truck_type
                          : item.Truck_type}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          borderRight: "1px solid grey",
                        }}
                      >
                        {item && item.Catalog_code
                          ? item.Catalog_code
                          : item.Catlog_code}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          borderRight: "1px solid grey",
                        }}
                      >
                        {item && item.Supplier_store ? item.Supplier_store : ""}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          borderRight: "1px solid grey",
                        }}
                      >
                        {item && item.Supplier_name
                          ? item.Supplier_name.slice(0, 15)
                          : item && item.Name
                          ? item.Name.slice(0, 15)
                          : ""}
                      </td>
                      <td>
                        {item && item.Catalog_desc
                          ? item.Catalog_desc.slice(0, 15)
                          : item && item.Catlog_desc
                          ? item.Catlog_desc.slice(0, 15)
                          : ""}
                      </td>
                      <td>{item && item.Uom ? item.Uom : ""}</td>
                      <td
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        <input
                          className="cellcolor_transparent"
                          type="text"
                          // disabled = item.Truck_type != ""
                          style={{
                            width: "80px",
                            height: "15px",
                            textAlign: "right",
                            // paddingRight: "5px",
                          }}
                          value={
                            item
                              ? item.Distance_meters.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""
                          }
                          onKeyDown={(e) =>
                            handleKeyPress(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Distance_meters"
                            )
                          }
                          onChange={(e) =>
                            changeMaterialDetails(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Distance_meters"
                            )
                          }
                        />
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid grey",
                          textAlign: "right",
                          padding: "2px",
                        }}
                      >
                        {item && item.Product_cost
                          ? item.Product_cost.toFixed(2)
                          : ".00"}
                      </td>
                      <td
                        //className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          textAlign: "right",
                          padding: "2px",
                        }}
                      >
                        {item && item.Cartage_cost
                          ? item.Cartage_cost.toFixed(2)
                          : ".00"}
                      </td>
                      <td
                        //className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          textAlign: "right",
                          padding: "2px",
                        }}
                      >
                        {item && item.Cartage_cost && item.Product_cost
                          ? calculatesum(item.Cartage_cost, item.Product_cost)
                          : ".00"}
                        {}
                      </td>
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        <input
                          className="cellcolor_yellow"
                          type="text"
                          style={{
                            width: "70px",
                            height: "15px",
                            textAlign: "right",
                          }}
                          value={
                            item
                              ? // && item.Product_profit
                                item.Product_profit.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""
                          }
                          onKeyDown={(e) =>
                            handleKeyPress(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Product_profit"
                            )
                          }
                          onChange={(e) =>
                            changeMaterialDetails(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Product_profit"
                            )
                          }
                        />
                      </td>
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        <input
                          className="cellcolor_yellow"
                          type="text"
                          style={{
                            width: "90px",
                            height: "15px",
                            textAlign: "right",
                          }}
                          value={
                            item
                              ? //&& item.Product_sell
                                item.Product_sell.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""
                          }
                          onKeyDown={(e) =>
                            handleKeyPress(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Product_sell"
                            )
                          }
                          onChange={(e) =>
                            changeMaterialDetails(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Product_sell"
                            )
                          }
                        />
                      </td>
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        <input
                          className="cellcolor_yellow"
                          type="text"
                          style={{
                            width: "90px",
                            height: "15px",
                            textAlign: "right",
                          }}
                          value={
                            item
                              ? item.Short_qty.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""
                          }
                          onKeyDown={(e) =>
                            handleKeyPress(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Short_qty"
                            )
                          }
                          onChange={(e) =>
                            changeMaterialDetails(
                              e,
                              e.target.value,
                              item,
                              index,
                              "Short_qty"
                            )
                          }
                        />
                      </td>
                      <td
                        //className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        {item && item.Short_fee
                          ? item.Short_fee.toFixed(2)
                          : ".00"}
                      </td>

                      <td
                        //className="cellcolor_yellow"
                        style={{
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        {item && item.Rate ? item.Rate.toFixed(2) : ".00"}
                      </td>
                      <td
                        style={{
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        {item && item.Price ? item.Price.toFixed(2) : ".00"}
                      </td>
                      <td
                        style={{
                          padding: "2px",
                          textAlign: "center",
                          borderRight: "1px solid grey",
                        }}
                      >
                        <input
                          type="checkbox"
                          // id={`rowCheckbox${index}`}
                          checked={item.RecSelected}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                      <td>
                        {/* {item && item.Supplier_name && ( */}
                        <Tooltip title="Remove">
                          <DeleteIcon
                            className="deletebtn "
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer", // Add cursor style to make it look clickable
                              padding: "0", // Remove padding
                              outline: "none", // Remove outline
                              // width: "30px",
                              height: "15px",
                              // marginLeft: "20px",
                              marginTop: "-2px",
                            }}
                            onClick={
                              () =>
                                deleteSelectedProducttableData(
                                  item.Truck_type,
                                  item.Catalog_code,
                                  item.Supplier_store,
                                  item.Supplier_code,
                                  item,
                                  index
                                )
                              // DeleteRowSessionStorage(item, index)
                              //handleDeleteRow(item, index)
                            }
                          />
                        </Tooltip>
                        {/* )} */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="19">No data available</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div class="column">
        <div
          style={{
            width: "20%",
            marginLeft: "80%",
            top: 240,
            marginTop: "30px",
          }}
        >
          <div className="inputdiv">
            <CInputGroup>
              <CInputGroupText className="small-input-text">
                Order Total:
              </CInputGroupText>
              <CInput
                type="text"
                size="sm"
                style={{ textAlign: "right" }}
                className=" inputtextdark textalignR"
                value={
                  jobCostDetails && jobCostDetails.Order_total
                    ? "$ " + jobCostDetails.Order_total.toFixed(2)
                    : "$ " + 0.0
                }
                // value={productTabledata.Site_address2}
                // onChange={(e) =>
                //   handleFieldChange("Site_address2", e.target.value)
                // }
              />
            </CInputGroup>
          </div>
          <div className="inputdiv">
            <CInputGroup>
              <CInputGroupText className="small-input-text">
                Current Debt:
              </CInputGroupText>
              <CInput
                type="text"
                size="sm"
                style={{ textAlign: "right" }}
                className=" inputtextdark textalignR"
                value={
                  jobCostDetails && jobCostDetails.Current_debt
                    ? "$ " + jobCostDetails.Current_debt.toFixed(2)
                    : "$ " + 0.0
                }
                // value={productTabledata.Site_address2}
                // onChange={(e) =>
                //   handleFieldChange("Site_address2", e.target.value)
                // }
              />
            </CInputGroup>
          </div>
          <div className="inputdiv">
            <CInputGroup>
              <CInputGroupText className="small-input-text">
                Remaining Credit:
              </CInputGroupText>
              <CInput
                type="text"
                size="sm"
                //className="textalignR"
                style={{ textAlign: "right" }}
                className="inputtextdark textalignR"
                value={
                  jobCostDetails &&
                  jobCostDetails.Remain_credit_ent !== "UNLIMITED"
                    ? "$ " + jobCostDetails.Remain_credit_ent
                    : jobCostDetails &&
                      jobCostDetails.Remain_credit_ent === "UNLIMITED"
                    ? "UNLIMITED"
                    : "$ " + 0
                }
              />
            </CInputGroup>
          </div>
          <label className="colorGreen weight500">
            <input type="checkbox" className=" marginL20 marginR5 " />
            Uninvoiced Incl
          </label>
        </div>
      </div>
    </div>
  );
}
