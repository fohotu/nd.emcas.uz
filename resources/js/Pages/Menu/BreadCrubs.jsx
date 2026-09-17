import React from 'react';
import { Link } from '@inertiajs/react';

function BreadCrubs({ items = [] }) {
    return (
        <div className="mb-5">
            <div className="flex items-center flex-wrap gap-y-1 text-sm">
                {items.length === 0 ? (
                    <span className="font-medium text-gray-500">
                        Главная
                    </span>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center"
                        >
                            {index !== 0 && (
                                <svg
                                    className="mx-2 h-4 w-4 shrink-0 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="m9 5 7 7-7 7"
                                    />
                                </svg>
                            )}

                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="
                                        rounded-md
                                        px-1.5
                                        py-1
                                        text-gray-400
                                        transition
                                        hover:bg-blue-50
                                        hover:text-blue-600
                                    "
                                >
                                    {item.title}
                                </Link>
                            ) : (
                                <span
                                    className="
                                        rounded-md
                                        px-1.5
                                        py-1
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    {item.title}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default BreadCrubs;