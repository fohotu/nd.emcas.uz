import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {

    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,

            onSuccess: () => reset(),

            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>

            {/* Header */}
            <header className="mb-7 border-b border-gray-100 pb-5">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                        "
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <rect
                                x="5"
                                y="10"
                                width="14"
                                height="10"
                                rx="2"
                                strokeWidth="1.8"
                            />

                            <path
                                d="M8 10V7a4 4 0 0 1 8 0v3"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />

                            <circle
                                cx="12"
                                cy="15"
                                r="1"
                                fill="currentColor"
                                stroke="none"
                            />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Изменение пароля
                        </h2>

                        <p className="mt-0.5 text-sm text-gray-400">
                            Используйте надёжный пароль для защиты вашей учётной записи.
                        </p>
                    </div>

                </div>

            </header>


            {/* Form */}
            <form
                onSubmit={updatePassword}
                className="space-y-5"
            >

                {/* Current password */}
                <div>

                    <InputLabel
                        htmlFor="current_password"
                        value="Текущий пароль"
                        className="mb-2 text-sm font-medium text-gray-700"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className={`
                            mt-0
                            block
                            w-full
                            rounded-lg
                            border
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            text-gray-700
                            shadow-none
                            outline-none
                            transition
                            ${
                                errors.current_password
                                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                            }
                        `}
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-1.5"
                    />

                </div>


                {/* New password */}
                <div>

                    <InputLabel
                        htmlFor="password"
                        value="Новый пароль"
                        className="mb-2 text-sm font-medium text-gray-700"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        type="password"
                        className={`
                            mt-0
                            block
                            w-full
                            rounded-lg
                            border
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            text-gray-700
                            shadow-none
                            outline-none
                            transition
                            ${
                                errors.password
                                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                            }
                        `}
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password}
                        className="mt-1.5"
                    />

                </div>


                {/* Confirm password */}
                <div>

                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Подтвердите новый пароль"
                        className="mb-2 text-sm font-medium text-gray-700"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData(
                                'password_confirmation',
                                e.target.value
                            )
                        }
                        type="password"
                        className={`
                            mt-0
                            block
                            w-full
                            rounded-lg
                            border
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            text-gray-700
                            shadow-none
                            outline-none
                            transition
                            ${
                                errors.password_confirmation
                                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                            }
                        `}
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5"
                    />

                </div>


                {/* Footer */}
                <div
                    className="
                        flex
                        items-center
                        gap-4
                        border-t
                        border-gray-100
                        pt-5
                    "
                >

                    <PrimaryButton
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
                            hover:shadow
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
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />

                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
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
                                        d="M5 12.5 9.5 17 19 7.5"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                Сохранить изменения
                            </>
                        )}
                    </PrimaryButton>


                    {/* Success message */}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-200"
                        leaveTo="opacity-0"
                    >
                        <div className="flex items-center gap-2 text-sm text-emerald-600">

                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M5 12.5 9.5 17 19 7.5"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            Пароль успешно изменён
                        </div>
                    </Transition>

                </div>

            </form>

        </section>
    );
}