import React from 'react';
import ReactDOM from 'react-dom'; 
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Dashboard from './components/UserMaster/Dashboard.jsx';
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import SignUp from './components/SignUp.jsx';
import { BrowserRouter as  Routes, Route } from 'react-router-dom';
import Protected from './components/Protected.jsx';

import FormMaster from './components/FormMaster/FormMaster.jsx';
// import FDashboard from './components/FormMaster/FDashboard.jsx';




const router = createBrowserRouter(
  createRoutesFromElements(
   
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard/> }/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/formmaster' element={<FormMaster/>}></Route>
    </Route>
   
 )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
