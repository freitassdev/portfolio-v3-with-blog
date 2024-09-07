'use client';

import Navbar from '@/components/shared/navbar/Navbar';
import { Spotlight } from "@/components/ui/spotlight";
import { Separator } from "@radix-ui/react-separator";
import { useEffect } from 'react';
import { signOut } from "next-auth/react";

export default function Blog() {
  // useEffect(() => {
  //   signOut()
  // }, [])
  return (

    <div className="h-screen w-full bg-background relative flex items-center justify-center">
      <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
        <Navbar active="blog" />
        <Separator orientation="horizontal" className="w-full h-[1px] bg-muted" />
        <Spotlight
          className="-top-40 left-0 md:left-20 md:-top-20"
          fill="white"
        />
      </div>
    </div>
  );
}
