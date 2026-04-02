import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({serverInfo}) {


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard #STATUS {serverInfo?.status}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-6 bg-white border-b border-gray-200">
                You're logged in!
            </div>
        </AuthenticatedLayout>
    );
}
