import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import { Link } from 'react-router-dom';
import Popup from "./component/Popup";
import edit from './edit.png';
import dele from './delete.png';



function Fetchtable() {
    const [rec, setRec] = useState([]);

    const [calldel,setCalldel]=useState(false);
    const [delkey,setDelkey]=useState("");
    const[search,setSearch]=useState("");
    
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
        <div className='popdel' >
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
          <div className='searchbox'> <input type='text' className='search' placeholder='Search by firstname' onChange={(e)=>{setSearch((e.target.value).toLowerCase())}}/></div>
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
                        rec.filter((user)=>{
                            return search.toLowerCase()===''? user :user.firstname.toLowerCase().includes(search);
                        }).slice(0,10).map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.mobile}</td>
                                <td>{user.dob}</td>
                                <td>{user.address}</td>
                                <td>
                                    <Link to='/Add' state={{ editobj:{user} }} data-testid={user.email}><button className='homedeletebtn' ><img src={edit} width="25px" height="25px"/></button></Link>
                                    <button onClick={() => {delmap(user.email)}} className='homeeditbtn' ><img src={dele} width="25px" height="25px"/></button>
                                </td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
            
           
        </div>


</div>
       
    )
}
export default Fetchtable;

