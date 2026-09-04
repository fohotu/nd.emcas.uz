export default function CategoryIcon({ className = "w-5 h-5" }) {
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
                d="M3.75 6a2.25 2.25 0 012.25-2.25h4.5A2.25 2.25 0 0112.75 6v1.5A2.25 2.25 0 0110.5 9.75H6A2.25 2.25 0 013.75 7.5V6z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 15a2.25 2.25 0 012.25-2.25h12A2.25 2.25 0 0120.25 15v3A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18v-3z"
            />
        </svg>
    );
}