import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
  try {
    console.log("params", params.id);
    await connectToDB();
    const data = await User.find({ email: params.id });
    console.log("data", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
