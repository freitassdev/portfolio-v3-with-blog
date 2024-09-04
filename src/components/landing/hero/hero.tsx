import { ThreejsModel } from "./components/threejs/ThreejsModel";

export default function HeroSection() {
    return (
        <div className="flex flex-row gap-4 justify-between h-screen items-center max-lg:flex-col max-lg:justify-center">
            <div className="flex flex-col gap-2 items-start w-[50%] max-lg:w-full max-lg:mt-[40%]">
                <h1 className="text-lg">👋🏼 Olá, me chamo Michel Freitas!</h1>
                <span className="font-extrabold tracking-tighter text-primary text-4xl sm:text-6xl">Arquitetando o Futuro com Tecnologia e Criatividade</span>
                <p className="mt-4 text-lg">Apresentando meu próprio portfólio como um reflexo da minha paixão por esta área. Um desenvolvedor comprometido com a arte de criar experiências únicas, tanto no Front-End quanto no Back-End. Seja bem-vindo!</p>
            </div>
            <div className="flex flex-col justify-center items-end w-[50%] max-lg:w-full max-lg:h-[300px] lg:h-full">
                <ThreejsModel />
            </div>

        </div>
    )
}