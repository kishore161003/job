import { connectToDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";
import Apply from "@/models/apply";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const { email, coverLetter, name, phone, datam } = await req.json();
    const jobId = params.id;
    const user = await User.findOne({ email: email });
    const apply = await Apply.create({
      email: email,
      jobId: jobId,
      coverLetter: coverLetter,
      name: name,
      phone: phone,
      resume: datam,
    });
    const job = await Job.findOne({ _id: jobId });
    job.applicants.push(apply._id);
    job.openings = job.openings - 1;
    user.applied.push(apply._id);
    await job.save();
    await user.save();
    return new Response(JSON.stringify(apply), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
