import { Link } from '@inertiajs/react';

export default function DashboardStats({
    documentsCount = 0,
    categoriesCount = 0,
    usersCount = 0,
    visitsCount = 0,
    latestDocuments = [],
    latestUsers = [],
}) {
    const stats = [
        {
            title: 'Документы',
            value: documentsCount,
            description: 'Всего документов',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                    />
                    <path
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        d="M14 3v6h5"
                    />
                    <path
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        d="M9 13h6M9 17h4"
                    />
                </svg>
            ),
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },

        {
            title: 'Категории',
            value: categoriesCount,
            description: 'Всего категорий',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"
                    />
                </svg>
            ),
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
        },

        {
            title: 'Пользователи',
            value: usersCount,
            description: 'Зарегистрированных',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle
                        cx="12"
                        cy="8"
                        r="3"
                        strokeWidth="1.8"
                    />
                    <path
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        d="M5 20a7 7 0 0 1 14 0"
                    />
                </svg>
            ),
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },

        {
            title: 'Посещения',
            value: visitsCount,
            description: 'Всего посещений',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                        strokeWidth="1.8"
                    />
                </svg>
            ),
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
    ];

    return (
        <div className="space-y-6">

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="
                            rounded-xl
                            border
                            border-gray-100
                            bg-white
                            p-5
                            shadow-sm
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:shadow-md
                        "
                    >
                        <div className="flex items-center justify-between">

                            <div
                                className={`
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${stat.iconBg}
                                    ${stat.iconColor}
                                `}
                            >
                                {stat.icon}
                            </div>

                            <span className="text-xs text-gray-400">
                                Всего
                            </span>
                        </div>

                        <div className="mt-4">
                            <div className="text-2xl font-semibold tracking-tight text-gray-800">
                                {stat.value.toLocaleString()}
                            </div>

                            <div className="mt-1 text-sm font-medium text-gray-700">
                                {stat.title}
                            </div>

                            <div className="mt-0.5 text-xs text-gray-400">
                                {stat.description}
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Latest content */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Latest documents */}
                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-gray-100
                        bg-white
                        shadow-sm
                    "
                >
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                                Последние документы
                            </h3>

                            <p className="mt-0.5 text-xs text-gray-400">
                                Недавно добавленные документы
                            </p>
                        </div>

                        <Link
                            href={route('documents.index')}
                            className="
                                text-xs
                                font-medium
                                text-indigo-600
                                hover:text-indigo-700
                            "
                        >
                            Все документы
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-50">

                        {latestDocuments.length > 0 ? (
                            latestDocuments.map((document) => (
                                <Link
                                    key={document.id}
                                    href={route(
                                        'dashboard',
                                        document.id
                                    )}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3.5
                                        transition-colors
                                        hover:bg-gray-50
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-orange-50
                                            text-orange-600
                                        "
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                                            />
                                            <path
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                d="M14 3v6h5"
                                            />
                                        </svg>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                                            {document.title}
                                        </div>

                                        <div className="mt-0.5 text-xs text-gray-400">
                                            {document.document_date ?? 'Дата не указана'}
                                        </div>
                                    </div>

                                    <svg
                                        className="
                                            h-4
                                            w-4
                                            shrink-0
                                            text-gray-300
                                            group-hover:text-gray-500
                                        "
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
                                </Link>
                            ))
                        ) : (
                            <div className="px-5 py-10 text-center text-sm text-gray-400">
                                Документы отсутствуют
                            </div>
                        )}

                    </div>
                </div>

                {/* Latest users */}
                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-gray-100
                        bg-white
                        shadow-sm
                    "
                >
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                                Последние пользователи
                            </h3>

                            <p className="mt-0.5 text-xs text-gray-400">
                                Недавно зарегистрированные
                            </p>
                        </div>

                        <Link
                            href={route('users.index')}
                            className="
                                text-xs
                                font-medium
                                text-indigo-600
                                hover:text-indigo-700
                            "
                        >
                            Все пользователи
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-50">

                        {latestUsers.length > 0 ? (
                            latestUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3.5
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-blue-600
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {user.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-medium text-gray-700">
                                            {user.name}
                                        </div>

                                        <div className="mt-0.5 truncate text-xs text-gray-400">
                                            {user.email}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-400">
                                        {user.created_at}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-5 py-10 text-center text-sm text-gray-400">
                                Пользователи отсутствуют
                            </div>
                        )}

                    </div>
                </div>

            </div>

        </div>
    );
}

