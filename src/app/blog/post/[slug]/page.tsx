'use client';

import Navbar from '@/components/shared/navbar/Navbar';

export default function NewPostPage() {

  return (

    <div className="h-screen w-full bg-background relative flex items-center justify-center">
      <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
        <Navbar active="blog" />
      </div>
    </div>
  );
}
