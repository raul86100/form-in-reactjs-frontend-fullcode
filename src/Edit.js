import React, { useState, useEffect } from "react";
import "./Add.css";
import "./App.css";
import logo from './divumimages.png';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


function Edit() {
  const location = useLocation();
  const { obj } = location.state;
  //const [semail, setEmail] = useState("");
  const [sfirstname, setFirstname] = useState("");
  const [slastname, setLastname] = useState(" ");
  const [smobile, setMobile] = useState(" ");
  const [sdob, setDob] = useState(" ");
  const [saddress, setAddress] = useState(" ");
  const navigate = useNavigate();
  const dat=(obj.user.dob).slice(6,10)+"-"+(obj.user.dob).slice(3,5)+"-"+(obj.user.dob).slice(0,2);
  useEffect(() => {
  setFirstname(obj.user.firstname);
  setDob(dat);
  setLastname(obj.user.lastname);
  setMobile(obj.user.mobile);
  setAddress(obj.user.address);
  }, []);
  //console.log(obj);
 
  const date = new Date();
  let day =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
  let mon =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();

  let currentDate = year + "-" + mon + "-" + day;
  

  function update() {
    const apidata= {
      'firstname':sfirstname,
      'lastname':slastname,
      'mobile':smobile,
      'dob':''+sdob.slice(8,10)+'-' +sdob.slice(5, 7) +'-'+sdob.slice(0, 4),
      'address':saddress,
      'email':obj.user.email
     };

    const url ='http://localhost:5050/api/call/userinfo/update/';
    console.log(url);
 axios.put(url,apidata)
      .then((res) => console.log("updatedhooooo",apidata))
      .catch((error) => console.log(error));
  }

  return (
    <div>
    <img src={logo} className="App-logo1" alt="logo" />
    <div className="add_mainlayout">
        
      <div className="innerlayout">
        <form
          onSubmit={() => {
            window.confirm("Are you sure to update");
            
            update();
            navigate("/");
          }}
        >
          <h1>Edit</h1>
          <div className="addcontent">
            <div className="part1">
              <label>email</label>
              <div>
                <label>Firstname</label>
              </div>
              <div>
                <label>Lastname</label>
              </div>
              <div>
                <label>Mobilenumber</label>
              </div>
              <div>
                <label>Date of Birth</label>
              </div>
              <div>
                <label>Address</label>
              </div>
              <div><label>    </label></div>
              <div><label>    </label></div>
            </div>
            <div className="part2">
              <input
                type="text"
                placeholder="email"
                className="email"
                value={obj.user.email} />
              <div>
                <input
                  type="text"
                  placeholder="firstname"
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                value={sfirstname}/>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="lastname"
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  value={slastname} />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="mobilenumber"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  value={smobile}/>
              </div>
              <div>
                <input
                  type="date"
                  min="1980-01-01"
                  max={currentDate}
                  onChange={(e) => {
                    setDob(e.target.value.toString());
                  }}
                  value={sdob}/>
              </div>
              <div className="textarea">
                <textarea
                  type="text"
                  maxLength="50"
                  rows="3"
                  cols="30"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={saddress}/>
              </div>
            </div>
          </div>
          <div className="dsubmit">
            <input type="submit" value="Update" className="updatebtn"/>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
export default Edit;