export default function UserIcon({ className = "w-5 h-5" }) {
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
                d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5a7.5 7.5 0 0115 0"
            />
        </svg>
    );
}