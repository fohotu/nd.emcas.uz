import React from 'react';
import { useForm } from '@inertiajs/react';

function ChangePassword({ user, onSuccess, onError }) {

    const {
        data,
        setData,
        patch,
        errors,
        processing,
        reset
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
            }
        });
    };

    return (
        <div>
            <form
                onSubmit={submit}
                className="bg-white rounded-2xl p-6 w-full max-w-3xl"
            >

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Изменение пароля
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Изменение пароля пользователя{' '}
                        <span className="font-medium text-blue-600">
                            {user.email}
                        </span>
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5">

                    {/* Новый пароль */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Новый пароль *
                        </label>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Минимум 8 символов"
                            autoComplete="new-password"
                            className={`
                                w-full
                                rounded
                                border
                                px-4
                                py-3
                                outline-none
                                transition
                                ${
                                    errors?.password
                                        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                }
                            `}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Подтверждение пароля */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Подтвердите пароль *
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
                            className={`
                                w-full
                                rounded
                                border
                                px-4
                                py-3
                                outline-none
                                transition
                                ${
                                    errors?.password_confirmation
                                        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                }
                            `}
                        />

                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-8">

                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            px-6
                            py-3
                            rounded
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {processing
                            ? "Обновление..."
                            : "💾 Изменить пароль"}
                    </button>

                </div>

            </form>
        </div>
    );
}

export default ChangePassword;