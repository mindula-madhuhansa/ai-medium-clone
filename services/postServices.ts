import { currentUser } from "@clerk/nextjs/server";

import Post from "@/models/Post";
import connectDB from "@/lib/mongodb";
import { getUserByEmail } from "./userServices";

export async function savePost(post: Post) {
  const user = await currentUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  await connectDB();

  const email = user.primaryEmailAddress?.emailAddress as string;
  const author = await getUserByEmail(email);

  const newPost = new Post({
    authorId: author._id,
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    imageUrl: post.imageUrl,
  });

  try {
    await newPost.save();
  } catch (error) {
    console.error("Error saving post:", error);
    return;
  }
}
