import { connectToDB } from "@/utils/database";
import Apply from "@/models/apply";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const jobId = params.id;
    const applies = await Apply.find({ jobId: jobId });
    return new Response(JSON.stringify(applies), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
