import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserAuthForm from "@/components/UserAuthForm";

export default function AuthenticationPage() {
  return (
    <section className="lg:mx-32">
      <div className="container relative hidden h-[600px]  flex-col items-center justify-center  xs:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex max-md:hidden">
          <div className="absolute inset-0 bg-blue-900 h-[600px]" />
          <img src="/login.jpg" alt="log" className="z-20 h-[520px]" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </section>
  );
}
