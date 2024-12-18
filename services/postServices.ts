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
    imagePrompt: post.imagePrompt,
    imageUrl: post.imageUrl,
  });

  try {
    const savedPost = await newPost.save();

    const post = JSON.parse(JSON.stringify(savedPost));
    return post;
  } catch (error) {
    console.error("Error saving post:", error);
    return;
  }
}

export async function getPostById(id: string) {
  await connectDB();

  try {
    const post = await Post.findById(id).populate(
      "authorId",
      "name profilePicture"
    );

    if (!post) {
      console.error("Post not found");
      return;
    }

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Error getting post by id:", error);
    return;
  }
}

export async function getDraftPosts(authorId: string) {
  await connectDB();

  try {
    const posts = await Post.find({ authorId, status: "draft" })
      .populate("authorId", "name profilePicture")
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error getting draft posts:", error);
    return [];
  }
}

export async function getPublishedPosts(authorId: string) {
  await connectDB();

  try {
    const posts = await Post.find({ authorId, status: "published" })
      .populate("authorId", "name profilePicture")
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error getting published posts:", error);
    return [];
  }
}

export async function getAllPosts() {
  await connectDB();

  try {
    const posts = await Post.find({ status: "published" })
      .populate("authorId", "name profilePicture")
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export async function deletePost(id: string) {
  await connectDB();

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      console.error("Post not found");
      return;
    }

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Error deleting post:", error);
    return;
  }
}

export async function updatePostStatus(id: string, status: string) {
  await connectDB();

  try {
    const post = await Post.findByIdAndUpdate(id, { status }, { new: true });

    if (!post) {
      console.error("Post not found");
      return;
    }

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Error updating post status:", error);
    return;
  }
}
