"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import CardContent from "./components/card-content";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import MovingLine from "@/components/ui/moving-line";

export default function ProjectsSection() {
    const tabs = [
        {
            title: "Chat App",
            value: "chat-app",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600">
                    <p>Chat App</p>
                    <CardContent />
                </div>
            ),
        },
        {
            title: "Detector de Objetos (IA)",
            value: "object-detection",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600">
                    <p>Detector de Objetos</p>
                    <CardContent />
                </div>
            ),
        },
        {
            title: "GPT Chatbot",
            value: "gpt-chatbot",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600">
                    <p>GPT Chatbot</p>
                    <CardContent />
                </div>
            ),
        },
        {
            title: "Etec Jaraguá - DS",
            value: "etec-jaragua",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600">
                    <p>Etec Jaraguá - DS</p>
                    <CardContent />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex flex-col max-w-full mx-auto w-full h-full items-start justify-start mt-20">
                <div className="flex flex-row gap-2 justify-between">
                    <h1 className="max-sm:text-xl text-4xl font-semibold text-primary">
                        Explore minha jornada com<br />
                        <span className="max-sm:text-5xl text-4xl md:text-[6rem] font-bold mt-1 leading-none whitespace-nowrap">
                            Projetos Web
                        </span>
                    </h1>
                </div>
                <div className="h-[20rem] md:h-[45rem] [perspective:1200px] relative b flex flex-col max-w-full mx-auto w-full  items-start justify-start my-4">
                    <Tabs tabs={tabs} />
                </div>
            </div>
            <InfiniteMovingCards
                className="my-10"
                items={itens}
                direction="right"
                speed="slow"
            />
        </>
    );
}

const itens = [
    {
        title: "Dart",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/dart/dart.png"
    },
    {
        title: "C#",
        icon: "https://camo.githubusercontent.com/c113ea8b7dd34b817ac9ee5e8d6d0b0600758486e847bcdb9ab2e9d9808b850a/68747470733a2f2f7365656b6c6f676f2e636f6d2f696d616765732f432f632d73686172702d632d6c6f676f2d303246313737313442412d7365656b6c6f676f2e636f6d2e706e67"
    },
    {
        title: "TypeScript",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png"
    },
    {
        title: "JavaScript",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png"
    },
    {
        title: "MongoDB",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/mongodb/mongodb.png"
    },
    {
        title: "Node.js",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png"
    },
    {
        title: "Next.js",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/nextjs/nextjs.png"
    },
    {
        title: "React",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/react/react.png"
    },
    {
        title: "NestJS",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/nestjs/nestjs.png"
    },
    {
        title: "Express",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/express/express.png"
    },
    {
        title: "GitHub",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/github/github.png"
    },
    {
        title: "React Native",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/react-native/react-native.png"
    },
    {
        title: "HTML",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/html/html.png"
    },
    {
        title: "CSS",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/css/css.png"
    },
    {
        title: "Flutter",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/flutter/flutter.png"
    }
];