import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        patch,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
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
                            <circle
                                cx="12"
                                cy="8"
                                r="3.5"
                                strokeWidth="1.8"
                            />

                            <path
                                d="M5 20a7 7 0 0 1 14 0"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Личные данные
                        </h2>

                        <p className="mt-0.5 text-sm text-gray-400">
                            Изменение имени и электронной почты пользователя
                        </p>
                    </div>

                </div>

            </header>


            {/* Form */}
            <form
                onSubmit={submit}
                className="space-y-5"
            >

                {/* Name */}
                <div>

                    <InputLabel
                        htmlFor="name"
                        value="Имя"
                        className="mb-2 text-sm font-medium text-gray-700"
                    />

                    <div className="relative">

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                left-0
                                flex
                                w-11
                                items-center
                                justify-center
                                text-gray-400
                            "
                        >
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
                                    d="M5 20a7 7 0 0 1 14 0"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="name"
                            className={`
                                mt-0
                                block
                                w-full
                                rounded-lg
                                border
                                bg-white
                                py-2.5
                                pl-11
                                pr-4
                                text-sm
                                text-gray-700
                                shadow-none
                                outline-none
                                transition
                                ${
                                    errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                                }
                            `}
                        />

                    </div>

                    <InputError
                        className="mt-1.5"
                        message={errors.name}
                    />

                </div>


                {/* Email */}
                <div>

                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="mb-2 text-sm font-medium text-gray-700"
                    />

                    <div className="relative">

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                left-0
                                flex
                                w-11
                                items-center
                                justify-center
                                text-gray-400
                            "
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                    x="3"
                                    y="5"
                                    width="18"
                                    height="14"
                                    rx="2"
                                    strokeWidth="1.8"
                                />

                                <path
                                    d="m4 7 8 6 8-6"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            required
                            autoComplete="username"
                            className={`
                                mt-0
                                block
                                w-full
                                rounded-lg
                                border
                                bg-white
                                py-2.5
                                pl-11
                                pr-4
                                text-sm
                                text-gray-700
                                shadow-none
                                outline-none
                                transition
                                ${
                                    errors.email
                                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                                }
                            `}
                        />

                    </div>

                    <InputError
                        className="mt-1.5"
                        message={errors.email}
                    />

                </div>


                {/* Email verification */}
                {mustVerifyEmail &&
                    user.email_verified_at === null && (
                        <div
                            className="
                                rounded-lg
                                border
                                border-amber-100
                                bg-amber-50
                                px-4
                                py-3
                            "
                        >
                            <div className="flex gap-3">

                                <div className="mt-0.5 text-amber-600">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 9v3.5"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />

                                        <circle
                                            cx="12"
                                            cy="16"
                                            r="1"
                                            fill="currentColor"
                                            stroke="none"
                                        />

                                        <path
                                            d="M10.3 4.8 3.7 16.2A2 2 0 0 0 5.4 19h13.2a2 2 0 0 0 1.7-2.8L13.7 4.8a2 2 0 0 0-3.4 0Z"
                                            strokeWidth="1.8"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-amber-800">
                                        Email не подтверждён
                                    </p>

                                    <p className="mt-0.5 text-xs leading-5 text-amber-700">
                                        Подтвердите адрес электронной почты,
                                        чтобы завершить настройку профиля.
                                    </p>

                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="
                                            mt-2
                                            text-xs
                                            font-medium
                                            text-amber-800
                                            underline
                                            underline-offset-2
                                            transition
                                            hover:text-amber-900
                                        "
                                    >
                                        Отправить письмо повторно
                                    </Link>

                                    {status === 'verification-link-sent' && (
                                        <div
                                            className="
                                                mt-2
                                                flex
                                                items-center
                                                gap-1.5
                                                text-xs
                                                font-medium
                                                text-emerald-600
                                            "
                                        >
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

                                            Письмо отправлено
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}


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

                            Изменения сохранены
                        </div>
                    </Transition>

                </div>

            </form>

        </section>
    );
}