"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/date";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const PostLayout = ({ user, children, createdAt, className }) => {
  return (
    <div className={clsx("flex w-full flex-row items-start p-4", className)}>
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.username} />
        ) : null}
        <AvatarFallback>
          {user.username ? user.username.slice(0, 2).toUpperCase() : "UN"}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 flex w-full flex-col gap-2">
        <div className="flex  items-center justify-between gap-2">
          <Link href={`/users/${user.id}`}>
            <p className="mr-auto font-bold text-card-foreground">
              {user.username}
            </p>
          </Link>
          <div className="flex items-center gap-3">
            {createdAt ? (
              <p className="text-xs text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            ) : null}
            <button onClick={() => console.log("test22")}>
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
