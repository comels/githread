import Link from "next/link";
import { PostLayout } from "./PostLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { getUserById } from "@/src/query/user.query";
import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { LikeButton } from "./LikeButton";
import { DeletePostButton } from "./DeletePostButton";

export const Post = async ({ post }) => {
  const session = await getAuthSession();

  const user = session?.user ? await getUserById(session.user.id) : null;

  return (
    <PostLayout createdAt={post.createdAt} user={post.user} postId={post.id}>
      <Link href={`/posts/${post.id}`} className="mt-2 text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex items-center gap-2">
        <LikeButton postId={post.id} isLiked={post.likes.length > 0} />
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href={`/posts/${post.id}/reply`}
        >
          <MessageCircle size={20} />
        </Link>
        {post.user.id === user?.id ? <DeletePostButton postId={post.id} /> : null}
      </div>
      <div>
        <Link
          className=" text-sm text-muted-foreground"
          href={`posts/${post.id}`}
        >
          {post._count.likes} likes
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
