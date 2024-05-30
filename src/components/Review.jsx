import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import avatar from "/avatar.jpg";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { baseURL } from "../utils/url";
// const avatar =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2uLl8zBoK0_iM5pNwJAC8hQ2f68YKtlgc7Q&s";
const img = "https://i.ibb.co/MMdbHGC/testimonial.png";
// const img1 =
//   "https://i.ibb.co/bNW2C0Q/young-man-suit-glasses-standing-with-crossed-arms-looking-confident.jpg";
// const img2 =
//   "https://i.ibb.co/hKW83Vk/handsome-corporate-man-real-estate-agent-assistant-smiling-hold-hands-together-how-may-i-help-you-sm.jpg";
// const img3 =
//   "https://i.ibb.co/MgzXcgL/businessman-black-suit-with-tie-posing.jpg";

const Review = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userName = user?.displayName;
  const userEmail = user?.email;
  const userPhoto = user?.photoURL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReview = (data) => {
    const { title, review } = data;

    const reviewInfo = {
      title,
      review,
      userEmail,
      userName,
      userPhoto,
    };

    fetch(`${baseURL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your review add successfully!",
            showConfirmButton: false,
            timer: 2500,
          });
          setOpenDialog(false);
        }
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    fetch(`${baseURL}/review`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [handleReview]);

  return (
    <>
      <div className='py-10 md:py-24 bg-white  grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <div>
          <img className='h-52 md:h-96' src={img} alt='' />
        </div>
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper z-0'
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div>
                  <h2 className='text-3xl text-gray-950  md:text-4xl font-bold mb-3'>
                    {review?.title}
                  </h2>

                  <p className='lg:border-b-2 pb-5 mt-5 text-gray-600 '>
                    {review?.review}
                  </p>
                  <div className='flex items-center gap-3 mt-8'>
                    {review?.userPhoto ? (
                      <img
                        className='size-16 rounded-full '
                        src={review?.userPhoto}
                        alt=''
                      />
                    ) : (
                      <img className='size-16 rounded-full' src={avatar} />
                    )}
                    <div>
                      <h2 className='text-2xl font-bold text-gray-950 '>
                        {review?.userName}
                      </h2>
                      {/* <p className='text-gray-700 '>Marketing Officer</p> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className='mb-10'>
        <div className='h-10'>
          <div className='text-center '>
            {user ? (
              <button onClick={handleOpenDialog} className=' btn btn-outline'>
                Place a review
              </button>
            ) : (
              <Link to='/login'>
                <button className='btn btn-outline'>Place a review</button>
              </Link>
            )}
          </div>
          {/* custom modal */}
          {openDialog && (
            <div className=' relative -mt-[350px] md:-mt-[200px] rounded-2xl px-5 py-20 md:py-16 bg-gray-300 border md:w-[600px] mx-auto flex flex-col justify-center items-center'>
              <div
                onClick={handleCloseDialog}
                className='absolute text-3xl top-3 right-3 cursor-pointer'
              >
                x
              </div>
              <form
                onSubmit={handleSubmit(handleReview)}
                className='flex flex-col gap-3 w-full'
              >
                <input
                  type='text'
                  {...register("title", { required: true })}
                  placeholder='Review Title'
                  className='input input-bordered input-primary w-full'
                />
                <p>
                  {errors.title && (
                    <span className='text-red-600'>This field is required</span>
                  )}
                </p>
                <input
                  type='text'
                  {...register("review", { required: true })}
                  placeholder='Review'
                  className='input input-bordered input-secondary w-full'
                />
                <p>
                  {errors.title && (
                    <span className='text-red-600'>This field is required</span>
                  )}
                </p>

                <button className='btn btn-success text-white text-xl'>
                  Post
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
