import { useState } from 'react';
// import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Header/NavBar';
import Footer from './Components/Footer/Footer';
import Carousel from './Components/Header/Carousel';
import About from './Components/Body/About';
import Contact from './Components/Body/Contact';
// import jwt_decode from "jwt-decode";
// import Dashboard from './Components/Body/Dboard';
import Admin from './Components/Admin/Admin';
import List from './Components/Body/List2';
import Detail from './Components/Body/Detail2';
import Special from './Components/Body/Special2';
// import PrivateRoute from './Components/Admin/PrivateRoute';
import PrivateRoute from './Components/Admin/PrivateRoute';
// import Login from './Components/Login';

import { Route, Routes } from 'react-router-dom';
// import Flagkit from './Components/Body/Flagkit';
// import PrivateRoute from './Components/Admin/Private';
import Detail3 from './Components/Admin/Detail3';

function App() {
 

  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<><Carousel /><List /></>} />
        <Route path='/about' element={<><Carousel /><About /></>} />
        <Route path='/contact' element={<><Carousel /><Contact /></>} />
        <Route path='/detail/:id' element={<><Carousel/><Detail3 /></>} />
        <Route path='/special' element={<><Carousel /><Special /></>} />


      
      
       
        <Route 
          path='/admin' element={
            <PrivateRoute>
          <Admin/>
          </PrivateRoute>
          } />

      </Routes>

      <Footer />
      

    </>
  );
}

export default App;
