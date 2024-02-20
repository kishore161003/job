"use client";
import React from "react";
import { useEffect, useState } from "react";
import JobCardList from "@/components/JobCardList";

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [temp, setTemp] = useState([]);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    fetch("/api/job")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setTemp(data);
      });
  }, []);

  const fetchJobData = async (search) => {
    console.log("searchtext", search);
    if (search.length == 0) {
      setJobs(temp);
      return;
    }

    try {
      const res = await fetch(`/api/job/search/${search}`);
      const data = await res.json();
      if (res.status == 404) {
        setJobs([]);
        return;
      }

      if (JSON.stringify(jobs) === JSON.stringify(data)) return;
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const search = e.target.value;
    // debounce the search function
    debounce(() => {
      // fetch the data
      fetchJobData(search);
    }, 500)();
  };

  function debounce(func, delay) {
    // Initialize a timer variable
    let timer;
    // Return the new function
    return function () {
      // Get the context and arguments of the function
      let context = this;
      let args = arguments;
      // Clear the previous timer
      clearTimeout(timer);
      // Set a new timer
      timer = setTimeout(function () {
        // Call the original function with the context and arguments
        func.apply(context, args);
      }, delay); // Pass in the delay in milliseconds
    };
  }

  console.log(jobs);
  return (
    <div className="lg:mx-32">
      <form className="relative w-full flex-center">
        <input
          type="text"
          name="search"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          value={searchText}
          required
          className="block w-full mb-2 mt-4 rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0;"
        />
      </form>
      {jobs.length > 0 ? (
        <JobCardList jobs={jobs} />
      ) : (
        <div className="flex justify-center items-center h-[400px] text-xl text-gray-400">
          No Jobs Found
        </div>
      )}
    </div>
  );
};

export default Page;
