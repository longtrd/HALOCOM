import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Layout.Header>
      <div className="header">
        <Link to="/">
          <img className="logo" src={require("../views/Home/images/h-logo.svg")} alt="" />
        </Link>

        <div style={{ minWidth: "fit-content" }}>
          <span style={{ fontWeight: "bold", marginLeft: 24 }}>by </span>
          <img
            className="logo-algolia"
            src={require("../views/Home/images/logo-algolia.png")}
            alt=""
          />

          <img
            className="setting-icon"
            src={require("../views/Home/images/h-setting.svg")}
            alt=""
          />
        </div>
      </div>
    </Layout.Header>
  );
}

export default Header;
