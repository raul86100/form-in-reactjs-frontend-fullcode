import React, { useEffect, useState } from "react";
import "./Add.css";
import "./App.css";
import logo from "./divumimages.png";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Popup from "./component/Popup";
function Add() {
  const [addtitle, setAddtitle] = useState(false);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //validation states
  const [ferror, Setferror] = useState(false);
  const [cemail, Setcemail] = useState({ condition: false, message: " " });
  const [vfirstname, setVfirstname] = useState({
    condition: false,
    message: " ",
  });
  const [vlastname, setVlastname] = useState({
    condition: false,
    message: " ",
  });
  const [vmobile, setVmobile] = useState({ condition: false, message: " " });
  const [emailapi, setEmailapi] = useState({});
  //editobject

  //pop state
  const [pop, setPop] = useState(false);
  const submitpop = (e) => {
    e.preventDefault();
    setPop(true);
  };
  //email validation
  useEffect(() => {
    if (email.length > 0) validateemail();
    else Setcemail({ ...cemail, condition: false, message: "" });
  }, [email]);

  const validateemail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in)$/;
    if (!emailRegex.test(email)) {
      Setcemail({ ...cemail, condition: true, message: "*Invalid" });
    } else {
      axios
        .get("http://localhost:5050/api/call/userinfo/getbyid/" + email)
        .then((res) => setEmailapi(res.data))
        .catch((err) => console.log(err));
      if (emailapi.length === 0)
        Setcemail({ ...cemail, condition: false, message: "" });
      else {
        Setcemail({ ...cemail, condition: true, message: "*alreadyexist" });
      }
    }
  };

  //firstname validation
  useEffect(() => {
    if (firstname.length < 3 && firstname.length > 0) {
      setVfirstname({ ...cemail, condition: true, message: "*min three char" });
    } else if (firstname.length > 2) {
      validatefirstname();
    } else {
      setVfirstname({ ...vfirstname, condition: false, message: " " });
    }
    console.log(firstname);
  }, [firstname]);
  const validatefirstname = () => {
    const nameregex = /^[a-zA-Z]+$/;
    if (nameregex.test(firstname)) {
      setVfirstname({ ...vfirstname, condition: false, message: "  " });
    } else {
      setVfirstname({
        ...vfirstname,
        condition: true,
        message: "*no number and spl",
      });
    }
  };

  //lastname validation
  useEffect(() => {
    if (lastname.length > 0) validatelastname();
    else setVlastname({ ...vlastname, condition: false, message: "  " });
  }, [lastname]);
  const validatelastname = () => {
    const nameregex = /^[a-zA-Z]+$/;
    if (nameregex.test(lastname)) {
      setVlastname({ ...vlastname, condition: false, message: "  " });
    } else {
      setVlastname({
        ...vlastname,
        condition: true,
        message: "*no number and spl",
      });
    }
  };

  //mobile
  useEffect(() => {
    if (mobile.length > 0) {
      validatemobile();
    }
     else setVmobile({ ...vmobile, condition: false, message: " " });
  }, [mobile]);
  const validatemobile = () => {
    const mobileregex = /^\d{10}$/;
    if (!mobileregex.test(mobile)) {
      setVmobile({ ...vmobile, condition: true, message: "*must be 10 digit" });
    }
    
    else setVmobile({ ...vmobile, condition: false, message: " " });
  };

  //address
  useEffect(() => {
    if (address.length < 50) validateaddress();
  }, [address]);
  const validateaddress = () => {};
  //editcall
  const location = useLocation();
  const { editobj } = location.state;
  const dat =
    editobj.user.dob.slice(6, 10) +
    "-" +
    editobj.user.dob.slice(3, 5) +
    "-" +
    editobj.user.dob.slice(0, 2);
  useEffect(() => {
    if (editobj.user.email.length === 0) {
      //call add
      setAddtitle(true);
    } else {
      setFirstname(editobj.user.firstname);
      setLastname(editobj.user.lastname);
      setAddress(editobj.user.address);
      setDob(dat);
      setMobile(editobj.user.mobile);
      setEmail(editobj.user.email);
    }
    console.log(addtitle);
  }, []);

  //date

  const date = new Date();
  let day =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
  let mon =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();

  let currentDate = year + "-" + mon + "-" + day;
  //update api call
  function update() {
    const apidata = {
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      dob:
        "" + dob.slice(8, 10) + "-" + dob.slice(5, 7) + "-" + dob.slice(0, 4),
      address: address,
      email: editobj.user.email,
    };

    const url = "http://localhost:5050/api/call/userinfo/update/";
    console.log(url);
    axios
      .put(url, apidata)
      .then((res) => console.log("updatedhooooo", apidata))
      .catch((error) => console.log(error));
  }

  //add api call
  function add() {
    const url =
      "http://localhost:5050/api/call/userinfo/add/" +
      email +
      "/" +
      firstname +
      "/" +
      lastname +
      "/" +
      mobile +
      "/" +
      dob.slice(8, 10) +
      "-" +
      dob.slice(5, 7) +
      "-" +
      dob.slice(0, 4) +
      "/" +
      address +
      "/";
    axios
      .post(url)
      .then((res) => console.log("inserted"))
      .catch((error) => console.log(error));
  }

  const formValidate = (e) => {
    if (
      email.length !== 0 &&
      firstname !== 0 &&
      lastname.length !== 0 &&
      mobile.length === 10 &&
      dob.length !== 0 &&
      address.length !== 0
    ) {
      if (editobj.user.email.length === 0) {
        add();
        navigate("/");
      } else {
        update();
        navigate("/");
      }
    } else {
      Setferror(true);
      setPop(false);
    }
  };
  const check = () => {
    if (addtitle) {
      return cemail;
    } else {
      return !cemail;
    }
  };
  return (
    <div>
      <Link to="/">
        <img src={logo} className="App-logo1" alt="logo" />
      </Link>

      <div className="add_mainlayout">
        <div className="innerlayout">
          <form onSubmit={submitpop}>
            <div>{addtitle ? <h1>ADD</h1> : <h1>Edit</h1>}</div>
            <div className="addcontent">
              <div className="part1">
                <div>
                  <label>email</label>
                </div>

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
                <div>
                  <label> </label>
                </div>
                <div>
                  <label> </label>
                </div>
              </div>
              <div className="part2">
                <div className="emailfield">
                  <input
                    color="red"
                    type="email"
                    placeholder="email"
                    className="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={addtitle ? null : email}
                    disabled={!addtitle}
                    required
                  />
                  <div>
                    {cemail.condition && addtitle && (
                      <p className="erroremail">{cemail.message}</p>
                    )}
                  </div>
                </div>

                <div className="mobile">
                  <input
                    type="text"
                    placeholder="firstname"
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    value={addtitle ? null : firstname}
                    required
                  />
                  <div>
                    {vfirstname.condition && (
                      <p className="erroremail">{vfirstname.message}</p>
                    )}
                  </div>
                </div>
                <div className="mobile">
                  <input
                    type="text"
                    placeholder="lastname"
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    value={addtitle ? null : lastname}
                    autoComplete="off"
                    required
                  />
                  <div>
                    {vlastname.condition && (
                      <p className="erroremail">{vlastname.message}</p>
                    )}
                  </div>
                </div>
                <div className="mobile">
                  <input
                    type="text"
                    placeholder="mobilenumber"
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    value={addtitle ? null : mobile}
                    required
                  />
                  <div>
                    {vmobile.condition && (
                      <p className="erroremail">{vmobile.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="date"
                    min="1980-01-01"
                    max={currentDate}
                    onChange={(e) => {
                      setDob(e.target.value.toString());
                    }}
                    value={addtitle ? null : dob}
                    data-testid="dob"
                    required
                  />
                </div>
                <div>
                  <textarea
                    type="text"
                    maxLength="50"
                    rows="3"
                    cols="30"
                    placeholder="Max50charactor"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    value={addtitle ? null : address}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="dsubmit">
              <input
                type="submit"
                className="submitbtn"
                data-testid="submitbtn"
                disabled={
                  pop || vmobile.condition || check || vfirstname.condition
                }
              />
            </div>
            {ferror && <p>fill all field</p>}
          </form>
        </div>
      </div>
      <div data-testid="popmessage">
        {pop && (
          <Popup
            closeoption={() => {
              setPop(false);
            }}
            checkcall={() => {
              formValidate();
            }}
            message={"Do you want to submit"}
            />
        )}
      </div>
    </div>
  );
}
export default Add;
