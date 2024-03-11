"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

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

  const handlePost = () => {
    setIsLoaded(true);
    if (jobData.salary[0] === "$" || jobData.salary[0] === "₹") {
      setJobData((prevData) => ({
        ...prevData,
        salary: prevData.salary.slice(1),
      }));
    }
    const post = async () => {
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
    post();
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
        />

        <label className="block text-sm font-semibold mb-2 mt-2">
          Description:
        </label>
        <textarea
          required
          placeholder="Enter job description"
          className="w-full p-2 border h-32 rounded-md mb-4"
          value={jobData.description}
          onChange={(e) => handleChange(e, "description")}
        />

        <label className="block text-sm font-semibold mb-2 mt-2">
          Location:
        </label>
        <select
          required
          value={jobData.location}
          onChange={(e) => handleChange(e, "location")}
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
          placeholder="Enter Start date"
          type="date"
          required
          value={jobData.startDate}
          onChange={(e) => handleChange(e, "startDate")}
        />

        <label className="block text-sm font-semibold mb-2 mt-2">
          Duration:
        </label>
        <Input
          placeholder="Enter job duration"
          type="text"
          required
          value={jobData.duration}
          onChange={(e) => handleChange(e, "duration")}
        />

        <label className="block text-sm font-semibold mb-2 mt-2">Salary:</label>
        <Input
          type="text"
          value={jobData.salary}
          placeholder="Enter job salary"
          required
          onChange={(e) => handleChange(e, "salary")}
        />

        <label className="block text-sm font-semibold mb-2 mt-2">
          Openings:
        </label>
        <Input
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

        {/* Post button */}
        <div className="flex mt-8 mr-4 justify-center">
          <button
            type="button"
            className="bg-primary text-white px-12 py-2 rounded-lg mr-2"
            onClick={handlePost}
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
