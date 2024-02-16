import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { getUser } from "@/src/query/user.query";
import { notFound } from "next/navigation";

const profile = async () => {
  const session = await getAuthSession();
  const user = await getUser();

  if (!session?.user) return notFound();

  return (
    <div class="mx-auto w-full max-w-lg rounded-lg border border-gray-200 bg-white shadow">
      <div class="flex flex-col items-center pb-10">
        <img
          class="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={session.user.image}
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-newColor-700 hover:text-newColor-400">
          {session.user.name}
        </h5>
        <span class="text-sm text-gray-500">{session.user.email}</span>
      </div>
    </div>
  );
};

export default profile;
