import { useContext, useEffect, useState } from "react";
import { baseURL } from "../utils/url";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContextProvider";
import Loading from "../components/Loading";

const MyAddedFood = () => {
  const [myAddedFood, setMyAddedFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    document.title = "FoodTable | My Listed Food";
  }, []);

  useEffect(() => {
    fetch(`${baseURL}/my-added-food/${userEmail}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMyAddedFood(data);
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
        fetch(`${baseURL}/allspot/${id}`, {
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
              const filtered = myAddedFood.filter((spot) => spot._id !== id);
              setMyAddedFood(filtered);
            }
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='bg-white  min-h-screen'>
      <div className='md:w-[80%] mx-auto'>
        <div className='mb-12'>
          <div>
            <h2 className='text-center text-3xl text-gray-900 font-bold'>
              I have added the food item!
            </h2>
          </div>
        </div>
        <div>
          <div className='overflow-x-auto'>
            <table className='table'>
              {/* head */}
              <thead>
                <tr className='text-gray-900 font-semibold text-xl'>
                  <th>No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myAddedFood.length === 0 ? (
                  <Link to='/addFoodItem'>
                    <span className='text-center text-lg text-blue-500 underline'>
                      Go to Add Food Page
                    </span>
                  </Link>
                ) : (
                  ""
                )}
                {/* row 1 */}
                {myAddedFood?.map((food, i) => (
                  <tr key={food?._id}>
                    <th className='text-green-400  font-semibold text-xl'>
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
                          <div className='font-bold md:text-lg text-black'>
                            {food?.foodName}
                          </div>
                          {/* <div className='text-sm text-gray-700 '>
                            {spot?.location}, {spot?.country}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className='text-gray-800 font-semibold text-lg'>
                      ${food?.price}
                    </td>
                    <td className='text-gray-800 font-semibold text-lg'>
                      {/* {spot?.travelTime} */}fkjd
                    </td>
                    <th>
                      <Link to={`/updateMyList/${food._id}`}>
                        <button className='bg-[#f52dd0] mr-3 text-white px-4 py-2 rounded-md'>
                          Update
                        </button>
                      </Link>
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

export default MyAddedFood;
