import { connectToDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const {
      title,
      description,
      location,
      startDate,
      duration,
      salary,
      skills,
      postedBy,
      openings,
    } = await req.json();

    const newJob = {
      title: title,
      description: description,
      location: location,
      startDate: startDate,
      duration: duration,
      salary: salary,
      skills: skills,
      postedBy: postedBy,
      openings: openings,
    };

    const createdJob = await Job.create(newJob);

    const user = await User.findOne({ email: postedBy });
    user.posted.push(createdJob._id);
    await user.save();

    return new Response(JSON.stringify(createdJob), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
