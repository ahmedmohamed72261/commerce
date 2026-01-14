"use client";
import React, { useState } from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/admin/ui/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addAddress, getProfile, updateAddress } from '@/services/user.service';
import { Trash2, Edit } from 'lucide-react';

const addressSchema = z.object({
  _id: z.string().optional(),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  building: z.string().min(1, "Building is required"),
  floor: z.string().min(1, "Floor is required"),
  apartment: z.string().min(1, "Apartment is required"),
  additionalInfo: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export default function AddressesPage() {
  const queryClient = useQueryClient();
  const [editingAddress, setEditingAddress] = useState<z.infer<typeof addressSchema> | null>(null);

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getProfile
  });

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      isDefault: false,
    },
  });

  const addMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof addressSchema>) => updateAddress(data._id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      form.reset();
      setEditingAddress(null);
    },
  });

  const onSubmit = (values: z.infer<typeof addressSchema>) => {
    if (editingAddress) {
      updateMutation.mutate(values);
    } else {
      addMutation.mutate(values);
    }
  };

  const handleEdit = (address: z.infer<typeof addressSchema>) => {
    setEditingAddress(address);
    form.reset(address);
  };

  return (
    <div className="space-y-8">
      <WhiteCard title={editingAddress ? "Edit Address" : "Add New Address"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Cairo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Tahrir Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="building"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building</FormLabel>
                    <FormControl>
                      <Input placeholder="12B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input placeholder="3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartment</FormLabel>
                    <FormControl>
                      <Input placeholder="12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Info</FormLabel>
                    <FormControl>
                      <Input placeholder="Call before delivery" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Set as default address
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button type="submit">{editingAddress ? "Update Address" : "Save Address"}</Button>
              {editingAddress && (
                <Button variant="outline" onClick={() => { setEditingAddress(null); form.reset(); }}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </WhiteCard>

      <WhiteCard title="Your Addresses">
        {isLoading ? (
          <p>Loading addresses...</p>
        ) : (
          <div className="space-y-4">
            {userProfile?.data.addresses.map((address: any) => (
              <div key={address._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{address.street}, {address.city}</p>
                  <p className="text-sm text-gray-500">{address.building}, Floor {address.floor}, Apt {address.apartment}</p>
                  {address.isDefault && <span className="text-xs font-bold text-green-600">Default</span>}
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(address)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </WhiteCard>
    </div>
  );
}
