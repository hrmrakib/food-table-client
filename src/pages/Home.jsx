import React from "react";
import HeroBanner from "../components/HeroBanner";
import TopSelling from "../components/TopSelling";
import ChooseUs from "../components/ChooseUs";
import Review from "../components/Review";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <div className='w-[90%] mx-auto'>
      <TopSelling />
      <ChooseUs />
      <Review />
      </div>
    </div>
  );
};

export default Home;
