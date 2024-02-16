"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className="mr-2"
      onClick={() => {
        startTransition(() => signOut());
      }}
    >
      {isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Log out
    </DropdownMenuItem>
  );
};
