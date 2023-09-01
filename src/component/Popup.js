import React from "react";
import "./popup.css";


const Popup = ({ closeoption, checkcall, message }) => {

  return (
    
    <div className="card_layout">
      <p>{message}</p>
      <div className="cbtn"><button onClick={closeoption} onBlur={closeoption} className='editbtn'>Close</button>
     <div> <button onClick={checkcall} onBlur={closeoption} className='editbtn'>Continue</button></div></div>

    </div>

  );
};

export default Popup;
