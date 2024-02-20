import Apply from "@/models/apply";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  console.log(params.id);
  console.log("hi");
  try {
    await connectToDB();
    const jobs = await Apply.find({
      $and: [{ jobId: params.id[0] }, { email: params.id[1] }],
    });
    console.log(jobs);
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
