import React from 'react';

const ApplicationLogo = (props) => (
    <svg
        {...props}
        viewBox="0 0 420 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* ИКОНКА — РАДИОСИГНАЛ */}
        <g
            stroke="#111827"
            fill="none"
            strokeLinecap="round"
        >
            {/* Центральная точка */}
            <circle
                cx="42"
                cy="50"
                r="5"
                fill="#111827"
                stroke="none"
            />

            {/* Левая внутренняя волна */}
            <path
                strokeWidth="4"
                d="M34 42.5a10 10 0 0 0 0 15"
            />

            {/* Левая внешняя волна */}
            <path
                strokeWidth="4"
                d="M27 34a21 21 0 0 0 0 32"
            />

            {/* Правая внутренняя волна */}
            <path
                strokeWidth="4"
                d="M50 42.5a10 10 0 0 1 0 15"
            />

            {/* Правая внешняя волна */}
            <path
                strokeWidth="4"
                d="M57 34a21 21 0 0 1 0 32"
            />
        </g>

        {/* ТЕКСТОВАЯ ЧАСТЬ */}
        <g fill="#111827">

            {/* EMC */}
            <text
                x="105"
                y="58"
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight="800"
                fontSize="48"
                letterSpacing="2"
            >
                EMC
            </text>

            {/* Полное название */}
            <text
                x="108"
                y="78"
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight="600"
                fontSize="11"
                letterSpacing="1.8"
                opacity="0.75"
            >
                ELECTROMAGNETIC COMPATIBILITY
            </text>

        </g>
    </svg>
);

export default ApplicationLogo;