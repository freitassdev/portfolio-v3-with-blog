import Image from "next/image";
import { ThreejsModel } from "@/components/landing/hero/components/threejs/ThreejsModel";
import Navbar from '../components/shared/navbar/Navbar';
import HeroSection from '../components/landing/hero/hero';
export default function Home() {
  return (
    <div className="hero max-sm:w-full max-sm:mx-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
      <Navbar active="home"/>
      <HeroSection />
    </div>
  );
}
