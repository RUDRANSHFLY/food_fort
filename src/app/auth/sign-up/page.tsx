"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { createUser } from "@/server/create-user";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const USER_VALIDATION = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["ADMIN", "MANAGER", "MEMBER"]),
});

type UserFormData = z.infer<typeof USER_VALIDATION>;

const SingUp = () => {
  const { register, handleSubmit, control } = useForm<UserFormData>({
    resolver: zodResolver(USER_VALIDATION),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    console.table(data);
    const userData = {
      ...data,
    };
    const user = await createUser(userData);

    if ("error" in user) {
      toast.error(user.error);
    } else {
      toast.success("User registered successfully!");
    }

    if(user){
      redirect('/auth/sign-in')
    }
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover flex justify-center items-center">
          <div className="flex flex-col gap-y-5 bg-slate-200 w-80 py-6 px-4 rounded-md border-2 border-gray-400">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="mx-auto mt-2 rounded-md border-2 border-stone-300 p-2"
            />
            <h1 className="text-center text-2xl font-bold">Sign Up</h1>
            <form
              className="flex flex-col gap-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type="email"
                placeholder="Email"
                className="bg-white"
                {...register("email")}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-white"
                {...register("password")}
                required
              />

              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="gap-y-2" {...register("role")}>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                        <SelectItem value="MEMBER">Member</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <Button type="submit">Sign Up</Button>
              <div className="flex flex-row items-center gap-x-2">
                <span className="text-xs">already have an account</span>

                <Link
                  href={"/auth/sign-up"}
                  className="text-xs text-blue-500 underline"
                >
                  Sign-In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default SingUp;
