
import './App.css';
//import axios from 'axios';
import React from 'react'; 

import { Route,Routes ,} from 'react-router-dom';
import Add from './Add';
import Home from './home';
import Edit from './Edit';


function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/Add" element={<Add/>}/>
        <Route path='/Edit' element={<Edit />}/>
      </Routes>
    
    
  );
}

export default App;

