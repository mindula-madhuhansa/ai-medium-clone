import { User as TypeUser } from "@clerk/nextjs/server";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function saveNewUser(user: TypeUser) {
  await connectDB();

  let existingUser = await User.findOne({
    email: user.primaryEmailAddress?.emailAddress,
  });

  if (!existingUser) {
    existingUser = new User({
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      profilePicture: user.imageUrl || "",
    });

    await existingUser.save();
  }
}

export async function getUserByEmail(email: string) {
  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    console.error("User not found");
    return;
  }

  return user;
}
