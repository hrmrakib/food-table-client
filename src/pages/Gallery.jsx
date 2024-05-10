const topBannerImg = "https://i.ibb.co/4YtYVVM/all-food.jpg";

const Gallery = () => {
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
    </div>
  );
};

export default Gallery;
