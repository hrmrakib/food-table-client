import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className='w-[90%] mx-auto'>
        <Outlet />
        <h2>footer</h2>
      </div>
    </div>
  );
};

export default Root;
