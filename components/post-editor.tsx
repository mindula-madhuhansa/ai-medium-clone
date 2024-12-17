"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { IPost } from "@/models/Post";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { deletePost } from "@/services/postServices";

const PostEditor = ({ post }: { post: Partial<IPost> }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [shortDescription, setShortDescription] = useState(
    post.shortDescription
  );
  const [content, setContent] = useState(post.content);
  const [status, setStatus] = useState(post.status);

  if (!post) {
    return null;
  }

  const handleDiscard = async () => {
    setLoading(true);
    try {
      await deletePost(post._id as string);
      router.replace("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-5 lg:p-10">
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt={post.title as string}
          width={1920}
          height={1080}
          className="rounded-lg max-w-2xl h-auto mx-auto"
        />
      )}

      <Label htmlFor="title" className="mt-6 text-zinc-900 font-semibold">
        Title
      </Label>
      <Input
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-2 p-4 shadow-none border focus-visible:ring-0 focus-visible:outline-none"
      />

      <Label
        htmlFor="shortDescription"
        className="mt-6 text-zinc-900 font-semibold"
      >
        Short Description
      </Label>
      <Textarea
        name="shortDescription"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        className="mt-2 p-4 shadow-none border focus-visible:ring-0 focus-visible:outline-none resize-none"
      />

      <Label htmlFor="content" className="mt-6 text-zinc-900 font-semibold">
        Content
      </Label>
      <Textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mt-2 p-4 shadow-none border focus-visible:ring-0 focus-visible:outline-none resize-none min-h-64"
      />

      <div className="flex justify-end w-full mt-6 space-x-4">
        <Button onClick={handleDiscard} variant="destructive">
          Discard
        </Button>

        <Button
          onClick={() => {}}
          className="bg-green-500 hover:bg-green-500/90"
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
