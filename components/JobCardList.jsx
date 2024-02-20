import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import JobCard from "@/components/JobCard";

const JobCardList = ({ jobs, profile }) => {
  return (
    <CardContent className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 p-2">
      {jobs &&
        jobs.map((job) => {
          return <JobCard data={job} key={job._id} />;
        })}
    </CardContent>
  );
};

export default JobCardList;
