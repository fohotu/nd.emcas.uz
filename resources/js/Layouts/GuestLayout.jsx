import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full font-sans antialiased">

            {/* ЛЕВАЯ КОЛОНКА: Фоновое изображение */}
            <div
                className="relative hidden lg:flex lg:w-3/5 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/image/login_bg_2.png')"
                }}
            >
                {/* Затемнение поверх картинки */}
                <div className="absolute inset-0 bg-slate-900/50" />

                {/* Контент поверх картинки */}
                <div className="relative z-10 flex w-full flex-col justify-between p-12 text-white">

                    {/* Логотип */}
                    <div>
                        <Link href="/">
                            <ApplicationLogo className="h-12 w-12 fill-current text-white" />
                        </Link>
                    </div>

                    {/* Основная информация */}
                    <div className="max-w-2xl space-y-5">

                        <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
                            Радиочастотный спектр
                        </div>

                        <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                            Электронный сборник
                            <br />
                            нормативных документов
                        </h1>

                        <p className="max-w-xl text-lg leading-8 text-slate-200">
                            Нормативно-правовые акты и нормативные документы
                            в области использования радиочастотного спектра.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm">
                                Нормативно-правовые акты
                            </span>

                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm">
                                Радиочастотный спектр
                            </span>

                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm">
                                Нормативные документы
                            </span>
                        </div>
                    </div>

                    {/* Нижняя часть */}
                    <div className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} Все права защищены.
                    </div>

                </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: Форма */}
            <div className="flex min-h-screen w-full items-center justify-center bg-white p-6 sm:p-12 lg:w-2/5">
                
                <div className="w-full max-w-sm">
                    <Link href="/">
                            <ApplicationLogo className="h-20 w-[330px]"  />
                    </Link>
                    <div className="mt-10">
                        {children}
                    </div>
                </div>

            </div>

        </div>
    );
}