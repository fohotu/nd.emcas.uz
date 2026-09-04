export default function DocumentIcon({ className = "w-5 h-5" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25V8.25a3 3 0 00-3-3h-9a3 3 0 00-3 3v7.5a3 3 0 003 3h4.5"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9.75h6M9 12.75h6M9 15.75h3"
            />
        </svg>
    );
}