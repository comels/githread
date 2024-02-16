"use client";

import { deletePost } from "@/app/posts/[postId]/delete-post.action";
import { Loader } from "@/components/ui/loader";
import { Trash } from "lucide-react";
import React, { useTransition } from "react";

export const DeletePostButton = ({ postId }) => {
  const [isPending, starTransaction] = useTransition();

  return (
    <button
      className="flex items-center gap-1 rounded-md hover:bg-accent"
      onClick={() => {
        starTransaction(() => {
          deletePost(postId);
        });
      }}
    >
      {isPending ? <Loader size={20} /> : <Trash size={20} />}
    </button>
  );
};
