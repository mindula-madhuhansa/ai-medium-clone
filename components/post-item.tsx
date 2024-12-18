import Link from "next/link";
import Image from "next/image";
import { HeartIcon, MessageCircleIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";

const PostItem = ({ post }: { post: PostDoc }) => {
  return (
    <Link href={`/post/${post._id}`} passHref>
      <div className="flex items-center gap-2 mb-4">
        {post.authorId.profilePicture ? (
          <Image
            src={post.authorId.profilePicture}
            alt={post.authorId.name}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        )}
        <p className="text-sm">{post.authorId.name}</p>
      </div>

      <div className="flex justify-between max-w-3xl">
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg lg:text-2xl font-bold">{post.title}</h2>
            <p className="text-muted-foreground text-xs lg:text-sm lg:max-w-lg">
              {post.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-6 text-zinc-600 text-sm">
            <p>{formatDate(post.createdAt)}</p>

            <div className="flex items-center gap-2">
              <HeartIcon className="size-4" />
              <p>0</p>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircleIcon className="size-4" />
              <p>0</p>
            </div>
          </div>
        </div>

        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1920}
          height={1080}
          className="h-14 w-24 md:h-28 md:w-44 object-cover"
        />
      </div>
    </Link>
  );
};

export default PostItem;
