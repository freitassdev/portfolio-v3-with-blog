import Image from "next/image";
import { ThreejsModel } from "@/components/landing/hero/components/threejs/ThreejsModel";
import Navbar from '../components/shared/navbar/Navbar';
import HeroSection from '../components/landing/hero/hero';
export default function Home() {
  return (
    <div>
      <Navbar active="home"/>
      <HeroSection />
    </div>
  );
}
