import React from 'react';
import { useForm } from '@inertiajs/react';

function ChangeRole({ user, onSuccess, onError }) {

    const {
        data,
        setData,
        patch,
        processing,
        errors
    } = useForm({
        role: user.role || 'user',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('users.role.update', user.id), {
            preserveScroll: true,

            onSuccess: () => {
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
                        Управление правами доступа
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Изменение роли пользователя{' '}
                        <span className="font-medium text-blue-600">
                            {user.email}
                        </span>
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5">

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Роль *
                        </label>

                        <select
                            value={data.role}
                            onChange={(e) =>
                                setData('role', e.target.value)
                            }
                            className={`
                                w-full
                                rounded
                                border
                                px-4
                                py-3
                                outline-none
                                transition
                                ${
                                    errors?.role
                                        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                }
                            `}
                        >
                            <option value="user">
                                User (Пользователь)
                            </option>

                            <option value="manager">
                                Manager (Менеджер)
                            </option>

                            <option value="admin">
                                Admin (Администратор)
                            </option>
                        </select>

                        {errors.role && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.role}
                            </p>
                        )}
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-8">

                    <button
                        type="submit"
                        disabled={
                            processing ||
                            data.role === user.role
                        }
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
                            ? "Сохранение..."
                            : "💾 Обновить роль"}
                    </button>

                </div>

            </form>
        </div>
    );
}

export default ChangeRole;