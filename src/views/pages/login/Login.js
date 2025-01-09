import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {  useHistory } from "react-router-dom";

import { API_URL } from "src/components/util/config";
import { setUserSession } from "src/components/util/Common";

// import { CheckUser } from "src/containers/TheSidebar";
const Login = (props) => {
  const [error, setMessage] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = () => {
    // props.history.push("/dashboard");

    setMessage(null);
    let UserToken = {
      UserName: username,
      Password: password,
    };

    if (username === "" && password === "") {
      setMessage("Username and Password cannot be Empty!");
    } else if (username === "" && password !== "") {
      setMessage("Username cannot be Empty!");
    } else if (username !== "" && password === "") {
      setMessage("Password cannot be Empty!");
    } else {
      fetch(`${API_URL}userlogin/login`, {
        method: "POST",
        mode: "cors",
        headers: new Headers({
          "content-type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify(UserToken),
      })
        .then((response) => response.json())
        .then((data) => {
          //const result = data.ResultSet[0];

          if (data.IsSuccess === true) {
            setUserSession(data.ResultSet[0].Username);
            localStorage.setItem("AccessToken", data.AccessToken);
            history.push("/dashboard");
          } else {
            alert("Invalid user");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage(error.ReturnMessage);
        });
    }
  };

  const EnterLogin = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      className="c-app c-default-layout flex-row align-items-center"
      style={{
        backgroundImage: ``,
        backgroundSize: "cover",
        backgroundColor: "grey",
      }}
    >
      <CContainer style={{ opacity: "0.92" }}>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard
                className="p-4"
                style={{
                  // backgroundColor: "#2c3e50",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "10px",
                }}
              >
                <CCardBody>
                  <CForm>
                    <div style={{ position: "relative" }}>
                      {/* <img
                            src={imglogin}
                            alt="Logo"
                            style={{ display: "block", margin: "auto" }}
                          ></img> */}
                      <h1
                        style={{
                          color: "white",
                          display: "block",
                          margin: "auto",
                          textAlign: "center",
                          fontSize: "20px",
                        }}
                      >
                        ESSENDON QUARRIES
                      </h1>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "30px",
                          backgroundColor: "#990000",
                          zIndex: -1,
                          borderRadius: "5px",
                          marginBottom: "30px",
                        }}
                      />
                    </div>
                    <br></br>
                    {/* <h1>Login</h1> */}
                    {/* <p className="text-muted">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => EnterLogin(e)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="12">
                        <div>
                          {error && (
                            <p className="error" style={{ color: "red" }}>
                              {error}
                            </p>
                          )}
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          className="px-4"
                          onClick={handleLogin}
                          style={{ backgroundColor: "#990000", color: "white" }}
                        >
                          Login
                        </CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
