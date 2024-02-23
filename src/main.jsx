import React from 'react';
import ReactDOM from 'react-dom'; 
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import { createRoot } from 'react-dom/client';
import SignUp from './components/SignUp.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Login />} />
      <Route path='/DashBoard' element={<Dashboard />}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
