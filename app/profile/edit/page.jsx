import { getUserEdit } from "@/src/query/user.query";
import { notFound } from "next/navigation";
import { EditProfileForm } from "@/src/features/EditProfileForm";
import { editProfile } from "./edit-profile.action";

const page = async () => {
  const user = await getUserEdit();

  if (!user) {
    return notFound();
  }
  return (
    <div className="container flex h-full items-center">
      <div className="flex-1 rounded-md border border-border bg-card p-4">
        <EditProfileForm user={user} onSubmit={editProfile}/>
      </div>
    </div>
  );
};

export default page;
