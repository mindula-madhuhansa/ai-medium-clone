"use client";

import Image from "next/image";
import { useState } from "react";
import { CircleCheckIcon, PencilLineIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const PostEditor = ({ post }: { post: PostDoc }) => {
  const [title, setTitle] = useState(post.title);
  const [shortDescription, setShortDescription] = useState(
    post.shortDescription
  );
  const [content, setContent] = useState(post.content);

  if (!post) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-6">
        {post.status === "published" ? (
          <Badge
            variant="outline"
            className="rounded-full px-4 py-2 space-x-2 bg-green-500"
          >
            <CircleCheckIcon className="size-4" />
            <span>Published</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="rounded-full px-4 py-2 space-x-3">
            <PencilLineIcon className="size-4" />
            <span>Draft</span>
          </Badge>
        )}
      </div>
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt={post.title as string}
          width={1920}
          height={1080}
          className="rounded-lg w-96 lg:w-[720px] h-auto mx-auto"
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
