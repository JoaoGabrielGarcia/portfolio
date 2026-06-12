import React from "react";
import ciandtImg from "../../assets/timeline/ciandt.png";
import sellitImg from "../../assets/timeline/sellit.png";
import techfalaImg from "../../assets/timeline/techfala.png";
import microassistImg from "../../assets/timeline/microassist.png";
import passaroMarronImg from "../../assets/timeline/passaro-marron.png";
import { Timeline } from "../ui/timeline";

export default function ExperienceTimeline() {
    const data = [
        {
            title: "2026",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">CI&T</h4>
                    <p className="text-muted-foreground text-sm md:text-base mb-6">
                        Estagiário de Desenvolvimento Full Stack
                    </p>
                    <img
                        src={ciandtImg.src}
                        alt="CI&T"
                        className="rounded-xl object-contain w-full max-w-sm h-auto shadow-sm border border-border"
                    />
                </div>
            ),
        },
        {
            title: "2025 - 2026",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">Sellit</h4>
                    <p className="text-muted-foreground text-sm md:text-base mb-6">
                        Desenvolvedor Full Stack
                    </p>
                    <img
                        src={sellitImg.src}
                        alt="Sellit"
                        className="rounded-xl object-cover w-full max-w-sm h-auto shadow-sm border border-border"
                    />
                </div>
            ),
        },
        {
            title: "2025",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">TechFala</h4>
                    <p className="text-muted-foreground text-sm md:text-base mb-6">
                        Desenvolvedor
                    </p>
                    <img
                        src={techfalaImg.src}
                        alt="TechFala"
                        className="rounded-xl object-cover w-full max-w-sm h-auto shadow-sm border border-border"
                    />
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">
                        Microassist
                    </h4>
                    <p className="text-muted-foreground text-sm md:text-base mb-6">
                        Técnico
                    </p>
                    <img
                        src={microassistImg.src}
                        alt="Microassist"
                        className="rounded-xl object-cover w-full max-w-sm h-auto shadow-sm border border-border"
                    />
                </div>
            ),
        },
        {
            title: "2022 - 2023",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">
                        Pássaro Marron
                    </h4>
                    <p className="text-muted-foreground text-sm md:text-base mb-6">
                        Jovem Aprendiz / Assistente
                    </p>
                    <img
                        src={passaroMarronImg.src}
                        alt="Pássaro Marron"
                        className="rounded-xl object-cover w-full max-w-sm h-auto shadow-sm border border-border"
                    />
                </div>
            ),
        },
    ];

    return <Timeline data={data} />;
}
