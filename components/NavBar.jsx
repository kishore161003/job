import React from "react";

const NavBar = () => {
  return (
    <section className="p-7 lg:mx-32">
      <div className="flex flex-row justify-between">
        <div className="flex">
          <img src="JobNestle.png" alt="logo" className="h-12" />
          <span className=" flex items-end font-bold text-[30px]">
            Job
            <span className="text-[30px] text-primary font-bold">Nestle</span>
          </span>
        </div>
        <div className="flex flex-row justify-between gap-10 align-bottom max-md:hidden">
          <div className="flex items-center text-primary font-semibold text-[20px]">
            Jobs
          </div>
          <div className="text-[15px] font-bold text-white bg-primary p-3 rounded-md px-5">
            Signin
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
