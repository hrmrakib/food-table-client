import { Link } from "react-router-dom";
import { useEffect } from "react";
const img = "https://i.ibb.co/W2vRqyc/5191984.jpg";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "FoodTable | Error";
  }, []);

  return (
    <>
      <div className='bg-[url("https://i.ibb.co/W2vRqyc/5191984.jpg")] bg-no-repeat bg-center bg-auto  h-screen flex flex-col justify-center items-center bg-white'>
        <Link to='/' className='mt-80'>
          <button
            type='button'
            className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-2xl px-5 py-3 text-center me-2 mb-2'
          >
            Back to Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
