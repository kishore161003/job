import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Candidate = () => {
  //   const { data: session, status } = useSession();
  const initialUserData = {
    userName: "JohnDoe",
    contact: "123-456-7890",
    address: "123 Main St, City",
    education: "Bachelor's in Computer Science",
    profession: "Software Developer",
    skills: ["JavaScript", "React"],
    profileImage: "", // New field for profile image
  };
  const [userData, setUserData] = useState({ ...initialUserData });
  const [skill, setSkill] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleSaveChanges = () => {
    console.log("Changes saved:", userData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setUserData({ ...initialUserData });
    setIsEditMode(false);
  };

  return (
    <div className="mt-4">
      <form className="relative">
        {/* New field for profile image */}
        <label className="block text-sm font-semibold mb-2">
          Profile Image :
        </label>
        <div className="flex items-center gap-4 mb-4">
          {userData.profileImage && (
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-[100px] h-[100px] ml-4 border rounded-full"
            />
          )}
          <input
            type="file"
            accept="image/*"
            className="w-1/2 p-2 border rounded-md"
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                profileImage: URL.createObjectURL(e.target.files[0]),
              }))
            }
            disabled={!isEditMode}
          />
        </div>

        <label className="block text-sm font-semibold mb-2">UserName :</label>
        <input
          placeholder="Enter your username"
          className="w-full p-2 border rounded-md mb-4"
          value={userData.userName}
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              userName: e.target.value,
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
            {userData.skills.map((skill, index) => (
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
              Save Changes
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
