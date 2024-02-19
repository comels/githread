import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { Post } from "@/src/features/post/Post";
import { getUserById } from "@/src/query/user.query";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";

const ProfileView = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    throw new Error("Session not found");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    throw new Error("User not found");
  }
  const removeHTTP = (url) => {
    return url.replace(/(^\w+:|^)\/\//, "");
  };

  return (
    <div className="mx-auto w-full max-w-xl  bg-white">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        {/*  Pour utiliser des images externes avec le composant Image de Next.js, vous devez explicitement autoriser les domaines des images dans votre fichier next.config.js. */}
        {/* <Image
          className="mb-4 rounded-full"
          src={user.image}
          alt={`${user.name} image`}
          width={96} // Valeur en pixels correspondant à "w-24" dans Tailwind CSS
          height={96} // Valeur en pixels correspondant à "h-24" dans Tailwind CSS
          objectFit="cover"
        /> */}
        <img
          className="mb-4 h-24 w-24 rounded-full"
          src={user.image}
          alt={user.name + " image"}
        />
        <h5 className="mb-3 text-xl font-medium text-gray-900">{user.name}</h5>
        {user.bio && (
          <p className="mb-3 text-sm italic text-gray-800">{user.bio}</p>
        )}
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">
            {user._count.followers} follower
            {user._count.followers > 1 ? "s" : ""}
          </p>
          <p className="text-gray-500"> - </p>
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
            className={buttonVariants({ variant: "outline" })}
          >
            Modifier le profil
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
