"use client";
import React from "react";
import JobForm from "@/components/Job/JobForm";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div className="lg:mx-32">
      {session ? (
        <Card className=" mb-4">
          <CardHeader className="text-3xl font-semibold">
            Post Your Job
          </CardHeader>
          <CardContent>
            <JobForm data={session.user.email} />
          </CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col justify-center text-white bg-red-500 items-center">
          <CardHeader className="text-2xl font-semibold  h-full">
            {" "}
            Please login to post a job !!!
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default page;
