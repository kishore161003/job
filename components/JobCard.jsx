import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";

const JobCard = ({ data, profile }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [company, setCompany] = useState(null);
  console.log(data);
  useEffect(() => {
    fetch(`/api/profile/${data.postedBy}`)
      .then((res) => res.json())
      .then((datam) => {
        setCompany(datam[0]);
        console.log(datam, company);
      });
  }, []);

  const detail = () => {
    router.push(`/job/${data._id}`);
  };
  return (
    <div>
      {company && (
        <Card className="w-auto max-sm:w-auto">
          <CardHeader className="flex flex-row justify-between gap-4">
            <div className="flex gap-4 align-bottom items-center">
              {company.image ? (
                <img
                  src={company.image}
                  alt="companylogo"
                  className="h-8 w-8 rounded-full"
                />
              ) : (
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
                  className="lucide lucide-hotel"
                >
                  <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                  <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
                  <path d="M8 7h.01" />
                  <path d="M16 7h.01" />
                  <path d="M12 7h.01" />
                  <path d="M12 11h.01" />
                  <path d="M16 11h.01" />
                  <path d="M8 11h.01" />
                  <path d="M10 22v-6.5m4 0V22" />
                </svg>
              )}
              <div className="flex flex-col">
                <h1 className="text-md font-semibold">{data.title}</h1>
                <p className="text-sm font-semibold text-slate-500">
                  {company.companyName}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="slategray"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right hover:stroke-black hover:cursor-pointer"
                onClick={detail}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {data.location === "Relocate" ? (
              <div className="flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="slategray"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <h1 className="text-md font-semibold text-slate-500">
                  {data.location}
                </h1>
              </div>
            ) : (
              <div className="flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="slategray"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-home"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <h1 className="text-sm font-semibold text-slate-500">
                  {data.location}
                </h1>
              </div>
            )}
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="slategray"
                strokeLidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-banknote"
              >
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
              <h1 className="text-sm font-semibold text-slate-500">
                ₹{data.salary}
              </h1>
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="slategray"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock-1"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14.5 8" />
              </svg>
              <h1 className="text-sm font-semibold text-slate-500">
                {data.duration}
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="slategray"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokelinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
              <h1 className="text-sm font-semibold text-slate-500">
                {data.openings} Openings Available
              </h1>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobCard;
