"use client";
import React from "react";
import HomeCard from "../components/HomeCard";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const { data: session } = useSession(true);
  const [catagoryNotSet, setCategoryNotSet] = useState(true);

  useEffect(() => {
    if (session) {
      fetch(`/api/profile/${session.user.email}`)
        .then((res) => res.json())
        .then((datam) => {
          if (
            datam[0] &&
            (datam[0].catagory === "Employee" ||
              datam[0].catagory === "Candidate")
          ) {
            console.log(datam[0].catagory, "ho");
            setCategoryNotSet(false);
          }
        });
    }
  }, [catagoryNotSet, session]);

  console.log("session", session, catagoryNotSet);

  return (
    <section className="lg:mx-32">
      <div className="flex flex-col">
        <Card
          className={`flex flex-col justify-center text-white h-8 mt-2 bg-red-500 items-center ${
            catagoryNotSet ? "visible" : "hidden"
          }`}
        >
          <CardHeader className="text-lg font-semibold ">
            {" "}
            Please Update Profile First to post or Apply for job !!!
          </CardHeader>
        </Card>
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
      </div>
    </section>
  );
};

export default HomePage;
