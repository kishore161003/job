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
      const newUser = {
        name: name,
        contact: contact,
        address: address,
        education: education,
        profession: profession,
        skills: skills,
        catagory: catagory,
      };

      if (images) {
        newUser.image = images;
      }
      Object.keys(existingUser.toObject()).forEach((key) => {
        if (key !== "_id" && newUser[key] === undefined) {
          newUser[key] = existingUser[key];
        }
      });

      console.log("new user", newUser, "req", req.json());
      await User.findByIdAndDelete(existingUser._id);

      const createdUser = await User.create(newUser);

      console.log(createdUser, createdUser._id);
      return new Response(JSON.stringify(createdUser), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
