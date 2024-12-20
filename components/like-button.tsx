"use client";

import { useEffect, useState } from "react";
import { HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addRemoveLike, getLiked } from "@/actions/likeAction";

const LikeButton = ({
  userId,
  postId,
  likesCount,
}: {
  userId: string;
  postId: string;
  likesCount: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      const res = await getLiked(userId, postId);
      setIsLiked(res);
    };

    checkIfLiked();
  }, [userId, postId]);

  const handleLike = async () => {
    const res = await addRemoveLike(userId, postId);
    setIsLiked(res);
  };

  return (
    <form onSubmit={handleLike} className="flex items-center gap-2">
      <Button type="submit" variant="ghost">
        <HeartIcon
          className={`size-5 text-rose-500 ${isLiked && "fill-current"}`}
        />
        <p>{likesCount}</p>
      </Button>
    </form>
  );
};

export default LikeButton;
