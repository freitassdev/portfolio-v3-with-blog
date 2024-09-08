'use client';

import Navbar from "@/components/shared/navbar/Navbar";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css"
import "@/css/blacknote.css"
import { Separator } from "@radix-ui/react-separator";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { locales } from "@blocknote/core";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function App() {
    // Creates a new editor instance.
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

    });

    // Renders the editor instance using a React component.
    return (
        <div className="h-screen w-full bg-background relative flex items-center justify-center">
            <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
                <Navbar active="home" />
                <div className="flex flex-col mt-28">

                    <Input className="text-4xl font-extrabold h-20" placeholder="Insira o título do post" />
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-muted" />

                    <div className="mt-3">
                        <BlockNoteView
                            editor={editor}
                            title="Novo Post"
                            shadCNComponents={
                                {
                                    Input: { Input },
                                    Button: { Button },
                                    Label: { Label },
                                    Popover: { Popover, PopoverContent, PopoverTrigger },
                                    
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}
