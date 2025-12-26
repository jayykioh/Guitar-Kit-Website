import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassPanel = ({ children, className = '', hoverEffect = false, ...props }: GlassPanelProps) => {
    return (
        <motion.div
            className={`
                bg-bg-surface/50 backdrop-blur-md border border-border-subtle 
                rounded-2xl shadow-sm transition-all duration-300
                ${hoverEffect ? 'hover:bg-bg-surface-hover hover:border-accent-primary/30 hover:shadow-md' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </motion.div>
    );
};
