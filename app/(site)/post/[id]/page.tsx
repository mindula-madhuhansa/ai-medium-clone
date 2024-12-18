import Image from "next/image";
import { HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import CommentBox from "@/components/comment-box";
import { getPostById } from "@/services/postServices";

export default async function PostPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  const post: PostDoc = await getPostById(id);
  console.log(post.content);

  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <h3 className="mt-4 text-lg text-zinc-600 font-medium">
        {post.shortDescription}
      </h3>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar
            src={
              post.authorId.profilePicture || "https://github.com/shadcn.png"
            }
          />
          <p>{post.authorId.name}</p>
        </div>
        <p className="text-sm text-zinc-500">{formatDate(post.createdAt)}</p>
      </div>

      <div className="border-t border-zinc-200 mt-4" />

      <div className="mt-16">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1920}
          height={1080}
          className="object-cover w-auto h-96 mx-auto"
        />
      </div>

      <div className="mt-12">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-6 text-lg font-serif">
            {paragraph.trim()}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-end gap-6 text-zinc-600 text-sm my-12">
        <div className="flex items-center gap-2">
          <HeartIcon className="size-4" />
          <p>0</p>
        </div>

        <div className="flex items-center gap-2">
          <MessageCircleIcon className="size-4" />
          <p>0</p>
        </div>

        <div className="flex items-center gap-2">
          <ShareIcon className="size-4" />
        </div>
      </div>

      <div>
        <p className="font-semibold text-xl">Responses (0)</p>
      </div>

      <CommentBox />
    </div>
  );
}
