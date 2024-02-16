import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { Post } from "@/src/features/post/Post";
import { getPost } from "@/src/query/post.query";
import { notFound } from "next/navigation";
import clsx from "clsx";

const PostView = async ({ params }) => {
  const session = await getAuthSession();
  const post = await getPost(params.postId, session?.user?.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="divide-y divide-accent">
      {post.parent && <Post post={post.parent} key={post.parent.id} />}

      <div className={clsx({ "ml-10": post.parent })}>
        <Post post={post} key={post.id} />
        <div className="ml-10 divide-y divide-accent">
          {post.replies.map((reply) => (
            <Post post={reply} key={reply.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostView;
