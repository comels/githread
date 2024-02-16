import { WriteForm } from "@/src/features/post/WriteForm";
import { Post } from "@/src/features/post/Post";
import { getPostReply } from "@/src/query/post.query";
import { getUser } from "@/src/query/user.query";
import { createReply } from "./write-reply.action";

const Reply = async ({ params }) => {
  const user = await getUser();
  const post = await getPostReply(params.postId, user?.id);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <Post post={post} />
      <WriteForm
        user={user}
        onSubmit={async (values) => {
          "use server";
          return createReply(post.id, values);
        }}
      />
    </div>
  );
};

export default Reply;
