import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseURL } from "../utils/url";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContextProvider";

const AddFoodItem = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { user } = useContext(AuthContext);
  const getUserEmail = user?.email;
  const getUserName = user?.displayName;

  useEffect(() => {
    document.title = "FoodTable | Add New Food";
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const watchMysel = watch("country");

  useEffect(() => {
    setSelectedCountry("");
    const filtraPavimento = () => {
      setSelectedCountry(watchMysel);
    };
    filtraPavimento();
  }, [watchMysel]);

  const handleAddFood = (data) => {
    setIsButtonDisabled(true);

    // console.log(data);

    const {
      category,
      country,
      description,
      foodName,
      imageURL,
      price,
      quantity,
      userEmail,
      userName,
    } = data;

    const foodInfo = {
      category,
      country,
      description,
      foodName,
      imageURL,
      price,
      quantity,
      userEmail,
      userName,
      orderCount: 0,
    };

    fetch(`${baseURL}/myFoods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Successfully Added Food!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setTimeout(() => {
            setIsButtonDisabled(false);
          }, 3000);
        }
      });
  };

  return (
    <div className='bg-white '>
      <div className='w-[88%] mx-auto py-16 bg-white '>
        <h2 className='text-4xl font-bold text-center mb-9 text-gray-900 '>
          Add a New Food Item
        </h2>
        <form onSubmit={handleSubmit(handleAddFood)}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10'>
            <div className='shadow-sm bg-white '>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>
                  Food Name
                </legend>
                <input
                  type='text'
                  {...register("foodName", { required: true })}
                  placeholder='Food Name'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.foodName && (
                  <span className='text-red-600'>Food Name is required</span>
                )}
              </p>
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>
                  Food Image URL
                </legend>
                <input
                  type='text'
                  {...register("imageURL", { required: true })}
                  placeholder='Food Image URL'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.imageURL && (
                  <span className='text-red-600'>Image URL is required</span>
                )}
              </p>
            </div>

            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>
                  Food Category
                </legend>
                <select
                  className={"w-full bg-white  text-black  outline-none"}
                  defaultValue='0'
                  {...register("category", { required: true })}
                >
                  <option value='0'>Select Category</option>
                  <option value='Rice Dishes'>Rice Dishes</option>
                  <option value='Curries and Gravies'>
                    Curries and Gravies
                  </option>
                  <option value='Tandoori and Grilled Dishes'>
                    Tandoori and Grilled Dishes
                  </option>
                  <option value='Breads and Rotis'>Breads and Rotis</option>
                  <option value='Street Food Specialties'>
                    Street Food Specialties
                  </option>
                  <option value='Seafood'>Seafood</option>
                  <option value='Vegetarian Delicacies'>
                    Vegetarian Delicacies
                  </option>
                  <option value='Beverages'>Beverages</option>
                  <option value='Desserts and Sweets'>
                    Desserts and Sweets
                  </option>
                  <option value='Traditional Specialties'>
                    Traditional Specialties
                  </option>
                </select>
              </fieldset>
              <p>
                {errors.category && (
                  <span className='text-red-600'>Select at least one</span>
                )}
              </p>
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>Quantity</legend>
                <input
                  type='text'
                  {...register("quantity", { required: true })}
                  placeholder='Quantity'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.quantity && (
                  <span className='text-red-600'>Quantity is required</span>
                )}
              </p>
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>Price</legend>
                <input
                  type='text'
                  {...register("price", { required: true })}
                  placeholder='Price'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.price && (
                  <span className='text-red-600'>Price is required</span>
                )}
              </p>
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>Name</legend>
                <input
                  type='text'
                  {...register("userName", { required: true })}
                  defaultValue={getUserName}
                  readOnly
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              {/* <p>
                {errors.userName && (
                  <span className='text-red-600'>
                    UserName cost is required
                  </span>
                )}
              </p> */}
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>
                  User Email
                </legend>
                <input
                  type='text'
                  {...register("userEmail", { required: true })}
                  defaultValue={getUserEmail}
                  readOnly
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              {/* <p>
                {errors.seasonality && (
                  <span className='text-red-600'>Seasonality is required</span>
                )}
              </p> */}
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-black/60 '>
                  Origin Country
                </legend>
                <select
                  className={"w-full bg-white  text-black  outline-none"}
                  defaultValue='0'
                  {...register("country", { required: true })}
                  required
                >
                  <option value='0'>Select Country</option>
                  <option value='Bangladesh'>Bangladesh</option>
                  <option value='India'>India</option>
                  <option value='Indonesia'>Indonesia</option>
                  <option value='Malaysia'>Malaysia</option>
                  <option value='Pakistan'>Pakistan</option>
                  <option value='Afganistan'>Afganistan</option>
                </select>
              </fieldset>
              <p>
                {errors.country && (
                  <span className='text-red-600'>Select at least one</span>
                )}
              </p>
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-[#ae4af5]'>
                  Short Description
                </legend>
                <input
                  type='text'
                  {...register("description", { required: true })}
                  placeholder='Short description'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.description && (
                  <span className='text-red-600'>This field is required</span>
                )}
              </p>
            </div>

            <div>
              <button
                disabled={isButtonDisabled}
                className='w-full mt-3 px-3 py-5 text-lg bg-[#FF497C] hover:bg-[#ab3154] rounded text-white font-semibold'
              >
                Add New Food
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
