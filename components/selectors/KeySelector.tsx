'use client';

import { CHROMATIC_NOTES } from '@/lib/music/notes';
import type { NoteName } from '@/types/music';

interface KeySelectorProps {
    selectedKey: NoteName;
    onKeyChange: (key: NoteName) => void;
    className?: string;
}

export default function KeySelector({
    selectedKey,
    onKeyChange,
    className = ''
}: KeySelectorProps) {
    return (
        <div className={`key-selector ${className}`}>
            <label htmlFor="key-select" className="block text-sm font-medium text-gray-700 mb-2">
                Root Key
            </label>

            {/* Button grid layout */}
            <div className="grid grid-cols-6 gap-2">
                {CHROMATIC_NOTES.map(note => {
                    const isSelected = note === selectedKey;
                    const isSharp = note.includes('#');

                    return (
                        <button
                            key={note}
                            onClick={() => onKeyChange(note)}
                            className={`
                px-3 py-2 rounded-lg font-semibold text-sm transition-all
                ${isSelected
                                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                ${isSharp ? 'bg-gray-800 text-white hover:bg-gray-700' : ''}
                ${isSharp && isSelected ? 'bg-blue-600' : ''}
              `}
                        >
                            {note}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
