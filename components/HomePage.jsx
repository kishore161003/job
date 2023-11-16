"use client"
import React from "react";
import HomeCard from "../components/HomeCard";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const data = useSession();
  return (
    <section className="lg:mx-32">
      <div className="flex items-center justify-between max-md:flex-wrap-reverse">
        <div>
          <div className="mx-auto text-center">
            <h1 className="text-6xl font-bold mb-4 max-md:mt-8">
              Welcome to <span className="text-primary">JobNestle</span>
            </h1>
            <p className="text-xl text-gray-700 mb-6 text-semibold font-roboto">
              Empowering Your Career Journey: Where{" "}
              <span className="font-semibold">Dreams Take Flight</span> and
              Careers Find Their <span className="text-green-500">Nest</span>.
            </p>
            <blockquote className="text-2xl italic text-gray-600 mb-8">
              "Your <span className="text-blue-500">Dream Job</span> Awaits.
              Let's Make it Happen Together."
            </blockquote>
            <a
              href="#job-listings"
              className="bg-primary text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Explore Job Openings
            </a>
          </div>
        </div>
        <div className="">
          <img src="heo.jpg" alt="heroSection" className="h-[500px]" />
        </div>
      </div>
      <div>
        <HomeCard />
      </div>
    </section>
  );
};

export default HomePage;
