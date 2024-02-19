"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";

export const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className={clsx(buttonVariants({ variant: "ghost" }))}
      onClick={() => {
        startTransition(() => signOut());
      }}
    >
      {isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Déconnexion
    </DropdownMenuItem>
  );
};
