'use client';

import Image from "next/image";
import logo from '../../../../public/images/logo-resources/logo-light-192x192.png';
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import UserMenu from "./components/user-menu";
import { cn } from "@/lib/utils";


export default function Navbar({ active }: { active: string }) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [submenuWidth, setSubmenuWidth] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const { scrollYProgress } = useScroll();
    const navRef = useRef<HTMLDivElement>(null);

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
        setIsScrolled(false);
    }, []);

    scrollYProgress.on('change', (latest) => {
        if (latest > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <>
            <nav className={cn("fixed inset-x-0 top-4 z-50 md:mx-auto flex h-[50px] items-center justify-between rounded-xl border px-2 saturate-100 backdrop-blur-[6px] transition-all duration-200 max-sm:mx-3 sm:mx-3 md:w-[600px] lg:w-[800px] xl:w-[1100px] 2xl:w-[1300px] shadow-lg ", isScrolled ? "bg-background/80 border-border/80" : "bg-card border-border")} ref={navRef}>
                <div className="flex flex-row gap-3 items-center">
                    <Image className="h-[35px] w-auto rounded-md" src={logo} alt="Logo" />
                    <a href="/" className="text-xl font-bold text-primary">michelfreitas</a>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-4"> {/* items desktop */}
                        <Link href="/" className={cn("hidden md:block text-md text-foreground transition-all duration-200 hover:text-foreground/80 hover:border-b border-border", active === "home" ? "text-primary hover:text-primary/80" : "")}>Início</Link>

                        <Separator className="hidden md:block h-[20px]" orientation="vertical" />
                        <Link href="/about-me" className={cn("hidden md:block text-md text-foreground transition-all duration-200 hover:text-foreground/80 hover:border-b border-border", active === "about-me" ? "text-primary hover:text-primary/80" : "")}>Sobre Mim</Link>

                        <Separator className="hidden md:block h-[20px]" orientation="vertical" />
                        <Link href="/blog" className={cn("hidden md:block text-md text-foreground transition-all duration-200 hover:text-foreground/80 hover:border-b border-border", active === "blog" ? "text-primary hover:text-primary/80" : "")}>Blog</Link>
                        {isAdmin && (
                            <>
                                <Separator className="hidden md:block h-[20px]" orientation="vertical" />

                                <Link href="/about-me" className={cn("hidden md:block text-md text-foreground transition-all duration-200 hover:text-foreground/80 hover:border-b border-border", active === "about-me" ? "text-primary hover:text-primary/80" : "")}>Dashboard</Link>
                            </>
                        )}
                        <div className="flex flex-row gap-2 items-center">
                            <Input placeholder="Pesquisar artigo..." iconStyle="h-5 w-5 max-md:hidden" className="max-md:hidden h-[35px] border-border/50" icon={Search} />
                            <UserMenu setIsAdmin={setIsAdmin} className="max-md:hidden" />
                        </div>

                        <Menu className="block md:hidden cursor-pointer" onClick={() => setIsMobile((prev) => !prev)} />
                    </div>
                </div>
            </nav>
            <div className={`transition-all duration-200 md:hidden left-3 fixed top-24 ${isMobile ? "flex opacity-100" : "hidden opacity-0"} shadow-sm saturate-100 backdrop-blur-[8px] bg-background/80 border border-border rounded-lg p-3 flex-col gap-5 z-50`}
                style={{
                    width: submenuWidth,
                }}>
                <div className="w-full h-full relative flex flex-col gap-5">
                    <div className="flex flex-col justify-start items-center w-full gap-4">
                        <Link href="/" className="hidden max-md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80">Início</Link>
                        <Separator className="hidden max-md:block max-w-48" />
                        <Link href="/about-me" className="hidden max-md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80">Sobre Mim</Link>
                        <Separator className="hidden max-md:block max-w-48" />
                        <Link href="/blog" className="hidden max-md:block text-lg text-foreground transition-all duration-200 hover:text-foreground/80">Blog</Link>
                    </div>
                    <div className="w-full">
                        <Input placeholder="Pesquisar artigo..." iconStyle="h-5 w-5 md:hidden" className="md:hidden border-border/50" icon={Search} />
                        <UserMenu setIsAdmin={setIsAdmin} className="absolute right-0 top-0 md:hidden" />
                    </div>
                </div>

            </div>
        </>
    );
};