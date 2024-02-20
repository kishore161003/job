import React from "react";
import JobCardList from "./JobCardList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const { data: session } = useSession(true);
  const [catagory, setCatagory] = useState("");

  useEffect(() => {
    if (session) {
      fetch(`/api/profile/${session.user.email}`)
        .then((res) => res.json())
        .then((datam) => {
          datam[0] && setCatagory(datam[0].catagory);
          if (datam[0] && datam[0].catagory === "Employee") {
            fetch(`/api/job/fetch/employee/${session.user.email}`)
              .then((res) => res.json())
              .then((data) => {
                setJobs(data);
              });
          } else {
            fetch(`/api/job/fetch/candidate/${session.user.email}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setJobs(data);
              });
          }
        });
    }
  }, [session]);
  return (
    <div className="">
      <h1 className="text-lg font-semibold text-center mb-4">
        {catagory === "Employee" ? "Posted Jobs" : "Applied Jobs"}
      </h1>
      {jobs.length > 0 ? (
        <JobCardList jobs={jobs} />
      ) : (
        <div className="flex justify-center items-center h-[300px] text-lg text-gray-400">
          No Jobs Found
        </div>
      )}
    </div>
  );
};

export default Dashboard;
