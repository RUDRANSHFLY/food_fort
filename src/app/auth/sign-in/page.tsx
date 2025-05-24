"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

const USER_VALIDATION_AUTH = z.object({
  email: z.string().email(),
  password: z.string(),
});

type UserAuthData = z.infer<typeof USER_VALIDATION_AUTH>;

const SingIn = () => {

  const router = useRouter();

  const { register, handleSubmit } = useForm<UserAuthData>({
    resolver: zodResolver(USER_VALIDATION_AUTH),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserAuthData) => {
    console.table(data);
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        console.log(result?.error)
        toast.error(result.error);
        return;
      }

      if (result?.ok) {
        toast.success("User Sign-In successfully");
        router.push("/")
      }
    } catch (e) {
      console.log(`Error on sing-in user : ${e}`);
      toast.error("Something error.");
      return null;
    }

    redirect("/");
  };
  return (
    <>
      <MaxWidthWrapper>
        <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover flex justify-center items-center">
          <div className="flex flex-col gap-y-5 bg-slate-200 w-80 py-6 px-4 rounded-md">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="mx-auto mt-2 rounded-md border-2 border-stone-300 p-2"
            />
            <h1 className="text-center text-2xl font-bold">Sign In</h1>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                required
                type="email"
                placeholder="Email"
                className="bg-white"
                {...register("email")}
              />
              <Input
                required
                type="password"
                placeholder="Password"
                className="bg-white"
                {...register("password")}
              />

              <Button>Sign In</Button>
            </form>
            <div className="flex flex-row items-center gap-x-2">
              <span className="text-xs">dont have an account</span>

              <Link
                href={"/auth/sign-up"}
                className="text-xs text-blue-500 underline"
              >
                Register it
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default SingIn;
