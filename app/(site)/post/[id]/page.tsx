import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { redirect } from "next/navigation";
import { MessageCircleIcon, ShareIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import CommentBox from "@/components/comment-box";
import LikeButton from "@/components/like-button";
import { currentUser } from "@clerk/nextjs/server";
import { getLikeCount } from "@/services/likeServices";
import { getUserByEmail } from "@/services/userServices";
import { getPostBySlug } from "@/services/postServices";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return redirect("/sign-in");
  }

  const user = await getUserByEmail(
    clerkUser.primaryEmailAddress?.emailAddress as string
  );

  const { id } = await params;
  console.log("slug", id);

  const post: PostDoc = await getPostBySlug(id);

  let likesCount = 0;
  likesCount = await getLikeCount(post._id);

  if (post.status !== "published") {
    return redirect("/");
  }

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold">{post.title}</h2>
      <h3 className="mt-4 text-lg text-zinc-600 font-medium">
        {post.shortDescription}
      </h3>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/dashboard/${post.authorId._id}`}
          className="flex items-center gap-2 hover:underline"
        >
          <UserAvatar src={post.authorId.profilePicture} className="size-8" />
          <p>{post.authorId.name}</p>
        </Link>
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
          <Markdown key={index} className="mb-6 text-lg font-serif">
            {paragraph.trim()}
          </Markdown>
        ))}
      </div>

      <div className="flex items-center gap-6 text-zinc-600 text-sm my-12">
        <LikeButton
          userId={user.id}
          postId={post._id}
          likesCount={likesCount}
        />

        <div className="flex items-center gap-2">
          <MessageCircleIcon className="size-5" />
          <p>0</p>
        </div>

        <div className="flex items-center gap-2">
          <ShareIcon className="size-5" />
        </div>
      </div>

      <div>
        <p className="font-semibold text-xl">Responses (0)</p>
      </div>

      <CommentBox />
    </div>
  );
}
