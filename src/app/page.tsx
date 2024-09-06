import Image from "next/image";
import { ThreejsModel } from "@/components/landing/hero/components/threejs/ThreejsModel";
import Navbar from '../components/shared/navbar/Navbar';
import HeroSection from '../components/landing/hero/hero';
import ProjectsSection from '../components/landing/projects/projects';
import { Spotlight } from "@/components/ui/spotlight";
import { Separator } from "@radix-ui/react-separator";
export default function Home() {
  return (

    <div className="h-screen w-full bg-background relative flex items-center justify-center">
      <div className="h-full max-sm:w-full max-sm:px-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
        <Navbar active="home" />
        <HeroSection />
        <Separator orientation="horizontal" className="w-full h-[1px] bg-muted" />
        <ProjectsSection />
        <Spotlight
          className="-top-40 left-0 md:left-20 md:-top-20"
          fill="white"
        />
      </div>
    </div>
  );
}
