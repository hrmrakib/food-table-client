import { Link } from "react-router-dom";
import { useEffect } from "react";
const img = "https://i.ibb.co/W2vRqyc/5191984.jpg";
const ErrorPage = () => {
  useEffect(() => {
    document.title = "FoodTable | Error";
  }, []);

  return (
    <>
      <div className='bg-[url("https://i.ibb.co/W2vRqyc/5191984.jpg")] bg-no-repeat bg-center bg-auto bg- h-screen flex flex-col justify-center items-center bg-white'>
        <Link to='/' className='pt-10'>
          <button
            type='button'
            className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-4 py-3 text-white text-xl font-bold border-2'
          >
            Back to Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
