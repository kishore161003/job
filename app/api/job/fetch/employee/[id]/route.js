import Job from "@/models/job";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const jobs = await Job.find({ postedBY: params.id });
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
