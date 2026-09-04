import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (


        <div className="relative min-h-screen flex flex-col items-center bg-gray-50">
            {/* ФОНОВОЕ ИЗОБРАЖЕНИЕ (Верхняя половина) */}
            <div 
                className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/assets/image/login_bg.png')" }}
            >
                {/* Оверлей (затемнение), чтобы логотип лучше читался */}
                <div className="absolute inset-0 bg-slate-900/40"></div>
            </div>

            {/* КОНТЕНТ (Логотип и Форма) */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-0">
                        <div className="mb-6">
                            <Link href="/" style={{"display":"none"}}>
                                <ApplicationLogo className="h-20 w-20 fill-current text-white drop-shadow-lg" />
                            </Link>
                        </div>

                        <div className="w-full overflow-hidden bg-white px-6 py-8 shadow-xl sm:max-w-md rounded">
                            {children}
                        </div>
                    </div>
        </div>
    );
}
