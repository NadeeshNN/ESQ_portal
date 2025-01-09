import React from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState } from "react";
import { useEffect } from "react";
import {
  CCol,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSelect,
} from "@coreui/react";
import CachedIcon from "@mui/icons-material/Cached";
import googlemapIcon from "../../../assets/icons/quotaionbtns/mapBlack.png";
import ProductTableMap from "src/components/map/ProductTableMap";
import { Alert } from "@mui/material";
import Nexgen_Alert from "src/components/ReusableComponents_ESQ/Nexgen_Alert";
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  zIndex: 9999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function Qt_ProductTable(props) {
  const [selectedProducttableData, setSelectedProducttableData] = useState([]);
  const [supplierProductTableData, setSupplierProductTableData] = useState([]);
  const [filteredDataN, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("QUARRY");
  const [selectedOptionMap, setSelectedOptionMap] = useState("S");
  const [loading, setLoading] = useState(false);
  const [isDoubleClicked, setisDoubleClicked] = useState(false);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [fuelLvy, setcheckfuelLvy] = useState(true);
  const [hideZeroDistance, sethideZeroDistance] = useState(true);
  const [sortTruckTypecheck, setsortTruckTypecheck] = useState(true);
  const [TruckTypeListData, setTruckTypeListData] = useState([]);

  const [serviceArray, setServiceArray] = useState([]);
  const [QuarryArray, setQuarryArray] = useState([]);
  const [concreteArray, setConcreteArray] = useState([]);
  const [gardenArray, setGardenArray] = useState([]);
  const [asphltArray, setAsphltArray] = useState([]);
  const [TruckTypeSelected, setTruckTypeSelected] = useState("T");
  const [cityAdress, setcityAdress] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [clickedRowIndices, setClickedRowIndices] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
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
  const [isbuttonDisable, setisbuttonDisable] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [item, setItem] = useState([]);
  const [destination, setDestination] = useState({
    lat: "",
    lng: "",
  });
  const { rfid } = props;
  const { Latitude } = props;
  const { Longitude } = props;
  const { QuoteNew } = props;
  const { custCode } = props;
  const { address } = props;
  const { city } = props;
  const { selectedOptionqoute } = props;

  useEffect(() => {
    //setFilters({ Site_city: address });
    if (QuoteNew == true) {
      setSupplierProductTableData([]);
      setSelectedProducttableData([]);
      setClickedRowIndices([]);
      setSelectedRows([]);
      setFilteredData([]);

      setFilters({
        Uom_order: "T",
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
  }, [selectedOption, selectedOptionqoute]);

  useEffect(() => {
    const qoutetype = sessionStorage.getItem("QouteGroup");
    let selectedOptionValue;
    switch (qoutetype) {
      case "Q":
        selectedOptionValue = "QUARRY";
        break;
      case "G":
        selectedOptionValue = "GARDEN";
        break;
      case "C":
        selectedOptionValue = "CONCRETE";
        break;
      case "A":
        selectedOptionValue = "ASPHALT";
        break;
      case "S":
        selectedOptionValue = "SERVICE";
        break;
      default:
        selectedOptionValue = selectedOption;
    }
    setSelectedOption(selectedOptionValue);
  }, [selectedOptionqoute]);

  const getTruckTypeList = () => {
    setLoading(true);
    //test.esqtruckapi.com.au/api/quotation/gettrucktypes?shorttruck=true
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(
      // `${API_URL}quotation/gettrucktypes?shorttruck=${sortTruckTypecheck} `,
      `${API_URL}quotation/gettrucktypes?optype=${selectedOption}&shorttruck=${sortTruckTypecheck}`,

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
        // setTruckTypeListData();
        //console.log("data1", data.ResultSet[0].Type);

        // const truckTypeListWithEmptyField = [{ id: "", name: "" }].concat(
        //   datar
        // );
        setTruckTypeListData(datar);
        setTruckTypeSelected(data.ResultSet[0].Type);
        //
        // console.log("data", TruckTypeListData[1].Type);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const getSupplierProductTableData = () => {
    console.log(props);
    // if (!rfid || filters.Catalog_code == "") {
    //   window.alert("Product code and map ref Cannot be empty");
    //   return;
    // } else setisbuttonDisable(false);
    setcityAdress(address);
    console.log("cityAdress", cityAdress);
    setLoading(true);
    //http://localhost:8322/api/quotation/getsupplierprice?quotetype=CONCRETE&refid=384774&fuellevy=true&defultdis=S
    //setFilters({ Site_city: address });
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    sessionStorage.setItem("selectedSupplierProduct", JSON.stringify(""));
    fetch(
      // `${API_URL}quotation/getsupplierprice?quotetype=${selectedOption}&refid=${rfid}&fuellevy=${fuelLvy}&defultdis=${selectedOptionMap}
      // `,
      `${API_URL}quotation/getsupplierprice?quotetype=${selectedOption}&refid=${rfid}&fuellevy=${fuelLvy}&defultdis=${selectedOptionMap}&Uom_order=${filters.Uom_order}&Catalog_code=${filters.Catalog_code}&Supplier_code=${filters.Supplier_store}&Supplier_store=${filters.Supplier_store}&Supplier_name=${filters.Supplier_name}&Truck_type=${filters.Truck_type}&Description=${filters.Description}&Site_city= ${filters.Site_city}&Latitude=${filters.Latitude}&Longitude=${filters.Longitude}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(filters),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet[0].ResultSet;
        const returnMsg = data.ResultSet[0].ReturnMessage[0];
        setSupplierProductTableData(datar);

        setLoading(false);
        if (returnMsg) {
          setAlertType("info");
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
        //
        const supplierStoreFilterValues = filters.Supplier_store.split(",").map(
          (value) => value.trim()
        );

        const Supplier_storeMatch = supplierStoreFilterValues.some((value) =>
          row.Supplier_store.toUpperCase().includes(value)
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
  const handleOptionChange = (event) => {
    sessionStorage.setItem("QouteGroup", event.target.value);
    setSelectedOption(event.target.value);
  };
  const handleMapOptionChange = (event) => {
    setSelectedOptionMap(event.target.value);
  };
  const getCalculatedTableData = async (rowDetails, rowIndex) => {
    console.log("rowDetails2", rowDetails);
    if (rowDetails.Price === 0) {
      const confirmed = window.confirm(
        "The price of the product return is $ 0. Do you want to proceed ?"
      );
      if (!confirmed) {
        return;
      }
    }
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

    try {
      const response = await fetch(
        `${API_URL}quotation/calproductrate?custcode=${custCode}&prod_grp=Q&calsortfee=1`,
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

  const handleRowClick = (calculatedData, rowIndex) => {
    console.log("model p", calculatedData);
    // getCalculatedTableData(rowDetails);
    setClickedRowIndex(rowIndex);
    setisDoubleClicked(true);
    setClickedRowIndices([rowIndex]);
    const updatedClickedRowIndices = [...clickedRowIndices, rowIndex];
    if (clickedRowIndices.includes(rowIndex)) {
      // window.alert("already added");
    }
    // setClickedRowIndices(updatedClickedRowIndices);
    //  setClickedRowIndices([rowIndex]);
    const updatedSelectedRows = [...selectedRows, calculatedData];
    // setSelectedRows(updatedSelectedRows);
    setSelectedRows([calculatedData]);
    console.log("selectedrows", selectedRows);
    console.log("rowDetails", calculatedData);
    console.log("updatedSelectedRows", updatedSelectedRows);
    // setTimeout(() => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem(
      "selectedSupplierProduct",
      JSON.stringify([calculatedData])
    );
    // setisDoubleClicked(false);
    // }, 500);
    //}
    setTimeout(() => {
      setisDoubleClicked(false);
    }, 1000);
    // setisDoubleClicked(false);
    if (props.onClose) {
      props.onClose();
    }
    // setisDoubleClicked(false);
  };

  useEffect(() => {
    if (sortTruckTypecheck) {
      getTruckTypeList();
    } else if (!sortTruckTypecheck) {
      getTruckTypeList();
    }
  }, [sortTruckTypecheck]);
  useEffect(() => {
    if (selectedOptionMap == "G") {
      getSupplierProductTableData();
    } else if (selectedOptionMap == "S") {
      getSupplierProductTableData();
    }
  }, [selectedOptionMap]);

  const handlesortTruckClick = () => {
    setsortTruckTypecheck(!sortTruckTypecheck);
    // getTruckTypeList();
  };

  const handlTruckTuypeOptionChange = (e) => {
    const selectedOption = e.target.value;
    console.log("selectedOption", selectedOption);
    setTruckTypeSelected(selectedOption);
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
  const closePopup = () => {
    // triger when  lookup closed default
    setSelectedComponent(""); // Clear the selected component
    setPopupVisible(false); // Close the popup
  };

  const handleButtonClick = (component, item) => {
    setItem(item);
    const address = item.Address_2;
    getCoordinatesFromAddress(address);
    setSelectedComponent(() => component);
    setPopupVisible(true);
  };

  const getCoordinatesFromAddress = (address) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAf3aGbbMvnOvzXK-LWhWWQNvv1qFeMjqY&libraries=places`;
      script.async = true;
      script.onload = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK" && results.length > 0) {
            const location = results[0].geometry.location;
            // resolve({ lat: location.lat(), lng: location.lng() });
            setDestination({ lat: location.lat(), lng: location.lng() });
            console.log("location", location);
          } else {
            reject(
              `Geocode was not successful for the following reason: ${status}`
            );
          }
        });
      };

      // Append the script element to the document
      document.head.appendChild(script);
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
              className="radio-group tabs slide-left-to-right"
              style={{
                justifyContent: "center",
                width: "550px",

                // marginLeft: "5%",
              }}
            >
              <label className="radiolabel tab" style={{ marginLeft: "-14px" }}>
                <input
                  className="productradiobtn"
                  type="radio"
                  value="SERVICE"
                  checked={selectedOption === "SERVICE"}
                  onChange={handleOptionChange}
                />
                SERVICE
              </label>

              <label className="radiolabel tab">
                <input
                  className="productradiobtn"
                  type="radio"
                  value="QUARRY"
                  checked={selectedOption === "QUARRY"}
                  onChange={handleOptionChange}
                />
                QUARRY
              </label>

              <label className="radiolabel tab">
                <input
                  className="productradiobtn"
                  type="radio"
                  value="CONCRETE"
                  checked={selectedOption === "CONCRETE"}
                  onChange={handleOptionChange}
                />
                CONCRETE
              </label>

              <label className="radiolabel tab">
                <input
                  className="productradiobtn"
                  type="radio"
                  value="GARDEN"
                  checked={selectedOption === "GARDEN"}
                  onChange={handleOptionChange}
                />
                GARDEN
              </label>

              <label className="radiolabel tab">
                <input
                  className="productradiobtn"
                  type="radio"
                  value="ASPHALT"
                  checked={selectedOption === "ASPHALT"}
                  onChange={handleOptionChange}
                />
                ASPHALT
              </label>
            </div>
          </CRow>
          {popupVisible && selectedComponent && (
            <div style={overlayStyle} onClick={() => closePopup()}>
              <div onClick={(e) => e.stopPropagation()}>
                {/* Render the selected component */}
                {selectedComponent === ProductTableMap && (
                  <ProductTableMap
                    onClose={closePopup}
                    latitudeA={item.Latitude}
                    longitudeA={item.Longitude}
                    longitudeB={Longitude}
                    latitudeB={Latitude}
                    //SupAddress={item.Address_1 + ", " + item.Address_2}
                    SupAddress={item.Address_2}
                    SupState={item.State}
                    CustAddress={address + "," + city}
                    SupName={item.Supplier_name}
                    //  CustCity={city}
                    // latitudeB={-37.8695562}
                    // longitudeB={145.0700005}
                  />
                )}
              </div>
            </div>
          )}
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
                  // type="checkbox"
                  // id="selectAll"
                  style={{}}
                  type="checkbox"
                  checked={sortTruckTypecheck}
                  onChange={handlesortTruckClick}
                  // onChange={() => setsortTruckTypecheck(!sortTruckTypecheck)}
                  // id={`rowCheckbox${index}`}
                  // checked={selectedQuotes.includes(item.Quote_no)}
                  // onChange={() =>
                  //   handleRowCheckboxClick(item.Quote_no)
                  // }
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
                  {/* <CSelect
                    size="sm"
                    style={{ width: "160px" }}
                    key={TruckTypeSelected}
                    onChange={handlTruckTuypeOptionChange}
                    value={TruckTypeSelected}
                  >
                    {TruckTypeListData.map((option) => (
                      <option value={option.Type} key={option.Type}>
                        {option.Desc}
                      </option>
                    ))}
                   
                  </CSelect> */}
                  <CSelect
                    size="sm"
                    style={{ width: "160px" }}
                    key={TruckTypeSelected}
                    onChange={handlTruckTuypeOptionChange}
                    value={TruckTypeSelected}
                    // value={
                    //   TruckTypeSelected ||
                    //   (TruckTypeListData.length > 0 &&
                    //     TruckTypeListData[1].Type)
                    // }
                  >
                    {/* Empty field */}
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
                    //disabled={!rfid || filters.Catalog_code == ""}
                    onClick={() => {
                      console.log("Button clicked");

                      if (!rfid) {
                        <Alert
                          //icon={<CheckIcon fontSize="inherit" />}
                          severity="success"
                        >
                          Here is a gentle confirmation that your action was
                          successful.
                        </Alert>;
                        //alert("Please select a Map ref.");
                        return;
                      }
                      if (!filters.Catalog_code) {
                        alert("Please select a Product code ");
                        return;
                      }
                      getSupplierProductTableData();
                    }}
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
                  left: 28,
                  top: 120,
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
                }}
              >
                <div className="box1ProductT m-0" />
                <h7 className="boxtext2 m-0 ml-1" style={{ color: "black" }}>
                  N/A
                </h7>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  marginLeft: "20px",
                }}
              >
                <div className="box1ProductT2 m-0" />
                <h7 className="boxtext2 m-0 ml-1" style={{ color: "black" }}>
                  Has future prices
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
                    // type="checkbox"
                    // id="selectAll"
                    style={{}}
                    type="checkbox"
                    // id={`rowCheckbox${index}`}
                    // const [hideZeroDistance, sethideZeroDistance] = useState(true);
                    checked={hideZeroDistance}
                    onChange={() => sethideZeroDistance(!hideZeroDistance)}
                    // onChange={() =>
                    //   handleRowCheckboxClick(item.Quote_no)
                    // }
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
                    // type="checkbox"
                    // id="selectAll"
                    style={{}}
                    type="checkbox"
                    checked={fuelLvy}
                    onChange={() => setcheckfuelLvy(!fuelLvy)}
                    // id={`rowCheckbox${index}`}
                    // checked={selectedQuotes.includes(item.Quote_no)}
                    // onChange={() =>
                    //   handleRowCheckboxClick(item.Quote_no)
                    // }
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
        <div className="Qt-ProductTable">
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
                    type=""
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
                    style={{ width: "160px" }}
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
                      width: "600px",
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
                  Quarry No
                  {isSortIconVisible &&
                    sortedColumn === "Supplier_code" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
                {selectedOptionMap == "S" && (
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
                {selectedOptionMap == "G" && (
                  <th
                    style={{ width: "120px" }}
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
                {selectedOptionMap == "G" && (
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
                            // handleRowClick(item, index)
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

                          {selectedOptionMap == "S" && (
                            <td style={{ textAlign: "right" }}>
                              {item.Distance.toFixed(2)}
                            </td>
                          )}

                          {selectedOptionMap == "G" && (
                            <td style={{ textAlign: "right" }}>
                              {item.Distance_str}
                              <button
                                className="mapPTable"
                                onClick={() =>
                                  handleButtonClick(ProductTableMap, item)
                                }
                              >
                                <img
                                  src={googlemapIcon}
                                  className=""
                                  alt="Map Icon"
                                  style={{
                                    width: "17px",
                                    height: "17px",
                                    marginLeft: "20px",
                                  }}
                                />
                              </button>
                            </td>
                          )}

                          {selectedOptionMap == "G" && (
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
