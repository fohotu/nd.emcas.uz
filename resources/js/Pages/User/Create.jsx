import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        name: '',
        email: '',
        role: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        reset();
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post('/users', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div>
            <form
                onSubmit={submit}
                className="bg-white rounded-2xl p-6 w-full max-w-3xl"
                autoComplete="off"
            >

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Создание пользователя
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Заполните информацию о новом пользователе.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5">

                    {/* Name */}
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
                            <option value="">
                                Выберите роль
                            </option>

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

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Пароль *
                        </label>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
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

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Повтор пароля *
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
                        type="button"
                        onClick={() => reset()}
                        className="
                            px-5
                            py-3
                            rounded
                            bg-gray-100
                            hover:bg-gray-200
                            transition
                            font-medium
                        "
                    >
                        Очистить
                    </button>

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