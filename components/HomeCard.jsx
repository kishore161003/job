import React from "react";

const HomeCard = () => {
  return (
    <section className="mt-12 flex max-md:mx-2 max-sm:mx-4 max-md:flex-wrap justify-center gap-10">
      <div className="flex gap-5">
        <img
          src="verified.jpg"
          alt="FraudFree"
          className="h-[100px] w-[100px]"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-bold mb-4 max-md:mb-0">
            Verified Job Listings
          </h1>
          <p className="text-gray-400 max-w-md">
            Explore secure job opportunities.
          </p>
        </div>
      </div>
      <div className="flex gap-5">
        <img
          src="succes.jpg"
          alt="Experience"
          className="h-[100px] w-[100px]"
        />
        <div className="flex flex-col justify-center max-sm:text-sm ">
          <h1 className="text-lg font-bold mb-4 max-md:mb-0">
            Success Stories
          </h1>
          <p className="text-gray-400 max-w-md">Real success, real people.</p>
        </div>
      </div>
      <div className="flex gap-5">
        <img src="privacy.jpg" alt="secured" className="h-[100px] w-[100px]" />
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-bold mb-4 max-md:mb-0">
            Your Privacy Matters
          </h1>
          <p className="text-gray-400 max-w-md">
            Transparent, secure job search.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeCard;
