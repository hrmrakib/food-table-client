import React from "react";
import HeroBanner from "../components/HeroBanner";
import TopSelling from "../components/TopSelling";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <div className='w-[90%] mx-auto'>
        <TopSelling />
      </div>
    </div>
  );
};

export default Home;
