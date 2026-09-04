import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';
//import { DocumentTextIcon, FolderIcon, Squares2X2Icon, UsersIcon, } from '@heroicons/react/24/outline';
import CategoryIcon from '@/Components/Icons/CategoryIcon';
import MenuIcon from '@/Components/Icons/MenuIcon';
import DocumentIcon from '@/Components/Icons/DocumentIcon';
import UserIcon from '@/Components/Icons/UserIcon';

export default function Dashboard({serverInfo}) {

    const items = [ 
        { title: 'Menus', href: route('menu.index'), icon: <MenuIcon className="w-14 h-14 text-blue-600" />, }, 
        { title: 'Categories', href: route('category.index'), icon: <CategoryIcon className="w-14 h-14 text-green-600" />, }, 
        { title: 'Documents', href: route('documents.index'), icon: <DocumentIcon className="w-14 h-14 text-orange-600" />, }, 
        { title: 'Users', href: route('users.index'), icon: <UserIcon className="w-14 h-14 text-purple-600" />, }, 
    ];

    return (
        <AuthenticatedLayout
                header={
                    <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                }
            >
            <Head title="Dashboard" />

            <div className="p-8"> 
                     <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                            Панель управления
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {items.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="
                                        group
                                        bg-white
                                        border
                                        rounded
                                        p-5
                                        hover:border-blue-500
                                        hover:shadow-md
                                        transition
                                    "
                                >
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-4">

                                            <div className="
                                                w-12
                                                h-12
                                                rounded
                                                bg-blue-100
                                                text-blue-600
                                                flex
                                                items-center
                                                justify-center
                                            ">
                                                {item.icon}
                                            </div>

                                            <div>
                                                <div className="font-semibold text-gray-800 group-hover:text-blue-600">
                                                    {item.title}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    Открыть раздел
                                                </div>
                                            </div>

                                        </div>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-gray-400 group-hover:text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

            </div>
        </AuthenticatedLayout>
    );
}
