import Footer from '@/components/shared/footer/footer';
import Navbar from '@/components/shared/navbar/Navbar';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { EnvelopeClosedIcon, GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import myself from '../../../public/images/myself.jpg';
export default function Home() {
    return (

        <div className="h-screen w-full bg-background relative flex items-center justify-center">
            <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[800px] xl:w-[1100px] 2xl:w-[1300px]">
                <Navbar active="about-me" />
                <div className='flex flex-row max-lg:flex-col-reverse max-lg:mt-28 items-center justify-between max-lg:h-auto h-full w-full gap-20 max-lg:gap-10'>
                    <div className='flex-1 flex flex-col gap-4 max-lg:items-center'>
                        <HoverBorderGradient className="bg-card">
                            <TextGenerateEffect className="max-sm:text-sm text-md font-normal" duration={1} filter={false} words={"👋🏼 Olá, me chamo Michel Freitas!"} />
                        </HoverBorderGradient>
                        <p className='text-justify text-md text-primary'>Sou estudante e desenvolvedor, apaixonado por programação desde os 12 anos. Tenho 16 anos, moro em Pirituba, São Paulo, e curso Desenvolvimento de Sistemas na Etec Jaraguá. Faço estágio como Desenvolvedor Web na Focus Têxtil, onde trabalho com tecnologias como Node.js, React, Express, Nest, Angular e React Native com TypeScript. Atualmente, estou estudando C# e MySQL.<br /><br />Nos meus tempos livres, gosto de jogar videogame, jogar vôlei, ouvir música, assistir filmes e séries, além de viajar e desenvolver projetos. Estou animado para explorar mais a tecnologia e colaborar em projetos inovadores!</p>
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        <Image src={myself} className="rounded-full max-w-[250px]" alt="me" />
                        <h2 className='text-2xl font-bold'>Michel de Freitas</h2>
                        <div className="flex flex-row max-md:justify-start justify-end items-center gap-3 font-bold">
                            <Link href="https://www.linkedin.com/in/michel-de-freitas" target="_blank" rel="noopener noreferrer">
                                <LinkedInLogoIcon className="w-5 h-5" />
                            </Link>
                            <Link href="https://github.com/freitassdev" target="_blank" rel="noopener noreferrer">
                                <GitHubLogoIcon className="w-5 h-5" />
                            </Link>
                            <Link href="https://www.instagram.com/freitascrl" target="_blank" rel="noopener noreferrer">
                                <InstagramLogoIcon className="w-5 h-5" />
                            </Link>
                            <Link href="mailto:contato@michelfreitas.com" target="_blank" rel="noopener noreferrer">
                                <EnvelopeClosedIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
