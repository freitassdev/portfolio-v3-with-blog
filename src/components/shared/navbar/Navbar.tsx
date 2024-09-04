import Image from "next/image";
import logo from '../../../../public/images/logo-resources/logo-light-192x192.png';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function Navbar({ active }: { active: string }) {

    return (
        <nav className="fixed inset-x-0 top-4 z-40 md:mx-auto flex h-[60px] items-center justify-between rounded-xl border border-border bg-card px-2 shadow-sm saturate-100 backdrop-blur-[4px] transition-all duration-200 max-sm:mx-3 sm:mx-3 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px] ">
            <div className="flex flex-row gap-3 items-center">
                <Image className="h-[40px] w-auto rounded-md" src={logo} alt="Logo" />
                <a href="/" className="text-xl font-bold text-primary">michelfreitas</a>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-4"> {/* items desktop */}
                    <a href="#" className="text-lg text-primary transition-all duration-200 hover:text-primary/80 hover:border-b">Início</a>
                    <Separator className="h-[20px]" orientation="vertical" />
                    <a href="#" className="text-lg text-primary transition-all duration-200 hover:text-primary/80 hover:border-b">Sobre Mim</a>
                    <Separator className="h-[20px]" orientation="vertical" />
                    <a href="#" className="text-lg text-primary transition-all duration-200 hover:text-primary/80 hover:border-b">Blog</a>
                    <Input placeholder="Pesquisar artigo..." iconStyle="h-5 w-5" className="border-border/50" icon={Search}/>
                </div>
            </div>

        </nav>
    );
};