import { connectToDB } from "@/utils/database";
import Job from "@/models/job";

export const GET = async (req) => {
  try {
    await connectToDB();
    const jobs = await Job.find({});
    console.log("jobs", jobs);
    return new Response(
      JSON.stringify(jobs),
      { status: 200 },
      { headers: { "cache-control": "no-cache" } }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
