"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

const UserAuthForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <section className="z-20">
      <div className={cn("grid gap-6")}>
        <form onSubmit={onSubmit}>
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
                  className="absolute inset-y-0 right-0 px-2 py-1.5 text-sm text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon show={showPassword} />
                  ) : (
                    <EyeIcon show={showPassword} />
                  )}
                </button>
              </div>
            </div>
            <Button
              disabled={isLoading}
              className={cn(
                buttonVariants({ variant: "outline" }),
                " bg-blue-900 text-white"
              )}
              onSubmit={onSubmit}
            >
              Sign In with Email
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserAuthForm;
