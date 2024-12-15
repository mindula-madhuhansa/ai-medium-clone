"use server";

import { replicate } from "@/lib/replicate";
import { uploadImage } from "./uploadImageAction";

export async function generateImage(imagePrompt: string) {
  const image_prompt = {
    prompt: imagePrompt,
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

  const replicateUrl = response.join("");
  const imageUrl = await uploadImage(replicateUrl);

  return imageUrl;
}
