"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
interface IPostItemProps {
    title: string;
    description: string;
    tags: string[];
    slug: string;
    publishedAt: string;
    authorId: string;
    authorUsername?: string;
    authorName?: string;
}

export default function PostItem({ title, description, tags, slug, publishedAt, authorId, authorUsername, authorName }: IPostItemProps) {
    const [username, setUsername] = useState<string | undefined>(authorUsername);
    const [userFullName, setUserFullName] = useState<string | undefined>(authorName);

    useEffect(() => {
        const fetchAuthor = async () => {
            if (!username || !userFullName) {
                const response = await fetch(`/api/blog/users/get?id=${authorId}`, {
                    method: "GET"
                });
                const data = await response.json();
                setUsername(data.username);
                setUserFullName(data.fullName);
            }
        };
        fetchAuthor();
    }, [authorId, username, userFullName]);

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
                    <div className="flex flex-row justify-between items-center gap-2">
                        <Link href={`/blog/post/${slug}`}>
                            <Button className="h-8 px-10">
                                Ver Post
                            </Button>
                        </Link>
                        <Link href={`/blog/user/${username}`}>
                            <div className="flex flex-row items-center gap-2">
                                {userFullName}
                                <Avatar className="cursor-pointer">
                                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                    <AvatarFallback>
                                        {userFullName?.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}