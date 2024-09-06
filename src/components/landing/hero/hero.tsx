import { ThreejsModel } from "./components/threejs/ThreejsModel";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export default function HeroSection() {
    return (
        <div className="brightness-100 flex flex-row gap-4 justify-between h-screen items-center max-lg:flex-col max-lg:justify-center">
            <div className="flex flex-col gap-2 items-start max-lg:items-center max-lg:text-center w-[50%] max-lg:w-full max-lg:mt-[20%]">
                <TextGenerateEffect className="max-sm:text-md text-sm font-normal" duration={1} filter={false} words={"👋🏼 Olá, me chamo Michel Freitas!"} />
                <TextGenerateEffect className="font-extrabold text-primary text-5xl lg:text-7xl max-sm:text-center" delay={0.2} duration={1} filter={false} words={"Arquitetando o Futuro com Tecnologia e Criatividade"} />
                <TextGenerateEffect className="max-sm:text-justify mt-4 max-sm:text-sm text-md lg:text-xl font-normal" delay={0.1} duration={1} filter={false} words={"Apresentando meu próprio portfólio como um reflexo da minha paixão por esta área. Um desenvolvedor comprometido com a arte de criar experiências únicas, tanto no Front-End quanto no Back-End. Seja bem-vindo!"} />
            </div>
            <div className="flex flex-col justify-center items-end w-[50%] max-lg:w-full max-lg:h-[300px] max-sm:h-[200px] lg:h-full">
                <ThreejsModel />
            </div>

        </div>
    )
}