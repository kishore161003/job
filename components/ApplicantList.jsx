import { set } from "mongoose";
import React from "react";
import { useState, useEffect } from "react";
import { CardContent, CardHeader } from "./ui/card";
import { Separator } from "@/components/ui/separator";

export const ApplicantList = ({ jobId, name }) => {
  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    fetch(`/api/apply/retrive/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setApplicants(data);
      });
  }, [jobId]);

  return (
    <div>
      <CardHeader className="flex text-xl w-[100%] font-semibold text-cyan-900">
        Applicants
      </CardHeader>
      {applicants.map((applicant, index) => {
        const num = index + 1;
        return (
          <ApplicantCard
            application={applicant}
            name={name}
            num={num}
            key={applicant._id}
          />
        );
      })}
    </div>
  );
};

export default ApplicantList;

const ApplicantCard = ({ application, name, num }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [status, setStatus] = useState(application.status);
  const [loadingStatus, setLoadingStatus] = useState(application.status);

  const isLoading = true;

  const handleResult = (result) => async () => {
    const res = await fetch(`/api/apply/result/${application._id}/${result}`);
    const data = await res.json();
    const maildata = await fetch(`/api/sendemail/${application._id}`);
    const mail = await maildata.json();
    setLoadingStatus(result);
    setStatus(result);

    console.log(mail);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className=" mb-12">
        <div className="flex justify-between items-center px-14 mb-2">
          <h2 className="text-md text-cyan-900 font-semibold">
            Applicant {num}{" "}
          </h2>
          <button
            onClick={toggleDrawer}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isDrawerOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-up"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
          </button>
        </div>
        {isDrawerOpen && (
          <div className="mt-3">
            <form className="relative">
              <h1 className="text-xl ml-7 mt-2 mb-4 font-semibold text-cyan-900">
                Applied for {name}
              </h1>
              <CardContent>
                <input
                  placeholder="Enter your Name"
                  className="w-full p-2 border rounded-md mb-4"
                  value={application.name}
                  disabled={isLoading}
                  required
                />
                <input
                  placeholder="Enter your Phone"
                  className="w-full p-2 border rounded-md mb-4"
                  value={application.phone}
                  disabled={isLoading}
                  required
                />
                <textarea
                  className="w-full p-2 border rounded-md mb-4 h-44"
                  placeholder="Cover Letter Description"
                  value={application.coverLetter}
                  disabled={isLoading}
                  required
                />
                <div className="flex gap-5 items-center max-md:gap-2 ml-2">
                  <p>Resume: </p>
                  {application.resume && (
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-cyan-900 p-2 rounded-md text-white"
                    >
                      Your Resume
                    </a>
                  )}
                </div>
                {status === "processing" ? (
                  <div className="flex mt-4 justify-end">
                    <button
                      type="button"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                      onClick={handleResult("Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={handleResult("Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : status === "Accepted" ? (
                  <div className="flex mt-4 justify-end">
                    <button
                      className="bg-green-500 text-white px-4 py-2  rounded-lg mr-2"
                      disabled={true}
                    >
                      Accepted
                    </button>
                  </div>
                ) : (
                  <div className="flex mt-4 justify-end">
                    <button
                      className="bg-red-500 text-white px-4 py-2 mt-2 rounded-lg"
                      disabled={true}
                    >
                      Rejected
                    </button>
                  </div>
                )}
              </CardContent>
            </form>
          </div>
        )}
        <Separator
          className="h-[0.075rem]  bg-cyan-900 max-md:ml-8 max-md:w-[70%] mt-4 "
          orientation="horizontal"
        />
      </div>
    </div>
  );
};
