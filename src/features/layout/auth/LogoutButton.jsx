"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useTransition } from "react";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="mr-2"
      onClick={() => { startTransition(() => signOut())
      }}
    >
      {isPending ? <Loader className="mr-2 h-4 w-4"/> : <LogOut className="h-4 w-4" />}
    </Button>
  );
};
