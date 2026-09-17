import { useForm } from '@inertiajs/react';

function Edit({ menu, parents = [], onSuccessHandler, onClose }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
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
        });
    };

    const inputClass = `
        mt-2
        block
        w-full
        rounded-lg
        border
        border-gray-200
        bg-white
        px-3.5
        py-2.5
        text-sm
        text-gray-700
        outline-none
        transition
        placeholder:text-gray-400
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-50
    `;

    const labelClass = `
        block
        text-sm
        font-medium
        text-gray-700
    `;

    const errorClass = "mt-1.5 text-xs text-red-500";

    return (
        <form
            onSubmit={submit}
            className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-sm sm:p-7"
        >
            {/* Header */}
            <div className="mb-7 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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
                            d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M16.5 3.5a2.12 2.12 0 0 1 3 3L12 14l-4 1 1-4 7.5-7.5z"
                        />
                    </svg>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Редактирование меню
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Измените информацию о выбранном пункте меню.
                    </p>
                </div>
            </div>

            {/* Main fields */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Title */}
                <div>
                    <label className={labelClass}>
                        Название <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={`
                            ${inputClass}
                            ${
                                errors.title
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-50'
                                    : ''
                            }
                        `}
                    />

                    {errors.title && (
                        <p className={errorClass}>
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* System Name */}
                <div>
                    <label className={labelClass}>
                        Системное имя
                    </label>

                    <input
                        type="text"
                        value={data.sys_name}
                        onChange={(e) => setData('sys_name', e.target.value)}
                        className={inputClass}
                        placeholder="Например: documents"
                    />

                    {errors.sys_name && (
                        <p className={errorClass}>
                            {errors.sys_name}
                        </p>
                    )}
                </div>

                {/* Parent */}
                <div>
                    <label className={labelClass}>
                        Родительское меню
                    </label>

                    <select
                        value={data.parent_id ?? ''}
                        onChange={(e) =>
                            setData(
                                'parent_id',
                                e.target.value === ''
                                    ? null
                                    : Number(e.target.value)
                            )
                        }
                        className={inputClass}
                    >
                        <option value="">Без родителя</option>

                        {parents.map((parent) => (
                            <option
                                key={parent.id}
                                value={parent.id}
                            >
                                {parent.title}
                            </option>
                        ))}
                    </select>

                    {errors.parent_id && (
                        <p className={errorClass}>
                            {errors.parent_id}
                        </p>
                    )}
                </div>

                {/* Order */}
                <div>
                    <label className={labelClass}>
                        Порядок
                    </label>

                    <input
                        type="number"
                        min={0}
                        value={data.order}
                        onChange={(e) => setData('order', e.target.value)}
                        className={inputClass}
                        placeholder="0"
                    />

                    {errors.order && (
                        <p className={errorClass}>
                            {errors.order}
                        </p>
                    )}
                </div>

                {/* Route */}
                <div>
                    <label className={labelClass}>
                        Route
                    </label>

                    <input
                        type="text"
                        value={data.route}
                        onChange={(e) => setData('route', e.target.value)}
                        placeholder="/dashboard"
                        className={inputClass}
                    />

                    {errors.route && (
                        <p className={errorClass}>
                            {errors.route}
                        </p>
                    )}
                </div>

                {/* URL */}
                <div>
                    <label className={labelClass}>
                        URL
                    </label>

                    <input
                        type="text"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        className={inputClass}
                        placeholder="https://example.com"
                    />

                    {errors.url && (
                        <p className={errorClass}>
                            {errors.url}
                        </p>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="mt-5">
                <label className={labelClass}>
                    Описание
                </label>

                <textarea
                    rows={4}
                    value={data.description}
                    onChange={(e) =>
                        setData('description', e.target.value)
                    }
                    className={`${inputClass} resize-none`}
                    placeholder="Введите описание пункта меню"
                />

                {errors.description && (
                    <p className={errorClass}>
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="mt-7 flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                    type="button"
                    onClick={onClose}
                    className="
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-50
                        hover:text-gray-800
                    "
                >
                    Отмена
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        shadow-sm
                        transition
                        hover:bg-blue-700
                        focus:outline-none
                        focus:ring-4
                        focus:ring-blue-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {processing ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />

                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3z"
                                />
                            </svg>

                            Сохранение...
                        </>
                    ) : (
                        <>
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                    d="M5 12.5l4.5 4.5L19 7.5"
                                />
                            </svg>

                            Сохранить изменения
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default Edit;