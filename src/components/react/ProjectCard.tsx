import { GlassEffect, GlassFilter } from "../liquid-glass";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    image?: string;
}

export default function ProjectCard({ title, description, tags, link, image }: ProjectCardProps) {
    return (
        <GlassEffect className="rounded-2xl w-full">
            <a
                href={link || '#'}
                target={link ? '_blank' : undefined}
                rel={link ? 'noopener noreferrer' : undefined}
                className="group block w-full"
            >
                {/* Image */}
                <div className="aspect-video bg-black/20 flex items-center justify-center overflow-hidden rounded-t-2xl">
                    {image ? (
                        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
                            <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Preview do projeto</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-xs font-mono bg-black/20 border border-white/10 rounded-md text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </GlassEffect>
    );
}
