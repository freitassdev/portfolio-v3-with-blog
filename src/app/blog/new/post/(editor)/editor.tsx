'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { locales } from "@blocknote/core";

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TagsInput } from "react-tag-input-component";
import Image from 'next/image';

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@blocknote/react/style.css";
import "@/css/blocknote.css"
import toast from 'react-hot-toast';

export default function Editor() {
    const [html, setHtml] = useState<string>("");
    const [tags, setTags] = useState(["Programação", "React"]);

    const editor = useCreateBlockNote({
        dictionary: {
            ...locales.pt,
            placeholders: {
                default: "Digite seu texto ou use '/' para comandos",
                heading: "Título",
                bulletListItem: "Lista",
                numberedListItem: "Lista",
                checkListItem: "Lista",
            },
        },
        initialContent: [

            {
                type: "heading",
                props: { level: 2, textAlignment: "center" },
                content: "Um pequeno template para seu post 🔥",
            },
            {
                type: "paragraph",
                content: "Este este editor inclui as seguintes funcionalidades:",
            },
            {
                type: "bulletListItem",
                content: "Comandos de formatação de texto",
            },
            {
                type: "bulletListItem",
                content: "Organização intuitíva em blocos",
            },
            {
                type: "bulletListItem",
                content: "Suporte a tabelas, imagens, videos e áudios"
            },
            {
                type: "bulletListItem",
                content: "Códigos, syntax highlight e muito mais."
            }
        ],
    });

    const handleChangeEditor = useCallback(async () => {
        const htmlCode = await editor.blocksToHTMLLossy(editor.document);
        setHtml(htmlCode);
    }, [editor, setHtml]);

    useEffect(() => {
        if (tags.length > 8) {
            setTags(tags.slice(0, 8));
            toast.error("Máximo de 8 tags permitidas.");
        }
    }, [tags]);

    return (
        <div className='flex flex-col gap-3'>
            <div className="flex flex-col gap-3">
                <Input className="text-4xl font-extrabold h-20" placeholder="Insira o título do post" />
                <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="tags"
                    placeHolder="digite as tags do post"
                    separators={[",", "Enter"]}

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
            <Separator orientation="horizontal" className="w-[80%] h-[1px] bg-border mx-auto" />

            <div className="mb-10">
                <BlockNoteView
                    editor={editor}
                    title="Novo Post"
                    data-theming-css-variables-demo
                    onChange={handleChangeEditor}

                />
            </div>
        </div>

    );
};