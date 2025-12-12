'use client';

import { getAllTunings } from '@/lib/music/fretboard';
import type { TuningDefinition } from '@/types/music';

interface TuningSelectorProps {
    selectedTuning: string;
    onTuningChange: (tuningId: string) => void;
    className?: string;
}

export default function TuningSelector({
    selectedTuning,
    onTuningChange,
    className = ''
}: TuningSelectorProps) {
    const tunings = getAllTunings();
    const currentTuning = tunings.find(t => t.id === selectedTuning);

    return (
        <div className={`tuning-selector ${className}`}>
            <label htmlFor="tuning-select" className="block text-sm font-medium text-gray-700 mb-2">
                Tuning
            </label>
            <select
                id="tuning-select"
                value={selectedTuning}
                onChange={(e) => onTuningChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
                {tunings.map(tuning => (
                    <option key={tuning.id} value={tuning.id}>
                        {tuning.name}
                    </option>
                ))}
            </select>

            {/* String visualization */}
            {currentTuning && (
                <div className="mt-3 flex justify-between items-center">
                    {currentTuning.notes.map((note, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center"
                        >
                            <span className="text-xs text-gray-500 mb-1">
                                {6 - idx}
                            </span>
                            <span className="font-bold text-lg text-gray-800">
                                {note}
                            </span>
                        </div>
                    )).reverse()}
                </div>
            )}
        </div>
    );
}
