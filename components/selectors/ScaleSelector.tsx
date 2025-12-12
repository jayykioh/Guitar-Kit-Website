'use client';

import { getAllScales } from '@/lib/music/scales';
import type { ScaleDefinition } from '@/types/music';

interface ScaleSelectorProps {
    selectedScale: string;
    onScaleChange: (scaleId: string) => void;
    className?: string;
}

export default function ScaleSelector({
    selectedScale,
    onScaleChange,
    className = ''
}: ScaleSelectorProps) {
    const scales = getAllScales();

    // Group scales by category
    const groupedScales = scales.reduce((acc, scale) => {
        if (!acc[scale.category]) {
            acc[scale.category] = [];
        }
        acc[scale.category].push(scale);
        return acc;
    }, {} as Record<string, ScaleDefinition[]>);

    return (
        <div className={`scale-selector ${className}`}>
            <label htmlFor="scale-select" className="block text-sm font-medium text-gray-700 mb-2">
                Scale Type
            </label>
            <select
                id="scale-select"
                value={selectedScale}
                onChange={(e) => onScaleChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
                {Object.entries(groupedScales).map(([category, categoryScales]) => (
                    <optgroup key={category} label={category}>
                        {categoryScales.map(scale => (
                            <option key={scale.id} value={scale.id}>
                                {scale.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>

            {/* Scale description */}
            {selectedScale && (
                <p className="mt-2 text-sm text-gray-600">
                    {scales.find(s => s.id === selectedScale)?.description}
                </p>
            )}
        </div>
    );
}
