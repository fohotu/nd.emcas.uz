import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {

    const [activeTab, setActiveTab] = useState('profile');

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        Настройки профиля
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Управление личными данными и безопасностью аккаунта
                    </p>
                </div>
            }
        >
            <Head title="Настройки профиля" />

            <div className="py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page intro */}
                    <div className="mb-7">
                        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Профиль пользователя
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Измените информацию профиля или настройки безопасности.
                        </p>
                    </div>


                    {/* Settings card */}
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

                        {/* Tabs */}
                        <div className="border-b border-gray-100 px-6 pt-5">

                            <div className="flex gap-6">

                                {/* Profile */}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('profile')}
                                    className={`
                                        relative
                                        flex
                                        items-center
                                        gap-2
                                        pb-4
                                        text-sm
                                        font-medium
                                        transition-colors
                                        duration-200
                                        ${
                                            activeTab === 'profile'
                                                ? 'text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }
                                    `}
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="8"
                                            r="3.5"
                                            strokeWidth="1.8"
                                        />

                                        <path
                                            d="M5 20a7 7 0 0 1 14 0"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    Личные данные

                                    {activeTab === 'profile' && (
                                        <span
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                right-0
                                                h-0.5
                                                rounded-full
                                                bg-blue-600
                                            "
                                        />
                                    )}
                                </button>


                                {/* Password */}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('password')}
                                    className={`
                                        relative
                                        flex
                                        items-center
                                        gap-2
                                        pb-4
                                        text-sm
                                        font-medium
                                        transition-colors
                                        duration-200
                                        ${
                                            activeTab === 'password'
                                                ? 'text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }
                                    `}
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <rect
                                            x="5"
                                            y="10"
                                            width="14"
                                            height="10"
                                            rx="2"
                                            strokeWidth="1.8"
                                        />

                                        <path
                                            d="M8 10V7a4 4 0 0 1 8 0v3"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />

                                        <circle
                                            cx="12"
                                            cy="15"
                                            r="1"
                                            fill="currentColor"
                                            stroke="none"
                                        />
                                    </svg>

                                    Безопасность

                                    {activeTab === 'password' && (
                                        <span
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                right-0
                                                h-0.5
                                                rounded-full
                                                bg-blue-600
                                            "
                                        />
                                    )}
                                </button>

                            </div>
                        </div>


                        {/* Content */}
                        <div className="p-6 sm:p-8">

                            {activeTab === 'profile' && (
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-3xl"
                                />
                            )}

                            {activeTab === 'password' && (
                                <UpdatePasswordForm
                                    className="max-w-3xl"
                                />
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}