import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Employee } from "./profile/Employee";
import Candidate from "./profile/Candidate";

const Account = () => {
  const [catagory, setCategory] = useState("");
  const [catagorySet, setCategorySet] = useState(false);

  const handleCategoryChange = (newCategory) => {
    if (!catagorySet) {
      setCategory(newCategory);
      console.log(newCategory, catagory);
      setCategorySet(true);
    }
  };

  return (
    <Card className="p-4 border rounded-md shadow-md w-[100%]">
      <CardHeader className="text-lg font-semibold">
        Edit Your Profile
      </CardHeader>
      <CardContent>
        <label htmlFor="category" className="block text-sm font-semibold mb-2">
          Catagory:
        </label>
        {!catagorySet ? (
          <select
            id="catagory"
            value={catagory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-[250px] p-2 border rounded-md"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Employee">Employee</option>
            <option value="Candidate">Candidate</option>
          </select>
        ) : (
          <div className="p-2 border rounded-md bg-gray-100">
            <strong>{catagory}</strong>
          </div>
        )}
        {catagory && catagory === "Employee" ? <Employee /> : null}
        {catagory && catagory === "Candidate" ? <Candidate /> : null}
      </CardContent>
    </Card>
  );
};

export default Account;
