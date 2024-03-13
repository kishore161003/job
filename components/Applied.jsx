import React from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Applied = ({ jobName, application }) => {
  const isLoading = true; // You might want to change this based on the actual loading state
  const router = useRouter();
  console.log(application);
  return (
    <div>
      <form className="relative">
        <h1 className="text-xl md:ml-7 mt-2 mb-4 font-semibold text-cyan-900">
          Applied for {jobName}
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
          {application.status === "processing" ? (
            <button
              type="button"
              className="text-white px-4  bg-cyan-900 py-2 rounded-lg mr-2  ml-[88%] mt-4 w-32"
              disabled={true}
            >
              Processing...
            </button>
          ) : application.status === "Accepted" ? (
            <button
              type="button"
              className="text-white px-4 bg-green-500 py-2 rounded-lg mr-2 md:ml-[88%] mt-4 w-32"
              disabled={true}
            >
              Accepted
            </button>
          ) : (
            <button
              type="button"
              className="text-white px-4 bg-red-500 py-2 rounded-lg mr-2 ml-[88%] mt-4 w-32"
              disabled={true}
            >
              Rejected
            </button>
          )}
          <button
            type="button"
            className="text-white px-4 py-2 rounded-lg mr-2 ml-[88%] mt-4 w-32"
            disabled={true}
          >
            {application.status === "processing"
              ? "Pending..."
              : application.status}
          </button>
        </CardContent>
      </form>
    </div>
  );
};

export default Applied;
