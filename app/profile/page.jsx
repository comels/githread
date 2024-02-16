import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { notFound } from "next/navigation";
import { Post } from "@/src/features/post/Post";
import { getUserById } from "@/src/query/user.query";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { EditProfileForm } from "@/src/features/EditProfileForm";

const ProfileView = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return notFound();
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return notFound();
  }

  const removeHTTP = (url) => {
    return url.replace(/(^\w+:|^)\/\//, "");
  };

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
          <Link
            href="/profile/edit"
            className={buttonVariants({ variant: "secondary" })}
          >
            Edit Profile
          </Link>
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
