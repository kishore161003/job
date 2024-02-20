import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { useSession } from "next-auth/react";

const ApplyForm = ({ job, apply, jobName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(apply);
  const [phone, setPhone] = useState("");
  const { startUpload } = useUploadThing("media");
  const [resumeURL, setResumeURL] = useState("");

  const saveResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (resume) {
      const url = await startUpload(Array.from(resume));
      if (url && url[0].url) {
        setResumeURL(url[0].url);
      }
      handleSubmit(url[0].url);
    }
    setIsLoading(false);
  };

  function phoneValidation(phone) {
    const re = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;
    if (phone === "" || re.test(phone)) {
      return true;
    } else {
      return false;
    }
  }
  const handleSubmit = (datam) => {
    const submit = async () => {
      const res = await fetch(`/api/apply/${job}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, datam, coverLetter }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        router.push("/");
      }
    };
    submit();
  };

  return (
    <div>
      <form className="relative">
        {" "}
        <h1 className="text-xl ml-7 mt-2 mb-4  font-semibold text-cyan-900">
          Apply for {jobName}
        </h1>{" "}
        <CardContent>
          <input
            placeholder="Enter your Name"
            className="w-full p-2 border rounded-md mb-4"
            value={name}
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
            required
          />{" "}
          <input
            placeholder="Enter your Phone"
            className="w-full p-2 border rounded-md"
            value={phone}
            disabled={isLoading}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {phone && !phoneValidation(phone) ? (
            <h1 className="text-red-600 text-xs mb-2 ">
              Please Enter a valid Phone Number
            </h1>
          ) : (
            <div className="h-4"></div>
          )}
          <textarea
            className="w-full p-2 border rounded-md mb-4 h-44"
            placeholder="Cover Letter Description"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            disabled={isLoading}
          />
          <div className="flex gap-5 items-center max-md:gap-2 ml-2">
            <h1>Upload Your Resume :</h1>
            <Input
              type="file"
              className="border-dotted file:bg-transparent  hover:file:border-dashed hover:file:border-gray-400 hover:file:rounded-md mt-2 w-full md:w-1/4"
              onChange={(e) => {
                setResume(e.target.files);
              }}
              disabled={isLoading}
              required
            />
          </div>
          <button
            type="button"
            className="bg-cyan-900 text-white px-4 py-2 rounded-lg mr-2 ml-[88%] mt-4 w-32"
            onClick={saveResume}
            disabled={isLoading}
          >
            {isLoading ? "Applying ... " : "Apply"}
          </button>
        </CardContent>
      </form>
    </div>
  );
};

export default ApplyForm;
