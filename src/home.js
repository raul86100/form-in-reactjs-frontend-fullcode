import React from "react";
import logo from "./divumimg.svg";
import Fetchtable from "./Fetchtable";
import { Link } from "react-router-dom";

const Home = () => {
  const user = {
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
    dob: "",
    address: "",
  };
  return (
    <div className="homepage">
      <div className="main_layout">
        <div className="header">
          {" "}
          <img src={logo} className="App-logo" alt="logo" />
          <div className="headerbutton">
            <Link to="/Add" state={{ editobj: { user } }}>
              <button className="addbutton">Add+</button>
            </Link>
          </div>
        </div>
        <Fetchtable />
      </div>
    </div>
  );
};

export default Home;
