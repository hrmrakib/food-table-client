const topBannerImg = "https://i.ibb.co/4YtYVVM/all-food.jpg";
const foods = [
  {
    foodName: "Biryani",
    imageURL: "https://i.ibb.co/g4rb24p/biriyani.jpg",
  },
  {
    foodName: "Hamburger",
    imageURL: "https://i.ibb.co/5Gbxgpz/barger.jpg",
  },
  {
    foodName: "Fish Fry",
    imageURL: "https://i.ibb.co/mDk1sk9/seafood.jpg",
  },
  {
    foodName: "Dhal Vat",
    imageURL: "https://i.ibb.co/mz5SyrB/dal-vat.jpg",
  },
  {
    foodName: "Panta Vat with Chili pepper",
    imageURL: "https://i.ibb.co/ZB1gL3y/panta-motic.jpg",
  },
];
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
      <div className='wrapper my-24 w-[92%] mx-auto'>
        <div className='image'>
          <img src='https://i.ibb.co/ZB1gL3y/panta-motic.jpg' alt='' />

          <div className='content'>
            <h1>Panta Vat with Chili</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              natus dolores omnis, quod reprehenderit et.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
