// import React from "react";
import image from "@/assets/neklase2.jpg";
import neklase from "@/assets/sets.webp";
import neklase3 from "@/assets/neklase3.webp"
import { useNavigate } from "@tanstack/react-router";



const NewArrival = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: '/products' }); // Change the path to your desired route
  };
  return (
    <div className=" p-6">
      {/* Banner Section */}
      <div
  className="relative bg-cover bg-right text-white py-16 px-6 rounded-lg overflow-hidden"
  style={{
    backgroundImage: `url(${neklase})`,
    backgroundSize: "cover",
    backgroundPosition: "right", // Image positioned to the right
    position: "relative",
  }}
>
  {/* Black Overlay */}
  <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

  {/* Content with Higher Z-Index */}
  <div className="relative z-10">
    <h2 className="text-3xl font-bold">New Arrivals</h2>
    <div className="mt-3 inline-block bg-white/20 px-4 py-1 rounded-full text-sm">
      💎 <span className="font-semibold"> New Items</span>
    </div>
    <p className="mt-4 text-lg">
      New Arrivals Dropping Daily, Monday through Friday. <br />
      Explore the Latest Launches Now!
    </p>
  </div>
</div>


      {/* Product Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="relative rounded-lg overflow-hidden">
          <img src={image} alt="Nosepins" className="w-full" />
          <span className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            Nosepins
          </span>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={neklase3}
            alt="Kids Jewellery"
            className="w-full h-full"
          />
          <span className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            Kids Jewellery
          </span>
        </div>
      </div>
      <div className="mt-5">
      {/* <button
       onClick={handleClick}
      type=  "button"
     
      className={`px-5 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-2 lg:px-8 lg:py-2 border rounded-2xl border-white justify-center items-center inline-flex overflow-hidden cursor-pointer relative transition-all duration-500 group/nested disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      <div className="dot absolute left-3 sm:left-4 md:left-5 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-white rounded-xl group-hover/nested:left-0 group-hover/nested:h-full group-hover/nested:w-full transition-all duration-500"></div>
      <div className="absolute left-3 sm:left-4 md:left-5 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-black rounded-xl scale-0 opacity-0 group-hover/nested:scale-100 group-hover/nested:opacity-100 transition-all duration-500"></div>
      <div className="relative z-10 text-white group-hover/nested:text-black text-sm sm:text-base md:text-sm lg:text-xl font-medium text-nowrap ml-3 sm:ml-4 md:ml-5 transition-all duration-500 flex items-center gap-2">
 
        See New Products
   
      </div>
    </button> */}
      <button onClick={handleClick} className="px-6 py-4 bg-[linear-gradient(180deg,_#C47F31,_#C47F31)] rounded-full justify-center items-center gap-[12.94px] inline-flex overflow-hidden cursor-pointer relative transition-all duration-500 hover:px-10 group/nested">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_#fff,_#fff)] opacity-0 group-hover/nested:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -left-5 w-5 h-5 bg-color-1 rounded-full group-hover/nested:left-72 group-hover/nested:bg-black transition-all duration-500"></div>
                <div className="relative z-10 text-black text-xl font-medium text-nowrap">
                See New Products
                </div>
              </button>
    </div>
    
    </div>
  );
};

export default NewArrival;
