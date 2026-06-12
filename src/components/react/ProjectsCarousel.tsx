import { useState, useRef, useEffect, useCallback } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image?: string;
    semester?: string;
    isLogo?: boolean;
}

const GAP = 24; // px — matches gap-6
const DURATION = 480; // ms

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
    const n = projects.length;
    const containerRef = useRef<HTMLDivElement>(null);

    // 1 card on mobile (<640px), 3 on desktop
    const [visibleCount, setVisibleCount] = useState(3);
    const [startIdx, setStartIdx] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const [withTransition, setWithTransition] = useState(false);
    const [leftOp, setLeftOp] = useState(0);
    const [rightOp, setRightOp] = useState(0);
    const [opTransition, setOpTransition] = useState(false);

    const mod = useCallback((i: number) => ((i % n) + n) % n, [n]);

    // --- geometry helpers (accept vc to avoid stale closure) ---
    const getCardWidth = useCallback((vc: number) => {
        if (!containerRef.current) return 0;
        return (containerRef.current.offsetWidth - GAP * (vc - 1)) / vc;
    }, []);

    const getStep = useCallback(
        (vc: number) => getCardWidth(vc) + GAP,
        [getCardWidth]
    );

    const getBase = useCallback(
        (vc: number) => -getStep(vc),
        [getStep]
    );

    // --- responsive visible count ---
    useEffect(() => {
        const update = () => setVisibleCount(window.innerWidth < 640 ? 1 : 3);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // Recalculate baseline translateX when visibleCount or container changes
    useEffect(() => {
        if (containerRef.current && !animating) {
            setTranslateX(getBase(visibleCount));
        }
    }, [visibleCount, getBase, animating]);

    // --- navigation ---
    const navigate = useCallback(
        (dir: 1 | -1) => {
            if (animating) return;
            setAnimating(true);

            const vc = visibleCount;
            const base = getBase(vc);
            const step = getStep(vc);

            // Fade in the entering edge card
            setOpTransition(true);
            if (dir === 1) setRightOp(1);
            else setLeftOp(1);

            // Slide the track
            setWithTransition(true);
            setTranslateX(base - dir * step);

            setTimeout(() => {
                setStartIdx((s) => mod(s + dir));
                setWithTransition(false);
                setTranslateX(base); // instant snap-back (no transition)
                setOpTransition(false);
                setLeftOp(0);
                setRightOp(0);
                setAnimating(false);
            }, DURATION);
        },
        [animating, visibleCount, getBase, getStep, mod]
    );

    // --- slots: visibleCount + 2 (1 hidden on each side) ---
    const totalSlots = visibleCount + 2;
    const slots = Array.from({ length: totalSlots }, (_, i) =>
        mod(startIdx - 1 + i)
    );

    // --- styles ---
    const trackStyle: React.CSSProperties = {
        display: "flex",
        gap: `${GAP}px`,
        transform: `translateX(${translateX}px)`,
        transition: withTransition
            ? `transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
        willChange: "transform",
    };

    const slotStyle = (slotIdx: number): React.CSSProperties => ({
        // Each slot = 1/visibleCount of the container width (minus gaps)
        flex: `0 0 calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`,
        opacity:
            slotIdx === 0
                ? leftOp
                : slotIdx === visibleCount + 1
                ? rightOp
                : 1,
        transition: opTransition ? `opacity ${DURATION}ms ease` : "none",
    });

    return (
        <div className="relative w-full select-none">
            {/* ── Track ── */}
            <div ref={containerRef} className="overflow-hidden w-full">
                <div style={trackStyle}>
                    {slots.map((projectIdx, slotIdx) => (
                        <div key={slotIdx} style={slotStyle(slotIdx)}>
                            <ProjectCard {...projects[projectIdx]} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Controls ── */}
            <div className="flex items-center justify-center mt-10 gap-5">
                {/* Prev */}
                <button
                    onClick={() => navigate(-1)}
                    disabled={animating}
                    aria-label="Projeto anterior"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: n }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transition: "all 0.35s ease" }}
                            className={`rounded-full h-2 ${
                                i === startIdx ? "w-6 bg-primary" : "w-2 bg-white/20"
                            }`}
                        />
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={() => navigate(1)}
                    disabled={animating}
                    aria-label="Próximo projeto"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
