import React from "react";
import { API_URL } from "src/components/util/config";
import { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@material-ui/core";
import Nexgen_Alert from "../ReusableComponents_ESQ/Nexgen_Alert";

export default function CG_Orders(props) {
  const [selectedProducttableData, setSelectedProducttableData] = useState([]);
  const [supplierProductTableData, setSupplierProductTableData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("SERVICE");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [isSortIconVisible, setSortIconVisibility] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const { quoteno } = props;
  const { SupProductDetails } = props;
  const { QuoteNew } = props;
  const { fetchQuote } = props;
  const { custCode } = props;

  useEffect(() => {
    console.log("SupProductDetails", SupProductDetails);
    if (QuoteNew === true) {
      setSupplierProductTableData([]);
      setSelectedProducttableData([]);
    }
    if (fetchQuote === true) {
      getSelectedProducttableData();
    }
  }, [fetchQuote, props.QuoteNew]);

  useEffect(() => {
    // Assuming SupProductDetails is an object
    console.log("new checking rows", SupProductDetails);

    if (SupProductDetails && QuoteNew === false) {
      setSupplierProductTableData(SupProductDetails);
    }
    const newItems = SupProductDetails;
    console.log("supplierProductTableData132", supplierProductTableData);
    if (newItems && Array.isArray(selectedProducttableData)) {
      const shouldAddItems = newItems.filter((newItem) => {
        const itemExists = selectedProducttableData.some(
          (item) =>
            (item.Catalog_code === newItem.Catlog_code &&
              item.Truck_type === newItem.Truck_type) ||
            (item.Catlog_code === newItem.Catlog_code &&
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
      console.log("shouldAddItems", shouldAddItems);

      if (shouldAddItems.length > 0) {
        // If there are items to add, create a copy of selectedProducttableData and add them
        const updatedSelectedProducttableData = [
          ...selectedProducttableData,
          ...shouldAddItems,
        ];
        console.log(
          "updatedSelectedProducttableData",
          updatedSelectedProducttableData
        );

        // Set the updated array as the new selectedProducttableData
        setSelectedProducttableData(updatedSelectedProducttableData);
        sessionStorage.setItem(
          "savemodelSelectedProducts",
          JSON.stringify(updatedSelectedProducttableData)
        );
      }
    } else {
      const updatedSelectedProducttableData = [...selectedProducttableData];
      setSelectedProducttableData(updatedSelectedProducttableData);
      sessionStorage.setItem(
        "savemodelSelectedProducts",
        JSON.stringify(updatedSelectedProducttableData)
      );
    }
  }, [SupProductDetails]);

  const getSelectedProducttableData = () => {
    setLoading(true);
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(`${API_URL}quotation/getquotedetails?quoteno=${quoteno}`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        const msg = data.ReturnMessage;
        const msg1 = data.ReturnMessage[0] || "";
        const msg2 = data.ReturnMessage[1] || "";
        if (msg1 !== "") {
          setAlertType("info");
          setAlertMessage(msg1);
          setShowAlert(true);
          // window.alert(msg1);
        }
        if (msg2 !== "") {
          setAlertType("info");
          setAlertMessage(msg2);
          setShowAlert(true);
          //window.alert(msg2);
        }

        setSelectedProducttableData(datar);
        sessionStorage.setItem(
          "savemodelSelectedProducts",
          JSON.stringify(datar)
        );
        localStorage.setItem(
          "savemodelSelectedProducts_N",
          JSON.stringify(datar)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
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
  const GrandExctcal = (Product_sell, Quote_qty, Short_fee) => {
    const Value = Product_sell * Quote_qty + Short_fee;
    return Value.toFixed(2);
  };
  const GrandCostcal = (
    gstoveride,
    rate,
    Product_sell,
    Quote_qty,
    Short_fee
  ) => {
    // calculate grandcost total
    if (gstoveride === 1) {
      const Rate = Product_sell * Quote_qty + Short_fee;
      const Value = Rate + Rate / 10;
      return Value.toFixed(2);
    } else {
      const Value = rate;
      return Value.toFixed(2);
    }

    //
  };

  const calProductProfit = (Product_sell, Product_tot, val3) => {
    const Value = Product_sell - Product_tot;
    // 30- 20          60-20,
    // 10             ----> 40
    // setMargin(Value);
    return Value.toFixed(2);
  };

  const calProductProfitArraySelected = (val1, val2, val3) => {
    let Value;
    if (val1 !== 0) {
      Value = val1;
    } else if (val2 !==0) {
      Value = (val3 * val2) / 100;
    }

    return Value;
  };

  // radio button
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleRowClick = (rowDetails, rowIndex) => {
    // setClickedRowIndex(rowIndex);
    // setisDoubleClicked(true);
    // setTimeout(() => {
    //   // Store the selected "Quote No" in session storage
    //   sessionStorage.setItem(
    //     "selectedSupplierProduct",
    //     JSON.stringify(rowDetails)
    //   );
    //   setisDoubleClicked(false);
    // }, 500);
    // setisDoubleClicked(false);
  };
  // const [editedProductSell, setEditedProductSell] = useState("");
  // const [editedProductProfit, setEditedProductProfit] = useState("")





  // const handleDeleteRow = (item, index) => {
  //   const updatedData = [...selectedProducttableData];
  //   updatedData.splice(index, 1); // Remove the row at the specified index
  //   setSelectedProducttableData(updatedData);
  // };
  // const deleteSelectedProducttableData = (
  //   trucktype,
  //   productCode,
  //   supplierCode,
  //   item,
  //   index
  // ) => {
  //   setLoading(true);
  //   //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
  //   fetch(
  //     `${API_URL}quotation/deletequoteproduct?quoteno=${quoteno}&trucktype=${trucktype}&permision=false&catlog_code=${productCode}&supplier_code=&supplier_store=${supplierCode}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const datar = data.ResultSet;
  //       DeleteRowSessionStorage(item, index);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       setLoading(false);
  //     });
  // };
  const deleteSelectedProducttableData = async (
    trucktype,
    productCode,
    Supplier_store,
    Supplier_code,
    item,
    index
  ) => {
    try {
      console.log("data0", quoteno, trucktype, productCode, Supplier_store);
      const response = await fetch(
        `${API_URL}quotation/deletequoteproduct?quoteno=${quoteno}&trucktype=${trucktype}&permision=false&catlog_code=${productCode}&supplier_code=${Supplier_code}&supplier_store=${Supplier_store}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const returnMsg = data.ReturnMessage[0];
      if (data.ReturnCount === 0) {
        const confirmed = window.confirm(returnMsg);
        if (!confirmed) {
          console.log("hi1");
          // User cancelled, no need to continue
          return;
        } else {
          const response = await fetch(
            `${API_URL}quotation/deletequoteproduct?quoteno=${quoteno}&trucktype=${trucktype}&permision=true&catlog_code=${productCode}&supplier_code=${Supplier_code}&supplier_store=${Supplier_store}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          console.log("newtest");
          DeleteRowSessionStorage(item, index);
        }

        // Make the URL call here after state updates

        // Handle the response as needed
      } else {
        setAlertType("error");
        setAlertMessage(returnMsg);
        setShowAlert(true);
        //window.alert(returnMsg);
        // Handle API response when ReturnStatus is false
      }
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const DeleteRowSessionStorage = (item, index) => {
    // Remove the row at the specified index from selectedProducttableData
    selectedProducttableData.splice(index, 1);

    // Reflect the deletion in the state
    setSelectedProducttableData([...selectedProducttableData]);
    setAlertType("success");
    setAlertMessage("selected product  deleted successfully");
    setShowAlert(true);
    //window.alert("selected product  deleted successfully.");
    // Remove the matching item from sessionStorage
    const storedSelectedSupplierProducts =
      JSON.parse(sessionStorage.getItem("selectedSupplierProduct")) || [];
    console.log(
      "itemIndexToRemove1",
      itemIndexToRemove,
      storedSelectedSupplierProducts
    );
    // Find the index of the item to be removed based on Catalog_code and Supplier_name
    const itemIndexToRemove = storedSelectedSupplierProducts.findIndex(
      (storedItem) =>
        storedItem.Catlog_code === item.Catlog_code &&
        storedItem.Name === item.Name
    );

    if (itemIndexToRemove !== -1) {
      // Remove the item from the array
      storedSelectedSupplierProducts.splice(itemIndexToRemove, 1);

      // Update sessionStorage
      sessionStorage.setItem(
        "selectedSupplierProduct",
        JSON.stringify(storedSelectedSupplierProducts)
      );
    }

    // Remove the matching item from savemodelSelectedProducts in sessionStorage
    const savedModelSelectedProducts =
      JSON.parse(sessionStorage.getItem("savemodelSelectedProducts")) || [];
    console.log(
      "itemIndexToRemove2",
      modelItemIndexToRemove,
      savedModelSelectedProducts
    );
    const modelItemIndexToRemove = savedModelSelectedProducts.findIndex(
      (modelItem) =>
        modelItem.Catlog_code === item.Catlog_code &&
        modelItem.Name === item.Name
    );

    if (modelItemIndexToRemove !== -1) {
      // Remove the item from the array
      savedModelSelectedProducts.splice(modelItemIndexToRemove, 1);

      // Update sessionStorage
      sessionStorage.setItem(
        "savemodelSelectedProducts",
        JSON.stringify(savedModelSelectedProducts)
      );
      localStorage.setItem(
        "savemodelSelectedProducts_N",
        JSON.stringify(savedModelSelectedProducts)
      );
      console.log("newtest");
    }

    // getRerenderedTableData("N");
    // if (selectedProducttableData.length === 0) {
    //   getRerenderedTableData("N");
    //   // If all rows are deleted, make jobcostdetails in session empty
    //   sessionStorage.setItem("JobCostDetails", JSON.stringify([]));
    //   setJobCostDetails("");
    // }
  };
  // const DeleteRowSessionStorage = (item, index) => {
  //   console.log("hi3");
  //   const updatedData = [...selectedProducttableData];
  //   const deletedItem = updatedData.splice(index, 1); // Remove the row at the specified index and store the deleted item

  //   // Remove the matching item from sessionStorage
  //   const storedSelectedSupplierProducts =
  //     JSON.parse(sessionStorage.getItem("selectedSupplierProduct")) || [];

  //   const savedModelSelectedProducts =
  //     JSON.parse(sessionStorage.getItem("savemodelSelectedProducts")) || [];

  //   if ((storedSelectedSupplierProducts = [])) {
  //     const modelItemIndexToRemove = savedModelSelectedProducts.findIndex(
  //       (modelItem) =>
  //         modelItem.Catlog_code === item.Catlog_code &&
  //         modelItem.Name === item.Name
  //     );

  //     if (modelItemIndexToRemove !== -1) {
  //       // Remove the item from the array
  //       savedModelSelectedProducts.splice(modelItemIndexToRemove, 1);

  //       // Update sessionStorage
  //       sessionStorage.setItem(
  //         "savemodelSelectedProducts",
  //         JSON.stringify(savedModelSelectedProducts)
  //       );
  //     }
  //   } else {
  //     const itemIndexToRemove = storedSelectedSupplierProducts.findIndex(
  //       (storedItem) =>
  //         storedItem.Catlog_code === item.Catlog_code &&
  //         storedItem.Name === item.Name
  //     );

  //     if (itemIndexToRemove !== -1) {
  //       storedSelectedSupplierProducts.splice(itemIndexToRemove, 1); // Remove the item from the array
  //       sessionStorage.setItem(
  //         "selectedSupplierProduct",
  //         JSON.stringify(storedSelectedSupplierProducts)
  //       ); // Update sessionStorage
  //     }
  //   }
  //   // Find the index of the item to be removed based on Catalog_code and Supplier_name

  //   // Remove the matching item from savemodelSelectedProducts in sessionStorage

  //   setSelectedProducttableData(updatedData);
  // };
  const handleDeleteRow = (item, index) => {
    if (item.Supplier_name) {
      DeleteRowSessionStorage(item, index);
    } else {
      deleteSelectedProducttableData(
        item.Truck_type,
        item.Catlog_code,
        item.Supplier_store,
        item.Supplier_code,
        item,
        index
      );
    }
  };

  // nadeesh feb 6 2024
  const handleCheckboxChange = (index) => {
    // Clone the array to avoid directly modifying the state
    const updatedArray = [...selectedProducttableData];

    // Invert the RecSelected value at the specified index
    updatedArray[index].RecSelected = !updatedArray[index].RecSelected;
    // Update the state with the modified array
    setSelectedProducttableData(updatedArray);
    sessionStorage.setItem(
      "savemodelSelectedProducts",
      JSON.stringify(updatedArray)
    );
    localStorage.setItem(
      "savemodelSelectedProducts_N",
      JSON.stringify(updatedArray)
    );
  };

  const handleKeyPress = (e, value, row, index, column) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getRerenderedTableData("U", index, column);
    }
  };
  const changeMaterialDetails = (e, value, row, index, column) => {
    const updatedData = [...selectedProducttableData];
    updatedData[index][column] = value;
    setSelectedProducttableData(updatedData);
    sessionStorage.setItem(
      "savemodelSelectedProducts",
      JSON.stringify(updatedData)
    );
    localStorage.setItem(
      "savemodelSelectedProducts_N",
      JSON.stringify(updatedData)
    );
  };

  const getRerenderedTableData = async (status, rowID, DataType) => {
    // rowdeleted("deleting");
    const savedModelMaterialList = sessionStorage.getItem(
      "savemodelSelectedProducts"
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
      } else if (status === "U") {
        dynamicIndex = rowID;
      } else {
        dynamicIndex = null;
      }

      const response = await fetch(
        `${API_URL}quotation/recalproductinfo?rowid=${dynamicIndex}&status=${status}&datatype=${DataType}&custcode=${custCode}&prodgroup=Q`,
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

      const data = await response.json();
      const datar = data.ResultSet;
      const msg = data.ReturnMessage;
      sessionStorage.setItem(
        "savemodelSelectedProducts",
        JSON.stringify(datar)
      );
      localStorage.setItem(
        "savemodelSelectedProducts_N",
        JSON.stringify(datar)
      );

      if (!data.ResultSet) {
        const msg = data.ReturnMessage;
        setAlertType("error");
        setAlertMessage(msg);
        setShowAlert(true);
        //window.alert(msg);
        getSelectedProducttableData();
      }

      if (data.ResultSet) {
        setSelectedProducttableData([]);
        setSelectedProducttableData(datar);
      }
      if (msg !== "") {
        setAlertType("info");
        setAlertMessage(msg);
        setShowAlert(true);
        // window.alert(msg);
      }

      //setJobCostDetails(updatedDetails);
      // sessionStorage.setItem("JobCostDetails", JSON.stringify(updatedDetails));
      // rowdeleted("deleted");
      // Set calculatedData
      //setcalculatedData(datar);

      // Handle the click after setting the state
      //handleRowClick(datar, rowIndex);
    } catch (err) {
      console.error("Error in getCalculatedTableData:", err.message);
    } finally {
    }
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
      "savemodelSelectedProducts",
      JSON.stringify(updatedData)
    );
    localStorage.setItem(
      "savemodelSelectedProducts_N",
      JSON.stringify(updatedData)
    );
  };

  const handleSort = (columnName) => {
    // sorting function
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSortedColumn(columnName);
  };
  const sortByColumn = (data, columnName, order) => {
    // sorting function
    return data.slice().sort((a, b) => {
      const aValue = a[columnName];
      const bValue = b[columnName];

      if (order === "asc") {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      } else {
        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
      }
    });
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
        className="Qt-SelectedProductTable"
        style={{ overflowY: "auto", maxWidth: "100%", marginTop: "0%" }}
      >
        <h6
          style={{
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
        ></h6>
        <table class="tableQt-ProductTable">
          <thead
            class="tableQt-ProductTable-grey-header"
            style={{
              height: "25px",
              position: "sticky",
              top: "0",
              fontSize: "11px",
            }}
          >
            <tr>
              <th
                style={{ width: "130px" }}
                onClick={() => handleSort("Name")}
                onMouseEnter={() => setSortIconVisibility(true)}
                onMouseLeave={() => setSortIconVisibility(false)}
              >
                Quarry Name{" "}
                {isSortIconVisible &&
                  sortedColumn === "Name" && ( // sorting icon
                    <span className="sortIcon">
                      {sortOrder === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
              </th>
              <th
                style={{ width: "200px" }}
                onClick={() => handleSort("Catlog_desc")}
                onMouseEnter={() => setSortIconVisibility(true)}
                onMouseLeave={() => setSortIconVisibility(false)}
              >
                Description{" "}
                {isSortIconVisible &&
                  sortedColumn === "Catlog_desc" && ( // sorting icon
                    <span className="sortIcon">
                      {sortOrder === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
              </th>
              <th
                style={{ width: "110px" }}
                onClick={() => handleSort("Product_cost")}
                onMouseEnter={() => setSortIconVisibility(true)}
                onMouseLeave={() => setSortIconVisibility(false)}
              >
                Product Cost($)
                {isSortIconVisible &&
                  sortedColumn === "Product_cost" && ( // sorting icon
                    <span className="sortIcon">
                      {sortOrder === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
              </th>
              <th
                style={{ width: "100px" }}
                onClick={() => handleSort("Distance_meters")}
                onMouseEnter={() => setSortIconVisibility(true)}
                onMouseLeave={() => setSortIconVisibility(false)}
              >
                Distance(Km)
                {isSortIconVisible &&
                  sortedColumn === "Distance_meters" && ( // sorting icon
                    <span className="sortIcon">
                      {sortOrder === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
              </th>
              <th
                style={{ width: "120px" }}
                onClick={() => handleSort("Cartage_cost")}
                onMouseEnter={() => setSortIconVisibility(true)}
                onMouseLeave={() => setSortIconVisibility(false)}
              >
                Cartage Cost($)
                {isSortIconVisible &&
                  sortedColumn === "Cartage_cost" && ( // sorting icon
                    <span className="sortIcon">
                      {sortOrder === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
              </th>
              <th
                style={{ width: "100px" }}
                onClick={() => handleSort("Product_tot")}
                onMouseEnter={() => setSortIconVisibility(true)}
                onMouseLeave={() => setSortIconVisibility(false)}
              >
                Total Cost($)
                {isSortIconVisible &&
                  sortedColumn === "Product_tot" && ( // sorting icon
                    <span className="sortIcon">
                      {sortOrder === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
              </th>
              <th style={{ width: "90px" }}>Customer Details</th>
              <th style={{ width: "100px" }}>Time Required</th>
              <th style={{ width: "80px" }}>Loading Time</th>
              <th style={{ width: "100px" }}>Delivery Address</th>
              <th style={{ width: "60px" }}>Suburb</th>
              <th style={{ width: "60px" }}>UOM</th>
              <th style={{ width: "50px" }}>Order Qty</th>
              <th style={{ width: "100px" }}>Del Qty</th>
              <th style={{ width: "100px" }}>Bal Qty</th>
              <th style={{ width: "100px" }}>Material</th>
              <th style={{ width: "100px" }}>Quarry</th>
              <th style={{ width: "100px" }}>Truck Description</th>
              <th style={{ width: "100px" }}>Job Status</th>
              <th style={{ width: "100px" }}>Truck Type</th>
              <th style={{ width: "100px" }}>Truck Allocation</th>
              <th style={{ width: "100px" }}>Customer Order No</th>
              <th style={{ width: "100px" }}>W/T</th>
              {/* <th style={{ width: "100px" }}>W/T</th> */}

              <th style={{ width: "30px" }}>
                <Tooltip title="check all">
                  <input
                    type="checkbox"
                    // className="marginR10"
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
                  {/* <LinearProgress style={{ width: "100%" }} /> */}
                </td>
              </tr>
            )}

            {!loading &&
              (selectedProducttableData?.length > 0 ? (
                sortByColumn(
                  selectedProducttableData,
                  sortedColumn,
                  sortOrder
                ).map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={`row2hover-effect ${
                        item && item.Is_selected == true
                          ? "userselectedrows"
                          : ""
                      }`}
                      style={{
                        fontSize: "9px",
                        height: "5px",
                        marginBottom: "0px",
                        padding: "0px",
                        marginTop: "0px",
                        backgroundColor: item.Is_available
                          ? ""
                          : "rgb(247, 206, 159)",
                      }}
                      onClick={() => handleRowClick(item, index)}
                    >
                      <td style={{ borderRight: "1px solid grey" }}>
                        {item && item.Name && typeof item.Name === "string"
                          ? item.Name.slice(0, 15)
                          : ""}
                      </td>
                      <td>
                        {item &&
                        item.Catlog_desc &&
                        typeof item.Catlog_desc === "string"
                          ? item.Catlog_desc.slice(0, 20)
                          : ""}
                      </td>
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                          color: item.IsProductcostchange ? "red" : "",
                        }}
                      >
                        {item && item.Product_cost !== undefined
                          ? item.Product_cost.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : item && item.Total_cost !== undefined
                          ? item.Total_cost.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ""}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          borderRight: "1px solid grey",
                          color: item.IsDistacechange ? "red" : "",
                          fontWeight: 700,
                          fontStyle: "bold",
                        }}
                      >
                        {item && item.Distance_meters
                          ? item.Distance_meters.toFixed(2)
                          : ".00"}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          borderRight: "1px solid grey",
                        }}
                      >
                        {item && item.Cartage_cost
                          ? item.Cartage_cost.toFixed(2)
                          : ".00"}
                      </td>
                      {/* Total cost */}
                      <td
                        style={{
                          textAlign: "right",
                          borderRight: "1px solid grey",
                        }}
                      >
                        {/* {item && item.Product_cost && item.Cartage_cost
                          ? calculatesum(item.Product_cost, item.Cartage_cost)
                          : item.Total_cost} */}
                        {item && item.Product_tot
                          ? item.Product_tot.toFixed(2)
                          : //: item.Total_cost
                            ".00"}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid grey",

                          // marginRight: "15px",
                        }}
                      >
                        {item && item.Supplier_store
                          ? item.Supplier_store
                          : item.Supplier_code}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid grey",

                          // marginRight: "15px",
                        }}
                      >
                        {item && item.Catlog_code ? item.Catlog_code : ""}
                      </td>
                      <td>
                        {item && item.Truck_type
                          ? item.Truck_type
                          : item.Truck_type}
                      </td>
                      {/* unit sell price */}
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                          // marginRight: "15px",
                        }}
                      >
                        <input
                          className="cellcolor_yellow"
                          type="text"
                          style={{
                            width: "90px",
                            textAlign: "right",
                            height: "15px",
                            //marginRight: "5px",
                          }}
                          value={
                            item && item.Product_sell
                              ? //item && typeof item.Product_sell === "number"
                                item.Product_sell.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""
                          }
                          // onChange={(e) =>
                          //   changeProductSell(e.target.value, item, index)
                          // }
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
                      {/* Margin */}
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
                            textAlign: "right",
                            height: "15px",
                          }}
                          value={
                            item && item.Product_profit
                              ? //  ? item.Product_profit
                                item.Product_profit.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""
                          }
                          // onChange={(e) =>
                          //   changeProductSell(e.target.value, item, index)
                          // }
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
                      {/* Qty */}
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        {item && item.Quote_qty ? item.Quote_qty : 1}
                      </td>
                      <td>{item && item.Uom ? item.Uom : item.Uom_order}</td>
                      <td
                        className="cellcolor_yellow"
                        style={{
                          borderRight: "1px solid grey",
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        {item && item.Short_qty
                          ? item.Short_qty.toFixed(2)
                          : ".00"}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                        }}
                      >
                        {item && item.Short_fee
                          ? item.Short_fee.toFixed(2)
                          : ".00"}
                      </td>

                      {/* Grand Total Ecx */}
                      <td
                        className="cellcolor_yellow"
                        style={{
                          padding: "2px",
                          textAlign: "right",
                        }}
                      >
                        {item &&
                        item.Product_sell !== null &&
                        item.Quote_qty !== null &&
                        item.Short_fee !== null
                          ? item.Rate.toFixed(2)
                          : // GrandExctcal(
                            //   item.Product_sell,
                            //   item.Quote_qty,
                            //   item.Short_fee
                            // )
                            "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "2px",
                          textAlign: "right",
                          borderRight: "1px solid grey",
                        }}
                      >
                        {item && item.Rate_Inc_Gst !== null
                          ? item.Rate_Inc_Gst.toFixed(2)
                          : // GrandCostcal(
                            //   item.Gst_override,
                            //   item.Rate,
                            //   item.Product_sell,
                            //   item.Quote_qty,
                            //   item.Short_fee
                            // )
                            "N/A"}
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
                          checked={item.RecSelected}
                          onChange={() => handleCheckboxChange(index)}
                          // checked={selectedQuotes.includes(item.Quote_no)}
                          // onChange={() =>
                          //   handleRowCheckboxClick(item.Quote_no)
                          // }
                        />
                        {/* {item && item.Supplier_name && ( */}

                        {/* )} */}
                      </td>
                      <td>
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
                              //marginLeft: "10px",
                              marginTop: "-2px",
                            }}
                            onClick={() =>
                              deleteSelectedProducttableData(
                                item.Truck_type,
                                item.Catlog_code,
                                item.Supplier_store,
                                item.Supplier_code,
                                item,
                                index
                              )
                            }
                          />
                        </Tooltip>
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
    </div>
  );
}
