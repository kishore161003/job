"use client";
import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";

const Candidate = ({ data }) => {
  const [tempData, setTempData] = useState(data);
  const [userData, setUserData] = useState(data);
  const [skill, setSkill] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: session } = useSession();
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    if (skill.trim() === "") return;
    setUserData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, skill.trim()],
    }));
    setSkill("");
  };

  const removeSkill = (name) => {
    const newSkills = userData.skills.filter((s) => s !== name);
    setUserData((prevData) => ({ ...prevData, skills: newSkills }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const postChanges = async (datam) => {
    const response = await fetch(
      `/api/profile/candidate/${session.user.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([userData, datam]),
      }
    );
    if (response.ok) {
      console.log("Changes saved:", response.json());
    } else {
      console.log("Error saving changes", response.json());
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);

    var imgUrl = userData.image || "/defaultuser.png";

    if (!inputFileRef.current?.files || !inputFileRef.current.files.length) {
      postChanges(imgUrl);
    } else {
      const file = inputFileRef.current.files[0];

      const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = await response.json();
      postChanges(newBlob.url);
    }
    setLoading(false);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setUserData({ ...tempData });
    setIsEditMode(false);
  };

  return (
    <div className="mt-4">
      <form className="relative">
        <label className="block text-sm font-semibold mb-2">
          Profile Image :
        </label>
        <div className="flex items-center gap-4 mb-4">
          {userData.image && (
            <img
              src={userData.image}
              alt="Profile"
              className="w-[100px] h-[100px] max-md:w-[50px] max-md:h-[50px]  md:ml-4 border rounded-full"
            />
          )}
          <Input
            type="file"
            className="border-dotted file:bg-transparent file:border-hidden hover:file:border-dashed hover:file:border-gray-400 hover:file:rounded-md mt-4 w-full md:w-1/2"
            onChange={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                image: URL.createObjectURL(e.target.files[0]),
              }));
              setImage(e.target.files);
            }}
            ref={inputFileRef}
            disabled={!isEditMode}
          />
        </div>

        <label className="block text-sm font-semibold mb-2">UserName :</label>
        <input
          placeholder="Enter your username"
          className="w-full p-2 border rounded-md mb-4"
          value={userData.name}
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">Contact :</label>
        <input
          placeholder="Enter your contact"
          className="w-full p-2 border rounded-md mb-4"
          value={userData.contact}
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              contact: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">Address :</label>
        <input
          placeholder="Enter your address"
          className="w-full p-2 border rounded-md mb-4"
          value={userData.address}
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              address: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">Education :</label>
        <input
          placeholder="Enter your education"
          className="w-full p-2 border rounded-md mb-4"
          value={userData.education}
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              education: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">Profession :</label>
        <input
          placeholder="Enter your profession"
          className="w-full p-2 border rounded-md mb-4"
          value={userData.profession}
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              profession: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <div className="grid gap-2">
          <label className="block text-sm font-semibold mb-2">Skills</label>
          <div className="flex gap-2">
            <input
              className="w-[80%] p-2 border rounded-md mb-1"
              id="skills"
              value={skill}
              type="text"
              placeholder="Enter your skills Eg. JavaScript"
              onChange={(e) => setSkill(e.target.value)}
              disabled={!isEditMode}
            />
            <button
              type="button"
              className="bg-primary text-white px-2 py-1 rounded-lg"
              onClick={addSkill}
              disabled={!isEditMode}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap">
            {userData.skills &&
              userData.skills.map((skill, index) => (
                <div
                  className=" border-2 border-slate-400  px-2 py-1 rounded-lg m-1 flex justify-center gap-1 items-center"
                  key={index}
                >
                  <span className="text-slate-400">{skill}</span>
                  {isEditMode && (
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
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Edit, Save Changes, and Cancel buttons */}
        {!isEditMode ? (
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="flex mt-4 justify-end">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-lg mr-2"
              onClick={handleSaveChanges}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Candidate;
