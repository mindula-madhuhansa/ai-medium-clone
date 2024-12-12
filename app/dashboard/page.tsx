"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateNews } from "@/actions/newsGenerateAction";

export default function Home() {
  async function handleGenerateNews(formData: FormData) {
    const prompt = formData.get("prompt") as string;
    if (!prompt) return;

    try {
      const news = await generateNews(prompt);
      console.log("Generated News:", news);
    } catch (error) {
      console.error("Error generating news:", error);
    }
  }

  return (
    <form action={handleGenerateNews}>
      <Input name="prompt" type="text" placeholder="Enter your prompt here" />
      <Button type="submit">Generate</Button>
    </form>
  );
}
