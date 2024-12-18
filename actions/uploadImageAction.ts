"use server";

import { UTApi } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function uploadImage(url: string) {
  const user = await currentUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const response = await utapi.uploadFilesFromUrl(url);

  return response.data?.url;
}
