import React from 'react';
import { useForm } from '@inertiajs/react';

function Edit({ user, onSuccess, onError }) {
    const {
        data,
        setData,
        patch,
        errors,
        processing,
    } = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(`/users/${user.id}`, {
            onSuccess: () => {
                onSuccess?.();
            },
            onError: (errors) => {
                onError?.(errors);
            },
        });
    };

    const inputClass = (error) => `
        w-full
        rounded-lg
        border
        bg-white
        px-3.5
        py-2.5
        text-sm
        text-gray-700
        outline-none
        transition
        placeholder:text-gray-400
        ${
            error
                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
        }
    `;

    const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700';

    return (
        <div className="w-full">
            <form
                onSubmit={submit}
                className="w-full rounded-xl border border-gray-100 bg-white shadow-sm"
            >
                {/* Header */}
                <div className="border-b border-gray-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <svg
                                className="h-5 w-5"
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
                                    strokeLinecap="round"
                                    strokeWidth="1.8"
                                    d="M5 20a7 7 0 0 1 14 0"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Настройки профиля
                            </h2>

                            <p className="mt-0.5 text-sm text-gray-400">
                                Измените информацию о пользователе
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="px-5 py-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Имя */}
                        <div>
                            <label className={labelClass}>
                                Имя <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={inputClass(errors?.name)}
                                placeholder="Введите имя"
                            />

                            {errors.name && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelClass}>
                                Email <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                autoComplete="off"
                                className={inputClass(errors?.email)}
                                placeholder="example@mail.com"
                            />

                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-gray-100 bg-gray-50/50 px-5 py-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            shadow-sm
                            transition
                            hover:bg-blue-700
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
                                        className="opacity-90"
                                        fill="currentColor"
                                        d="M12 3a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6V3Z"
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
                                        d="M5 4h11l3 3v13H5V4Zm3 0v5h8V4M8 20v-7h8v7"
                                    />
                                </svg>

                                Сохранить
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;