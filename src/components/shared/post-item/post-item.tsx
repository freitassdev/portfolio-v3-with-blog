import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
interface IPostItemProps {
    title: string;
    description: string;
    tags: string[];
    slug: string;
    publishedAt: string;
    authorName: string;
}

export default function PostItem({ title, description, tags, slug, publishedAt, authorName }: IPostItemProps) {


    return (
        <>
            <div className="flex flex-col p-3 border border-border bg-card rounded-md w-full gap-2">
                <div className="flex flex-row justify-between gap-2">
                    <h3 className="text-xl font-bold text-primary ">{title}</h3>
                    <p className="whitespace-nowrap">{publishedAt}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-2">
                        {tags.map((tag, index) => {
                            return (
                                <span key={index} className="text-sm bg-muted text-primary rounded-md px-2 py-1">{tag}</span>
                            )
                        })}
                    </div>
                    <p>{description}</p>
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <Avatar className="cursor-pointer">
                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                <AvatarFallback>
                                    {authorName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {authorName}
                        </div>
                        <Separator className="flex-1"/>
                        <div className="flex flex-row gap-2 items-center">
                            <p>129 likes</p>
                            <Heart strokeWidth={1.5}  className="h-5 w-5 text-primary text-red-400 fill-red-400"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}