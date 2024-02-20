"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [employee, setEmployee] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (session) {
      fetch(`/api/profile/${session.user.email}`)
        .then((res) => res.json())
        .then((datam) => {
          if (datam[0] && datam[0].catagory === "Employee") {
            setEmployee(true);
          }
        });
    }
  }, [session]);

  return (
    <section className="px-4 lg:px-7 py-5 lg:mx-32 border-b-2 border-blue-950 mb-2 relative">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center" onClick={() => router.push("/")}>
          <img
            src="/JobNestle.png"
            alt="logo"
            className="h-12 cursor-pointer"
          />
          <span className="ml-2 flex items-end font-bold text-[30px]">
            Job
            <span className="text-[30px] text-primary font-bold">Nestle</span>
          </span>
        </div>

        <div className="lg:flex hidden flex-row gap-10 align-bottom">
          <div
            className="text-primary font-semibold text-[20px] hover:cursor-pointer flex items-center"
            onClick={() => router.push("/")}
          >
            Home
          </div>
          <div
            className={`text-primary font-semibold text-[20px] hover:cursor-pointer flex items-center ${
              session && session.user && employee ? "visible" : "hidden"
            }`}
            onClick={() => router.push("/post")}
          >
            Post
          </div>
          <div
            className="flex items-center text-primary font-semibold hover:cursor-pointer text-[20px]"
            onClick={() => router.push("/job")}
          >
            Jobs
          </div>

          <div
            className={`flex items-center text-primary font-semibold hover:cursor-pointer text-[20px] ${
              session && session.user ? "visible" : "hidden"
            }`}
            onClick={() => router.push("/profile")}
          >
            Profile
          </div>
          <div
            className="text-[15px] font-bold text-white bg-primary p-3 rounded-md px-5 cursor-pointer"
            onClick={() => {
              session && session.user ? signOut() : signIn();
            }}
          >
            {session && session.user ? "Logout" : "Login"}
          </div>
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-align-justify cursor-pointer"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-0 p-2 rounded-md right-0 bg-white bg-opacity-95 mt-16 mr-4 z-50">
          {/* Add your mobile menu options here */}
          <div
            className="text-primary font-semibold text-[20px] hover:cursor-pointer mb-2"
            onClick={() => {
              router.push("/");
              setMenuOpen(false);
            }}
          >
            Home
          </div>
          <div
            className={`text-primary font-semibold text-[20px] hover:cursor-pointer mb-2 ${
              session && session.user && employee ? "visible" : "hidden"
            }`}
            onClick={() => {
              router.push("/post");
              setMenuOpen(false);
            }}
          >
            Post
          </div>
          <div
            className="text-primary font-semibold text-[20px] hover:cursor-pointer mb-2"
            onClick={() => {
              router.push("/job");
              setMenuOpen(false);
            }}
          >
            Jobs
          </div>

          <div
            className={`text-primary font-semibold text-[20px] hover:cursor-pointer mb-2 ${
              session && session.user ? "visible" : "hidden"
            }`}
            onClick={() => {
              router.push("/profile");
              setMenuOpen(false);
            }}
          >
            Profile
          </div>
          <div
            className="text-[15px] font-bold text-white bg-primary p-3 rounded-md px-5 cursor-pointer"
            onClick={() => {
              session && session.user ? signOut() : signIn();
              toggleMenu(); // Close the menu after clicking
            }}
          >
            {session && session.user ? "Logout" : "Login"}
          </div>
        </div>
      )}
    </section>
  );
};

export default NavBar;
