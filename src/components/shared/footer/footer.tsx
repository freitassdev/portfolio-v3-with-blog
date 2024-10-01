import { Copyright } from "lucide-react"
import {
    GitHubLogoIcon,
    LinkedInLogoIcon,
    InstagramLogoIcon,
    EnvelopeClosedIcon,
    HeartFilledIcon
} from "@radix-ui/react-icons"
import {
    RiNextjsFill,
    RiTailwindCssFill,
    RiJavascriptFill
} from "react-icons/ri";
import {
    SiShadcnui,
    SiPrisma,
    SiMongodb
} from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { DiCode } from "react-icons/di";
import { Separator } from '@/components/ui/separator';

export default function Footer() {
    return (
        <footer className="text-primary flex flex-row max-md:flex-col max-md:justify-center max-md:items-start max-md:gap-5 justify-between items-center py-10">
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-start items-center gap-1 text-md font-bold">
                    <p className="flex flex-row justify-start items-center gap-1">
                        <Copyright className="w-4 h-4 mb-[2px]" strokeWidth={1.5} /> 2024
                    </p>
                    <span className="text-muted-foreground"><DiCode className="w-6 h-6 mb-[2px]" /></span>
                    <span className="flex flex-row justify-start items-center gap-1 max-md:whitespace-nowrap">Michel de Freitas</span>
                </div>
                <div className="flex flex-row justify-start items-center gap-2 text-sm">
                    <GitHubLogoIcon className="w-4 h-4 mb-[2px]" strokeWidth={1.5} />
                    <span>Veja o código fonte deste projeto.</span>
                </div>
            </div>
            <Separator className="hidden max-md:flex" />
            <div className="flex flex-col gap-3">
                <div className="flex flex-row max-md:justify-start justify-end items-center gap-3 font-bold">
                    <LinkedInLogoIcon className="w-5 h-5" />
                    <span className="text-muted">•</span>
                    <GitHubLogoIcon className="w-5 h-5" />
                    <span className="text-muted">•</span>
                    <InstagramLogoIcon className="w-5 h-5" />
                    <span className="text-muted">•</span>
                    <EnvelopeClosedIcon className="w-5 h-5" />

                </div>
                <div className="flex flex-row justify-start items-center gap-2 text-sm">
                    Feito com <HeartFilledIcon className="mt-[-2px] text-destructive" /> usando
                    <span className="mt-[-2px] flex flex-row items-center gap-2">
                        <RiNextjsFill className="w-5 h-5" />
                        <RiJavascriptFill className="w-5 h-5" />
                        <BiLogoTypescript className="w-5 h-5" />
                        <RiTailwindCssFill className="w-5 h-5" />
                        <SiPrisma className="w-4 h-4" />
                        <SiShadcnui className="w-3 h-3" />
                        <SiMongodb className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </footer>
    )
}