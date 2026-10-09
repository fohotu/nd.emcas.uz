import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full font-sans antialiased">
            
            {/* ЛЕВАЯ КОЛОНКА: Фоновое изображение (скрыта на мобильных, видна от lg экрана) */}
            <div 
                className="relative hidden lg:flex lg:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/image/login_bg.png')" }}
            >
                {/* Затемнение поверх картинки */}
                <div className="absolute inset-0 bg-slate-900/50" />

                {/* Контент поверх картинки */}
                <div className="relative z-10 flex flex-col justify-between w-full p-12 text-white">
                    <div>
                        <Link href="/">
                            <ApplicationLogo className="h-12 w-12 fill-current text-white" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold">Добро пожаловать</h1>
                        <p className="text-slate-200 text-lg">Войдите в систему для продолжения работы.</p>
                    </div>

                    <div className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} Все права защищены.
                    </div>
                </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: Чисто белый фон, 100% высоты, по центру форма */}
            <div className="flex w-full lg:w-1/2 min-h-screen bg-white items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

        </div>
    );
}