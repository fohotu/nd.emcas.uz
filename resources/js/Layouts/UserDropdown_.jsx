import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function UserDropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Кнопка открытия */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {/* Выпадающее меню */}
            {isOpen && (
                <>
                    {/* Оверлей для закрытия при клике вне меню */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white  shadow-lg py-1 z-20 border border-gray-100 animate-in fade-in zoom-in duration-75">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Настройки
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button" 
                            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            Выйти
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}