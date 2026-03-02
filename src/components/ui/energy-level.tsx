"use client";
import { Zap } from "lucide-react";

interface EnergyLevelProps {
    /** Energy level value from 0 to 100 */
    energy: number;
    /** Optional label, defaults to "Energy Level" */
    label?: string;
    /** Optional custom class for the container */
    className?: string;
}

export default function EnergyLevel({
    energy,
    label = "Energy Level",
    className = "",
}: EnergyLevelProps) {
    return (
        <div className={`${className}`}>
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center text-muted-foreground">
                    <Zap size={10} className="mr-1" />
                    {label}
                </span>
                <span className="font-mono text-muted-foreground">{energy}%</span>
            </div>
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, energy))}%` }}
                ></div>
            </div>
        </div>
    );
}
