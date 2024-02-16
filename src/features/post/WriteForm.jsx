"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ContentTextArea } from "@/src/features/post/ContentTextArea";
import { PostLayout } from "@/src/features/post/PostLayout";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const WriteForm = ({ user, onSubmit }) => {
  const form = useForm();
  const router = useRouter();
  return (
    <PostLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const postId = await onSubmit(values);
          router.push(`/posts/${postId}`);
          router.refresh();
        }}
      >
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                {/* textarea custom */}
                <ContentTextArea {...field} rows={2} />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex w-full justify-end">
          <Button size="sm">Post</Button>
        </div>
      </Form>
    </PostLayout>
  );
};
