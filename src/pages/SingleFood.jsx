import React from "react";
import { Link, useLoaderData } from "react-router-dom";
const foodImg = "https://i.ibb.co/g4rb24p/biriyani.jpg";

const SingleFood = () => {
  const loadedFood = useLoaderData();

  useEffect(() => {
    document.title = "FoodTable | Single Food";
  }, []);

  return (
    <div className='w-[90%] mx-auto my-20'>
      <div className='grid lg:grid-cols-2 gap-12'>
        <div>
          <img
            className='rounded-md w-full h-full'
            src={loadedFood.imageURL}
            alt=''
          />
        </div>
        <div className='relative'>
          <h4>Detail of this food</h4>
          <h2 className='text-2xl lg:text-5xl font-bold my-6'>
            {loadedFood.foodName}
          </h2>
          <p className='text-xl font-medium pb-2 mb-1 border-b'>
            Category:{" "}
            <span className='text-purple-600'>{loadedFood.category}</span>
          </p>
          <p className='text-xl font-medium pb-2 mb-1 border-b'>
            Quantity:{" "}
            <span className='text-orange-500'>{loadedFood.quantity}</span>
          </p>
          <p className='text-xl font-medium pb-2 mb-1 border-b'>
            Price: $<span className='text-blue-500'>{loadedFood.price}</span>
          </p>
          <p className='text-xl font-medium pb-2 mb-1 border-b'>
            Country: <span className='text-pink-500'>{loadedFood.country}</span>
          </p>
          <p className='text-xl font-medium pb-2 mb-1 border-b'>
            Made By:{" "}
            <span className='text-pink-500'>{loadedFood.userName}</span>
          </p>
          <p className='font-medium pb-2'>{loadedFood.description}</p>

          <Link to={`/foodPurchase/${loadedFood._id}`}>
            <button
              type='button'
              className='w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2'
            >
              Purchase Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;
