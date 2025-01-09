import { CRow } from "@coreui/react";
import React from "react";
import FindInPageIcon from "@mui/icons-material/FindInPage";

export default function PriceListTable_sup() {
  return (
    <div>
      <CRow>
        <div
          style={{
            display: "flex",
            marginLeft: "20px",
          }}
        >
          <div>
            <label>
              <input
                className="productradiobtn"
                // type="checkbox"
                // id="selectAll"
                style={{}}
                type="checkbox"
                // id={`rowCheckbox${index}`}
                // const [hideZeroDistance, sethideZeroDistance] = useState(true);
                //checked={hideZeroDistance}
                //onChange={() => sethideZeroDistance(!hideZeroDistance)}
                // onChange={() =>
                //   handleRowCheckboxClick(item.Quote_no)
                // }
              />
              Show Old Price
            </label>
          </div>

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              marginLeft: "20px",
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
        </div>
      </CRow>
      <div className="Qt-ContactTable">
        <table class="tableQt-SiteTable" style={{ marginTop: "10px" }}>
          <thead
            class="tableQt-SiteTable-grey-header"
            style={{
              height: "3px",
              position: "sticky",
              top: "0",
              fontSize: "11px",
            }}
          >
            <tr>
              <th>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder=""
                    //value={filters.Catalog_code}
                    // onChange={(e) =>
                    //   handleFilterChange("Catalog_code", e.target.value)
                    // }
                    style={{ width: "150px" }}
                  />
                  <FindInPageIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "2%",
                      transform: "translateY(-50%)",
                      color: "black",
                      cursor: "pointer",
                      height: "20px",
                      width: "20px",
                    }}
                  />
                </div>
              </th>
              <th>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder=""
                    // value={filters.Description}
                    // onChange={(e) =>
                    //   handleFilterChange("Description", e.target.value)
                    // }
                    style={{ width: "150px" }}
                  />
                  <FindInPageIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "2%",
                      transform: "translateY(-50%)",
                      color: "black",
                      cursor: "pointer",
                      height: "20px",
                      width: "20px",
                    }}
                  />
                </div>
              </th>
              <th>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder=""
                    // value={filters.Uom_order}
                    // onChange={(e) =>
                    //   handleFilterChange("Uom_order", e.target.value)
                    // }
                    style={{ width: "280px" }}
                  />
                  <FindInPageIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "2%",
                      transform: "translateY(-50%)",
                      color: "black",
                      cursor: "pointer",
                      height: "20px",
                      width: "20px",
                    }}
                  />
                </div>
              </th>
              <th>
                <input
                  type="text"
                  placeholder=""
                  disabled
                  // value={filters.Supplier_name}
                  // onChange={(e) =>
                  //   handleFilterChange("Supplier_name", e.target.value)
                  // }
                  style={{
                    width: "150px",
                    backgroundColor: "rgba(247, 247, 247, 0.923)",
                    border: "2px solid white",
                  }}
                />
              </th>
              <th>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder=""
                    // value={filters.Supplier_name}
                    // onChange={(e) =>
                    //   handleFilterChange("Supplier_name", e.target.value)
                    // }
                    style={{ width: "70px" }} // Adjust paddingRight to leave space for the icon
                  />
                  <FindInPageIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "2%",
                      transform: "translateY(-50%)",
                      color: "black",
                      cursor: "pointer",
                      height: "20px",
                      width: "20px",
                    }}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th style={{ width: "150px" }}>Quarry</th>
              <th style={{ width: "150px" }}>Product Code</th>
              <th style={{ width: "280px" }}>Description</th>
              <th style={{ width: "150px" }}>Effective Date</th>
              <th style={{ width: "70px" }}>UOM</th>
              <th style={{ width: "70px" }}>Is Availble</th>
              <th style={{ width: "70px" }}>Price</th>
              <th style={{ width: "70px" }}>Margin</th>
              <th style={{ width: "170px" }}>Total(Price + Margin)</th>
            </tr>
          </thead>
          <tbody>
            {/* {loading && ( */}
            <tr>
              <td colSpan="19">
                {/* <LinearProgress style={{ width: "100%" }} /> */}
              </td>
            </tr>
            {/* )} */}
            {/* {!loading &&
                  (siteContact?.length > 0 ? (
                    siteContact.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="siteThover-effect"
                          style={{
                            fontSize: "9px",
                            height: "5px",
                            marginBottom: "0px",
                            padding: "0px",
                            marginTop: "0px",
                          }}
                          onDoubleClick={() =>
                            handleRowClick(item.Contact, item.Telephone)
                          }
                        >
                          <td style={{}}>{item.Contact}</td>
                          <td style={{}}>{item.Telephone}</td>

                          {/* 
                
                      <td>{item.Total_price}</td> 
                        </tr>
                      
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="19">No data available</td>
                    </tr>
                  ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
