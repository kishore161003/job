import { connectToDB } from "@/utils/database";
import Job from "@/models/job";

export const GET = async (req, { params }) => {
  try {
    console.log("hi");
    await connectToDB();
    const job = await Job.findById(params.id);

    return new Response(JSON.stringify(job), { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};
