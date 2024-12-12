import { User as TypeUser } from "@clerk/nextjs/server";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export const saveNewUser = async (user: TypeUser) => {
  await connectDB();

  let existingUser = await User.findOne({
    email: user.primaryEmailAddress?.emailAddress,
  });

  if (!existingUser) {
    existingUser = new User({
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      profilePicture: user.imageUrl,
    });

    await existingUser.save();
  }
};
