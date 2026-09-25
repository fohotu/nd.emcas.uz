import React from 'react';
import { useForm } from '@inertiajs/react';
import AsyncSelect from 'react-select/async';

function Create({
    parents = [],
    onSuccessHandler,
    onErrorHandler,
    menu,
    onClose,
    loadCategories,
    loadMenu,
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        title: '',
        description: '',
        parent: null,
        parent_id: null,
        menu_id: '',
        menu: null,
        order: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(`/category`, {
            onSuccess: () => {
                onSuccessHandler?.();
            },
            onError: (errors) => {
                onErrorHandler?.(errors);
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

    const errorClass = 'mt-1.5 text-xs text-red-500';

    const selectStyles = (hasError = false) => ({
        control: (provided, state) => ({
            ...provided,
            minHeight: '42px',
            borderRadius: '8px',
            borderColor: hasError
                ? '#fca5a5'
                : state.isFocused
                    ? '#3b82f6'
                    : '#e5e7eb',
            boxShadow: state.isFocused
                ? hasError
                    ? '0 0 0 4px rgba(254, 226, 226, 0.8)'
                    : '0 0 0 4px rgba(239, 246, 255, 1)'
                : 'none',
            '&:hover': {
                borderColor: hasError
                    ? '#f87171'
                    : state.isFocused
                        ? '#3b82f6'
                        : '#d1d5db',
            },
            transition: 'all 0.15s ease',
        }),

        valueContainer: (provided) => ({
            ...provided,
            padding: '2px 12px',
        }),

        input: (provided) => ({
            ...provided,
            fontSize: '14px',
            color: '#374151',
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

        menu: (provided) => ({
            ...provided,
            zIndex: 50,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        }),

        option: (provided, state) => ({
            ...provided,
            padding: '9px 12px',
            fontSize: '14px',
            backgroundColor: state.isSelected
                ? '#2563eb'
                : state.isFocused
                    ? '#eff6ff'
                    : '#ffffff',
            color: state.isSelected ? '#ffffff' : '#374151',
            cursor: 'pointer',
        }),

        indicatorSeparator: () => ({
            display: 'none',
        }),
    });

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
                            d="M12 5v14M5 12h14"
                        />
                    </svg>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Создание категории
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Заполните информацию о новой категории.
                    </p>
                </div>
            </div>

            {/* Fields */}
            <div className="space-y-5">

                {/* Title */}
                <div>
                    <label className={labelClass}>
                        Название <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) =>
                            setData('title', e.target.value)
                        }
                        placeholder="Введите название категории"
                        className={`
                            ${inputClass}
                            ${
                                errors?.title
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

                {/* Menu */}
                <div>
                    <label className={labelClass}>
                        Меню
                    </label>

                    <div className="mt-2">
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
                                    parent: null,
                                    parent_id: null,
                                }))
                            }
                            styles={selectStyles(!!errors?.menu_id)}
                        />
                    </div>

                    {errors.menu_id && (
                        <p className={errorClass}>
                            {errors.menu_id}
                        </p>
                    )}
                </div>

                {/* Parent */}
                <div>
                    <label className={labelClass}>
                        Родительская категория
                    </label>

                    <div className="mt-2">
                        <AsyncSelect
                            key={data.menu_id || 'empty'}
                            cacheOptions={false}
                            defaultOptions
                            value={data.parent}
                            loadOptions={(inputValue) =>
                                loadCategories(
                                    inputValue,
                                    data.menu
                                )
                            }
                            placeholder="Выберите категорию..."
                            isClearable
                            onChange={(option) =>
                                setData((prev) => ({
                                    ...prev,
                                    parent: option,
                                    parent_id:
                                        option?.value ?? null,
                                }))
                            }
                            styles={selectStyles(!!errors?.parent_id)}
                        />
                    </div>

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
                        onChange={(e) =>
                            setData('order', e.target.value)
                        }
                        placeholder="0"
                        className={inputClass}
                    />

                    {errors.order && (
                        <p className={errorClass}>
                            {errors.order}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className={labelClass}>
                        Описание
                    </label>

                    <textarea
                        rows={4}
                        value={data.description}
                        onChange={(e) =>
                            setData(
                                'description',
                                e.target.value
                            )
                        }
                        placeholder="Введите описание категории"
                        className={`${inputClass} resize-none`}
                    />

                    {errors.description && (
                        <p className={errorClass}>
                            {errors.description}
                        </p>
                    )}
                </div>
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

                            Сохранить
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default Create;