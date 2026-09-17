import React from 'react';
import { useForm } from '@inertiajs/react';
import AsyncSelect from 'react-select/async';

function Edit({
    category,
    parents = [],
    onSuccessHandler,
    onErrorHandler,
    menu,
    onClose,
    loadCategories,
    loadMenu,
}) {
    const { data, setData, put, processing, errors } = useForm({
        title: category.title || '',
        description: category.description || '',
        parent: category.parent?.id
            ? {
                  value: category.parent.id,
                  label: category.parent.title,
              }
            : null,
        parent_id: category.parent_id || '',
        menu_id: category.menu_id || '',
        menu: category.menu?.id
            ? {
                  value: category.menu.id,
                  label: category.menu.title,
              }
            : null,
        order: category.order || '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/category/${category.id}`, {
            onSuccess: () => {
                onSuccessHandler?.();
            },
            onError: (errors) => {
                onErrorHandler?.(errors);
            },
        });
    };

    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '42px',
            borderRadius: '8px',
            borderColor: errors?.menu_id || errors?.parent_id
                ? '#ef4444'
                : state.isFocused
                    ? '#3b82f6'
                    : '#e5e7eb',
            boxShadow: state.isFocused
                ? '0 0 0 4px rgba(59, 130, 246, 0.08)'
                : 'none',
            '&:hover': {
                borderColor: errors?.menu_id || errors?.parent_id
                    ? '#ef4444'
                    : '#3b82f6',
            },
        }),

        valueContainer: (provided) => ({
            ...provided,
            padding: '2px 12px',
        }),

        placeholder: (provided) => ({
            ...provided,
            color: '#9ca3af',
            fontSize: '14px',
        }),

        singleValue: (provided) => ({
            ...provided,
            color: '#374151',
            fontSize: '14px',
        }),

        input: (provided) => ({
            ...provided,
            fontSize: '14px',
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#2563eb'
                : state.isFocused
                    ? '#eff6ff'
                    : '#ffffff',
            color: state.isSelected ? '#ffffff' : '#111827',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '10px 12px',
        }),

        menu: (provided) => ({
            ...provided,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow:
                '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05)',
            border: '1px solid #f1f5f9',
        }),

        indicatorSeparator: () => ({
            display: 'none',
        }),
    };

    return (
        <form
            onSubmit={submit}
            className="w-full max-w-3xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
        >
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                                d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"
                            />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Редактирование категории
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Измените информацию о категории.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-5 p-6">

                {/* Title */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Название <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 ${
                            errors?.title
                                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                        }`}
                    />

                    {errors?.title && (
                        <p className="mt-1.5 text-xs text-red-500">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* Menu */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Меню
                    </label>

                    <AsyncSelect
                        cacheOptions={false}
                        defaultOptions
                        loadOptions={loadMenu}
                        value={data.menu ?? null}
                        placeholder="Выберите меню..."
                        isClearable
                        onChange={(option) =>
                            setData((prev) => ({
                                ...prev,
                                menu: option,
                                menu_id: option?.value ?? null,
                            }))
                        }
                        styles={selectStyles}
                    />

                    {errors?.menu_id && (
                        <p className="mt-1.5 text-xs text-red-500">
                            {errors.menu_id}
                        </p>
                    )}
                </div>

                {/* Parent */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Родительская категория
                    </label>

                    <AsyncSelect
                        key={data.menu_id || 'empty'}
                        cacheOptions={false}
                        defaultOptions
                        value={data.parent}
                        loadOptions={(inputValue) =>
                            loadCategories(inputValue, data.menu)
                        }
                        placeholder="Выберите категорию..."
                        isClearable
                        onChange={(option) =>
                            setData((prev) => ({
                                ...prev,
                                parent: option,
                                parent_id: option?.value ?? null,
                            }))
                        }
                        styles={selectStyles}
                    />

                    {errors?.parent_id && (
                        <p className="mt-1.5 text-xs text-red-500">
                            {errors.parent_id}
                        </p>
                    )}
                </div>

                {/* Order */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Порядок
                    </label>

                    <input
                        type="number"
                        min={0}
                        value={data.order}
                        onChange={(e) => setData('order', e.target.value)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-700 outline-none transition ${
                            errors?.order
                                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                        }`}
                    />

                    {errors?.order && (
                        <p className="mt-1.5 text-xs text-red-500">
                            {errors.order}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Описание
                    </label>

                    <textarea
                        rows={4}
                        value={data.description}
                        onChange={(e) =>
                            setData('description', e.target.value)
                        }
                        className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 ${
                            errors?.description
                                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                        }`}
                    />

                    {errors?.description && (
                        <p className="mt-1.5 text-xs text-red-500">
                            {errors.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
                >
                    Отмена
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
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
                                    className="opacity-90"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
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
                                    strokeWidth="2"
                                    d="m5 12 4 4L19 6"
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