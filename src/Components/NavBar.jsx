import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <h1>Site</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Link style={{ marginRight: "8px" }} to="/">
          Home
        </Link>
        <Link style={{ marginRight: "8px" }} to="/about">
          About
        </Link>
        <Link style={{ marginRight: "8px" }} to="/login">
          Login
        </Link>
        <Link style={{ marginRight: "8px" }} to="/register">
          Register
        </Link>
        <Link style={{ marginRight: "8px" }} to="/form">
          Form
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
