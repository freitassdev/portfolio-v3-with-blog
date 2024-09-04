import Image from "next/image";
import { ThreejsModel } from "@/components/landing/hero/components/threejs/ThreejsModel";
import Navbar from '../components/shared/navbar/Navbar';
export default function Home() {
  return (
    <div>
      <Navbar active="home"/>
      <ThreejsModel />
      <h1>Home</h1>
      <span className="text-4xl font-extrabold tracking-tighter text-primary sm:text-6xl">Hello!</span>
    </div>
  );
}
