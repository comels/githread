import { LoginButton } from "./auth/LoginButton";
import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { UserProfile } from "./auth/UserProfile";
import Link from "next/link";

export const Header = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 z-20 mb-10 w-full border-b-2 border-accent bg-background">
      <div className="container m-auto flex max-w-2xl items-center py-4">
        <Link href="/" className="mr-auto">
          <h2 className="text-2xl font-bold">Githread</h2>
        </Link>
        {session ? (
          <>
            <h1 className="font-light">
              <UserProfile />
            </h1>
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};
