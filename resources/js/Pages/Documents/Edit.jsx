import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, document }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: document.title,
        description: document.description,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('documents.update', document.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800">Редактировать: {document.title}</h2>}
        >
            <Head title="Edit Document" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Заголовок</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">Описание</label>
                                <textarea
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                                >
                                    {processing ? 'Сохранение...' : 'Обновить'}
                                </button>
                                <Link href={route('documents.index')} className="text-sm text-gray-600 underline">
                                    Отмена
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}