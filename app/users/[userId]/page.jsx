import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { notFound, redirect } from "next/navigation";
import { getUserById } from "@/src/query/user.query";
import { Button } from "@/components/ui/button";
import { followUser } from "./follow.action";
import { Post } from "@/src/features/post/Post";
import { prisma } from "@/lib/prisma";

const ProfileView = async ({ params }) => {
  const session = await getAuthSession();
  const user = await getUserById(params.userId);

  const removeHTTP = (url) => {
    return url.replace(/(^\w+:|^)\/\//, "");
  };

  if (!user) {
    return notFound();
  }

  const isFollowing = session?.user.id
    ? await prisma.follow.findFirst({
        where: {
          followerId: user.id,
          followingId: session?.user?.id,
        },
        select: {
          id: true,
        },
      })
    : false;

  const isCurrentUser = session?.user.id === user.id;

  if (isCurrentUser) {
    redirect("/profile");
  }

  return (
    <div className="mx-auto w-full max-w-xl  bg-white">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-4 h-24 w-24 rounded-full"
          src={user.image}
          alt={user.name + " image"}
        />
        <h5 className="text-xl font-medium text-gray-900">{user.name}</h5>
        {user.bio && (
          <p className="mb-3 text-sm italic text-gray-800">{user.bio}</p>
        )}
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">
            {user._count.followers} follower
            {user._count.followers > 1 ? "s" : ""}
          </p>
          <p className="text-gray-500"> / </p>
          {user.link && (
            <p className="text-sm text-gray-500">
              <a href={user.link} target="_blank" rel="noopener noreferrer">
                {removeHTTP(user.link)}
              </a>
            </p>
          )}
        </div>
        <form className="mt-4">
          <Button
            variant="secondary"
            formAction={async () => {
              "use server";
              if (!session?.user.id) {
                return;
              }
              await followUser(params.userId);
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </form>
      </div>
      <div className="divide-y divide-accent border-t py-10">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
