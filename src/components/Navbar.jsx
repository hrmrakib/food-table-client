import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
const user = true;
const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/allFoods'>All Food</NavLink>
      </li>
      <li>
        <NavLink to='/gallery'>Gallery</NavLink>
      </li>
    </>
  );

  return (
    <nav className='bg-white dark:bg-gray-900 py-4'>
      <div className='w-[90%] mx-auto navbar bg-white dark:bg-gray-900'>
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
          <ul className='menu menu-horizontal px-1 *:text-lg text-black dark:text-white'>
            {navLinks}
          </ul>
        </div>
        <div className='navbar-end'>
          {/* {user ? (
            user && (
              <div className='dropdown dropdown-hover'>
                <div tabIndex={0} role='button'>
                  <img
                    className='size-7 rounded-full mr-2'
                    src={user?.photoURL}
                    alt=''
                  />
                </div>
                <ul
                  onClick={handleLogOut}
                  tabIndex={0}
                  className='dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-box w-max'
                >
                  <li>
                    <a>Log Out</a>
                  </li>
                </ul>
              </div>
            )
          ) : (
            <Link to='/login'>
              <button className='btn btn-outline mr-2'>Login</button>
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
