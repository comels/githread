"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const EditProfileForm = ({ user, onSubmit }) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      bio: user?.bio,
      link: user?.link,
    },
  });

  return (
    <Form
      className="space-y-4"
      form={form}
      onSubmit={async (values) => {
        const url = await onSubmit(values);
        if (url) {
          router.push(url);
          router.refresh();
        }
      }}
    >
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Pseudo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        name="email"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        name="bio"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        name="link"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Site</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div className="flex w-full justify-end">
        <Button variant="outline">Valider</Button>
      </div>
    </Form>
  );
};
