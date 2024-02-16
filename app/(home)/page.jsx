import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { Post } from "@/src/features/post/Post";
import { getLatestPosts } from "@/src/query/post.query";

const Home = async () => {
  const session = await getAuthSession();

  const posts = await getLatestPosts(session?.user?.id);

  return (
    <div className="divide-y-2 divide-muted px-5">
      {posts.map((p) => (
        <Post post={p} key={p.id} />
      ))}
    </div>
  );
};

export default Home;
