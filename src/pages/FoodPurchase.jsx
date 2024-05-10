import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseURL } from "../utils/url";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContextProvider";

const FoodPurchase = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { user } = useContext(AuthContext);
  const getUserEmail = user?.email;
  const getUserName = user?.displayName;

  useEffect(() => {
    document.title = "FoodTable | Purchase Food";
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

  const handleAddSpot = (data) => {
    setIsButtonDisabled(true);
    const {
      averageCost,
      country,
      description,
      location,
      photoURL,
      seasonality,
      spotName,
      totaVisitorsPerYear,
      travelTime,
    } = data;

    const spotInfo = {
      averageCost,
      country,
      description,
      location,
      photoURL,
      seasonality,
      spotName,
      totaVisitorsPerYear,
      travelTime,
      userEmail: getUserEmail,
      userName: getUserName,
    };

    fetch(`${baseURL}/allspot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Successfully Added a Tourist Spot!",
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
          Purchase Your Food
        </h2>
        <form onSubmit={handleSubmit(handleAddSpot)}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10'>
            <div className='shadow-sm bg-white '>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-black/60 dark:text-blue-400'>
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
                <legend className='font-medium text-black/60 dark:text-blue-400'>
                  Price
                </legend>
                <input
                  type='text'
                  {...register("price", { required: true })}
                  placeholder='Food Price'
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
                <legend className='font-medium text-black/60 dark:text-blue-400'>
                  Quantity
                </legend>
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
                <legend className='font-medium text-black/60 dark:text-blue-400'>
                  Buyer Name
                </legend>
                <input
                  type='text'
                  {...register("buyerName", { required: true })}
                  placeholder='Buyer Name'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.buyerName && (
                  <span className='text-red-600'>Buyer Name is required</span>
                )}
              </p>
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-black/60 dark:text-blue-400'>
                  Buyer Email
                </legend>
                <input
                  type='text'
                  {...register("buyerEmail", { required: true })}
                  placeholder='Buyer Email'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.buyerEmail && (
                  <span className='text-red-600'>
                    Buyer Email cost is required
                  </span>
                )}
              </p>
            </div>
            <div className='shadow-sm'>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-black/60 dark:text-blue-400'>
                  Buying Date
                </legend>
                <input
                  type='text'
                  {...register("buyingDate", { required: true })}
                  placeholder='Buying Date'
                  className='px-4 py-1 w-full focus:outline-0 text-black  bg-white rounded-md '
                />
              </fieldset>
              <p>
                {errors.buyingDate && (
                  <span className='text-red-600'>Buying Date is required</span>
                )}
              </p>
            </div>

            <div className='lg:col-span-2'>
              <button
                disabled={isButtonDisabled}
                className='w-full mt-3 px-3 py-5 text-lg bg-[#FF497C] hover:bg-[#ab3154] rounded text-white font-semibold'
              >
                Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodPurchase;
