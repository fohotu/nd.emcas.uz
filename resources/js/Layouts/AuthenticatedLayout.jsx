import React, { useState,useEffect } from 'react';
import { Link,usePage } from '@inertiajs/react';
import { Tree } from 'react-arborist';
import UserDropdown from './UserDropdown';


export default function AuthenticatedLayout({ children, user ={name:'Farkhod'} }) {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { main_menu } = usePage().props;

    console.log('main_menu:', main_menu); // Debugging line to check the structure of main_menu
    

    const prepareTree = (items = []) => {
        return items.map(item => ({
            ...item,
            name:item.title,
            href:'/documents/menu/' + item.id+'/category',
            children: prepareTree(item.children_recursive || []),
        }));
    };
  
    const data = prepareTree(main_menu || []);

    function Node({ node, style, dragHandle }) {
    const isLeaf = !node.children || node.children.length === 0;

    return (
        <div
            ref={dragHandle}
            style={{
                ...style,
                paddingLeft: `${node.level * 16 + 8}px`,
            }}
            className="relative flex items-center py-0.5"
        >
            {/* Визуальная линия вложенности для дочерних элементов */}
            {node.level > 0 && (
                <div 
                    className="absolute left-0 top-0 bottom-0 w-px bg-slate-800/60"
                    style={{ left: `${(node.level - 1) * 16 + 12}px` }}
                />
            )}

            <Link
                href={node.data.href || "#"}
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
                    hover:bg-slate-800/60
                    hover:text-slate-100
                    active:bg-slate-800
                    transition-all
                    duration-150
                    ease-in-out
                "
            >
                {/* Иконка: Файл / Страница */}
                <svg
                    className="
                        h-4 w-4
                        shrink-0
                        text-slate-500
                        group-hover:text-indigo-400
                        transition-colors
                        duration-150
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

                {/* Название узла */}
                <span className="truncate tracking-wide">
                    {node.data.name}
                </span>

                {/* Акцентный индикатор при наведении */}
                <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
        </div>
    );
}

    function Node2({ node, style, dragHandle }) {
        return (
            <div
                ref={dragHandle}
                style={{
                    ...style,
                    paddingLeft: node.level * 20,
                }}
            >
                <Link
                    href={node.data.href || "#"}
                    className="
                        group
                        flex
                        items-center
                        gap-3
                        mx-2
                        my-1
                        rounded-lg
                        px-3
                        py-2.5
                        text-slate-300
                        hover:bg-slate-800
                        hover:text-white
                        transition-all
                        duration-200
                    "
                >
                    <svg
                        className="
                            w-4 h-4
                            shrink-0
                            text-slate-500
                            group-hover:text-indigo-400
                            transition-colors
                        "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            strokeWidth="1.8"
                        />
                        <path
                            strokeLinecap="round"
                            strokeWidth="1.8"
                            d="M9 3v18M9 9h12"
                        />
                    </svg>

                    <span className="text-sm font-medium truncate">
                        {node.data.name}
                    </span>
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
                        paddingLeft: node.level * 20,
                    }}
                >
                    <Link
                        href={node.data.href || "#"}
                        className="
                            group
                            flex
                            items-center
                            gap-3
                            mx-2
                            my-1
                            rounded
                            px-3
                            py-2.5
                            text-slate-300
                            hover:bg-slate-800
                            hover:text-white
                            transition-all
                            duration-200
                        "
                    >
                        <svg
                            className="w-4 h-4 text-slate-500 group-hover:text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 7h10M7 12h10M7 17h6"
                            />
                        </svg>

                        <span className="text-sm">
                            {node.data.name}
                        </span>
                    </Link>
                </div>
            );
        }
    
    


   

    const mainDocs = [
        { name: 'Поиск документы', href: '/search', icon: 'search' },
        { name: 'Документы Республики Узбекистан', href: '/document/uz', icon: 'file' },
        { name: 'Документы МСЭ', href: '/document/itu', icon: 'file' },
        { name: 'Документы РСС', href: '/document/rss', icon: 'file' },
        { name: 'Документы стран мира', href: '/document/world', icon: 'file' },
        { name: 'Материалы Подготовительной комиссии', href: '/document/commission', icon: 'file' },
        { name: 'Ход подготовки к АР/ВКР 2023', href: '/document/wrc-2023', icon: 'file' },
        { name: 'Рабочей группы ПК по пунктам повестки дня ВКР-23', href: '/document/wrc-day-2023', icon: 'file' },
        { name: 'Ход подготовки к АР/ВКР 27', href: '/document/wrc-2027', icon: 'file' },
        { name: 'Рабочей группы ПК по пунктам повестка дня ВКР-27 ', href: '/document/wrc-day-2027', icon: 'file' },
    ];

    // Массив для личного кабинета
    const personalLinks = [
        { name: 'Избранное', href: '/favorites', icon: 'layers' },
        { name: 'Мои теги', href: '/tags', icon: 'file-text' },
     //   { name: 'Личные данные', href: '/user', icon: 'file-text' },
    ];

    // Функция для рендеринга иконок (SVG из вашего примера)
    const Icon = ({ name }) => {
        const props = {
            className: "w-5 h-5 mr-3", // Tailwind классы для размера и отступа
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        };

        if (name === 'search') return (
            <svg {...props} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        );
        if (name === 'layers') return (
            <svg {...props} viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        );
        if (name === 'file-text') return (
            <svg {...props} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        );
        // По умолчанию иконка 'file'
        return (
            <svg {...props} viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Оверлей мобильного меню */}
            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />
            )}

            {/* САЙДБАР */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transition-transform duration-300 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static
            `}>
            {/*
                <div className="flex items-center justify-between px-6 py-5 bg-slate-950 text-white font-bold text-xl">
                    <span></span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                */}

                <div className="border-b border-slate-800 px-5 py-5 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-lg">
            R
        </div>

        <div>
            <div className="text-white font-semibold text-base">
                Radio Docs
            </div>

            <div className="text-xs text-slate-400">
                Document System
            </div>
        </div>
    </Link>

    <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden text-slate-400 hover:text-white"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </button>
</div>

                <nav className="p-0 space-y-6 overflow-y-auto h-[calc(100vh-70px)]">
                    {/* Первая группа */}
                    <div>
                        {/*
                        <ul className="">
                            <li>
                                    <Link href="/search" className="flex items-center px-4 py-2.5 rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 transition">
                                        <Icon name="search" />
                                        <span className="text-sm font-medium">Поиск документы</span>
                                    </Link>
                            </li>
                        </ul>

                        */}

                        <div className="px-4 mt-4">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            className="
                                w-full
                                rounded
                                bg-slate-800
                                border
                                border-slate-700
                                px-3
                                py-2
                                text-sm
                                text-white
                                placeholder:text-slate-500
                                focus:outline-none
                                focus:border-indigo-500
                            "
                        />
                    </div>
                        
                    <div className="px-4 mt-6 mb-3">
                        <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Документы
                        </h3>
                    </div>        

                     <ul className="border-t border-slate-800 pt-4">
                        <Tree 
                            initialData={data} 
                            rowHeight={50}
        
                        >   
                            {Node}
                        </Tree>
                        </ul>
                          
                        
                    </div>

                    <div className="border-t border-slate-800 pt-4">
                        <h4 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Личный кабинет</h4>
                       
                        <ul className="space-y-1" >
                            {personalLinks.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        mx-2
                                        rounded
                                        px-4
                                        py-3
                                        text-slate-300
                                        hover:bg-slate-800
                                        hover:text-white
                                        transition
                                        "
                                    >
                                        <Icon name={item.icon} />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                            
                            {/* Условный рендеринг для админа (если передано из Laravel) */}
                            {user?.role === 'admin' && (
                                <li>
                                    <Link href="/dashboard" className="flex items-center px-4 py-2.5 rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 transition">
                                        <Icon name="file-text" />
                                        <span className="text-sm font-medium">Администрирование</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </aside>

            {/* КОНТЕНТ */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b flex items-center px-6 lg:justify-end">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                   
                    <UserDropdown user={user} />
                </header>

                <main className="overflow-y-auto p-2">
                    {children}
                </main>
            </div>
        </div>
    );
}