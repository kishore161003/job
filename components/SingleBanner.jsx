import React from "react";



const SingleBanner = ({ bannerimage, heading }) => {
  return (
    <div className="relative w-full h-[150px] overflow-hidden">
      <div className="absolute w-full h-full bg-black bg-opacity-60"></div>
      <img
        className="w-full h-full object-cover"
        src={bannerimage}
        alt="noimg"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="text-6xl font-thin">{heading}</h1>
      </div>
    </div>
  );
};

export default SingleBanner;
