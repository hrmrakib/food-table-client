import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { baseURL } from "../utils/url";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyOrderedFood = () => {
  const [myOrderedFood, setMyOrderedFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const userEmail = user.email;

  useEffect(() => {
    document.title = "FoodTable | My Ordered Food";
  }, []);

  useEffect(() => {
    fetch(`${baseURL}/my-ordered-food/${userEmail}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMyOrderedFood(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${baseURL}/delete-order-food/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Deleted Successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              const filtered = myOrderedFood.filter((food) => food._id !== id);
              setMyOrderedFood(filtered);
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className='bg-white  flex items-center justify-center h-screen w-full'>
        <div className='bg-gray-600 size-16 rounded-full flex items-center justify-center'>
          <span className='loading loading-spinner loading-lg text-center text-white'></span>
        </div>
      </div>
    );
  }

  console.log({ myOrderedFood });

  return (
    <div className='bg-white  min-h-screen'>
      <div className='md:w-[80%] mx-auto'>
        <div className='mb-12 mt-10'>
          <div>
            <h2 className='text-center text-3xl text-gray-900 font-bold'>
              I have purchased this food!
            </h2>
          </div>
        </div>
        <div>
          <div className='overflow-x-auto'>
            <table className='table'>
              {/* head */}
              <thead>
                <tr className='text-gray-900  font-semibold text-xl'>
                  <th>No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Order Time</th>
                  <th>Owner</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {myOrderedFood.length &&
                  myOrderedFood?.map((food, i) => (
                    <tr key={food?._id}>
                      <th className='text-green-400 font-semibold text-xl'>
                        {i + 1}
                      </th>
                      <td>
                        <div className='flex items-center gap-3'>
                          <div className='avatar'>
                            <div className='w-16 h-12'>
                              <img src={food?.imageURL} alt='' />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold md:text-lg text-black '>
                              {food?.foodName}
                            </div>
                            {/* <div className='text-sm text-gray-700  '>
                            {spot?.location}, {spot?.country}
                          </div> */}
                          </div>
                        </div>
                      </td>
                      <td className='text-gray-800  font-semibold text-lg'>
                        ${food?.price}
                      </td>
                      <td className='text-gray-800  font-semibold text-lg'>
                        ${food?.buyingDate}
                      </td>
                      <td className='text-gray-800  font-semibold text-lg'>
                        {food?.foodOwner}
                      </td>
                      <th>
                        <button
                          onClick={() => handleDelete(food._id)}
                          className='bg-[#f64a2f] text-white px-4 py-2 rounded-md'
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderedFood;
