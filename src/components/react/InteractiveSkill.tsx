"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingEffect } from "../ui/glowing-effect";
import { GlassEffect } from "../liquid-glass";

interface InteractiveSkillProps {
    name: string;
    iconSrc: string;
}

export default function InteractiveSkill({ name, iconSrc }: InteractiveSkillProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative rounded-3xl border p-px group cursor-pointer"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <GlowingEffect
                spread={50}
                glow={true}
                disabled={false}
                proximity={75}
                inactiveZone={0.01}
                borderWidth={2}
            />

            <div className="relative h-full">
                <GlassEffect className="rounded-2xl h-full bg-background/20 hover:bg-background/40 transition-colors duration-300">
                    <motion.div layout className="flex items-center px-4 py-3">
                        <motion.img
                            layout="position"
                            src={iconSrc}
                            alt={name}
                            className="w-6 h-6 group-hover:scale-110 group-hover:-rotate-[5deg] transition-transform duration-300 pointer-events-none select-none"
                        />
                        <AnimatePresence initial={false}>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                                    animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
                                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                                    className="text-sm font-medium text-foreground whitespace-nowrap overflow-hidden"
                                >
                                    {name}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </GlassEffect>
            </div>
        </motion.div>
    );
}
