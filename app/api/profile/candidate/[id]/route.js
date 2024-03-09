import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
  console.log("This is backend");
  try {
    await connectToDB();
    const [
      { name, contact, address, education, profession, skills, catagory },
      images,
    ] = await req.json();

    const existingUser = await User.findOne({ email: params.id });

    if (existingUser) {
      const user = await User.findOneAndUpdate(
        {
          email: params.id,
        },
        {
          name: name,
          contact: contact,
          address: address,
          education: education,
          profession: profession,
          skills: skills,
          catagory: catagory,
          image: images,
        },
        {
          new: true,
        }
      );

      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
  } catch (err) {
    console.log("Error From server", err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
