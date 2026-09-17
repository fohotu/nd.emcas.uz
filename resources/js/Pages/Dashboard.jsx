import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DashboardStats from './DashboardStats';

import CategoryIcon from '@/Components/Icons/CategoryIcon';
import MenuIcon from '@/Components/Icons/MenuIcon';
import DocumentIcon from '@/Components/Icons/DocumentIcon';
import UserIcon from '@/Components/Icons/UserIcon';

export default function Dashboard({ serverInfo }) {

    const items = [
        {
            title: 'Меню',
            href: route('menu.index'),
            description: 'Структура и разделы системы',
            icon: <MenuIcon className="h-6 w-6" />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            hover: 'group-hover:bg-blue-100',
            text: 'group-hover:text-blue-600',
        },
        {
            title: 'Категории',
            href: route('category.index'),
            description: 'Категории нормативных документов',
            icon: <CategoryIcon className="h-6 w-6" />,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            hover: 'group-hover:bg-emerald-100',
            text: 'group-hover:text-emerald-600',
        },
        {
            title: 'Документы',
            href: route('documents.index'),
            description: 'Нормативно-правовые и нормативные документы',
            icon: <DocumentIcon className="h-6 w-6" />,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            hover: 'group-hover:bg-orange-100',
            text: 'group-hover:text-orange-600',
        },
        {
            title: 'Пользователи',
            href: route('users.index'),
            description: 'Управление пользователями системы',
            icon: <UserIcon className="h-6 w-6" />,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            hover: 'group-hover:bg-purple-100',
            text: 'group-hover:text-purple-600',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        Панель управления
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Электронный сборник нормативно-правовых актов
                        и нормативных документов
                    </p>
                </div>
            }
        >
            <Head title="Панель управления" />

            <div className="py-8">
                <div className="mx-auto">

                    {/* Welcome */}
                    <div className="mb-7">
                        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Добро пожаловать
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Здесь вы можете управлять документами, категориями,
                            разделами и пользователями системы.
                        </p>
                    </div>


                    {/* Statistics */}
                    <section className="mb-8">
                        <div className="mb-4">
                            <h2 className="text-base font-semibold text-gray-800">
                                Обзор системы
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Основные показатели электронного сборника
                            </p>
                        </div>

                        <DashboardStats
                            documentsCount={1248}
                            categoriesCount={36}
                            usersCount={87}
                            visitsCount={15420}

                            latestDocuments={[
                                {
                                    id: 1,
                                    title: 'Закон Республики Узбекистан о радиочастотном спектре',
                                    document_date: '15.09.2026',
                                },
                                {
                                    id: 2,
                                    title: 'Положение о порядке использования радиочастотного спектра',
                                    document_date: '12.09.2026',
                                },
                                {
                                    id: 3,
                                    title: 'Нормативные требования к радиоэлектронным средствам',
                                    document_date: '08.09.2026',
                                },
                                {
                                    id: 4,
                                    title: 'Правила распределения полос радиочастот',
                                    document_date: '05.09.2026',
                                },
                                {
                                    id: 5,
                                    title: 'Технические условия использования радиочастот',
                                    document_date: '01.09.2026',
                                },
                            ]}

                            latestUsers={[
                                {
                                    id: 1,
                                    name: 'Farkhod Pulatov',
                                    email: 'farkhod@example.com',
                                    created_at: '17.09.2026',
                                },
                                {
                                    id: 2,
                                    name: 'Aziz Karimov',
                                    email: 'aziz@example.com',
                                    created_at: '16.09.2026',
                                },
                                {
                                    id: 3,
                                    name: 'Bekzod Tursunov',
                                    email: 'bekzod@example.com',
                                    created_at: '15.09.2026',
                                },
                                {
                                    id: 4,
                                    name: 'Jasur Abdullaev',
                                    email: 'jasur@example.com',
                                    created_at: '13.09.2026',
                                },
                                {
                                    id: 5,
                                    name: 'Sardor Akhmedov',
                                    email: 'sardor@example.com',
                                    created_at: '11.09.2026',
                                },
                            ]}
                        />
                    </section>


                    {/* Main sections */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-base font-semibold text-gray-800">
                                Разделы системы
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Быстрый доступ к основным разделам
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            {items.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="
                                        group
                                        rounded-xl
                                        border
                                        border-gray-100
                                        bg-white
                                        p-5
                                        shadow-sm
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:border-gray-200
                                        hover:shadow-lg
                                    "
                                >
                                    <div className="flex items-start justify-between">

                                        {/* Icon */}
                                        <div
                                            className={`
                                                flex
                                                h-11
                                                w-11
                                                items-center
                                                justify-center
                                                rounded-xl
                                                ${item.iconBg}
                                                ${item.iconColor}
                                                transition-colors
                                                duration-200
                                                ${item.hover}
                                            `}
                                        >
                                            {item.icon}
                                        </div>

                                        {/* Arrow */}
                                        <div
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-gray-300
                                                transition-all
                                                duration-200
                                                group-hover:bg-gray-50
                                                group-hover:text-gray-500
                                            "
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M9 5l7 7-7 7"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="mt-5">
                                        <div
                                            className={`
                                                text-sm
                                                font-semibold
                                                text-gray-800
                                                transition-colors
                                                duration-200
                                                ${item.text}
                                            `}
                                        >
                                            {item.title}
                                        </div>

                                        <div className="mt-1 text-xs leading-5 text-gray-400">
                                            {item.description}
                                        </div>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </section>


                    {/* Info */}
                    <div
                        className="
                            mt-7
                            rounded-xl
                            border
                            border-gray-100
                            bg-white
                            px-5
                            py-4
                            shadow-sm
                        "
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-indigo-50
                                    text-indigo-600
                                "
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        strokeWidth="1.8"
                                    />

                                    <path
                                        d="M12 11v5"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />

                                    <circle
                                        cx="12"
                                        cy="7.5"
                                        r="1"
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                </svg>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-700">
                                    Электронный сборник нормативных документов
                                </div>

                                <div className="mt-0.5 text-xs text-gray-400">
                                    Используйте меню слева или выберите необходимый
                                    раздел для работы с системой.
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}