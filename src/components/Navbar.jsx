import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import auth from "../config/firebase.config";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/allFood'>All Food</NavLink>
      </li>
      <li>
        <NavLink to='/gallery'>Gallery</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut(auth);
  };

  return (
    <nav className='bg-[#f5f5f5]  py-4'>
      <div className='w-[90%] mx-auto navbar'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              {navLinks}
            </ul>
          </div>
          <Link to='/' className='md:text-2xl font-semibold'>
            Food
            <span className='text-[#fa49fa]'>Table</span>
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 *:text-lg text-black '>
            {navLinks}
          </ul>
        </div>
        <div className='navbar-end'>
          {user ? (
            user && (
              <div className='flex items-center gap-4'>
                <div className='dropdown'>
                  <div tabIndex={0} role='button' className='m-1'>
                    <img
                      className='size-12 rounded-full'
                      src={user?.photoURL}
                      alt=''
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className='flex flex-col gap-3  dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-max'
                  >
                    <Link
                      to='/myAddedFood'
                      className='hover:text-white hover:bg-[#de3b3b] px-2 py-1 rounded'
                    >
                      <li>My added food items</li>
                    </Link>
                    <Link
                      to='/addFoodItem'
                      className='hover:text-white hover:bg-[#2dcf30] px-2 py-1 rounded'
                    >
                      <li>Add a food item</li>
                    </Link>
                    <Link
                      to='/'
                      className='hover:text-white hover:bg-[#ee4088] px-2 py-1 rounded'
                    >
                      <li>My ordered food items</li>
                    </Link>
                  </ul>
                </div>

                {/* <img
                  className='size-12 rounded-full'
                  src={user?.photoURL}
                  alt=''
                /> */}
                <button
                  onClick={handleLogOut}
                  type='button'
                  className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                >
                  Logout
                </button>
              </div>
            )
          ) : (
            <Link to='/login'>
              <button className='btn btn-outline btn-secondary mr-2'>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
