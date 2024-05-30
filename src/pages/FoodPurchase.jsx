import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseURL } from "../utils/url";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import date from "date-and-time";
const now = new Date();

const FoodPurchase = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [existOrderId, setExistOrderId] = useState();
  const { user } = useContext(AuthContext);
  const getUserEmail = user?.email;
  const getUserName = user?.displayName;

  const foodForPurchase = useLoaderData();

  const foodOwner = foodForPurchase.userName;
  // console.log(foodOwner);

  useEffect(() => {
    document.title = "FoodTable | Purchase Food";
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchMysel = watch("country");

  useEffect(() => {
    fetch(`${baseURL}/find-exist-order/${foodForPurchase._id}`)
      .then((res) => res.json())
      .then((data) => {
        setExistOrderId(parseInt(data.foodId));
      });
  }, [foodForPurchase._id]);

  useEffect(() => {
    if (parseInt(foodForPurchase.quantity) === 0) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "This food isn't available!",
        showConfirmButton: false,
        timer: 3500,
      });
    }
  }, [foodForPurchase]);

  useEffect(() => {
    setSelectedCountry("");
    const filtraPavimento = () => {
      setSelectedCountry(watchMysel);
    };
    filtraPavimento();
  }, [watchMysel]);

  const handlePurchase = (data) => {
    setIsButtonDisabled(true);

    const { buyerEmail, buyerName, buyingDate, foodName, price, quantity } =
      data;

    const foodInfo = {
      buyerEmail,
      buyerName,
      buyingDate,
      foodName,
      price,
      quantity,
      foodOwner,
      foodId: foodForPurchase._id,
      imageURL: foodForPurchase.imageURL,
    };

    console.log(parseInt(quantity));

    fetch(`${baseURL}/findEmail/${foodForPurchase._id}`)
      .then((res) => res.json())
      .then((data) => {
        const resEmail = data?.userEmail;
        if (resEmail === buyerEmail) {
          Swal.fire({
            position: "top",
            icon: "warning",
            title: "Can't buy your own food!",
            showConfirmButton: false,
            timer: 3500,
          });
          navigate("/allFood");
        }
        if (foodForPurchase.quantity < quantity) {
          Swal.fire({
            position: "top",
            icon: "warning",
            title: "Can't buy more than quantity!",
            showConfirmButton: false,
            timer: 3500,
          });
          return;
        }
        if (0 >= parseInt(quantity)) {
          Swal.fire({
            position: "top",
            icon: "warning",
            title: "At least order a single product!",
            showConfirmButton: false,
            timer: 3500,
          });
          return;
        } else {
          // console.log("try to add some food!");
          fetch(`${baseURL}/orderFood`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(foodInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data.insertedId) {
                fetch(`${baseURL}/increaseOrderCount/${foodForPurchase._id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then((res) => {
                  // console.log(res.ok);
                });

                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Successfully Purchased The Food!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/allFood");
              }
            });
        }
      });
  };

  return (
    <div className='bg-white'>
      <div className='w-[90%] mx-auto py-16 bg-white '>
        <h2 className='text-4xl font-bold text-center mb-9 text-gray-900 '>
          Purchase Your Food
        </h2>
        <form onSubmit={handleSubmit(handlePurchase)}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10'>
            <div className='shadow-sm bg-white '>
              <fieldset className='border border-solid border-gray-300 p-3 w-full rounded-lg'>
                <legend className='font-medium text-black/60 dark:text-blue-400'>
                  Food Name
                </legend>
                <input
                  type='text'
                  {...register("foodName", { required: true })}
                  defaultValue={foodForPurchase.foodName}
                  readOnly
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
                  defaultValue={foodForPurchase.price}
                  readOnly
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
                  type='number'
                  {...register("quantity", { required: true })}
                  // defaultValue={foodForPurchase.quantity}
                  placeholder='How much do you want to buy?'
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
                  defaultValue={getUserName}
                  readOnly
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
                  defaultValue={getUserEmail}
                  readOnly
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
                  defaultValue={date.format(now, "YYYY/MM/DD HH:mm:ss")}
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
                disabled={
                  parseInt(foodForPurchase.quantity) === 0 ? true : false
                }
                className='disabled:cursor-not-allowed w-full mt-3 px-3 py-5 text-lg bg-[#FF497C] hover:bg-[#ab3154] rounded text-white font-semibold'
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
