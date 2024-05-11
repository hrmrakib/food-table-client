import React from "react";
import { Link } from "react-router-dom";
const bannerImg = "https://i.ibb.co/L99zFxP/food.jpg";

const HeroBanner = () => {
  return (
    <div className='relative'>
      <img className='w-full h-80 lg:h-[600px]' src={bannerImg} alt='' />
      <div className='absolute bottom-2 left-3 lg:bottom-28 lg:left-28'>
        <p className='text-lg font-semibold text-gray-100'>
          WIDE OPTIONS OF CHOICE
        </p>
        <h2 className='text-2xl lg:text-5xl font-bold text-white my-2 lg:my-6'>
          Delicious Recipes
        </h2>
        <p className='text-gray-100 text-sm lg:text-lg max-w-md mb-3 lg:mb-6'>
          Indulge in a symphony of flavors with tantalizing collection of
          Delicious Recipes. From sizzling stir-fries to decadent desserts, each
          dish tells a story of culinary mastery. Embark on a culinary journey
          and awaken your taste.
        </p>
        <Link to='/allFood'>
          <button
            type='button'
            className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          >
            Check Our Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
