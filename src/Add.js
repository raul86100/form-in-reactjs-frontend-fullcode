import React, { useEffect, useState } from "react";
import "./Add.css";
import "./App.css";
import logo from "./divumimages.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./component/Popup";
function Add() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState(" ");
  const [mobile, setMobile] = useState(" ");
  const [dob, setDob] = useState(" ");
  const [address, setAddress] = useState(" ");
  const navigate = useNavigate();
//validation states
  const [ferror, Setferror] = useState(false);
  const [cemail, Setcemail] = useState({ condition: false, message: " " });
  const [vfirstname,setVfirstname]=useState({condition :false , message:" "});
  const [vmobile,setVmobile]=useState({condition :false , message:" "});
  const [emailapi, setEmailapi] = useState({});
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
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
useEffect(()=>{
  if(firstname.length <3 && firstname.length>0) setVfirstname({ ...cemail, condition: true, message: "*min three char" });
  else if(firstname>2){validatefirstname();}
  else setVfirstname({ ...vfirstname, condition:false, message: " " });

},[firstname]);
const validatefirstname=()=>{
  const nameregex=/[a-zA-Z]+/;
 
  
  
  if(nameregex.test(firstname)  ){setVfirstname({ ...vfirstname, condition: false, message: "  " });
  }
  else{
    setVfirstname({ ...vfirstname, condition: true, message: "*no number and spl" });



  }

}





  //lastname validation
useEffect(()=>{
  if(lastname.length >0) validatelastname();

},[lastname]);
const validatelastname=()=>{


}


//mobile
useEffect(()=>{
 
  if(mobile.length >1) {validatemobile();}
  else setVmobile({ ...vmobile, condition:false, message: " " });

},[mobile]);
const validatemobile=()=>{
  const mobileregex=/^\d{10}$/;
  if(!mobileregex.test(mobile)){setVmobile({ ...vmobile, condition:true, message: "must 10 digit" }); }


else setVmobile({ ...vmobile, condition: false, message: " " });
}

//address
useEffect(()=>{
if(address.length<50) validateaddress();

},[address]);
const validateaddress=()=>{

}






  const date = new Date();
  let day =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
  let mon =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();

  let currentDate = year + "-" + mon + "-" + day;

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
  const obj = {
    firstname: firstname,
    lastname: lastname,
    mobile: mobile,
    dob: dob,
    address: address,
    email: email,
  };
  const formValidate = (e) => {
   
    if (
      obj.email.length !== 0 &&
      obj.firstname !== 0 &&
      obj.lastname.length !== 0 &&
      obj.mobile.length === 10 &&
      obj.dob.length !== 0 &&
      obj.address.length !== 0
    ) {
      add();
      navigate("/");
    } else {
      Setferror(true);
      setPop(false);
    }
  };

 

  return (
    <div>
      
      <img src={logo} className="App-logo1" alt="logo" />


      <div className="add_mainlayout">
        
        <div className="innerlayout">
          <form onSubmit={submitpop}>
            <div><h1>ADD</h1></div>
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
                  />
                  <div>
                    {cemail.condition && (
                      <p className="erroremail">{cemail.message}</p>
                    )}
                    {ferror && (
                  
                    <label>eror </label>
                  
                    )}
                
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="firstname"
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  required/>
                  <div>
                    {vfirstname.condition && (
                      <p className="erroremail">{vfirstname.message}</p>
                    )}
                    {ferror && (
                  
                    <label>eror </label>
                  
                    )}
                
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="lastname"
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  required/>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="mobilenumber"
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  required/>
                  <div>
                    {vmobile.condition && (
                      <p className="errormobile">{vmobile.message}</p>
                    )}
                    {ferror && (
                  
                    <label>eror </label>
                  
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
                  required/>
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
                  required/>
                </div>
              </div>
            </div>
            <div className="dsubmit">
              <input type="submit" className="submitbtn" />
            </div>
            {ferror && <p>fill all field</p>}
          </form>
        </div>
      </div>
      <div>{pop && (
      <Popup
        closeoption={() => {
          setPop(false);
        }}
        checkcall={() => {
          formValidate();
        }}
        message={"Do you want to submit"}
      />
    )}</div>
      
    </div>
    
  );
}
export default Add;
