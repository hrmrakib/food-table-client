import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import TestNav from "../components/TestNav";

const Root = () => {
  return (
    <div>
      {/* <TestNav /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
