import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from "./component/Popup";



function Fetchtable() {
    const [rec, setRec] = useState([]);

    const [calldel,setCalldel]=useState(false);
    const [delkey,setDelkey]=useState(" ");
    
    const fetch = () => {
        axios.get('http://localhost:5050/api/call/userinfo/')
            .then(res => setRec(res.data))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetch();
    }, [!calldel])

    const delmap=(key)=>{
        setCalldel(true);
        setDelkey(key); 
    }
    function del(email) {
        
        const url = 'http://localhost:5050/api/call/userinfo/delete/' + email;
        console.log(url);
        axios.delete(url)
            .then(res => console.log("deleted"))
            .catch(error => console.log(error));
        
    }


    return (
       
       <div> 
       
        <div className='tabledesign'>
            
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Mobile</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rec.map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.mobile}</td>
                                <td>{user.dob}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button onClick={() => {delmap(user.email)}} className='deletebtn' >Delete</button>
                                    <Link to='/Edit' state={{ obj:{user} }}><button className='editbtn' >Edit</button></Link>
                                </td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
            
           
        </div>

<div >
{calldel && (<Popup
closeoption={() => {
setCalldel(false);
}}
checkcall={() => {

setCalldel(false);            
del(delkey);
}}
message={"Do you want to delete"}
 className="delpop"/>)}

</div>
</div>
       
    )
}
export default Fetchtable;

