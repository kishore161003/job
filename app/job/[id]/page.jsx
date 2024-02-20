"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Globe, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ApplyForm from "@/components/ApplyForm";
import { useSession, signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Applied from "@/components/Applied";
import { ApplicantList } from "@/components/ApplicantList";

const Page = ({ params }) => {
  const { data: session, status } = useSession();

  const { toast } = useToast();
  const [applied, isApplied] = useState(false);
  const [catagory, setCatagory] = useState(null);
  const [appliedDetails, setAppliedDetails] = useState(null);
  const [apply, setApply] = useState(false);
  const [postingCompany, setPostingCompany] = useState(false);

  const [job, setJob] = useState({});

  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/job/${params.id}`);
      const data = await res.json();
      setJob(data);
      if (session && data.postedBy === session.user.email)
        setPostingCompany(true);
      if (postingCompany) return;
      console.log(data);
      const res2 = await fetch(`/api/profile/${data.postedBy}`);
      const data2 = await res2.json();
      setCompany(data2[0]);
      if (postingCompany) return;
      if (session) {
        console.log(session);
        const res3 = await fetch(`/api/profile/${session.user.email}`);
        const data3 = await res3.json();
        setCatagory(data3[0].catagory);
        const res4 = await fetch(
          `/api/job/applied/${params.id}/${session.user.email}`
        );
        const data4 = await res4.json();
        console.log(data4[0]);
        if (data4 && data4[0]) {
          isApplied(true);
          setAppliedDetails(data4[0]);
        }
      }
    };
    fetchJob();
  }, [session, params.id]);

  console.log(applied);

  useEffect(() => {});

  const handleApply = () => {
    console.log(session);

    if (session === null || session === undefined) {
      signIn();
    } else if (catagory === "Employee") {
      toast({
        variant: "destructive",
        description: "You are Not allowed to Apply . You are a Employee",
      });
    } else if (catagory === "Candidate") {
      setApply(true);
    } else {
    }
  };

  return company && job ? (
    <div className="lg:mx-32">
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-4 bg-primary border text-white rounded-md">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-3xl"> {job.title}</h1>
              <p className="font-semibold text-xl">{company.companyName}</p>
            </div>
            <div>
              <a href="#apply" onClick={handleApply}>
                <Button className="text-primary hover:bg-gray-300 text-xl bg-white">
                  {applied ? "Applied" : "Apply Now"}{" "}
                  <ArrowUpRight className="ml-2 h-6 w-6 " />
                </Button>
              </a>
            </div>
          </div>
          {job.location === "Relocate" ? (
            <div className="flex flex-row items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h1 className="text-lg font-semibold text-white">
                {job.location}
              </h1>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-home"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <h1 className="text-lg font-semibold text-white">
                {job.location}
              </h1>
            </div>
          )}
          <div className="flex gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-banknote"
            >
              <rect width="20" height="12" x="2" y="6" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
            <h1 className="text-lg font-semibold text-white">${job.salary}</h1>
          </div>
          <div className="flex gap-20 border-2 p-2 px-4 w-fit max-sm:flex-wrap border-white rounded-md">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock-1"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14.5 8" />
              </svg>
              <h1 className="text-lg font-semibold text-white">
                {job.duration}
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
              <h1 className="text-lg font-semibold text-white">
                {job.openings} Openings Available
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
              <h1 className="text-md font-semibold text-white">
                Start at <span className="ml-1"> {job.startDate}</span>
              </h1>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="mt-2 w-full border-2 mb-4 border-gray-200">
        {company.companyName && (
          <CardHeader className="flex text-xl font-semibold text-cyan-900">
            About {company.companyName}
          </CardHeader>
        )}
        <CardContent className="flex flex-col gap-2 mt-2">
          {company.webSite && (
            <div className="flex ml-4 gap-2">
              <Globe className="mr-2 w-6 h-6 stroke-blue-700" />
              <a href={company.webSite} className="text-blue-700">
                {company.webSite}
              </a>
            </div>
          )}
          {company.about && (
            <div className="flex flex-col ml-2 mt-8 gap-2">
              <p className="ml-4 text-blue-950 text-md leading-relaxed max-w-5xl ">
                {company.about}
              </p>
            </div>
          )}
          <Separator
            className="h-0.5 bg-cyan-900 w-[92%] mt-4 mx-2"
            orientation="horizontal"
          />
          <CardHeader className="flex text-xl ml-[-24px] font-semibold text-cyan-900">
            Job Description
          </CardHeader>
          <p className="ml-4 text-blue-950 text-md leading-relaxed max-w-5xl ">
            {job.description}
          </p>{" "}
          <Separator
            className="h-0.5 bg-cyan-900 w-[92%] mt-4 mx-2"
            orientation="horizontal"
          />
          <h1 className="text-xl ml-2 mt-4  font-semibold text-cyan-900">
            Skill Required
          </h1>
          <ul>
            {console.log(job.skills, job)}
            {job.skills.map((skill, index) => (
              <li className="ml-4 text-blue-950 disc-none text-md " key={index}>
                <div className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4" /> {skill}
                </div>
              </li>
            ))}
          </ul>
          <Separator
            className="h-[0.175rem] bg-cyan-900 w-[92%] mt-4 mx-2"
            orientation="horizontal"
          />
        </CardContent>
        {session &&
          (!postingCompany ? (
            <section id="apply" className={`${apply ? "visible" : "hidden"}`}>
              {!applied ? (
                <ApplyForm
                  job={job._id}
                  apply={session.user.email}
                  jobName={job.title}
                />
              ) : (
                <Applied jobName={job.title} application={appliedDetails} />
              )}
            </section>
          ) : (
            <ApplicantList jobId={job._id} name={job.title} />
          ))}
      </Card>
    </div>
  ) : (
    <Card className="lg:mx-32 flex justify-center">
      <CardHeader className=" text-3xl font-bold">...loading</CardHeader>
    </Card>
  );
};

export default Page;
