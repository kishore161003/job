import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Employee } from "./profile/Employee";
import Candidate from "./profile/Candidate";
import { useSession } from "next-auth/react";

const Account = () => {
  const { data: session } = useSession();

  const [data, setData] = useState(null);
  const [catagory, setCategory] = useState("");
  const [catagorySet, setCategorySet] = useState(false);

  useEffect(() => {
    if (session) {
      fetch(`/api/profile/${session.user.email}`)
        .then((res) => res.json())
        .then((datam) => {
          setData(datam[0]);
          if (
            datam[0] &&
            (datam[0].catagory === "Employee" ||
              datam[0].catagory === "Candidate")
          ) {
            setCategory(datam[0].catagory);
            setCategorySet(true);
          }
        });
    }
  }, [session]);

  const handleCategoryChange = (newCategory) => {
    if (!catagorySet) {
      setCategory(newCategory);
      setData((prevData) => ({ ...prevData, catagory: newCategory }));
      setCategorySet(true);
    }
  };

  return data ? (
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
            disabled={catagorySet}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Employee">Employer</option>
            <option value="Candidate">Candidate</option>
          </select>
        ) : (
          <div className="p-2 border rounded-md bg-gray-100">
            <strong>{catagory}</strong>
          </div>
        )}
        {data && catagory === "Employee" ? <Employee data={data} /> : null}
        {data && console.log(data)}
        {data && catagory === "Candidate" ? <Candidate data={data} /> : null}
      </CardContent>
    </Card>
  ) : (
    <div className="p-4 border rounded-md shadow-md w-[100%] flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl">Loading....</h1>
      <p>If it take time , just Refresh the Page</p>
    </div>
  );
};

export default Account;
