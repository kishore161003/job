import { connectToDB } from "@/utils/database";
import Job from "@/models/job";

export const GET = async (req) => {
  try {
    await connectToDB();
    const jobs = await Job.find({});
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
