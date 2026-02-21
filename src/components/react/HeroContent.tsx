import { GlassEffect, GlassFilter } from "../liquid-glass";

export default function HeroContent() {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <GlassFilter />

            {/* Badge */}
            <GlassEffect className="rounded-full mb-8">
                <div className="px-5 py-2">
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                        ✨ Disponível para oportunidades
                    </span>
                </div>
            </GlassEffect>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
                <span className="text-foreground">Seja bem-vindo ao meu </span>
                <span className="bg-gradient-to-r from-indigo-500 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                    Portfólio!
                </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Desenvolvedor de Software apaixonado por criar experiências digitais incríveis
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
                <GlassEffect className="rounded-2xl">
                    <a
                        href="#projects"
                        className="block px-8 py-3.5 text-foreground font-semibold text-center"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Ver Projetos
                    </a>
                </GlassEffect>
                <GlassEffect className="rounded-2xl">
                    <a
                        href="#about"
                        className="block px-8 py-3.5 text-foreground font-semibold text-center"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Sobre Mim
                    </a>
                </GlassEffect>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 animate-bounce">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    );
}
