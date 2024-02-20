import Job from "@/models/job";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    console.log("searching for", params.id);
    await connectToDB();
    const jobs = await Job.find({
      $or: [{ title: { $regex: params.id, $options: "i" } }],
    });
    console.log("found", jobs);

    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};
