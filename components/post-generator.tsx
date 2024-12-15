"use client";

import { useState } from "react";
import { Loader2Icon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generatePost } from "@/actions/postGenerateAction";

const PostGenerator = () => {
  const [loading, setLoading] = useState(false);

  async function handleGeneratePost(formData: FormData) {
    const prompt = formData.get("prompt") as string;
    if (!prompt) return;

    setLoading(true);
    try {
      await generatePost(prompt);
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        await handleGeneratePost(formData);
      }}
      className="relative"
    >
      <h2 className="text-2xl font-bold mb-4">Let&apos;s brainstorm</h2>
      <div className="h-40 rounded-2xl p-0.5 bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="h-full w-full rounded-[13.5px] bg-gray-50">
          <Textarea
            name="prompt"
            maxLength={500}
            placeholder="Describe a topic you want to write about"
            className="h-full text-sm md:text-base shadow-none border-none focus-visible:ring-0 focus-visible:outline-none resize-none lg:overflow-hidden"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="hidden lg:flex absolute bottom-4 right-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 px-10 py-5 hover:opacity-90 transition-opacity"
      >
        {loading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" /> Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="size-4 fill-current" /> Create idea
          </>
        )}
      </Button>

      <Button
        type="submit"
        size="icon"
        className="lg:hidden absolute bottom-2 right-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
      >
        {loading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
          </>
        ) : (
          <>
            <SparklesIcon className="size-3 fill-current" />
          </>
        )}
      </Button>
    </form>
  );
};

export default PostGenerator;
