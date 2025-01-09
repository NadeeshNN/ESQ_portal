import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSelect,
} from "@coreui/react";
import FindInPageIcon from "@mui/icons-material/FindInPage";
export default function EFTDetauls_sup() {
  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "80vh", height: "75vh" }}
    >
      <CCardHeader className="headerEQModal"> Supplier EFT</CCardHeader>
      <CCardBody style={{ alignItems: "center" }}>
        <CRow>
          <CCol>
            <div>
              {/* Sub-row 1 */}

              <div className="inputdiv50">
                <CInputGroup>
                  <CInputGroupText className="small-input-text">
                    Supplier Code:
                  </CInputGroupText>
                  <CInput type="text" size="sm" />
                  <FindInPageIcon />
                </CInputGroup>
              </div>
              {/* Sub-row 2 */}
              <div className="inputdiv50">
                <CInputGroup>
                  <CInputGroupText className="small-input-text">
                    Name:
                  </CInputGroupText>
                  <CInput type="text" size="sm" />
                </CInputGroup>
              </div>

              {/* Sub-row 3 */}

              <div className="inputdiv50">
                <CInputGroup>
                  <CInputGroupText className="small-input-text">
                    Account Name :
                  </CInputGroupText>

                  <CInput type="text" size="sm" />
                </CInputGroup>
              </div>
              {/* Sub-row 4 */}

              <div className="inputdiv50">
                <CInputGroup>
                  <CInputGroupText className="small-input-text">
                    BSB No:
                  </CInputGroupText>
                  <CInput type="text" size="sm" />-
                  <CInput type="text" size="sm" />
                </CInputGroup>
              </div>
              <div className="inputdiv50">
                <CInputGroup>
                  <CInputGroupText className="small-input-text">
                    Account No:
                  </CInputGroupText>
                  <CInput type="text" size="sm" />
                </CInputGroup>
              </div>
              <div className="inputdiv50">
                <CInputGroup>
                  <CInputGroupText className="small-input-text">
                    Status:
                  </CInputGroupText>
                  <CInput type="text" size="sm" />{" "}
                  <CSelect type="text" size="sm" className=" inputtextdark">
                    <option value=""></option>
                    <option value="1">1</option>
                  </CSelect>
                </CInputGroup>
              </div>

              {/* Sub-row 5 */}
              <div className="sub-row-7">
                <div className="inputdiv">
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Modified On:
                    </CInputGroupText>
                    <CInput type="text" size="sm" />
                  </CInputGroup>
                </div>
                <div className="inputdiv">
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Verified On:
                    </CInputGroupText>
                    <CInput type="text" size="sm" />
                  </CInputGroup>
                </div>
              </div>

              <div className="sub-row-7">
                <div className="inputdiv">
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Modified By:
                    </CInputGroupText>
                    <CInput type="text" size="sm" />
                  </CInputGroup>
                </div>
                <div className="inputdiv">
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Verified By:
                    </CInputGroupText>
                    <CInput type="text" size="sm" />
                  </CInputGroup>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
}
