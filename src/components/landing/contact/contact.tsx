'use client';

import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FaEnvelope } from "react-icons/fa";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
export default function ContactSection() {
    return (
        <BackgroundBeamsWithCollision>
            <motion.div
                initial={{ opacity: 0.5, y: 100 }}  
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="flex flex-col gap-4 items-center "
            >
                <h1 className="py-2 text-center text-4xl font-semibold tracking-tight text-white md:text-7xl">Vamos Conversar?</h1>
                <p className="max-w-2xl text-center text-lg text-primary">Interessado em colaborar em um projeto ou discutir uma ideia? Clique no botão abaixo para me enviar um e-mail. Estou sempre aberto a novas oportunidades e desafios no mundo do desenvolvimento!</p>
                <HoverBorderGradient className="bg-card flex flex-row gap-3 items-center">
                    <FaEnvelope className="w-5 h-5 text-primary"/>
                    <p className="max-sm:text-sm text-md font-normal">Entrar em contato</p>
                </HoverBorderGradient>

            </motion.div>

        </BackgroundBeamsWithCollision>
    );
}