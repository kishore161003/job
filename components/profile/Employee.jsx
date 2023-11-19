import React, { useState } from "react";

export const Employee = () => {
  const initialCompanyData = {
    image: "",
    companyName: "ABC Corp",
    contact: "123-456-7890",
    address: "456 Business St, City",
    about: "We are a tech company.",
    website: "https://www.abccorp.com",
  };
  const [companyData, setCompanyData] = useState({ ...initialCompanyData });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    console.log("Changes saved:", companyData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setCompanyData({ ...initialCompanyData });
    setIsEditMode(false);
  };

  return (
    <div className="mt-4">
      <form className="relative">
        <label className="block text-sm font-semibold mb-2">
          Company Image:
        </label>
        <div className="flex items-center mb-4">
          {companyData.image && (
            <img
              src={companyData.image}
              alt="Company"
              className="w-[100px] h-[100px] ml-4 border rounded-full"
            />
          )}
          <input
            type="file"
            accept="image/*"
            className="w-1/2 p-2 border rounded-md"
            onChange={(e) =>
              setCompanyData((prevData) => ({
                ...prevData,
                image: URL.createObjectURL(e.target.files[0]),
              }))
            }
            disabled={!isEditMode}
          />
        </div>

        <label className="block text-sm font-semibold mb-2">
          Company Name:
        </label>
        <input
          placeholder="Enter company name"
          className="w-full p-2 border rounded-md mb-4"
          value={companyData.companyName}
          onChange={(e) =>
            setCompanyData((prevData) => ({
              ...prevData,
              companyName: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">Contact:</label>
        <input
          placeholder="Enter company contact"
          className="w-full p-2 border rounded-md mb-4"
          value={companyData.contact}
          onChange={(e) =>
            setCompanyData((prevData) => ({
              ...prevData,
              contact: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">Address:</label>
        <input
          placeholder="Enter company address"
          className="w-full p-2 border rounded-md mb-4"
          value={companyData.address}
          onChange={(e) =>
            setCompanyData((prevData) => ({
              ...prevData,
              address: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">About:</label>
        <textarea
          placeholder="Enter about the company"
          className="w-full p-2 border rounded-md mb-4"
          value={companyData.about}
          onChange={(e) =>
            setCompanyData((prevData) => ({
              ...prevData,
              about: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

        <label className="block text-sm font-semibold mb-2">Website:</label>
        <input
          placeholder="Enter company website"
          className="w-full p-2 border rounded-md mb-4"
          value={companyData.website}
          onChange={(e) =>
            setCompanyData((prevData) => ({
              ...prevData,
              website: e.target.value,
            }))
          }
          disabled={!isEditMode}
        />

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
