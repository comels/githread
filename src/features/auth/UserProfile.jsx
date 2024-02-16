import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import { DropdownMenuItemLogout } from "./LogoutButton";

export const UserProfile = async () => {
  const session = await getAuthSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          {session.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User2 className="mr-2 w-4 marker:h-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
