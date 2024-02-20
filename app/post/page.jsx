"use client";
import React, { useEffect } from "react";
import JobForm from "@/components/Job/JobForm";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

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

export default Page;
