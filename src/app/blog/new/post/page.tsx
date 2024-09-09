'use client';

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TagsInput } from "react-tag-input-component";
import Navbar from "@/components/shared/navbar/Navbar";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from 'next/image';
export default function App() {
    const [html, setHtml] = useState("");
    const [tags, setTags] = useState(["Programação", "React"]);

    //precisamos importar o editor dinamicamente para que o bundle do editor não seja carregado no bundle principal
    const Editor = dynamic(() => import("@/components/shared/editor/editor"), { ssr: false });

    const updateHtmlRef = useRef((html: string) => setHtml(html));

    useEffect(() => {
        updateHtmlRef.current = (html: string) => setHtml(html);
    }, []);

    useEffect(() => {
        console.log(html);
    }, [html]);

    return (
        <div className="h-screen w-full bg-background relative flex items-center justify-center">
            <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[700px] xl:w-[700px] 2xl:w-[900px]">
                <Navbar active="blog" />
                <div className="flex flex-col mt-24">
                    <div className="flex flex-col gap-3">
                        <Input className="text-4xl font-extrabold h-20" placeholder="Insira o título do post" />
                        <TagsInput
                            value={tags}
                            onChange={setTags}
                            name="tags"
                            placeHolder="digite as tags do post"
                        />
                        <em>Pressione Enter ou vírgula para adicionar uma tag.</em>
                        <AspectRatio ratio={16 / 9} className="bg-muted">
                            <Image
                                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                                alt="Photo by Drew Beamer"
                                fill
                                className="h-full w-full rounded-md object-cover"
                            />
                        </AspectRatio>
                    </div>
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-muted" />

                    <div className="mt-3">
                        <Editor updateHtmlRef={updateHtmlRef}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
