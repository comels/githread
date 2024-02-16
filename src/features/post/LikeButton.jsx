"use client";

import { likeAction } from "@/app/posts/[postId]/like-post.action";
import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { Heart } from "lucide-react";
import React, { useTransition } from "react";

export const LikeButton = ({ postId, isLiked }) => {
  const [isPending, starTransaction] = useTransition();

  return (
    <button
      className={clsx("flex items-center gap-1 rounded-md hover:bg-accent", {
        "text-red-500": isLiked,
      })}
      onClick={() => {
        starTransaction(() => {
          likeAction(postId);
        });
      }}
    >
      {isPending ? <Loader size={20} /> : <Heart size={20} />}
    </button>
  );
};
