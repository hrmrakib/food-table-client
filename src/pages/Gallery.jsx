import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/url";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const topBannerImg = "https://i.ibb.co/4YtYVVM/all-food.jpg";

const Gallery = () => {
  const { user, loading } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [galleryInfo, setGalleryInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "FoodTable | Gallery";
  }, []);

  const userEmail = user?.email;
  const userName = user?.displayName;

  const handleAddGallery = (e) => {
    e.preventDefault();
    const form = e.target;
    const imageURL = form.imageURL.value;
    const feedback = form.feedback.value;

    const gallery = { imageURL, feedback, userEmail, userName };

    fetch(`${baseURL}/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gallery),
    });
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Add to Gallery successfully!",
      showConfirmButton: false,
      timer: 1000,
    });

    form.imageURL.value = "";
    form.feedback.value = "";

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    if (user) {
      setOpenDialog(true);
    } else {
      return navigate("/");
    }
  };

  useEffect(() => {
    fetch(`${baseURL}/gallery`)
      .then((res) => res.json())
      .then((data) => setGalleryInfo(data));
  }, [handleAddGallery]);

  if (loading) return <Loading />;

  const code = <></>;

  return (
    <div>
      {" "}
      <div className='relative'>
        <img
          className='w-full h-80 lg:h-[400px] object-cover'
          src={topBannerImg}
          alt=''
        />
        <div className='absolute bottom-2 left-3 lg:bottom-28 lg:left-28'>
          <p className='text-lg font-semibold text-gray-100'>
            WIDE OPTIONS OF CHOICE
          </p>
          <h2 className='text-2xl lg:text-5xl font-bold text-white my-2 lg:my-6'>
            All Delicious Food Menu
          </h2>
        </div>
      </div>
      <div className='w-[90%] mx-auto '>
        <div className='my-10'>
          <button
            onClick={handleOpenDialog}
            type='button'
            className='w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-3 text-center me-2 mb-2'
          >
            Add New
          </button>
          <div>
            {openDialog && (
              <div className='flex justify-center items-center -mt-60'>
                <div className='relative rounded-2xl pt-14 px-8 pb-8 bg-white border md:w-[600px] mx-auto flex flex-col justify-center items-center'>
                  <div
                    onClick={handleCloseDialog}
                    className='absolute text-3xl top-3 right-3 cursor-pointer'
                  >
                    <IoMdCloseCircleOutline />
                  </div>
                  <form
                    onSubmit={handleAddGallery}
                    className='flex flex-col gap-3 w-full'
                  >
                    <input
                      type='text'
                      defaultValue={user?.displayName}
                      readOnly
                      className='input input-bordered input-primary w-full'
                    />
                    <input
                      type='text'
                      name='imageURL'
                      placeholder='Give image url'
                      required
                      className='input input-bordered input-primary w-full'
                    />

                    <input
                      type='text'
                      name='feedback'
                      placeholder='Feedback or experience description'
                      required
                      maxLength={20 * 10}
                      className='input input-bordered input-secondary w-full'
                    />

                    <button className='btn btn-success text-white text-xl'>
                      Add New One
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* a-9 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          {galleryInfo?.map((gallery) => (
            <div key={gallery._id} className='wrapper w-[92%] mx-auto'>
              <div className='image relative'>
                <img
                  className='w-full h-64 rounded-md'
                  src={gallery?.imageURL}
                  alt=''
                />

                <div className='content p-4'>
                  <h1 className='text-white flex items-center gap-2 text-xl'>
                    {" "}
                    <FaUserCheck />
                    <span>{gallery?.userName}</span>
                  </h1>
                  <p className='text-gray-200'>{gallery?.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
