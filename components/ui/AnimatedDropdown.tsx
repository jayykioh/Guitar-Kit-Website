'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
    value: string;
    label: string;
    group?: string;
}

interface AnimatedDropdownProps {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    className?: string;
}

export default function AnimatedDropdown({ label, value, options, onChange, className = '' }: AnimatedDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    // Group options if needed (simple flat list for now, can extend later)
    const groupedOptions = options.reduce((acc, opt) => {
        const group = opt.group || 'default';
        if (!acc[group]) acc[group] = [];
        acc[group].push(opt);
        return acc;
    }, {} as Record<string, Option[]>);

    const hasGroups = Object.keys(groupedOptions).length > 1 || (Object.keys(groupedOptions).length === 1 && Object.keys(groupedOptions)[0] !== 'default');

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1 block mb-1">
                {label}
            </label>

            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between 
                    bg-bg-surface border border-border-subtle 
                    px-3 py-2 rounded-lg text-sm text-text-primary 
                    hover:border-border-strong hover:bg-bg-surface-hover 
                    transition-colors outline-none focus:ring-2 focus:ring-accent-surface
                    ${isOpen ? 'border-accent-primary ring-2 ring-accent-surface' : ''}
                `}
            >
                <span className="truncate mr-2 font-medium">
                    {selectedOption?.label || value}
                </span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-text-tertiary flex-shrink-0"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 bg-bg-surface border border-border-subtle rounded-xl shadow-lg max-h-60 overflow-y-auto overflow-x-hidden"
                    >
                        {hasGroups ? (
                            Object.entries(groupedOptions).map(([group, groupOptions]) => (
                                <div key={group}>
                                    {group !== 'default' && (
                                        <div className="px-3 py-1.5 text-xs font-semibold text-text-tertiary bg-bg-surface-hover uppercase tracking-wider sticky top-0">
                                            {group}
                                        </div>
                                    )}
                                    {groupOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => {
                                                onChange(opt.value);
                                                setIsOpen(false);
                                            }}
                                            className={`
                                                w-full text-left px-3 py-2 text-sm transition-colors
                                                hover:bg-accent-surface hover:text-accent-primary
                                                ${value === opt.value ? 'bg-accent-surface text-accent-primary font-medium' : 'text-text-primary'}
                                            `}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            ))
                        ) : (
                            options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full text-left px-3 py-2 text-sm transition-colors
                                        hover:bg-accent-surface hover:text-accent-primary
                                        ${value === opt.value ? 'bg-accent-surface text-accent-primary font-medium' : 'text-text-primary'}
                                    `}
                                >
                                    {opt.label}
                                </button>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
