import Image from "next/image";
import { ThreejsModel } from "@/components/landing/hero/components/threejs/ThreejsModel";
import Navbar from '../components/shared/navbar/Navbar';
import HeroSection from '../components/landing/hero/hero';
import ProjectsSection from '../components/landing/projects/projects';
export default function Home() {
  return (
    <div className="h-screen w-full bg-background dark:bg-grid-white/[0.1] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="h-full max-sm:w-full max-sm:px-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
        <Navbar active="home" />
        <HeroSection />
        <ProjectsSection />
      </div>
    </div>
  );
}
