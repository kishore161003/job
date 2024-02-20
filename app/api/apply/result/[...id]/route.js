import Apply from "@/models/apply";
import { connectToDB } from "@/utils/database";
import Job from "@/models/job";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const applicationId = params.id[0];
    const res = params.id[1];
    const ap = await Apply.findOne({ _id: applicationId });
    const job = await Job.findOne({ _id: ap.jobId });
    if (res === "Accepted") {
      const updatedJob = await Job.findOneAndUpdate(
        { _id: ap.jobId },
        { openings: job.openings - 1 },
        { new: true }
      );
    }
    const applies = await Apply.findOneAndUpdate(
      { _id: applicationId },
      { status: res },
      { new: true }
    );
    return new Response(JSON.stringify(applies), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
