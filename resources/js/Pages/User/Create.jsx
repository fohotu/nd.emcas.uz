import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
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
                autoComplete="off"
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                    d="M15 19a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7v6m3-3h-6"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Создание пользователя
                            </h2>

                            <p className="mt-0.5 text-sm text-gray-400">
                                Заполните информацию о новом пользователе
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="px-5 py-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Name */}
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

                        {/* Role */}
                        <div>
                            <label className={labelClass}>
                                Роль <span className="text-red-500">*</span>
                            </label>

                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData('role', e.target.value)
                                }
                                className={`${inputClass(errors?.role)} cursor-pointer`}
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
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelClass}>
                                Пароль <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                autoComplete="new-password"
                                className={inputClass(errors?.password)}
                                placeholder="Введите пароль"
                            />

                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className={labelClass}>
                                Повтор пароля{' '}
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
                                autoComplete="new-password"
                                className={inputClass(
                                    errors?.password_confirmation
                                )}
                                placeholder="Повторите пароль"
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
                <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/50 px-5 py-3">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="
                            inline-flex
                            items-center
                            gap-2
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
                        "
                    >
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
                                d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"
                            />
                        </svg>

                        Очистить
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