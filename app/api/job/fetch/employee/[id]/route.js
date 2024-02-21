import Job from "@/models/job";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const jobs = await Job.find({
       postedBy: params.id 
    });
    console.log(params.id, jobs);
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
