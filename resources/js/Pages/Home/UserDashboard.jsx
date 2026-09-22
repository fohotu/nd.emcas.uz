import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Tree } from 'react-arborist';
function UserDashboard({
    user,
    documents = [],
    categories = [],
    menus = [],
    favorites = [],
}) {

  

    const { main_menu } = usePage().props;

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
                            className="absolute bottom-0 top-0 w-px"
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
                            rounded
                            px-2.5
                            py-1.5
                            text-xs
                            font-medium
                            text-slate-400
                            transition-all
                            duration-150
                            ease-in-out
                           
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
    
                        <span className="">
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
        <AuthenticatedLayout
            title="Главная"
            description="Электронный сборник нормативно-правовых актов и нормативных документов"
        >
            <div className="space-y-6">

                {/* =====================================================
                    WELCOME
                ===================================================== */}

                <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                    <div className="relative px-6 py-7 sm:px-8">

                        <div className="relative z-10 max-w-3xl">

                            <div className="flex items-start gap-4">

                                <div className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-blue-50
                                    text-blue-600
                                ">
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
                                            d="M9 12h6m-6 4h6M7 4h7l4 4v12H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                                        Добро пожаловать
                                        {user?.name ? `, ${user.name}` : ''}
                                    </h1>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Используйте электронный сборник для
                                        поиска и просмотра нормативно-правовых
                                        актов и нормативных документов.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="
                            pointer-events-none
                            absolute
                            -right-10
                            -top-10
                            h-40
                            w-40
                            rounded-full
                            bg-blue-50
                        " />

                        <div className="
                            pointer-events-none
                            absolute
                            -bottom-16
                            right-24
                            h-32
                            w-32
                            rounded-full
                            bg-gray-50
                        " />

                    </div>
                </div>


                {/* =====================================================
                    SEARCH
                ===================================================== */}

                <div className="rounded-xl bg-white p-6 shadow-sm sm:p-7">

                    <div className="mb-5 flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                        ">
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
                                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Поиск документов
                            </h2>

                            <p className="text-sm text-gray-400">
                                Найдите нужный нормативный документ
                            </p>
                        </div>

                    </div>


                    <form
                        action="/documents"
                        method="GET"
                        className="flex flex-col gap-3 sm:flex-row"
                    >

                        <div className="relative flex-1">

                            <svg
                                className="
                                    pointer-events-none
                                    absolute
                                    left-3.5
                                    top-1/2
                                    h-5
                                    w-5
                                    -translate-y-1/2
                                    text-gray-400
                                "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                                />
                            </svg>

                            <input
                                type="text"
                                name="search"
                                placeholder="Введите название, номер или ключевое слово..."
                                className="
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    py-2.5
                                    pl-11
                                    pr-3.5
                                    text-sm
                                    text-gray-700
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-50
                                "
                            />

                        </div>

                        <button
                            type="submit"
                            className="
                                inline-flex
                                cursor-pointer
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-blue-600
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-blue-700
                                focus:outline-none
                                focus:ring-4
                                focus:ring-blue-100
                            "
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                                />
                            </svg>

                            Найти
                        </button>

                    </form>

                </div>


                {/* =====================================================
                    MAIN CONTENT
                ===================================================== */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                    {/* =================================================
                        SECTIONS
                    ================================================= */}
                     {/* =================================================
                        FAVORITES
                    ================================================= */}
                    <div className="lg:col-span-12">

                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                            <div className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-gray-100
                                px-5
                                py-5
                            ">

                                <div className="flex items-center gap-3">

                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-red-50
                                        text-red-500
                                    ">
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
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            Избранное 
                                        </h2>

                                        <p className="text-sm text-gray-400">
                                            Ваши сохранённые документы
                                        </p>
                                    </div>

                                </div>


                                <Link
                            href="/favorites"
                            className="
                                text-sm
                                font-medium
                                text-blue-600
                                transition
                                hover:text-blue-700
                            "
                        >
                            Все избранное документы →
                        </Link>

                            </div>


                            <div className="p-5">

                                {favorites?.data?.length > 0 ? (

                                    <div className="space-y-2">

                                        {favorites.data.slice(0, 5).map((item) => (

                                            <Link
                                                key={item.id}
                                                href={route(
                                                    'document.show',
                                                    item.id
                                                )}
                                                className="
                                                    group
                                                    block
                                                    rounded-lg
                                                    border
                                                    border-gray-100
                                                    p-3
                                                    transition
                                                    hover:border-blue-100
                                                    hover:bg-blue-50/40
                                                "
                                            >

                                                <div className="flex items-center gap-3">

                                                    <div className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-red-50
                                                        text-red-400
                                                    ">
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3-6 3V4.75Z" />
                                                        </svg>
                                                    </div>

                                                    <div className="min-w-0 flex-1">

                                                        <p className="
                                                            truncate
                                                            text-sm
                                                            font-medium
                                                            text-gray-700
                                                            group-hover:text-blue-600
                                                        ">
                                                            {item.title}
                                                        </p>

                                                        {item.number && (
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                № {item.number}
                                                            </p>
                                                        )}

                                                    </div>

                                                </div>

                                            </Link>

                                        ))}

                                    </div>

                                ) : (

                                    <div className="
                                        rounded-xl
                                        border
                                        border-dashed
                                        border-gray-200
                                        px-4
                                        py-10
                                        text-center
                                    ">

                                        <svg
                                            className="mx-auto h-8 w-8 text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.6"
                                                d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3-6 3V4.75Z"
                                            />
                                        </svg>

                                        <p className="mt-3 text-sm text-gray-400">
                                            В избранном пока ничего нет
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>


                    </div>


                    


                   

                </div>


                {/* =====================================================
                    LATEST DOCUMENTS
                ===================================================== */}

                <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                    <div className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-5
                        py-5
                    ">

                        <div className="flex items-center gap-3">

                            <div className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-green-50
                                text-green-600
                            ">
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
                                        d="M9 12h6m-6 4h4M7 4h7l4 4v12H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Последние документы
                                </h2>

                                <p className="text-sm text-gray-400">
                                    Недавно добавленные документы
                                </p>
                            </div>

                        </div>

                        <Link
                            href="/documents/all"
                            className="
                                text-sm
                                font-medium
                                text-blue-600
                                transition
                                hover:text-blue-700
                            "
                        >
                            Все документы →
                        </Link>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="border-b border-gray-100 bg-gray-50">

                                <tr>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Номер
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Название
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Дата
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Статус
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {documents?.data?.length > 0 ? (

                                    documents.data.slice(0, 7).map((item) => (

                                        <tr
                                            key={item.id}
                                            className="
                                                cursor-pointer
                                                transition
                                                hover:bg-blue-50/40
                                            "
                                            onClick={() => {
                                                window.location.href =
                                                    route(
                                                        'document.show',
                                                        item.id
                                                    );
                                            }}
                                        >

                                            <td className="whitespace-nowrap px-5 py-4">

                                                <span className="text-sm font-medium text-gray-700">
                                                    {item.number || '—'}
                                                </span>

                                            </td>

                                            <td className="max-w-[500px] px-5 py-4">

                                                <p className="
                                                    truncate
                                                    text-sm
                                                    font-medium
                                                    text-gray-800
                                                ">
                                                    {item.title}
                                                </p>

                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">

                                                <span className="text-sm text-gray-500">
                                                    {item.created_at
                                                        ? new Date(
                                                            item.created_at
                                                        ).toLocaleDateString()
                                                        : '—'}
                                                </span>

                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">

                                                {item.status === 'active' && (
                                                    <span className="
                                                        inline-flex
                                                        rounded-lg
                                                        bg-green-50
                                                        px-2.5
                                                        py-1.5
                                                        text-xs
                                                        font-medium
                                                        text-green-700
                                                    ">
                                                        Действующий
                                                    </span>
                                                )}

                                                {item.status === 'passive' && (
                                                    <span className="
                                                        inline-flex
                                                        rounded-lg
                                                        bg-red-50
                                                        px-2.5
                                                        py-1.5
                                                        text-xs
                                                        font-medium
                                                        text-red-700
                                                    ">
                                                        Утратил силу
                                                    </span>
                                                )}

                                                {!['active', 'passive'].includes(
                                                    item.status
                                                ) && (
                                                    <span className="text-sm text-gray-400">
                                                        —
                                                    </span>
                                                )}

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="text-sm text-gray-400">
                                                Документы отсутствуют
                                            </p>
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}

export default UserDashboard;