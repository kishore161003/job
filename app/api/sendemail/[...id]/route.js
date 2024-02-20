import Job from "@/models/job";
import { connectToDB } from "@/utils/database";
import Apply from "@/models/apply";
import User from "@/models/user";
import nodemailer from "nodemailer";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const applicationId = params.id[0];
    const ap = await Apply.findOne({ _id: applicationId });
    const job = await Job.findOne({ _id: ap.jobId });
    const company = await User.findOne({ email: job.postedBy });
    const companymail = job.email;
    const user = ap.email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: [process.env.FROM_EMAIL, user],
      subject: ap.status,
      html: `
        <div>
          <h1>${ap.name} you are ${ap.status}</h1>
          <p>Thank you for contacting us!</p>
          <p>This message is submitted</p>
          <p> you have been ${ap.status} for the ${job.title} in ${company.companyName} </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify(info), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
