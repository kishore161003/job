"use client";
import { useState } from "react";
import SingleBanner from "@/components/SingleBanner";
import { Separator } from "@/components/ui/separator";
import Dashboard from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import Account from "@/components/Account";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ...

const Page = () => {
  const [account, setAccount] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <section className="lg:mx-32 flex flex-col">
      <SingleBanner
        heading={account ? "My Profile" : "My Dashboard"}
        bannerimage={"heo.jpg"}
      />
      <div className="flex max-md:flex-col gap-5 mt-10">
        <div className="flex flex-col max-md:flex-row max-md:px-8 max-md:gap-7  gap-3">
          <div
            onClick={() => setAccount(true)}
            className={`text-lg cursor-pointer font-semibold ${
              account
                ? "text-white bg-primary flex justify-center rounded-md p-2"
                : "text-black"
            }`}
          >
            Account
          </div>
          <Separator
            orientation="horizontal"
            className="h-0.5 max-md:hidden w-[140px] bg-blue-950"
          />
          <div
            onClick={() => setAccount(false)}
            className={`text-lg cursor-pointer font-semibold ${
              !account ? "text-white bg-primary rounded-md p-2" : "text-black"
            } `}
          >
            Dashboard
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="h-[350px] w-0.5 max-md:hidden bg-blue-950 rounded-md"
        />
        <Separator
          orientation="horizontal"
          className="w-[90%] ml-4 h-0.5 md:hidden bg-blue-950 rounded-md"
        />
        <div className="w-full  max-md:pl-8">
          <ScrollArea className="h-[350px]">
            {account ? (
              <div className="max-md:w-[90%]">
                <Account />
              </div>
            ) : (
              <div className="max-md:w-[90%]">
                <Dashboard />
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default Page;
