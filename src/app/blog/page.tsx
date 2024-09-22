'use client';

import { useEffect, useState } from "react";
import { TResponseGetPost } from "../api/(types)/types";
import Navbar from "@/components/shared/navbar/Navbar";
import PostItem from '../../components/shared/post-item/post-item';


import { DotFilledIcon } from "@radix-ui/react-icons"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Blog() {
    const [posts, setPosts] = useState<TResponseGetPost[]>([]);
    useEffect(() => {
        const fetchAllPosts = async () => {
            const res = await fetch(`/api/blog/post/get`, {
                method: "GET"
            });

            const response: TResponseGetPost[] = await res.json();

            if (res.ok) {
                setPosts(response);
            }
        }

        fetchAllPosts();
    }, [])
    return (
        <div className="h-screen w-full bg-background relative flex items-center justify-center">
            <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
                <Navbar active="blog" />
                <div className="flex flex-row gap-4 mt-24">
                    <Command className="rounded-lg bg-card border shadow-md md:max-w-[350px]">
                        <CommandInput placeholder="Pesquise por uma tag..." />
                        <CommandList className=" max-h-[900px]">
                            <CommandEmpty>Nenhuma tag encontrada.</CommandEmpty>
                            <CommandGroup heading="Principais tags">
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>Javascript</span>
                                </CommandItem>
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>TypeScript</span>
                                </CommandItem>
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>React.js</span>
                                </CommandItem>
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>Next.js</span>
                                </CommandItem>
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>TailwindCSS</span>
                                </CommandItem>
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>Tecnologia</span>
                                </CommandItem>
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>Programação</span>
                                </CommandItem>
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>Outros</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Outros">
                                <CommandItem>
                                    <DotFilledIcon className="mr-2 h-4 w-4" />
                                    <span>Teste</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <div className="flex flex-col gap-3 w-full">
                        {posts.map((post) => (
                            <div key={post.id} className="w-full">
                                <PostItem
                                    description={post.simpleDescription} 
                                    title={post.title}
                                    tags={post.tags}
                                    slug={post.slug}
                                    publishedAt={format(new Date(post.createdAt), 'dd MMM yyyy', { locale: ptBR })}
                                    authorName={post.authorName}
                                     />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}