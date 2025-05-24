import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const SingIn = () => {
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
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-white"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-white"
            />

            <Button>Sign In</Button>
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
