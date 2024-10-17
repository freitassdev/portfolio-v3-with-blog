'use client';

import Navbar from "@/components/shared/navbar/Navbar";
import PostItem from '@/components/shared/post-item/post-item';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TResponseGetPost, TResponseGetUser } from "../../../api/(types)/types";


import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import toast from "react-hot-toast";

export default function UserPage({ params }: { params: { username: string } }) {
    const [posts, setPosts] = useState<TResponseGetPost["allPosts"]>([]);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [user, setUser] = useState<TResponseGetUser>();
    const { username } = params;
    const router = useRouter();
    useEffect(() => {
        if (!username) return router.push("/blog");
        const fetchUser = async () => {
            const res = await fetch(`/api/blog/users/get?username=${username}`, {
                method: "GET"
            });

            const response = await res.json();

            if (res.ok) {
                const { posts, totalPosts, ...user } = response;
                setPosts(posts);
                setTotalPosts(totalPosts);
                setUser(user);
            } else {
                toast.error("Usuário não encontrado, redirecionando para a página inicial...")
                setTimeout(() => {
                    router.push("/blog")
                }, 2000)
            }
        }

        fetchUser();
    }, [username, router])
    return (
        <div className="h-screen w-full bg-background relative flex items-center justify-center">
            <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[800px] xl:w-[1100px] 2xl:w-[1300px]">
                <Navbar active="blog" />
                <div className="flex flex-row gap-4 mt-24 max-md:flex-col ">
                    <div className="flex h-full w-full flex-col overflow-hidden text-popover-foreground rounded-lg bg-card border border-border shadow-md md:max-w-[350px] p-4 items-center gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <Avatar className="cursor-pointer w-20 h-20 text-2xl">
                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                <AvatarFallback>
                                    {user?.fullName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-center">
                                <p className="text-lg text-primary font-bold">{user?.fullName}</p>
                                <p className="text-sm text-foreground">@{user?.username}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="w-full flex flex-col gap-2">
                            <p className="text-sm text-foreground">Posts ({totalPosts} encontrados)</p>
                            <div className="flex flex-col gap-2">
                                {posts.map((post) => (
                                    <div key={post.id} className="w-full h-auto bg-muted rounded-md flex flex-row items-center p-2 gap-2">
                                        <p className="text-sm text-foreground overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        {posts.map((post) => (
                            <div key={post.id} className="w-full">
                                <PostItem
                                    description={post.simpleDescription}
                                    title={post.title}
                                    tags={post.tags}
                                    slug={post.slug}
                                    publishedAt={format(new Date(post.createdAt), 'dd MMM yyyy', { locale: ptBR })}
                                    authorName={user?.fullName ?? ""}
                                    authorUsername={user?.username ?? ""}
                                    authorId={post.authorId}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
