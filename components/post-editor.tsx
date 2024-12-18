"use client";

import Image from "next/image";
import { useState } from "react";

import { IPost } from "@/models/Post";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PostEditor = ({ post }: { post: Partial<IPost> }) => {
  const [title, setTitle] = useState(post.title);
  const [shortDescription, setShortDescription] = useState(
    post.shortDescription
  );
  const [content, setContent] = useState(post.content);

  if (!post) {
    return null;
  }

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
    </div>
  );
};

export default PostEditor;
