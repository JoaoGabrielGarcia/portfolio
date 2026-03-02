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
        tags: ["Tech Lead", "Product Owner"],
        quote: "Liderar é servir a equipe, não o contrário.",
        highlights: [
            "Liderei squad de 5 devs",
            "Gerenciei backlog de produto",
        ],
        relatedIds: [2, 3],
    },
    {
        id: 2,
        title: "Trabalho em Equipe",
        content: "Colaboração efetiva com diferentes perfis e áreas.",
        icon: Users,
        tags: ["Scrum", "Pair Programming"],
        quote: "O melhor código nasce da colaboração.",
        highlights: [
            "Atuei em squads multidisciplinares",
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
        quote: "Comunicar bem é tão importante quanto codar bem.",
        highlights: [
            "Apresentei soluções para stakeholders",
            "Documentei projetos complexos",
        ],
        relatedIds: [2, 4],
    },
    {
        id: 4,
        title: "Resolução de Problemas",
        content: "Pensamento analítico para encontrar soluções criativas.",
        icon: Lightbulb,
        tags: ["Debugging", "Arquitetura"],
        quote: "Todo problema é uma oportunidade disfarçada.",
        highlights: [
            "Resolvi gargalos de performance",
            "Projetei arquiteturas escaláveis",
        ],
        relatedIds: [1, 5],
    },
    {
        id: 5,
        title: "Aprendizado Contínuo",
        content: "Curiosidade e dedicação para evoluir constantemente.",
        icon: Brain,
        tags: ["Autodidata", "Cursos"],
        quote: "Nunca parar de aprender é o que me move.",
        highlights: [
            "Aprendi novas stacks por conta própria",
            "Participei de hackathons e workshops",
        ],
        relatedIds: [4, 6],
    },
    {
        id: 6,
        title: "Empatia",
        content: "Compreensão das necessidades dos usuários e colegas.",
        icon: Heart,
        tags: ["UX", "Code Review"],
        quote: "Entender o outro é o primeiro passo para criar algo incrível.",
        highlights: [
            "Conduzi pesquisas com usuários",
            "Fiz code reviews construtivos",
        ],
        relatedIds: [2, 3],
    },
];

export default function SoftSkillsTimeline() {
    return <RadialOrbitalTimeline timelineData={softSkillsData} />;
}
