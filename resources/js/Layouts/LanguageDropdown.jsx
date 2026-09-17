import { useState } from 'react';

export default function LanguageDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('RU');

    const languages = [
        {
            code: 'RU',
            name: 'Русский',
        },
        {
            code: 'UZ',
            name: 'O‘zbekcha',
        },
        {
            code: 'EN',
            name: 'English',
        },
    ];

    const currentLanguage = languages.find(
        (item) => item.code === language
    );

    return (
        <div className="relative">
            {/* Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-2.5
                    py-2
                    text-sm
                    text-gray-600
                    transition-colors
                    duration-200
                    hover:bg-gray-100
                    hover:text-gray-900
                    focus:outline-none
                "
            >
                {/* Globe icon */}
                <svg
                    className="
                        h-5 w-5
                        text-gray-400
                        transition-colors
                        group-hover:text-indigo-500
                    "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="9"
                        strokeWidth="1.8"
                    />

                    <path
                        strokeLinecap="round"
                        strokeWidth="1.8"
                        d="M3 12h18"
                    />

                    <path
                        strokeLinecap="round"
                        strokeWidth="1.8"
                        d="M12 3a14 14 0 0 1 0 18"
                    />

                    <path
                        strokeLinecap="round"
                        strokeWidth="1.8"
                        d="M12 3a14 14 0 0 0 0 18"
                    />
                </svg>

                <span className="font-medium">
                    {currentLanguage.code}
                </span>

                {/* Arrow */}
                <svg
                    className={`
                        h-4 w-4
                        text-gray-400
                        transition-transform
                        duration-200
                        ${isOpen ? 'rotate-180 text-indigo-500' : ''}
                    `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M6 9l6 6 6-6"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div
                        className="
                            absolute
                            right-0
                            z-20
                            mt-2
                            w-52
                            overflow-hidden
                            rounded-xl
                            border
                            border-gray-100
                            bg-white
                            p-2
                            shadow-xl
                            shadow-gray-200/60
                        "
                    >
                        <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                            Язык
                        </div>

                        {languages.map((item) => (
                            <button
                                key={item.code}
                                type="button"
                                onClick={() => {
                                    setLanguage(item.code);
                                    setIsOpen(false);
                                }}
                                className={`
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-left
                                    text-sm
                                    transition-colors
                                    duration-150
                                    ${
                                        language === item.code
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }
                                `}
                            >
                                {/* Language code */}
                                <span
                                    className={`
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-xs
                                        font-semibold
                                        ${
                                            language === item.code
                                                ? 'bg-indigo-100 text-indigo-600'
                                                : 'bg-gray-100 text-gray-500'
                                        }
                                    `}
                                >
                                    {item.code}
                                </span>

                                <span className="flex-1">
                                    {item.name}
                                </span>

                                {/* Check */}
                                {language === item.code && (
                                    <svg
                                        className="h-4 w-4 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M5 12l4 4L19 6"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

