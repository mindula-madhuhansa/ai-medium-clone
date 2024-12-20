import Link from "next/link";
import Image from "next/image";
import { HeartIcon, MessageCircleIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import { getLikeCount } from "@/services/likeServices";

const PostItem = async ({
  post,
  showAuthor = true,
}: {
  post: PostDoc;
  showAuthor?: boolean;
}) => {
  let likesCount = 0;
  likesCount = await getLikeCount(post._id);

  return (
    <Link href={`/post/${post.slug}`} passHref>
      {showAuthor && (
        <div className="flex items-center gap-2 mb-4">
          <UserAvatar src={post.authorId.profilePicture} className="size-6" />
          <p className="text-xs font-medium">{post.authorId.name}</p>
        </div>
      )}

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg lg:text-2xl font-bold">{post.title}</h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              {post.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-6 text-zinc-600 text-sm">
            <p>{formatDate(post.createdAt)}</p>

            <div className="flex items-center gap-2">
              <HeartIcon className="size-4" />
              <p>{likesCount}</p>
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
