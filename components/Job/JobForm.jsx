"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Page from "@/app/job/page";

const JobForm = ({ data }) => {
  const initialData = {
    title: "",
    description: "",
    location: "Work from Home", // Default location
    startDate: null, // Using null for initial date
    duration: "",
    salary: "",
    skills: [],
    postedBy: data,
    openings: 0,
  };

  const router = useRouter();
  const [jobData, setJobData] = useState(initialData);
  const [newSkill, setNewSkill] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e, field) => {
    setJobData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleDateChange = (date) => {
    setJobData((prevData) => ({ ...prevData, startDate: date }));
  };

  const addSkill = () => {
    if (newSkill.trim() === "") return;
    setJobData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    const newSkills = jobData.skills.filter((s) => s !== skill);
    setJobData((prevData) => ({ ...prevData, skills: newSkills }));
  };

  const handlePost = async () => {
    setIsLoaded(true);

    if (jobData.salary[0] === "$" || jobData.salary[0] === "₹") {
      setJobData((prevData) => ({
        ...prevData,
        salary: prevData.salary.slice(1),
      }));
    }

    const post = async () => {
      setIsLoaded(true);
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        router.push("/");
      }
    };
    await post();
    setIsChanged((prev) => !prev);
    setIsLoaded(false);
  };

  return (
    <div className="mt-4">
      <form className="relative">
        <label className="block text-sm font-semibold mb-2 mt-2">Title:</label>
        <Input
          type="text"
          value={jobData.title}
          onChange={(e) => handleChange(e, "title")}
          placeholder="Enter job title"
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.getElementById("description").focus(); // Focus on password field
            }
          }}
        />
        <label className="block text-sm font-semibold mb-2 mt-2">
          Description:
        </label>
        <textarea
          id="description"
          required
          placeholder="Enter job description"
          className="w-full p-2 border h-32 rounded-md mb-4"
          value={jobData.description}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.getElementById("location").focus(); // Focus on password field
            }
          }}
          onChange={(e) => handleChange(e, "description")}
        />
        <label className="block text-sm font-semibold mb-2 mt-2">
          Location:
        </label>
        <select
          id="location"
          required
          value={jobData.location}
          onChange={(e) => handleChange(e, "location")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.getElementById("startDate").focus(); // Focus on password field
            }
          }}
          className="w-full p-2 border rounded-md mb-4 "
        >
          <option value="Work from Home" className="">
            Work from Home
          </option>
          <option value="Relocate">Relocate</option>
        </select>
        <label className="block text-sm font-semibold mb-2 mt-2">
          Start Date:
        </label>
        <Input
          id="startDate"
          placeholder="Enter Start date"
          type="date"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.getElementById("duration").focus(); // Focus on password field
            }
          }}
          required
          value={jobData.startDate}
          onChange={(e) => handleChange(e, "startDate")}
        />
        <label className="block text-sm font-semibold mb-2 mt-2">
          Duration:
        </label>
        <Input
          id="duration"
          placeholder="Enter job duration"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.getElementById("salary").focus(); // Focus on password field
            }
          }}
          required
          value={jobData.duration}
          onChange={(e) => handleChange(e, "duration")}
        />
        <label className="block text-sm font-semibold mb-2 mt-2">Salary:</label>
        <Input
          type="text"
          id="salary"
          value={jobData.salary}
          placeholder="Enter job salary"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.getElementById("openings").focus(); // Focus on password field
            }
          }}
          required
          onChange={(e) => handleChange(e, "salary")}
        />
        <label className="block text-sm font-semibold mb-2 mt-2">
          Openings:
        </label>
        <Input
          id="openings"
          type="number"
          required
          placeholder="Enter job openings"
          value={jobData.openings}
          onChange={(e) => handleChange(e, "openings")}
        />
        <label className="block text-sm font-semibold mb-2 mt-2">Skills:</label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newSkill}
            required
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add Skill"
          />
          <button
            type="button"
            className="bg-primary text-white px-6 py-1 rounded-lg"
            onClick={addSkill}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap">
          {jobData.skills &&
            jobData.skills.map((skill, index) => (
              <div
                className="border-2 border-slate-400 px-2 py-1 rounded-lg m-1 flex justify-center gap-1 items-center"
                key={index}
              >
                <span className="text-slate-400">{skill}</span>
                <div
                  onClick={() => removeSkill(skill)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="slategray"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            ))}
        </div>
        <div className="hidden">
          <Page isChanged={isChanged} />
        </div>
        ;{/* Post button */}
        <div className="flex mt-8 mr-4 justify-center">
          <button
            type="button"
            className="bg-primary text-white px-12 py-2 rounded-lg mr-2"
            onClick={() => {
              handlePost();
            }}
            disabled={isLoaded}
          >
            {isLoaded ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
