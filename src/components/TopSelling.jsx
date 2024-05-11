import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
const bannerImg = "https://i.ibb.co/L99zFxP/food.jpg";
import { MdAttachMoney } from "react-icons/md";

const TopSelling = () => {
  return (
    <div className='my-24'>
      <div className='flex flex-col items-center'>
        <button className='bg-gray-100 px-4 py-2 text-green-500 text-lg font-semibold rounded-md'>
          Top Selling
        </button>
        <h2 className='text-2xl md:text-5xl leading-relaxed text-gray-950  font-bold text-center max-w-2xl mt-7'>
          Visit & enjoy adventure life with full of dreams
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-16'>
        {/* {sixTouristSpot.slice(0, 6).map((spot) => ( */}
        <div key={22}>
          <div className='relative shadow-lg z-0'>
            <img className='w-full h-64 rounded-xl' src={bannerImg} alt='' />
            <FaRegHeart className='absolute top-3 right-3 text-3xl bg-gray-700 text-white p-2 rounded-lg opacity-75' />
          </div>

          <div className='relative bg-white  text-gray-950  shadow-xl px-5 py-4 rounded-lg -mt-12 z-10'>
            <h2 className='text-xl font-bold mb-3 text-gray-950 '>Chocolate</h2>

            <div className='flex items-center gap-2 pb-3 border-b-2'>
              <p>
                Category:{" "}
                <span className='text-orange-500 font-semibold'>Spicy</span>
              </p>
            </div>

            <div className='flex justify-between items-center mt-4'>
              <div>
                <p className='flex items-center'>
                  <MdAttachMoney />
                  340
                </p>
              </div>
              <div>
                <Link to={`/tourspot-detail/`}>
                  <button className='w-full mt-3 px-3 py-2 bg-[#FF497C] hover:bg-[#ab3154] rounded text-white font-semibold'>
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>

      <Link to='/allFood'>
        <button
          type='button'
          className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
        >
          See all
        </button>
      </Link>
    </div>
  );
};

export default TopSelling;
