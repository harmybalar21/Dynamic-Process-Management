import React from 'react';
import  { Navigate } from "react-router-dom"

const Protected = ({children}) => {
    // console.log(children)
    const token = localStorage.getItem("token")
//  console.log(token)
    if(!token){
        return <Navigate to='/' replace></Navigate>
    }
    return children;
};

export default Protected;