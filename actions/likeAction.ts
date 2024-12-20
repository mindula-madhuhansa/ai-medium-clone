"use server";

import { revalidatePath } from "next/cache";

import { getIsLiked, toggleLike } from "@/services/likeServices";

export async function addRemoveLike(userId: string, postId: string) {
  try {
    const res = await toggleLike(userId, postId);
    if (res?.success) {
      revalidatePath(`/post/[id]`, "layout");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getLiked(userId: string, postId: string) {
  try {
    const res = await getIsLiked(userId, postId);
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
}
