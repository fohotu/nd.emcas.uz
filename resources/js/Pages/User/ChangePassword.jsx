import React from 'react';
import { useForm } from '@inertiajs/react';

function ChangePassword({ user, onSuccess, onError }) {
    const {
        data,
        setData,
        patch,
        errors,
        processing,
        reset,
    } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('users.password.update', user.id), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
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
                                <rect
                                    x="4"
                                    y="10"
                                    width="16"
                                    height="11"
                                    rx="2"
                                    strokeWidth="1.8"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeWidth="1.8"
                                    d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Изменение пароля
                            </h2>

                            <p className="mt-0.5 text-sm text-gray-400">
                                Изменение пароля пользователя{' '}
                                <span className="font-medium text-blue-600">
                                    {user.email}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="px-5 py-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Новый пароль */}
                        <div>
                            <label className={labelClass}>
                                Новый пароль{' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Минимум 8 символов"
                                autoComplete="new-password"
                                className={inputClass(errors?.password)}
                            />

                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Подтверждение */}
                        <div>
                            <label className={labelClass}>
                                Подтвердите пароль{' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value
                                    )
                                }
                                placeholder="Повторите пароль"
                                autoComplete="new-password"
                                className={inputClass(
                                    errors?.password_confirmation
                                )}
                            />

                            {errors.password_confirmation && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.password_confirmation}
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

                                Обновление...
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <rect
                                        x="4"
                                        y="10"
                                        width="16"
                                        height="11"
                                        rx="2"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeWidth="1.8"
                                        d="M8 10V7a4 4 0 0 1 8 0v3"
                                    />
                                </svg>

                                Изменить пароль
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;