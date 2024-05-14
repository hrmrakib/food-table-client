import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
const topBannerImg = "https://i.ibb.co/4YtYVVM/all-food.jpg";
import { FaRegHeart } from "react-icons/fa";
const bannerImg = "https://i.ibb.co/L99zFxP/food.jpg";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";
import { baseURL } from "./../utils/url";

const AllFood = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const loadedFood = useLoaderData();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${baseURL}/search-food?foodName=${searchQuery}`
      );
      setSearchResults(data);
      // console.log(data);
    } catch (error) {
      // console.log({ message: error });
    }
  };

  return (
    <div>
      <div className='relative'>
        <img
          className='w-full h-80 lg:h-[400px] object-cover'
          src={topBannerImg}
          alt=''
        />
        <div className='absolute bottom-2 left-3 lg:bottom-28 lg:left-28'>
          <p className='text-lg font-semibold text-gray-100'>
            WIDE OPTIONS OF CHOICE
          </p>
          <h2 className='text-2xl lg:text-5xl font-bold text-white my-2 lg:my-6'>
            All Delicious Food Menu
          </h2>
        </div>
      </div>

      <form onSubmit={handleSearch} className='max-w-md mx-auto my-14'>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search food...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button
            type='submit'
            className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </form>
      <div className='w-[90%] mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-16'>
          {/* ((displayReadBooks.length && displayReadBooks) || readBooks) */}
          {((searchResults.length && searchResults) || loadedFood).map(
            (food) => (
              <div key={food._id}>
                <div className='relative shadow-lg z-0'>
                  <img
                    className='w-full h-64 rounded-xl'
                    src={food.imageURL}
                    alt=''
                  />
                  <FaRegHeart className='absolute top-3 right-3 text-3xl bg-gray-700 text-white p-2 rounded-lg opacity-75' />
                </div>

                <div className='relative bg-white  text-gray-950  shadow-xl px-5 py-4 rounded-lg -mt-12 z-10'>
                  <h2 className='text-xl font-bold mb-3 text-gray-950 '>
                    {food.foodName}
                  </h2>

                  <div className='flex items-center gap-2 pb-3 border-b-2'>
                    <p>
                      Category:{" "}
                      <span className='text-orange-500 font-semibold'>
                        {food.category}
                      </span>
                    </p>
                  </div>

                  <div className='flex justify-between items-center mt-4'>
                    <div>
                      <p className='flex items-center'>
                        <MdAttachMoney />
                        {food.price}
                      </p>
                    </div>
                    <div>
                      <Link to={`/singleFood/${food._id}`}>
                        <button className='w-full mt-3 px-3 py-2 bg-[#FF497C] hover:bg-[#ab3154] rounded text-white font-semibold'>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFood;
