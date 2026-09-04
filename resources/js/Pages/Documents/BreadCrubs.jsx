import React from 'react';
import { Link } from '@inertiajs/react';

function BreadCrubs({items}) {
  return (
     <div className="flex items-center justify-between px-5 py-3 border-b bg-white">

            <div className="flex items-center flex-wrap text-sm">

                {items.length === 0 && (
                    <span className="text-gray-500">
                        Главная
                    </span>
                )}

                {items.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center"
                    >

                        {index !== 0 && (

                            <svg
                                className="w-4 h-4 mx-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>

                        )}

                        {item.href ? (

                            <Link
                                href={item.href}
                                className="text-blue-600 hover:underline"
                            >
                                {item.title}
                            </Link>

                        ) : (

                            <span className="font-medium text-gray-800">
                                {item.title}
                            </span>

                        )}

                    </div>

                ))}

            </div>

        </div>
  )
}

export default BreadCrubs