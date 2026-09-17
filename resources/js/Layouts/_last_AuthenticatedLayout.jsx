import React, { useState,useEffect } from 'react';
import { Link,usePage } from '@inertiajs/react';
import { Tree } from 'react-arborist';
import UserDropdown from './UserDropdown';
import LanguageDropdown from './LanguageDropdown';


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
    

                <div className="border-b border-slate-800 px-5 py-5 flex items-center justify-between">
   {/* <Link href="/" className="flex items-center gap-3">
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
 */}


<Link
    href="/"
    className="group flex items-start gap-3 px-1"
>
    {/* Logo */}
    <div
        className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full
            bg-indigo-600
            shadow-lg shadow-indigo-900/30
            transition-transform duration-200
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

    {/* Description */}
    <div className="min-w-0 pt-0.5">
        <div className="text-[11px] font-medium leading-[1.45] text-slate-200">
             Нормативные документы
            <br />
            в области радиочастотного спектра
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



        {/* Избранное */}
        <Link
            href={route('favorites.index')}
            title="Избранное"
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
                   
                    <LanguageDropdown/>
                    <UserDropdown user={user} />
                </header>

                <main className="overflow-y-auto p-2">
                    {children}
                </main>
            </div>
        </div>
    );
}