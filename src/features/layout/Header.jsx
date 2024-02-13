import { ThemeToggle } from "@/src/theme/ThemeToggle";
import React from "react";
import { LoginButton } from "./auth/LoginButton";
import { LogoutButton } from "./auth/LogoutButton";
import { getAuthSession } from "@/pages/api/auth/[...nextauth]";

const Header = async () => {
  const session = await getAuthSession();

  return (
    <div className="border-b border-accent fixed top-0 bg-background w-full">
      <div className="container flex py-2 max-w-xl m-auto gap-1 items-center">
        <h2 className="text-2xl mr-auto font-bold">Githread</h2>
        {session ? (
          <>
            <h1 className="mr-4 font-light">{session.user.name}</h1> <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
