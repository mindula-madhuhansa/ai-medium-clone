"use server";

import { formatJson } from "@/lib/utils";
import { model, generationConfig } from "@/lib/gemini";
import { generateImage } from "@/actions/imageGenerateAction";
import { savePost } from "@/services/postServices";

export async function generatePost(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const res = await chatSession.sendMessage(prompt);
  const post = formatJson(res.response.text()) as Post;

  const imageUrl = await generateImage(post.imagePrompt);
  post.imageUrl = imageUrl;

  await savePost(post);

  return post;
}
