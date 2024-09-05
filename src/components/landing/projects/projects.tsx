"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import CardContent from "./components/card-content";

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
        <div className="h-[20rem] md:h-[40rem] [perspective:1200px] relative b flex flex-col max-w-full mx-auto w-full  items-start justify-start my-40">
          <Tabs tabs={tabs} />
        </div>
      );
}
