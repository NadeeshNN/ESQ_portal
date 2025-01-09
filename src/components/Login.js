import { Card } from "@mui/material";
import React, { Component } from "react";
import { variables } from "./variables";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: "",
      Auth_role: "",
      EmpFist_Name: "",
      Emp_id: "",
      EmpDetails: [],
    };
  }

  createClick() {
    sessionStorage.setItem("Password", this.state.EmpFist_Name);
    sessionStorage.setItem("UserName", this.state.UserName);
  }

  changePassword = (e) => {
    this.setState({ Password: e.target.value });
  };
  changeUserName = (e) => {
    this.setState({ UserName: e.target.value });
  };

  render() {
    return (
      <div className="loginbackground">
        <card
          className="logincard"
          style={{
            backgroundColor: " rgba(255, 255, 255, .15)",
            backdropFilter: "blur(1px)",
            boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .8)",
            zIndex: 9999,
            borderRadius: "20px",
          }}
        >
          <h2 className="welcometxt">EMPLOYEE MANAGEMENT </h2>
          <h2 className="logintxt">SIGN IN </h2>

          <div
            className="m-4 logincard"
            style={{
              alignItems: "Block",
              display: "Block",
              marginTop: "40px",
              width: 300,
            }}
          >
            <div className="col-6 lgninputgroup">
              <div className="input-group ">
                <span className="input-group-text"></span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={this.state.UserName}
                  onChange={this.changeUserName}
                />
              </div>
            </div>
            <div className="col-6 lgninputgroup">
              <div className="input-group">
                <span className="input-group-text"></span>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.Password}
                  onChange={this.changePassword}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={() => this.createClick()}
            className="loginbtn"
          >
            SIGN IN
          </button>
        </card>
      </div>
    );
  }
}

export default Login;
