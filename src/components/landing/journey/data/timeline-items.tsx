import Image from "next/image";
import TimelineItem, { ITimelineItemProps } from '../../../shared/timeline-item/timeline-item';
import etecLogo from "../../../../../public/images/etecjaragua-logo.png";
import focusLogo from "../../../../../public/images/focus-logo.png";
import BoxReveal from "@/components/magicui/box-reveal";

const timelineItemData: ITimelineItemProps[] = [
  {
    type: "education",
    title: "Etec Jaraguá",
    date: "Jan. de 2023 - Atualmente",
    description: "Em 2023, ingressei na Etec Jaraguá no curso de Desenvolvimento de Sistemas, após ser aprovado no processo seletivo do Centro Paula Souza. Adquiri diversos conhecimentos em programação, como banco de dados, desenvolvimento web e mobile, além de lógica de programação e algoritmos. Participei de diversos eventos e projetos, como a Feira Tecnológica, o Hackathon do CPS e a Olimpíada Brasileira de Informática.",
    image: etecLogo,
  },
  {
    type: "work",
    title: "Focus Têxtil",
    date: "Junho de 2023 - Atualmente",
    description: "Em junho de 2023, iniciei como Jovem Aprendiz na Focus Têxtil, uma empresa de grande porte no ramo têxtil. Atuo como desenvolvedor full-stack, utilizando tecnologias como React, Next.js, Nest.js, entre outros. Participei de diversos projetos, onde pude evoluir muito meus conhecimentos e desenvolver meu trabalho em equipe e comunicação.",
    image: focusLogo,
  },
  {
    type: "education",
    title: "Estudos",
    date: "Jan. 2024",
    description: "Já em 2024, foquei em continuar meus estudos na programação, me aprimorando nas tecnologias que já sei e descobrindo novas tecnologias, como Flutter, C#, MySQL e Criação de modelos de Inteligência Artificial. Pretendo me aprofundar nestas e outras tecnologias, além de buscar certificações e participar de eventos e projetos.",
  },
  {
    type: "other",
    title: "Atualmente",
    date: "",
    description: "Atualmente, continuo estudando na Etec Jaraguá e trabalhando na Focus Têxtil. Além disso, estou participando de diversos eventos de programação presenciais, onde tenho a oportunidade de expandir minha rede de contatos e me atualizar com as novas tendências da área. Estou sempre em busca de novos conhecimentos e oportunidades para evoluir na minha carreira.",
  }
]

export const timelineItems = [
  {
    title: "2023",
    content: (
      <div className="grid grid-cols-1 gap-4">
        <BoxReveal boxColor={"#89cff0"} duration={0.5}>
          <TimelineItem {...timelineItemData[0]} />
        </BoxReveal>
        
        <BoxReveal boxColor={"#89cff0"} duration={0.5}>
          <TimelineItem {...timelineItemData[1]} />
        </BoxReveal>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div className="grid grid-cols-1 gap-4">
        <BoxReveal boxColor={"#89cff0"} duration={0.5}>
          <TimelineItem {...timelineItemData[2]} />
        </BoxReveal>
      </div>
    ),
  },
  {
    title: "Atualmente",
    content: (
      <div className="grid grid-cols-1 gap-4">
        <BoxReveal boxColor={"#89cff0"} duration={0.5}>
          <TimelineItem {...timelineItemData[3]} />
        </BoxReveal>
      </div>
    ),
  },
];