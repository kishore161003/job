import { connectToDB } from "@/utils/database";
import Apply from "@/models/apply";
import Job from "@/models/job";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const jobsIds = await Apply.find({ email: params.id });
    console.log("jeb", jobsIds);
    const jobs = await Job.find({
      _id: { $in: jobsIds.map((job) => job.jobId) },
    });
    console.log(jobs);
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};
