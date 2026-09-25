import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Tree } from 'react-arborist';
import UserDropdown from './UserDropdown';
import LanguageDropdown from './LanguageDropdown';
import useLocalized from '@/Hooks/useLocalized';
export default function AuthenticatedLayout({
    children,
    user = { name: 'Farkhod' },
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const { main_menu,auth } = usePage().props;

 
    const { language, localized } = useLocalized();



     
    const prepareTree = (items = []) => {
        return items.map((item) => ({
            ...item,
            name: item.title,
            href: '/documents/menu/' + item.id + '/category',
            children: prepareTree(item.children_recursive || []),
        }));
    };

    const data = prepareTree(main_menu || []);

    function Node({ node, style, dragHandle }) {
        return (
            <div
                ref={dragHandle}
                style={{
                    ...style,
                    paddingLeft: `${node.level * 16 + 8}px`,
                }}
                className="relative flex items-center py-0.5"
            >
                {/* Линия вложенности */}
                {node.level > 0 && (
                    <div
                        className="absolute bottom-0 top-0 w-px bg-slate-700/70"
                        style={{
                            left: `${(node.level - 1) * 16 + 12}px`,
                        }}
                    />
                )}

                <Link
                    href={node.data.href || '#'}
                    className="
                        group
                        relative
                        flex
                        w-full
                        items-center
                        gap-2.5
                        rounded-md
                        px-3
                        py-2
                        text-sm
                        font-normal
                        text-slate-300
                        transition-all
                        duration-150
                        ease-in-out
                        hover:bg-slate-800/70
                        hover:text-white
                        active:bg-slate-800
                    "
                >
                    <svg
                        className="
                            h-[17px] w-[17px]
                            shrink-0
                            text-slate-400
                            transition-colors
                            duration-150
                            group-hover:text-indigo-300
                        "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.75"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>

                    <span className="truncate tracking-normal">
                        {localized(node.data, 'title')}
                    </span>

                    <span
                        className="
                            absolute
                            inset-y-1
                            left-0
                            w-0.5
                            rounded-full
                            bg-indigo-400
                            opacity-0
                            transition-opacity
                            group-hover:opacity-100
                        "
                    />
                </Link>
            </div>
        );
    }

    function Node1({ node, style, dragHandle }) {
        return (
            <div
                ref={dragHandle}
                style={{
                    ...style,
                    paddingLeft: `${node.level * 16 + 8}px`,
                }}
                className="relative flex items-center py-0.5"
            >
                {/* Линия вложенности */}
                {node.level > 0 && (
                    <div
                        className="absolute bottom-0 top-0 w-px bg-slate-800/60"
                        style={{
                            left: `${(node.level - 1) * 16 + 12}px`,
                        }}
                    />
                )}

                <Link
                    href={node.data.href || '#'}
                    className="
                        group
                        relative
                        flex
                        w-full
                        items-center
                        gap-2.5
                        rounded-md
                        px-2.5
                        py-1.5
                        text-xs
                        font-medium
                        text-slate-400
                        transition-all
                        duration-150
                        ease-in-out
                        hover:bg-slate-800/60
                        hover:text-slate-100
                        active:bg-slate-800
                    "
                >
                    <svg
                        className="
                            h-4 w-4
                            shrink-0
                            text-slate-500
                            transition-colors
                            duration-150
                            group-hover:text-indigo-400
                        "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.75"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>

                    <span className="truncate tracking-wide">
                        {node.data.name}
                    </span>

                    <span
                        className="
                            absolute
                            inset-y-1
                            left-0
                            w-0.5
                            rounded-full
                            bg-indigo-500
                            opacity-0
                            transition-opacity
                            group-hover:opacity-100
                        "
                    />
                </Link>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    flex
                    h-screen
                    w-72
                    flex-col
                    bg-slate-900
                    text-slate-300
                    transition-transform
                    duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:static
                    lg:translate-x-0
                `}
            >
                {/* Sidebar header */}
                <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-5 py-5">

                    <Link
                        href="/"
                        className="group flex min-w-0 items-start gap-3 px-1"
                    >
                        {/* Logo */}
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-indigo-600
                                shadow-lg
                                shadow-indigo-900/30
                                transition-transform
                                duration-200
                                group-hover:scale-105
                            "
                        >
                            <svg
                                className="h-6 w-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="2"
                                    fill="currentColor"
                                    stroke="none"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeWidth="1.8"
                                    d="M8.5 8.5a5 5 0 0 0 0 7"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeWidth="1.8"
                                    d="M5.5 5.5a9.2 9.2 0 0 0 0 13"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeWidth="1.8"
                                    d="M15.5 8.5a5 5 0 0 1 0 7"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeWidth="1.8"
                                    d="M18.5 5.5a9.2 9.2 0 0 1 0 13"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <div className="min-w-0 pt-0.5">
                            <div className="text-[11px] font-medium leading-[1.45] text-slate-200">
                                Нормативные документы
                                <br />
                                в области радиочастотного спектра
                            </div>
                        </div>
                    </Link>

                    {/* Mobile close */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="
                            ml-2
                            shrink-0
                            rounded-lg
                            p-1.5
                            text-slate-400
                            transition
                            hover:bg-slate-800
                            hover:text-white
                            lg:hidden
                        "
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Sidebar navigation */}
                <nav className="min-h-0 flex-1 overflow-hidden">

                    {/* Main menu */}
                    <div className="border-t border-slate-800 pt-4">
                        <div className="h-full w-full">
                            <Tree
                                initialData={data}
                                rowHeight={50}
                                width="100%"
                                height={window.innerHeight - 80}
                            >
                                {Node}
                            </Tree>
                        </div>
                    </div>       
                </nav>
            </aside>

            {/* CONTENT */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* HEADER */}
                <header className="flex h-16 shrink-0 items-center border-b border-gray-100 bg-white px-4 sm:px-6">

                    {/* Mobile menu */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="
                            -ml-2
                            mr-auto
                            rounded-lg
                            p-2
                            text-gray-500
                            transition
                            hover:bg-gray-50
                            hover:text-gray-700
                            lg:hidden
                        "
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Header actions */}
                    <div className="ml-auto flex items-center gap-1">

                        {/* Избранное */}
                        <Link
                            href={route('favorites.index')}
                            title="Избранное"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                text-gray-500
                                transition
                                hover:bg-blue-50
                                hover:text-blue-600
                            "
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                    d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3-6 3V4.75Z"
                                />
                            </svg>
                        </Link>

                        {/* Мои теги */}
                        <Link
                            href={route('tags.index')}
                            title="Мои теги"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                text-gray-500
                                transition
                                hover:bg-blue-50
                                hover:text-blue-600
                            "
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                    d="M20.5 13.5 13.5 20.5a2 2 0 0 1-2.83 0L3.5 13.33A2 2 0 0 1 3 11.91V5a2 2 0 0 1 2-2h6.91a2 2 0 0 1 1.42.59l7.17 7.08a2 2 0 0 1 0 2.83Z"
                                />
                                <circle
                                    cx="7.5"
                                    cy="7.5"
                                    r="1.25"
                                    strokeWidth="1.8"
                                />
                            </svg>
                        </Link>

                        <LanguageDropdown default_language={language} />

                        <UserDropdown user={auth?.user} />
                    </div>
                </header>

                {/* PAGE */}
                <main className="min-h-0 flex-1 overflow-y-auto p-2">
                    {children}
                </main>
            </div>
        </div>
    );
}