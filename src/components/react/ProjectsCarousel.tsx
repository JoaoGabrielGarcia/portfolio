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

const VISIBLE = 3;
const GAP = 24; // px — matches gap-6
const DURATION = 480; // ms

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
    const n = projects.length;
    const containerRef = useRef<HTMLDivElement>(null);

    // Index of the leftmost VISIBLE card (modular, so infinite)
    const [startIdx, setStartIdx] = useState(0);
    const [animating, setAnimating] = useState(false);

    // Track position & transition
    const [translateX, setTranslateX] = useState(0);
    const [withTransition, setWithTransition] = useState(false);

    // Opacity for hidden edge slots (0 = slot 0, 4 = slot 4)
    const [leftOp, setLeftOp] = useState(0);
    const [rightOp, setRightOp] = useState(0);
    const [opTransition, setOpTransition] = useState(false);

    // --- helpers ---
    const mod = useCallback((i: number) => ((i % n) + n) % n, [n]);

    // We always render 5 slots:
    // [startIdx-1] [startIdx] [startIdx+1] [startIdx+2] [startIdx+3]
    //  ← hidden                 visible (3)                hidden →
    const slots = [
        mod(startIdx - 1),
        mod(startIdx),
        mod(startIdx + 1),
        mod(startIdx + 2),
        mod(startIdx + 3),
    ];

    /** pixel width of one card */
    const cardWidth = useCallback(() => {
        if (!containerRef.current) return 0;
        return (containerRef.current.offsetWidth - GAP * (VISIBLE - 1)) / VISIBLE;
    }, []);

    /** one step = card + gap */
    const stepWidth = useCallback(() => cardWidth() + GAP, [cardWidth]);

    /** baseline translateX so that slot 0 is hidden and slots 1‑3 are visible */
    const baseTranslate = useCallback(() => -stepWidth(), [stepWidth]);

    // Set initial position once container is measured
    useEffect(() => {
        setTranslateX(baseTranslate());
    }, [baseTranslate]);

    // Recalculate on resize (only when idle)
    useEffect(() => {
        const onResize = () => {
            if (!animating) setTranslateX(baseTranslate());
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [animating, baseTranslate]);

    // --- navigation ---
    const navigate = useCallback(
        (dir: 1 | -1) => {
            if (animating) return;
            setAnimating(true);

            const base = baseTranslate(); // capture now
            const step = stepWidth();

            // Activate CSS transitions first, then change values in same render
            // so the browser sees: opacity 0→1 (or 1→0) with transition active
            setOpTransition(true);
            if (dir === 1) setRightOp(1); // right hidden card fades in
            else setLeftOp(1);            // left hidden card fades in

            setWithTransition(true);
            setTranslateX(base - dir * step); // slide track by one step

            setTimeout(() => {
                // Batch: update index + instant position reset + clear opacity
                setStartIdx((s) => mod(s + dir));
                setWithTransition(false);
                setTranslateX(base); // snap back (no transition)
                setOpTransition(false);
                setLeftOp(0);
                setRightOp(0);
                setAnimating(false);
            }, DURATION);
        },
        [animating, baseTranslate, stepWidth, mod]
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
        // Each slot takes exactly 1/3 of the container (accounting for gaps)
        flex: `0 0 calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
        opacity: slotIdx === 0 ? leftOp : slotIdx === 4 ? rightOp : 1,
        transition: opTransition ? `opacity ${DURATION}ms ease` : "none",
    });

    return (
        <div className="relative w-full select-none">
            {/* ── Carousel track ── */}
            <div ref={containerRef} className="overflow-hidden w-full">
                <div style={trackStyle}>
                    {slots.map((projectIdx, slotIdx) => (
                        // key by slotIdx (not project) so React reuses DOM nodes on index update
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

                {/* Dots — one per window position (n total) */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: n }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transition: "all 0.35s ease" }}
                            className={`rounded-full h-2 ${
                                i === startIdx
                                    ? "w-6 bg-primary"
                                    : "w-2 bg-white/20"
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
