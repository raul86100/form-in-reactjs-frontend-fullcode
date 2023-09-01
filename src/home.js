import React from 'react'
import logo from './divumimages.png';
import Fetchtable from './Fetchtable';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className='homepage'>
<div className="main_layout">
    <div className="header"> <img src={logo} className="App-logo" alt="logo" />
      <div className="headerbutton"><Link to='/Add'><button className="addbutton">Add+</button></Link></div></div>
      <Fetchtable />
    </div>
    </div>

  )
}

export default Home;