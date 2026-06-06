import React, { Children } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtctedRoute = ({Children}) => {
    const isAuthenticated = true;
    const loading=false;
    const location=useLocation;

    if(loading){
        // you can add a loading spinner here if you want
        return <div>loading...</div>
    }
    if(!isAuthenticated){
        return <Navigate to="/login" state={{from: location}}replace/>
    }
  return Children;
};

export default ProtctedRoute;
