import { useForm } from '@inertiajs/react';

function Edit({ menu, parents = [], onSuccessHandler,onClose }) {

    const { data, setData, put, processing, errors, reset } = useForm({
        title: menu.title || '',
        description: menu.description || '',
        sys_name: menu.sys_name || '',
        parent_id: menu.parent_id || '',
        order: menu.order || '',
        route: menu.route || '',
        url: menu.url || '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/menu/${menu.id}`, {
            onSuccess: () => {
                onSuccessHandler?.();
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <form
            onSubmit={submit}
            className="bg-white rounded p-6 w-full max-w-3xl"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Редактирование меню
                </h2>

                <p className="text-gray-500 mt-1">
                    Измените информацию о выбранном пункте меню.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Название *
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={`w-full border px-4 py-3 rounded outline-none transition
                        ${
                            errors.title
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        }`}
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* System Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        System Name
                    </label>

                    <input
                        type="text"
                        value={data.sys_name}
                        onChange={(e) => setData('sys_name', e.target.value)}
                        className="w-full border border-gray-300 px-4 py-3 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                </div>

                {/* Parent */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Родительское меню
                    </label>

                    <select
                        value={data.parent_id ?? ""}
                        onChange={(e) =>
                            setData(
                                "parent_id",
                                e.target.value === "" ? null : Number(e.target.value)
                            )
                        }
                        className="w-full border border-gray-300 px-4 py-3 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    >
                        <option value="">Без родителя</option>

                        {parents.map(parent => (
                            <option
                                key={parent.id}
                                value={parent.id}
                            >
                                {parent.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Order */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Порядок
                    </label>

                    <input
                        type="number"
                        value={data.order}
                        onChange={(e) => setData('order', e.target.value)}
                        className="w-full border border-gray-300 px-4 py-3 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                </div>

                {/* Route */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Route
                    </label>

                    <input
                        type="text"
                        value={data.route}
                        onChange={(e) => setData('route', e.target.value)}
                        placeholder="/dashboard"
                        className="w-full border border-gray-300 px-4 py-3 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                </div>

                {/* Url */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        URL
                    </label>

                    <input
                        type="text"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        className="w-full border border-gray-300 px-4 py-3 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                </div>

            </div>

            {/* Description */}
            <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Описание
                </label>

                <textarea
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-8">

                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 rounded bg-gray-100 hover:bg-gray-200 transition font-medium"
                >
                    Отмена
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-3 rounded bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Сохранение...' : '💾 Обновить'}
                </button>

            </div>

        </form>
    );
}

export default Edit;