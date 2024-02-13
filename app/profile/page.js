import { getAuthSession } from "@/pages/api/auth/[...nextauth]";

const profile = async () => {
  const session = await getAuthSession();

  if (!session?.user)
    return (
      <h1 className="text-2xl font-bold text-center mt-10">
        No user connected
      </h1>
    );

  return (
    <div className="mt-12 mx-10 sm:mx-0">
      <figure class="md:flex bg-stone-100 rounded-xl p-8 md:p-0 dark:bg-gray-800">
        <img
          class="w-24 h-24 md:w-48 md:h-auto md:rounded-r-none rounded-xl object-cover mx-auto"
          src={session.user.image}
          alt={session.user.name}
        />
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-medium">
              " Tailwind CSS is the only framework that I've seen scale on large
              teams. It’s easy to customize, adapts to any design, and the build
              size is tiny. "
            </p>
          </blockquote>
          <figcaption class="font-medium">
            <div class="text-orange-500 text-lg font-bold dark:text-orange-400">
              {session.user.name}
            </div>
            <div class="text-gray-700 dark:text-gray-300">
              {session.user.email}
            </div>
            <di class="text-gray-500 font-light text-sm dark:text-gray-400">
              ID : {session.user.id}
            </di>v
          </figcaption>
        </div>
      </figure>
    </div>
  );
};

export default profile;
