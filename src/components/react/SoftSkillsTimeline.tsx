"use client";
import {
    Brain,
    Users,
    MessageCircle,
    Lightbulb,
    Target,
    Heart,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const softSkillsData = [
    {
        id: 1,
        title: "Liderança",
        content: "Capacidade de guiar equipes e tomar decisões estratégicas.",
        icon: Target,
        tags: ["Scrum Master", "Product Owner"],
        quote: "Liderar é criar as condições necessárias para que a equipe possa performar no seu melhor.",
        highlights: [
            "Criei e gerenciei backlogs de produto",
            "Conduzi cerimônias ágeis",
            "Facilitei a comunicação entre stakeholders e equipe",
        ],
        relatedIds: [2, 3],
    },
    {
        id: 2,
        title: "Trabalho em Equipe",
        content: "Colaboração efetiva com diferentes perfis e áreas.",
        icon: Users,
        tags: ["Scrum", "Kanban"],
        quote: "Saber trabalhar com diferentes perfis é fundamental para o sucesso de um projeto.",
        highlights: [
            "Auxiliei membros da equipe com diferentes níveis de experiência",
            "Participei de projetos open-source",
        ],
        relatedIds: [1, 3],
    },
    {
        id: 3,
        title: "Comunicação",
        content: "Clareza na transmissão de ideias técnicas e não-técnicas.",
        icon: MessageCircle,
        tags: ["Apresentações", "Documentação"],
        quote: "Comunicar bem é a chave para o sucesso de um projeto.",
        highlights: [
            "Apresentei soluções para stakeholders",
            "Documentei processos e sistemas",
        ],
        relatedIds: [2, 4],
    },
    {
        id: 4,
        title: "Resolução de Problemas",
        content: "Pensamento analítico para encontrar soluções criativas.",
        icon: Lightbulb,
        tags: ["Debugging", "Arquitetura"],
        quote: "Um problema bem definido é um problema meio resolvido.",
        highlights: [
            "Resolvi gargalos de performance",
            "Desenvolvi requisitos que atendiam as necessidades do cliente e gerenciei isso em um backlog",
            "Trabalhei com kanban e scrum",
        ],
        relatedIds: [1, 5],
    },
    {
        id: 5,
        title: "Aprendizado Contínuo",
        content: "Curiosidade e dedicação para evoluir constantemente.",
        icon: Brain,
        tags: ["Tutoriais", "Cursos"],
        quote: "Todo dia é uma oportunidade para aprender e evoluir.",
        highlights: [
            "Aprendi e apliquei novas tecnologias",
            "Participei de palestras e workshops",
        ],
        relatedIds: [4, 6],
    },
    {
        id: 6,
        title: "Empatia",
        content: "Compreensão das necessidades dos times e clientes.",
        icon: Heart,
        tags: ["UX", "Sprint Planning"],
        quote: "Busque atender as necessidades das pessoas, e não somente seus desejos.",
        highlights: [
            "Conduzi pesquisas com usuários",
            "Otimizei processos para atender as necessidades do time",
            "Refinei requisitos junto com stakeholders",
        ],
        relatedIds: [2, 3],
    },
];

export default function SoftSkillsTimeline() {
    return <RadialOrbitalTimeline timelineData={softSkillsData} />;
}
