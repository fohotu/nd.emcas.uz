import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, documents }) {
    // Форма для создания нового документа через Action
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('documents.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Документы</h2>}
        >
            <Head title="Documents" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Форма добавления */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header>
                            <h3 className="text-lg font-medium text-gray-900">Создать новый документ</h3>
                        </header>

                        <form onSubmit={submit} className="mt-6 space-y-4 max-w-xl">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Заголовок"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>

                            <div>
                                <textarea
                                    placeholder="Описание"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 transition ease-in-out duration-150"
                            >
                                {processing ? 'Сохранение...' : 'Добавить'}
                            </button>
                        </form>
                    </div>

                    {/* Таблица документов */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {documents.data.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{doc.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(doc.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Простая пагинация */}
                            {documents.links.length > 3 && (
                                <div className="mt-6 flex justify-center space-x-1">
                                    {documents.links.map((link, index) => (
                                        <button
                                            key={index}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3 py-1 rounded border ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                                            onClick={() => link.url && (window.location.href = link.url)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}