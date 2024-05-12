import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContextProvider";
import axios from "axios";
import { baseURL } from "../utils/url";

const LoginPage = () => {
  const { signIn, googleSignIn, user, loading } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // login with email and password
  const handleLogin = (data) => {
    const { email, password } = data;

    setPasswordError("");
    setAuthError("");
    if (password.length < 6) {
      setPasswordError("Must be 6 characters");
      return;
    }
    signIn(email, password)
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate(location.state ? location?.state : "/", { replace: true });
      })
      .catch((err) => {
        setAuthError(err.message);
      });
  };

  // google signin
  const handleGoogleSignIn = () => {
    setAuthError("");
    googleSignIn()
      .then(() => {
        navigate(location.state ? location?.state : "/");
      })
      .catch((err) => {
        setAuthError(err);
      });
  };

  if (user || loading) return;

  return (
    <div className='w-full bg-white '>
      <div className='w-[86%] mx-auto '>
        <div className='w-1/2 bg-white  mx-auto border shadow-lg py-8 rounded-md'>
          <div>
            <div className='bg-white m-5 rounded-lg lg:rounded-l-none'>
              <div className='bg-white '>
                <div className='pb-8'>
                  <p className='text-3xl font-bold mb-2 text-gray-900 '>
                    Sign In to FoodTable.
                  </p>

                  <p className='font-semibold text-black/60 '>
                    Enter your details below
                  </p>
                </div>

                <div className='flex items-center flex-wrap md:flex-nowrap gap-4 mb-4'>
                  <button
                    onClick={() => handleGoogleSignIn()}
                    className='w-full  font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                  >
                    <div className='bg-white  p-2 rounded-full'>
                      <svg className='w-4' viewBox='0 0 533.5 544.3'>
                        <path
                          d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                          fill='#4285f4'
                        />
                        <path
                          d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                          fill='#34a853'
                        />
                        <path
                          d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                          fill='#fbbc04'
                        />
                        <path
                          d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                          fill='#ea4335'
                        />
                      </svg>
                    </div>
                    <span className='ml-4'>Sign In with Google</span>
                  </button>
                </div>

                <div className='flex gap-9 relative my-5'>
                  <p className='border-b border-gray-300 w-full'></p>
                  <span className='absolute left-1/2 -ml-2 -mt-3'>Or</span>
                  <p className='border-b border-gray-300 w-full'></p>
                </div>

                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className='space-y-3 w-full bg-white '
                >
                  <p className='flex justify-end text-black '>
                    New to FoodTable? Please
                    <Link
                      to='/register'
                      className='text-lg font-semibold text-blue-600 ml-1 hover:underline'
                    >
                      Register
                    </Link>
                  </p>
                  <div>
                    <fieldset className='border border-solid border-gray-300 p-3 w-full rounded'>
                      <legend className='font-medium text-black/60 '>
                        Email
                      </legend>
                      <input
                        type='email'
                        {...register("email", { required: true })}
                        placeholder='Enter password'
                        className='px-4 py-1 w-full focus:outline-0 bg-white  text-black '
                      />
                    </fieldset>
                    <p>
                      {errors.email && (
                        <span className='text-red-600'>Email is required</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <fieldset className='border border-solid border-gray-300 p-3 w-full rounded'>
                      <legend className=' font-medium text-black/60 '>
                        Password
                      </legend>
                      <input
                        type='password'
                        {...register("password", { required: true })}
                        placeholder='password'
                        className='px-4 py-1 w-full focus:outline-0 bg-white  text-black '
                      />
                    </fieldset>
                    <p className='text-red-600'>{passwordError}</p>
                    <p>
                      {errors.password && (
                        <span className='text-red-600'>
                          Password is required
                        </span>
                      )}
                    </p>
                  </div>
                  <p className='text-lg text-red-400'>{authError}</p>
                  <button className='w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
