import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  try {
    await connectToDB();
    const { email, password } = await req.json();
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });
    }
    const newUser = await User.create({
      email: email,
      password: password,
    });
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
