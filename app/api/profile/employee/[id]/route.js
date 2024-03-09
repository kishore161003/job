import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const [
      { companyName, contact, address, about, website, catagory },
      images,
    ] = await req.json();

    const existingUser = await User.findOne({ email: params.id });

    if (existingUser) {
      const newUser = {
        companyName: companyName,
        contact: contact,
        address: address,
        about: about,
        webSite: website,
        catagory: catagory,
        image: images,
      };
      const user = await User.findOneAndUpdate(
        {
          email: params.id,
        },
        newUser,
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
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
