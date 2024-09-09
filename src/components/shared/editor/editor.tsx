'use client';
import React, { useCallback } from 'react';
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { locales } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import "@blocknote/react/style.css";
import "@/css/blocknote.css"

interface IEditorProps {
    updateHtmlRef: React.RefObject<(html: string) => void>;
}

const Editor: React.FC<IEditorProps> = React.memo(({ updateHtmlRef }) => {
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
        const html = await editor.blocksToHTMLLossy(editor.document);
        updateHtmlRef.current?.(html);
    }, [editor, updateHtmlRef]);

    return (
        <BlockNoteView
            editor={editor}
            title="Novo Post"
            data-theming-css-variables-demo
            onChange={handleChangeEditor}
        />
    );
});

Editor.displayName = "Editor";

export default Editor;
