"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToastAction } from "./ui/toast";

const EyeIcon = ({ show }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="gray"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-eye ${!show ? "visible" : "hidden"}`}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ show }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="gray"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-eye-off ${show ? "visible" : "hidden"}`}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const UserAuthForm = ({ content }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  async function onSubmit2(event) {
    event.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  const onSubmit1 = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Creating");
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status == 200) {
      console.log("user Created Successfully");
      signIn();
    } else if (res.status == 400) {
      console.log("User Already Exists");
      toast({
        variant: "destructive",
        title: "User Already Exists",
        description: "Please Sign In",
      });
    } else {
      console.log("error creating User");
      setIsLoading(false);
    }
  };

  function passwordCheck() {
    console.log(content);
    console.log(data.password);
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){8,}$/;
    if (!passwordRegex.test(data.password)) {
      return true;
    }
    return false;
  }

  return (
    <section className="z-20">
      <div className={cn("grid gap-6")}>
        <form onSubmit={content === "Sign In" ? onSubmit2 : onSubmit1}>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Input
                id="email"
                placeholder="Enter Your Email"
                type="email"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                disabled={isLoading}
              />
              <div className="relative">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-2 py-1.5 text-sm mb-3 text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon show={showPassword} />
                  ) : (
                    <EyeIcon show={showPassword} />
                  )}
                </button>
                {content === "Sign Up" &&
                  passwordCheck() &&
                  data.password.length !== 0 && (
                    <h1 className="text-red-600 text-xs line-clamp-2">
                      Password must contain at least eight characters, including
                      one uppercase letter, one lowercase letter, and one number
                      and one special character,
                    </h1>
                  )}
              </div>
            </div>
            <Button
              disabled={isLoading}
              className={cn(
                buttonVariants({ variant: "outline" }),
                " bg-blue-900 text-white"
              )}
              onSubmit={content === "Sign In" ? onSubmit2 : onSubmit1}
            >
              {content} with Email
            </Button>
          </div>
          {content === "Sign In" ? (
            <div className="text-sm text-slate-500 mt-6 flex justify-center">
              Dont Have an Account{" "}
              <span
                className="underline hover:cursor-pointer ml-2 text-black"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </span>
            </div>
          ) : (
            <div className="text-sm text-slate-500 mt-6 flex justify-center">
              Already Have an Account{" "}
              <span
                className="underline hover:cursor-pointer ml-2 text-black"
                onClick={() => signIn()}
              >
                Sign In
              </span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default UserAuthForm;
