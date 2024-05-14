import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { baseURL } from "../utils/url";
import Loading from "../components/Loading";

const RegisterPage = () => {
  const { createUser, setUser, user, loading } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [anyError, setAnyError] = useState("");
  const [inputPassword, setInputPassword] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "FoodTable | Register";
  }, []);

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

  const onSubmit = (data) => {
    const { displayName, password, email, photoURL } = data;

    console.log(displayName, password, email, photoURL);
    if (!/[A-Z]/.test(password)) {
      setPasswordError("");
      setPasswordError("Password must have at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("");
      setPasswordError("Password must have at least one lowercase letter");
      return;
    } else if (password.length < 6) {
      setPasswordError("");
      setPasswordError("Password length must be at least 6 characters");
      return;
    } else {
      setPasswordError("");
      setAnyError("");

      createUser(email, password)
        .then((result) => {
          updateProfile(result.user, {
            displayName,
            photoURL,
          }).then(() => {
            setUser({
              displayName,
              photoURL,
              email,
            });
            axios.post(`${baseURL}/users`, data);
          });

          navigate(location.state ? location?.state : "/", { replace: true });

          Swal.fire({
            position: "top",
            icon: "success",
            title: "Registration successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          notify(err.message);

          setAnyError(err.message);
        });
    }
  };

  const handleGoogleSignIn = () => {
    setAnyError("");
    const result = googleSignIn()
      .then(async () => {
        const { data } = await axios.post(
          `${baseURL}/jwt`,
          {
            email: result?.user?.email,
          },
          { withCredentials: true }
        );

        navigate(location.state ? location?.state : "/");
      })
      .catch((err) => {
        setAnyError(err);
      });
  };

  const handleEyePassword = () => {
    setInputPassword((prev) => !prev);
  };

  if (user || loading) return <Loading />;

  return (
    <div className='bg-white w-full'>
      <div className='w-[86%] mx-auto'>
        <div className='w-1/2  mx-auto border shadow-lg py-8 rounded-md'>
          <div>
            <div className='bg-white rounded-lg lg:rounded-l-none'>
              <div className='p-5'>
                <div className='pb-8'>
                  <p className='text-3xl font-bold mb-2 text-gray-950 '>
                    I'm New Here in{" "}
                    <span className='text-[#f548fb]'>FoodTable</span>.
                  </p>

                  <p className='font-semibold text-black/60'>
                    Enter your details below
                  </p>
                </div>

                <div className='border w-full'>
                  <button
                    onClick={() => handleGoogleSignIn()}
                    className='w-full font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                  >
                    <div className='bg-white p-2 rounded-full'>
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
                  onSubmit={handleSubmit(onSubmit)}
                  className='space-y-3 w-full '
                >
                  <p className='flex justify-end text-black'>
                    Already a User to FoodTable? Please
                    <Link
                      to='/login'
                      className='text-lg font-semibold text-blue-600 ml-1 hover:underline'
                    >
                      Login
                    </Link>
                  </p>

                  <div>
                    <fieldset className='border border-solid border-gray-300 p-3 w-full rounded'>
                      <legend className=' font-medium text-black/60'>
                        Name
                      </legend>
                      <input
                        type='text'
                        {...register("displayName", { required: true })}
                        placeholder='Your Name'
                        className='px-4 py-1 w-full focus:outline-0 bg-white  text-gray-950'
                      />
                    </fieldset>
                    {errors.displayName && (
                      <span className='text-red-600'>Name is required</span>
                    )}
                  </div>
                  <div>
                    <fieldset className='border border-solid border-gray-300 p-3 w-full rounded'>
                      <legend className='font-medium text-black/60'>
                        Email
                      </legend>
                      <input
                        type='email'
                        {...register("email", { required: true })}
                        placeholder='Enter email'
                        className='px-4 py-1 w-full focus:outline-0 bg-white  text-gray-950'
                      />
                    </fieldset>
                    {errors.email && (
                      <span className='text-red-600'>Email is required</span>
                    )}
                  </div>
                  <div className='relative'>
                    <fieldset className='border border-solid border-gray-300 p-3 w-full rounded'>
                      <legend className=' font-medium text-black/60'>
                        Password
                      </legend>
                      <input
                        type={inputPassword ? "password" : "text"}
                        {...register("password", { required: true })}
                        placeholder='Enter password'
                        className='px-4 py-1 w-full focus:outline-0 bg-white  text-gray-950'
                      />
                      <span
                        className='absolute right-3 *:text-xl cursor-pointer'
                        onClick={handleEyePassword}
                      >
                        {inputPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </fieldset>
                    {passwordError}
                    {errors.password && (
                      <span className='text-red-600'>Password is required</span>
                    )}
                  </div>
                  <div>
                    <fieldset className='border border-solid border-gray-300 p-3 w-full rounded'>
                      <legend className=' font-medium text-black/60'>
                        PhotoURL
                      </legend>
                      <input
                        type='text'
                        {...register("photoURL", { required: true })}
                        placeholder='Enter PhotoURL'
                        className='px-4 py-1 w-full focus:outline-0 bg-white  text-gray-950'
                      />
                    </fieldset>
                    {errors.photoURL && (
                      <span className='text-red-600'>PhotoURL is required</span>
                    )}
                  </div>
                  <p className='text-red-600'>{anyError}</p>

                  <button className='w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    Sign Up
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

export default RegisterPage;
