"use server";

import { formatJson } from "@/lib/utils";
import { replicate } from "@/lib/replicate";
import { model, generationConfig } from "@/lib/gemini";

export async function generateNews(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const res = await chatSession.sendMessage(prompt);

  const news = formatJson(res.response.text());

  const image_prompt = {
    prompt: news.image_prompt,
    go_fast: true,
    megapixels: "1",
    num_outputs: 1,
    aspect_ratio: "16:9",
    output_format: "png",
    output_quality: 80,
    num_inference_steps: 4,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await replicate.run("black-forest-labs/flux-schnell", {
    input: image_prompt,
  });

  const imageUrl = response.join("");

  news.image_url = imageUrl;

  return news;
}
