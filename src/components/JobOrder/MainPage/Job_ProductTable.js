// import React from "react";

// export default function Job_ProductTable() {
//   return <div>Job_ProductTable</div>;
// }
import React from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState } from "react";
import { useEffect } from "react";
import {
  CInputGroupText,
  CRow,
  CSelect,
} from "@coreui/react";
import CachedIcon from "@mui/icons-material/Cached";
import Nexgen_Alert from "src/components/ReusableComponents_ESQ/Nexgen_Alert";

export default function Job_ProductTable(props) {
  const [supplierProductTableData, setSupplierProductTableData] = useState([]);
  //const [selectedOption, setSelectedOption] = useState("QUARRY");
  const [selectedOptionMap, setSelectedOptionMap] = useState("S");
  const [loading, setLoading] = useState(false);
  const [isDoubleClicked, setisDoubleClicked] = useState(false);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [fuelLvy, setcheckfuelLvy] = useState(true);
  const [hideZeroDistance, sethideZeroDistance] = useState(true);
  const [sortTruckTypecheck, setsortTruckTypecheck] = useState(true);
  const [TruckTypeListData, setTruckTypeListData] = useState([]);
  const [TruckTypeSelected, setTruckTypeSelected] = useState("");
  const [cityAdress, setcityAdress] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [clickedRowIndices, setClickedRowIndices] = useState([]);
  const [filters, setFilters] = useState({
    Uom_order: "T",
    Catalog_code: "",
    Supplier_name: "",
    Supplier_store: "",
    Truck_type: TruckTypeSelected,
    Description: "",
    Latitude: 0,
    Longitude: 0,
    Site_city: cityAdress,
    // Latitude: props.Latitude ? props.Latitude : "",
    // Longitude: props.Longitude ? props.Longitude : "",
    // Site_city: productTabledata || "",
    // Site_state: Site_state || "",
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [isSortIconVisible, setSortIconVisibility] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const { rfid } = props;
  const { custCode } = props;
  const { QuoteNew } = props;
  const { selectedOption } = props;

  //   const { Site_city } = this.props.productTabledata.Site_city;
  //   const { Site_state } = this.props.productTabledata.Site_state;

  // g,s
  //http://localhost:8322/api/quotation/getsupplierprice?prod_grp=QUARRY&refid=385877&fuellevy=true&defultdis=j

  // if g  then send sitecity and sitestate
  //
  //   {
  //     "Uom_order":"",
  //       "Catalog_code" :"7GP",
  //          "Supplier_code" :"",
  //           "Supplier_store":"",
  //           "Supplier_name":"",
  //        "Truck_type" :"T",
  //        "Description":"",
  //        "Site_city":"",
  //        "Site_state":""
  //  }

  useEffect(() => {
 
    if (QuoteNew === true) {
      setSupplierProductTableData([]);
      setClickedRowIndices([]);
      setSelectedRows([]);
      

      setFilters({
        Uom_order: "",
        Catalog_code: "",
        Supplier_name: "",
        Supplier_store: "",
        Truck_type: "",
        Description: "",
        Latitude: 0,
        Longitude: 0,
        Site_city: "",
      });
    }
    // Update the filters state when the props change
    setFilters((prevFilters) => ({
      ...prevFilters,
      Latitude: props.Latitude || 0,
      Longitude: props.Longitude || 0,
      Site_city: cityAdress,
      Truck_type: TruckTypeSelected,
      // ...other properties if needed
    }));
  }, [props.Latitude, props.Longitude, props.QuoteNew, TruckTypeSelected]);

  useEffect(() => {
    getTruckTypeList();
  }, [selectedOption]);
  useEffect(() => {
    getTruckTypeList();
  }, []);

  useEffect(() => {
    if (sortTruckTypecheck) {
      getTruckTypeList();
    } else if (!sortTruckTypecheck) {
      getTruckTypeList();
    }
  }, [sortTruckTypecheck]);

  // useEffect(() => {
  //   if (selectedOptionMap == "G") {
  //     getSupplierProductTableData();
  //   } else if (selectedOptionMap == "S") {
  //     getSupplierProductTableData();
  //   }
  // }, [selectedOptionMap]);

  const getTruckTypeList = () => {
    setLoading(true);
    //test.esqtruckapi.com.au/api/quotation/gettrucktypes?shorttruck=true
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));

    let opttype = localStorage.getItem("QouteGroup");

    // Set optType to selectedOption if available, otherwise use value from localStorage
    let optTypeToUse = selectedOption ? selectedOption : opttype;
    fetch(
      // `${API_URL}quotation/gettrucktypes?shorttruck=${sortTruckTypecheck} `,
      `${API_URL}quotation/gettrucktypes?optype=${optTypeToUse}&shorttruck=${sortTruckTypecheck}`,

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
        const datar = data.ResultSet;
        setTruckTypeListData(datar);
        const settrucktype = datar[0].Type;
        setTruckTypeSelected(settrucktype);
        //console.log("settrucktype", settrucktype);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const getSupplierProductTableData = () => {
    setLoading(true);
    setcityAdress(sessionStorage.getItem("selectedMaprefAddress"));
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    sessionStorage.setItem("selectedSupplierProduct", JSON.stringify(""));
    let fulltype = "";
    if (selectedOption === "Q") {
      fulltype = "QUARRY";
    } else if (selectedOption === "A") {
      fulltype = "ASPHALT";
    } else if (selectedOption === "S") {
      fulltype = "SERVICE";
    } else if (selectedOption === "G") {
      fulltype = "GARDEN";
    } else if (selectedOption === "C") {
      fulltype = "CONCRETE";
    }
    // http://localhost:8322/api/quotation/getsupplierprice?quotetype=CONCRETE&refid=384774&fuellevy=true&defultdis=S
    fetch(
      // `${API_URL}quotation/getsupplierprice?quotetype=${fulltype}&refid=${rfid}&fuellevy=${fuelLvy}&defultdis=${selectedOptionMap}
      // `,
      `${API_URL}quotation/getsupplierprice?quotetype=${selectedOption}&refid=${rfid}&fuellevy=${fuelLvy}&defultdis=${selectedOptionMap}&Uom_order=${filters.Uom_order}&Catalog_code=${filters.Catalog_code}&Supplier_code=${filters.Supplier_store}&Supplier_store=${filters.Supplier_store}&Supplier_name=${filters.Supplier_name}&Truck_type=${filters.Truck_type}&Description=${filters.Description}&Site_city= ${filters.Site_city}&Latitude=${filters.Latitude}&Longitude=${filters.Longitude}`,
    
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
       //body: JSON.stringify(filters),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet[0].ResultSet;
        const returnMsg = data.ResultSet[0].ReturnMessage[0];
        setSupplierProductTableData(datar);

        setLoading(false);
        if (returnMsg) {
          setAlertType("warning");
          setAlertMessage(
            "please update the location details of this Suppliers     " +
              returnMsg
          );
          setShowAlert(true);
          // window.alert(
          //   "please update the location details of this Suppliers     " +
          //     returnMsg
          // );
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const handleFilterChange = (column, value) => {
    let newValue = value;
    newValue = value.toUpperCase();
    // }
    setFilters({
      ...filters,
      [column]: newValue,
    });
  };
  const filteredData = supplierProductTableData
    ? supplierProductTableData.filter((row) => {
        const Uom_orderMatch = row.Uom_order.toUpperCase().includes(
          filters.Uom_order
        );
        const Catalog_codeMatch = row.Catalog_code.toUpperCase().includes(
          filters.Catalog_code
        );

        const Supplier_storeMatch = row.Supplier_store.toUpperCase().includes(
          filters.Supplier_store
        );
        const Supplier_nameMatch = row.Supplier_name.toUpperCase().includes(
          filters.Supplier_name
        );
        const Truck_typeMatch = row.Truck_type.toUpperCase().includes(
          filters.Truck_type
        );
        const DescriptionMatch = row.Description.toUpperCase().includes(
          filters.Description
        );
        if (hideZeroDistance && parseFloat(row.Distance) === 0) {
          return false; // Hide rows with Distance equal to 0
        }

        return (
          Uom_orderMatch &&
          Catalog_codeMatch &&
          Supplier_storeMatch &&
          Supplier_nameMatch &&
          Truck_typeMatch &&
          DescriptionMatch
        );
      })
    : [];

  // radio button
  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const handleMapOptionChange = (event) => {
    setSelectedOptionMap(event.target.value);
  };

  const handleRowClick = (rowDetails, rowIndex) => {
    setClickedRowIndex(rowIndex);
    setisDoubleClicked(true);
    setClickedRowIndices([rowIndex]);
    const updatedClickedRowIndices = [...clickedRowIndices, rowIndex];
    if (clickedRowIndices.includes(rowIndex)) {
      // window.alert("already added");
    }
    // setClickedRowIndices(updatedClickedRowIndices);
    //  setClickedRowIndices([rowIndex]);
    const updatedSelectedRows = [...selectedRows, rowDetails];
    // setSelectedRows(updatedSelectedRows);
    setSelectedRows([rowDetails]);
    console.log("selectedrows", selectedRows);
    console.log("rowDetails", rowDetails);
    console.log("updatedSelectedRows", updatedSelectedRows);
    // setTimeout(() => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem(
      "selectedSupplierProduct",
      JSON.stringify([rowDetails])
    );
    // setisDoubleClicked(false);
    // }, 500);
    //}
    setTimeout(() => {
      setisDoubleClicked(false);
    }, 10);
    // setisDoubleClicked(false);
    if (props.onClose) {
      props.onClose();
    }
    // setisDoubleClicked(false);
  };

  const handlesortTruckClick = () => {
    setsortTruckTypecheck(!sortTruckTypecheck);
    // getTruckTypeList();
  };

  const handlTruckTuypeOptionChange = (e) => {
    const selectedOption = e.target.value;
    setTruckTypeSelected(selectedOption);
  };
  // const handlTruckTuypeOptionChange = (e) => {
  //   const selectedOption = e.target.value;
  //   setTruckTypeSelected(selectedOption);

  // };
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
  const getCalculatedTableData = async (rowDetails, rowIndex) => {
    console.log("rowDetails3", rowDetails);
    if (rowDetails.Distance === 0) {
      const confirmed = window.confirm(
        "The selected plant does not have distance. Do you want to select anyway?"
      );
      if (!confirmed) {
        return;
      }
    }
    if (!rowDetails.Is_available) {
      setAlertType("warning");
      setAlertMessage("Product is not Available");
      setShowAlert(true);
      //window.alert("Product is not Available");
      return;
    }
    // if (!rowDetails.) {
    //   window.alert("Product is not Available");
    //   return;
    // }
    try {
      let opttype = localStorage.getItem("QouteGroup");
      // Set optType to selectedOption if available, otherwise use value from localStorage
      let optTypeToUse = selectedOption ? selectedOption : opttype;
      const response = await fetch(
        `${API_URL}joborder/calproductrate?companycode=ESQ&custcode=${custCode}&prod_grp=${optTypeToUse}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rowDetails),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const datar = data.ResultSet[0];

      // Set calculatedData
      //setcalculatedData(datar);

      // Handle the click after setting the state
      handleRowClick(datar, rowIndex);

      console.log("datar", datar);
    } catch (err) {
      console.error("Error in getCalculatedTableData:", err.message);
    } finally {
    }
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

      // style={{ overflowY: "auto", height: "600px", maxWidth: "100%" }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CRow>
            <div
              style={{
                display: "inline-flex",
                marginLeft: "20px",
                marginRight: "10px",
              }}
            >
              <label>
                <input
                  className="productradiobtn"
                  style={{}}
                  type="checkbox"
                  checked={sortTruckTypecheck}
                  onChange={handlesortTruckClick}
                />
                Sort Truck Type List
              </label>
              <div
                style={{
                  display: "flex",
                  marginLeft: "20px",
                  marginRight: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <CInputGroupText
                    className="small-input-text"
                    style={{ marginTop: "-7px" }}
                  >
                    Truck Type:
                  </CInputGroupText>
                  <CSelect
                    size="sm"
                    style={{ width: "160px" }}
                    key={TruckTypeSelected}
                    onChange={(e) => setTruckTypeSelected(e.target.value)}
                    value={TruckTypeSelected}
                  >
                    {TruckTypeListData.map((option) => (
                      <option value={option.Type} key={option.Type}>
                        {option.Desc}
                      </option>
                    ))}
                  </CSelect>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {" "}
                  <button
                    className="collapse-button"
                    disabled={!filters.Catalog_code}
                    onClick={getSupplierProductTableData}
                  >
                    <CachedIcon />
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "20px",
                    width: "400px",
                  }}
                >
                  <label className=" ">
                    <input
                      className="productradiobtn"
                      type="radio"
                      value="S"
                      checked={selectedOptionMap === "S"}
                      onChange={handleMapOptionChange}
                    />
                    Default from Std Distance
                  </label>

                  <label className=" ">
                    <input
                      className="productradiobtn"
                      type="radio"
                      value="G"
                      checked={selectedOptionMap === "G"}
                      onChange={handleMapOptionChange}
                    />
                    Default from Google Maps
                  </label>
                </div>
              </div>
            </div>
          </CRow>
          <CRow>
            <div
              style={{
                display: "flex",
                marginRight: "20px",
              }}
            >
              <div
                style={{
                  //marginRight: "160px",
                  left: 30,
                  top: 85,
                  fontStyle: "bold",
                  fontWeight: "600",
                  position: "absolute",
                  fontSize: "11px",
                  width: "140px",
                }}
              >
                <label>Supplier Product Codes</label>
              </div>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  marginLeft: "0px",
                  marginBottom: "30px",
                }}
              >
                <div className="box1ProductT m-0" />
                <h7 className="boxtext2 m-0 ml-1" style={{ color: "black" }}>
                  N/A
                </h7>
              </div>

              <div
                style={{
                  marginLeft: "20px",
                }}
              >
                <label>
                  <input
                    className="productradiobtn"
                    style={{}}
                    type="checkbox"
                    checked={hideZeroDistance}
                    onChange={() => sethideZeroDistance(!hideZeroDistance)}
                  />
                  Hide Zero Distance
                </label>
              </div>
              <div
                style={{
                  marginLeft: "20px",
                }}
              >
                <label>
                  <input
                    className="productradiobtn"
                    style={{}}
                    type="checkbox"
                    checked={fuelLvy}
                    onChange={() => setcheckfuelLvy(!fuelLvy)}
                  />
                  Fuel levy Charge
                </label>
              </div>
              <div
                style={{
                  marginLeft: "20px",
                  display: "block",
                  fontStyle: "bold",
                  fontWeight: "500",
                }}
              >
                <label
                  style={{
                    marginLeft: "20px",
                    color: "rgb(229, 118, 28)",
                  }}
                >
                  Attached{" "}
                </label>
                <label
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  Original
                </label>
              </div>
            </div>
          </CRow>
        </div>
        <div className="Jb-ProductTable">
          <table class="tableQt-ProductTable" style={{ marginTop: "10px" }}>
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
                <th>
                  <input
                    type="text"
                    placeholder=""
                    value={filters.Catalog_code}
                    onChange={(e) =>
                      handleFilterChange("Catalog_code", e.target.value)
                    }
                    style={{ width: "100px" }}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder=""
                    value={filters.Description}
                    onChange={(e) =>
                      handleFilterChange("Description", e.target.value)
                    }
                    style={{ width: "140px" }}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder=""
                    value={filters.Uom_order}
                    onChange={(e) =>
                      handleFilterChange("Uom_order", e.target.value)
                    }
                    style={{ width: "70px" }}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder=""
                    value={filters.Supplier_name}
                    onChange={(e) =>
                      handleFilterChange("Supplier_name", e.target.value)
                    }
                    style={{ width: "180px" }}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder=""
                    value={filters.Supplier_store}
                    onChange={(e) =>
                      handleFilterChange("Supplier_store", e.target.value)
                    }
                    style={{ width: "80px" }}
                  />
                </th>
                <th colSpan="6">
                  <input
                    type="text"
                    placeholder=""
                    //value={filters.Supplier_store}
                    disabled
                    style={{
                      width: "540px",
                      backgroundColor: "rgba(247, 247, 247, 0.923)",
                      border: "2px solid white",
                    }}
                  />
                </th>
              </tr>
              <tr>
                <th
                  style={{ width: "100px" }}
                  onClick={() => handleSort("Catalog_code")} //sorting function
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Product Code
                  {isSortIconVisible &&
                    sortedColumn === "Catalog_code" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                <th
                  style={{ width: "140px" }}
                  onClick={() => handleSort("Description")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Description
                  {isSortIconVisible &&
                    sortedColumn === "Description" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                <th
                  style={{ width: "40px" }}
                  onClick={() => handleSort("Uom_order")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  UOM
                  {isSortIconVisible &&
                    sortedColumn === "Uom_order" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                <th
                  style={{ width: "150px" }}
                  onClick={() => handleSort("Supplier_name")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Supplier Name
                  {isSortIconVisible &&
                    sortedColumn === "Supplier_name" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                <th
                  style={{ width: "80px" }}
                  onClick={() => handleSort("Supplier_code")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  PLT
                  {isSortIconVisible &&
                    sortedColumn === "Supplier_code" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                {selectedOptionMap === "S" && (
                  <th
                    style={{ width: "100px" }}
                    onClick={() => handleSort("Distance")}
                    onMouseEnter={() => setSortIconVisibility(true)}
                    onMouseLeave={() => setSortIconVisibility(false)}
                  >
                    Distance(Km)
                    {isSortIconVisible &&
                      sortedColumn === "Distance" && ( // sorting icon
                        <span className="sortIcon">
                          {sortOrder === "asc" ? " 🔼" : " 🔽"}
                        </span>
                      )}
                  </th>
                )}
                {selectedOptionMap === "G" && (
                  <th
                    style={{ width: "80px" }}
                    onClick={() => handleSort("Distance_str")}
                    onMouseEnter={() => setSortIconVisibility(true)}
                    onMouseLeave={() => setSortIconVisibility(false)}
                  >
                    Distance
                    {isSortIconVisible &&
                      sortedColumn === "Distance_str" && ( // sorting icon
                        <span className="sortIcon">
                          {sortOrder === "asc" ? " 🔼" : " 🔽"}
                        </span>
                      )}
                  </th>
                )}
                {selectedOptionMap === "G" && (
                  <th
                    style={{ width: "100px" }}
                    onClick={() => handleSort("Est_time")}
                    onMouseEnter={() => setSortIconVisibility(true)}
                    onMouseLeave={() => setSortIconVisibility(false)}
                  >
                    Est Time
                    {isSortIconVisible &&
                      sortedColumn === "Est_time" && ( // sorting icon
                        <span className="sortIcon">
                          {sortOrder === "asc" ? " 🔼" : " 🔽"}
                        </span>
                      )}
                  </th>
                )}

                <th
                  style={{ width: "110px" }}
                  onClick={() => handleSort("Price")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Product Cost($)
                  {isSortIconVisible &&
                    sortedColumn === "Price" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                <th
                  style={{ width: "110px" }}
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
                  style={{ width: "110px" }}
                  onClick={() => handleSort("Total_cost")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Total Cost($)
                  {isSortIconVisible &&
                    sortedColumn === "Total_cost" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                <th
                  style={{ width: "110px" }}
                  onClick={() => handleSort("Total_price")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Total Price ($)
                  {isSortIconVisible &&
                    sortedColumn === "Total_price" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
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
                (supplierProductTableData?.length > 0 ? (
                  sortByColumn(filteredData, sortedColumn, sortOrder).map(
                    (item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`productThover-effect ${
                            isDoubleClicked && clickedRowIndex === index
                              ? "popup-animation"
                              : ""
                          }`}
                          // style={{
                          //   fontSize: "9px",
                          //   height: "5px",
                          //   marginBottom: "0px",
                          //   padding: "0px",
                          //   marginTop: "0px",
                          // }}
                          onDoubleClick={() =>
                            //handleRowClick(item, index)
                            getCalculatedTableData(item, index)
                          }
                          style={
                            item.ColorRow // this is to color row acording to the  future prices
                              ? {
                                  backgroundColor: "rgb(102, 152, 175)",
                                  color: "black",
                                  fontSize: "9px",
                                  height: "5px",
                                  marginBottom: "0px",
                                  padding: "0px",
                                  marginTop: "0px",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: item.Is_available
                                    ? ""
                                    : "rgb(247, 206, 159)",
                                  fontSize: "9px",
                                  color: "black",
                                  height: "5px",
                                  marginBottom: "0px",
                                  padding: "0px",
                                  marginTop: "0px",
                                }
                          }
                        >
                          <td style={{}}>{item.Catalog_code}</td>
                          <td style={{}}>{item.Description.slice(0, 20)}</td>
                          <td style={{}}>{item.Uom_order}</td>
                          <td>{item.Supplier_name.slice(0, 20)} </td>
                          <td>{item.Supplier_code}</td>
                          {selectedOptionMap === "S" && (
                            <td style={{ textAlign: "right" }}>
                              {item.Distance}
                            </td>
                          )}
                          {selectedOptionMap === "G" && (
                            <td style={{ textAlign: "right" }}>
                              {item.Distance_str}
                            </td>
                          )}
                          {selectedOptionMap === "G" && (
                            <td style={{ textAlign: "right" }}>
                              {item.Est_time}
                            </td>
                          )}
                          <td
                            style={
                              item.ColorBoldCol
                                ? {
                                    fontWeight: "bold",
                                    backgroundColor: "rgb(247, 170, 107)",
                                    textAlign: "right",
                                  }
                                : { textAlign: "right" }
                            }
                          >
                            {item.Price.toFixed(2)}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {item.Cartage_cost.toFixed(2)}
                          </td>
                          <td
                            style={
                              item.ColorBoldCol
                                ? {
                                    fontWeight: "bold",
                                    backgroundColor: "rgb(247, 170, 107)",
                                    textAlign: "right",
                                  }
                                : { textAlign: "right" }
                            }
                          >
                            {item.Total_cost.toFixed(2)}
                          </td>
                          <td
                            style={
                              item.ColorBoldCol
                                ? {
                                    fontWeight: "bold",
                                    backgroundColor: "rgb(247, 170, 107)",
                                    textAlign: "right",
                                  }
                                : { textAlign: "right" }
                            }
                          >
                            {item.Total_price.toFixed(2)}
                          </td>
                        </tr>
                        //if item.ColorBoldCol == ture then i need to make that row Total_cost,Total_price,Price need to color in oragne bold
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td colSpan="19">No data available</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
