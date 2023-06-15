import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

const Routing = () => {
//add code here
  return (
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<App />} /> 
           <Route path='about' element={<About />} /> 
           <Route path='contact' element={<Contact />} /> 
           {/* <Route path='/' element={<App />} /> 
           <Route path='/' element={<App />} /> 
           <Route path='/' element={<App />} />  */}
        </Routes>
    </BrowserRouter>
  )
}

export default Routing