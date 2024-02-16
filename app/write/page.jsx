import { WriteForm } from "../../src/features/post/WriteForm";
import { getUser } from "@/src/query/user.query";
import { createPost } from "./write-post.action";

const write = async () => {
  const user = await getUser();

  return <WriteForm user={user} onSubmit={createPost} />;
};

export default write;
