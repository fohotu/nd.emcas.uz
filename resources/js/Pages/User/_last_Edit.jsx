import React from 'react';
import { useForm } from '@inertiajs/react';

function Edit({ user, onSuccess, onError }) {

    const {
        data,
        setData,
        patch,
        errors,
        processing
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
                        Настройки профиля
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Измените информацию о пользователе.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5">

                    {/* Имя */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Имя *
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
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
                                    errors?.name
                                        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                }
                            `}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email *
                        </label>

                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            autoComplete="off"
                            className={`
                                w-full
                                rounded
                                border
                                px-4
                                py-3
                                outline-none
                                transition
                                ${
                                    errors?.email
                                        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                }
                            `}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
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
                            ? "Сохранение..."
                            : "💾 Сохранить"}
                    </button>

                </div>

            </form>
        </div>
    );
}

export default Edit;