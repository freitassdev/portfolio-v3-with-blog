import { ThreejsModel } from "./components/threejs/ThreejsModel";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export default function HeroSection() {
    return (
        <div className="brightness-100 flex flex-row gap-4 justify-between h-screen items-center max-lg:flex-col max-lg:justify-center">
            <div className="flex flex-col gap-2 items-start w-[50%] max-lg:w-full max-lg:mt-[40%]">
                <h1 className="max-sm:text-md text-lg">
                    <TextGenerateEffect className="max-sm:text-md text-lg font-normal" duration={1} filter={false} words={"👋🏼 Olá, me chamo Michel Freitas!"} />
                </h1>
                <TextGenerateEffect className="font-extrabold text-primary text-5xl sm:text-6xl" delay={0.2} duration={1} filter={false} words={"Arquitetando o Futuro com Tecnologia e Criatividade"} />
                <TextGenerateEffect className="fmt-4 max-sm:text-md text-lg font-normal" delay={0.1} duration={1} filter={false} words={"Apresentando meu próprio portfólio como um reflexo da minha paixão por esta área. Um desenvolvedor comprometido com a arte de criar experiências únicas, tanto no Front-End quanto no Back-End. Seja bem-vindo!"} />
            </div>
            <div className="flex flex-col justify-center items-end w-[50%] max-lg:w-full max-lg:h-[300px] lg:h-full">
                <ThreejsModel />
            </div>

        </div>
    )
}