import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">

                    {/* Tabs */}
                    <div className="mb-6 flex rounded bg-white p-1 shadow-sm">

                        <button
                            type="button"
                            onClick={() => setActiveTab('profile')}
                            className={`
                                flex-1 rounded px-4 py-2.5 text-sm font-medium
                                transition
                                ${
                                    activeTab === 'profile'
                                        ? 'bg-slate-800 text-white shadow'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }
                            `}
                        >
                            Profile
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('password')}
                            className={`
                                flex-1 rounded px-4 py-2.5 text-sm font-medium
                                transition
                                ${
                                    activeTab === 'password'
                                        ? 'bg-slate-800 text-white shadow'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }
                            `}
                        >
                            Change password
                        </button>

                    </div>

                    {/* Content */}
                    <div className="rounded-lg bg-white p-6 shadow sm:p-8">

                        {activeTab === 'profile' && (
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        )}

                        {activeTab === 'password' && (
                            <UpdatePasswordForm
                                className="max-w-xl"
                            />
                        )}

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}


