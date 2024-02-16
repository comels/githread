import Link from "next/link";
import { PostLayout } from "./PostLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

export const Post = ({ post }) => {
  return (
    <PostLayout createdAt={post.createdAt} user={post.user} postId={post.id}>
      <Link href={`/posts/${post.id}`} className="mt-2 text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Heart size={20} />
        </Button>
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href={`/posts/${post.id}/reply`}
        >
          <MessageCircle size={20} />
        </Link>
      </div>
      <div>
        <Link
          className=" text-sm text-muted-foreground"
          href={`posts/${post.id}`}
        >
          {post._count.like} likes
        </Link>
        {" . "}
        <Link
          className=" text-sm text-muted-foreground"
          href={`/posts/${post.id}`}
        >
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
};
