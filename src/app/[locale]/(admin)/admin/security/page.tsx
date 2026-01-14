"use client";
import React from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/admin/ui/form';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/services/user.service';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export default function SecurityPage() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      form.reset();
      // Add a success toast notification here
    },
    onError: () => {
      // Add an error toast notification here
    }
  });

  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    mutation.mutate(values);
  };

  return (
    <WhiteCard title="Change Password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </WhiteCard>
  );
}
