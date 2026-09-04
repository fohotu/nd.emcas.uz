import React,{useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tree } from 'react-arborist';

const TreeView = () => {
  
    const [values, setValues] = useState({
        search:  '',
        category: '',
        date_from:  '',
        date_to: '',
    });

    const handleChange = (e) => {
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
    };

    const handleReset = () => {
       
    };

    const mockDocuments = {
    data: [
        { id: 1, name: 'Справка об итогах работы делегации РСС на Ассамблее радиосвязи МСЭ 2023г.', created_at: '2024-03-01', href: '/doc/1' },
        { id: 2, name: 'Результаты первой сессии ПСК27-1', created_at: '2024-03-02', href: '/doc/2' },
        { id: 3, name: 'О структуре рабочих органов Комиссии РСС по РЧС и СО и руководстве', created_at: '2024-03-05', href: '/doc/3' },
        { id: 4, name: 'Регламент радиосвязи', created_at: '2024-03-10', href: '/doc/4' },
        { id: 5, name: 'План частот 2026', created_at: '2024-03-12', href: '/doc/5' },
        { id: 6, name: 'Проект решения на Совет глав 60 Итоги АР ВКР-23 и задачи', created_at: '2024-03-12', href: '/doc/6' },
        { id: 7, name: 'О вступлении новых членов в состав Комиссии РСС по РСЧ', created_at: '2024-03-12', href: '/doc/7' },
        { id: 8, name: 'Повестка дня первого заседания РГ АР ВКР (rev4)', created_at: '2024-03-12', href: '/doc/8' },
        { id: 9, name: 'Повестка дня первого заседания РГ АР ВКР (rev5)', created_at: '2024-03-12', href: '/doc/8' },
        { id: 10, name: 'Проект повестки дня 24 заседания РГ РЧС', created_at: '2024-03-12', href: '/doc/9' },
    ],
    // Имитация ссылок пагинации Laravel
    links: [
        { url: null, label: '&laquo; Назад', active: false },
        { url: '/documents?page=1', label: '1', active: true },
        { url: '/documents?page=2', label: '2', active: false },
        { url: '/documents?page=3', label: '3', active: false },
        { url: '/documents?page=2', label: 'Вперед &raquo;', active: false },
    ],
    from: 1,
    to: 5,
    total: 25,
    current_page: 1,
};



     const data = [
            { id: "1", name: "Документы Республики Узбекистан",icon: 'file', href: '/document/uz' },
            { id: "2", name: "Документы МСЭ", icon: 'file', href: '/document/itu' },
            { id: "3", name: "Документы РСС", icon: 'file', href: '/document/rss' },
            { id: "4", name: "Документы стран мира", icon: 'file', href: '/document/world' },
            { id: "5", name: "Материалы Подготовительной комиссии", icon: 'file', href: '/document/commission' },
            {
                id: "6",
                name: "АР/ВКР",
                children: [
                    { id: "7", name: "Ход подготовки к АР/ВКR 2023", icon: 'file', href: '/document/wrc-2023' },
                    { id: "8", name: "Рабочей группы ПК по пунктам повестки дня ВКR-23", icon: 'file', href: '/document/wrc-day-2023' },
                    { id: "9", name: "Ход подготовки к АР/ВКР 27", icon: 'file', href: '/document/wrc-2027' },
                    { id: "10", name: "Рабочей группы ПК по пунктам повестка дня ВКР-27", icon: 'file', href: '/document/wrc-day-2027'},
                ],
            },
        ];


// Компонент для отображения иконок (можно заменить на React Icons, Heroicons и т.д.)
const FolderIcon = ({ isOpen }) => (
    <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        {isOpen ? (
            // Иконка открытой папки (Heroicons)
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H2V6z" clipRule="evenodd" />
        ) : (
            // Иконка закрытой папки (Heroicons)
            <path d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        )}
    </svg>
);

const FileIcon = () => (
    // Иконка файла (Heroicons)
    <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
// ВАШ КАСТОМНЫЙ КОМПОНЕНТ NODE
function Node({ node, style, dragHandle }) {
    /* node.isInternal — это папка (есть дети)
       node.isOpen — папка открыта
       node.data — ваши данные из массива (напр. { name, href })
    */

    return (
        <>
             <div 
            style={style} 
            ref={dragHandle} 
            className="group flex items-center h-full mx-2"
        >
            <div 
                className={`flex items-center w-full px-2 py-1 transition
                           ${node.isSelected ? 'bg-slate-200 text-white' : 'text-slate-300 hover:bg-slate-700/50'}`}
                style={{ paddingLeft: `${node.level * 20}px` }} // Отступ вложенности
            >
                {/* 1. РЕНДЕРИМ ИКОНКУ */}
                <div className="mr-2 flex-shrink-0">
                    {node.isInternal ? (
                        // Если папка, передаем состояние isOpen
                        <FolderIcon isOpen={node.isOpen} />
                    ) : (
                        // Если файл
                        <FileIcon />
                    )}
                </div>

                {/* 2. РЕНДЕРИМ ТЕКСТ (напр. как ссылку Inertia) */}
                <Link 
                    href={node.data.href || '#'} 
                    className="flex-1 text-sm truncate text-black"
                    // Если хотите раскрывать папку при клике на текст:
                    onClick={() => node.isInternal && node.toggle()}
                >
                    {node.data.name}
                </Link>

                {/* 3. ОПЦИОНАЛЬНО: СТРЕЛОЧКА РАСКРЫТИЯ (только для папок) */}
                {node.isInternal && (
                    <button onClick={() => node.toggle()} className="ml-auto text-slate-500 hover:text-white">
                        <svg className={`w-4 h-4 transform transition-transform ${node.isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>

        
        </>
       
    );
}

  return (
     <AuthenticatedLayout
           
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Документы</h2>}
        >
            <Head title="Documents" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-200 text-black  p-6 bg-white border border-gray-200">
                   <Tree
                        initialData={data} 
                        rowHeight={50}
                        height={500}
                        width="100%"
                        indent={20}
                        padding={0}
                        openByDefault={false} // Скрыть детей по умолчанию
                    >
                        {/* ВАЖНО: Передаем кастомный Node сюда */}
                        {Node}
                    </Tree>
                </div>

                <div class="bg-white p-6 text-white">
                   

                    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-end">
                
                {/* Текстовый поиск */}
                <div className="md:col-span-1">
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Поиск</label>
                    <input
                        name="search"
                        type="text"
                        value={values.search}
                        onChange={handleChange}
                        placeholder="Название или ID..."
                        className="w-full border-gray-300 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Выбор категории */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Тип документа</label>
                    <select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Все типы</option>
                        <option value="uz">Узбекистан</option>
                        <option value="itu">МСЭ (ITU)</option>
                        <option value="rss">РСС</option>
                    </select>
                </div>

                {/* Период дат */}
                <div className="md:col-span-1 flex gap-2">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">От</label>
                        <input
                            name="date_from"
                            type="date"
                            value={values.date_from}
                            onChange={handleChange}
                            className="w-full rounded border-gray-300 text-sm focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">До</label>
                        <input
                            name="date_to"
                            type="date"
                            value={values.date_to}
                            onChange={handleChange}
                            className="w-full rounded border-gray-300  text-sm focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Кнопки управления */}
                <div className="flex items-center space-x-2">
                    <button
                        type="submit"
                        className="flex-1 rounded bg-indigo-600 text-white px-4 py-2  text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        Применить
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="p-2 rounded text-gray-400 hover:text-gray-600 bg-gray-100  transition"
                        title="Сбросить фильтры"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

            </div>
        </form>


                </div>
            </div>


            {/* Table */}
            <div className="w-full bg-white rounded-lg shadow border border-gray-200 my-10">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Наименование</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {mockDocuments.data.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-500">{doc.id}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{doc.created_at}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={doc.href} className="text-indigo-600 hover:text-indigo-900">
                                        Просмотр
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Пагинатор */}
            <div className="px-6 py-3 flex items-center justify-between border-t">
                <div className="text-sm text-gray-500">
                    Всего записей: <span className="font-bold">{mockDocuments.total}</span>
                </div>
                <nav className="inline-flex space-x-1">
                    {mockDocuments.links.map((link, key) => (
                        <button
                            key={key}
                            disabled={!link.url}
                            className={`px-3 py-1 text-sm border rounded ${
                                link.active 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </nav>
            </div>
        </div>
            {/* Table */}

    </AuthenticatedLayout>
  )
}

export default TreeView