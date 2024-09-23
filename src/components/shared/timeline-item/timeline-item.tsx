import { Separator } from "@/components/ui/separator";
import etecLogo from "../../../../public/images/etecjaragua-logo.png";
import logo from "../../../../public/images/logo-white.png";
import Image, { StaticImageData } from "next/image";
import { BriefcaseBusiness, GraduationCap, Coffee } from "lucide-react";
export interface ITimelineItemProps {
    type?: "education" | "work" | "other" | undefined;
    id?: number | undefined;
    title?: string | undefined;
    date?: string | undefined;
    description?: string | undefined;
    image?: string | StaticImageData | undefined;
}
export default function TimelineItem({
    type = undefined,
    id = 0,
    title = "Titulo",
    date = "Jan. de 2023 - Atualmente",
    description = "Descrição",
    image = logo,
}: ITimelineItemProps) {
    return (
        <div className="border border-border bg-card w-full min-h-52  rounded-lg flex flex-col py-3 px-4 text-primary gap-4">
            <div className="flex flex-row justify-between gap-2 items-center">
                <h2 className="flex flex-row gap-2 items-center">{type === "education" ? (
                    <GraduationCap strokeWidth={1.5} className="w-5 h-5" />
                ) : type === "work" ? (
                    <BriefcaseBusiness strokeWidth={1.5} className="w-5 h-5" />
                ) : (
                    <Coffee strokeWidth={1.5} className="w-5 h-5" />
                )}{title}</h2>
                <Separator className="flex-1" />
                <p>{date}</p>
            </div>
            <div className="flex flex-row gap-3 h-full">
                <p className="max-w-[80%] text-foreground">
                    {description}
                </p>
                <div className="bg-white flex-1 max-w-[20%] h-min rounded-md p-4 aspect-square">
                    <Image src={image} alt="Timeline item Logo" className="w-auto" />
                </div>
            </div>
        </div>
    )
}