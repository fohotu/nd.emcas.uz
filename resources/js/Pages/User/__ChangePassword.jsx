import React from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

function ChangePassword({user,onSuccess,onError}) {

  const { data, setData, patch, errors, processing, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Отправляем запрос на роут, например: /admin/users/{id}/password
        patch(route('users.password.update', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onSuccess();
            },
            onError: (errors) => {
                onError(errors);
            }
        });
    };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
                Сброс пароля для: <span className="text-indigo-600">{user.email}</span>
            </h3>

            <form onSubmit={submit} className="space-y-4">
                {/* Новый пароль */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Новый пароль</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="Минимум 8 символов"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Подтверждение пароля */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Подтвердите пароль</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Повторите пароль"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Обновление...' : 'Принудительно изменить пароль'}
                    </button>
                </div>
            </form>
        </div>
  )
}

export default ChangePassword