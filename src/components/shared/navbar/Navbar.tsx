'use client';

import Image from "next/image";
import logo from '../../../../public/images/logo-resources/logo-light-192x192.png';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { zodUserType } from '../../../zod/types';

export default function Navbar({ active }: { active: string }) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [submenuWidth, setSubmenuWidth] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [nameAbrev, setNameAbrev] = useState<string>("");
    const { scrollYProgress } = useScroll();
    const { data: session , status } = useSession();
    const router = useRouter();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(session && session.user) {
            const name = session.user.fullName;
            const nameAbreviation = name.split(" ").map((n) => n[0]).join("").substring(0, 2);
            setNameAbrev(nameAbreviation);
        }
    }, [session])

    const UserMenu = ({ className }: { className: string }) => {
        if (status === "authenticated") {
            return (
                <div className={cn("flex flex-row items-center gap-3", className)}>
                    <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                        <AvatarFallback>{nameAbrev}</AvatarFallback>
                    </Avatar>
                </div>
            )
        }
        return (
            <div className={cn("flex flex-row items-center gap-4", className)}>
                <Button className="text-sm" onClick={() => router.push("/auth/login")}>Fazer Login</Button>
            </div>
        )
    }

    useEffect(() => {
        setTimeout(() => {
            if (navRef.current) {
                setSubmenuWidth(navRef.current.getBoundingClientRect().width);
            }
            window.addEventListener("resize", () => {
                if (navRef.current) {
                    setSubmenuWidth(navRef.current.getBoundingClientRect().width);
                }
            });
        })
    }, []);

    scrollYProgress.on('change', (latest) => {
        console.log(latest)
        if (latest > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <>
            <nav className={cn("fixed inset-x-0 top-4 z-40 md:mx-auto flex h-[60px] items-center justify-between rounded-xl border px-2 saturate-100 backdrop-blur-[6px] transition-all duration-200 max-sm:mx-3 sm:mx-3 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px] shadow-lg ", isScrolled ? "bg-background/80" : "bg-card border-border")} ref={navRef}>
                <div className="flex flex-row gap-3 items-center">
                    <Image className="h-[40px] w-auto rounded-md" src={logo} alt="Logo" />
                    <a href="/" className="text-xl font-bold text-primary">michelfreitas</a>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-4"> {/* items desktop */}
                        <a href="#" className={cn("hidden md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80 hover:border-b", active === "home" ? "text-primary hover:text-primary/80" : "")}>Início</a>
                        <Separator className="hidden md:block h-[20px]" orientation="vertical" />
                        <a href="#" className={cn("hidden md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80 hover:border-b", active === "about-me" ? "text-primary hover:text-primary/80" : "")}>Sobre Mim</a>
                        <Separator className="hidden md:block h-[20px]" orientation="vertical" />
                        <a href="#" className={cn("hidden md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80 hover:border-b", active === "blog" ? "text-primary hover:text-primary/80" : "")}>Blog</a>
                        <div className="flex flex-row gap-2 items-center">
                            <Input placeholder="Pesquisar artigo..." iconStyle="h-5 w-5 max-md:hidden" className="max-md:hidden border-border/50" icon={Search} />
                            <UserMenu className="max-md:hidden" />
                        </div>

                        <Menu className="block md:hidden cursor-pointer" onClick={() => setIsMobile((prev) => !prev)} />
                    </div>
                </div>
            </nav>
            <div className={`transition-all duration-200 md:hidden left-3 fixed top-24 ${isMobile ? "flex opacity-100" : "hidden opacity-0"} shadow-sm saturate-100 backdrop-blur-[8px] bg-background/80 border border-border rounded-lg p-3 flex-col gap-5 z-50`}
                style={{
                    width: submenuWidth,
                }}>
                <div className="flex flex-col justify-start items-center w-full gap-4">
                    <a href="#" className="hidden max-md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80">Início</a>
                    <Separator className="hidden max-md:block max-w-48" />
                    <a href="#" className="hidden max-md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80">Sobre Mim</a>
                    <Separator className="hidden max-md:block max-w-48" />
                    <a href="#" className="hidden max-md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80">Blog</a>
                </div>
                <div className="w-full">
                    <Input placeholder="Pesquisar artigo..." iconStyle="h-5 w-5 md:hidden" className="md:hidden border-border/50" icon={Search} />
                    <UserMenu className="md:hidden" />
                </div>
            </div>
        </>
    );
};