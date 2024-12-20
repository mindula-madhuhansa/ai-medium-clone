import Like from "@/models/Like";
import Post from "@/models/Post";
import connectDB from "@/lib/mongodb";

export async function toggleLike(userId: string, postId: string) {
  await connectDB();

  try {
    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
      return { success: true };
    } else {
      const newLike = new Like({ userId, postId });
      await newLike.save();
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
      return { success: true };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getIsLiked(userId: string, postId: string) {
  await connectDB();

  const existingLike = await Like.findOne({ userId, postId });
  return !!existingLike;
}

export async function getLikeCount(postId: string) {
  await connectDB();

  const likeCount = await Like.countDocuments({ postId });
  return likeCount;
}
