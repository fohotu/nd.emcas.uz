import React from 'react';
import { useForm } from '@inertiajs/react';

function Edit({user,onSuccess,onError}) {

  // Инициализация формы данными пользователя
    const { data, setData, patch, errors, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/users/${user.id}`,{
          onSuccess: () => {
          
            onSuccess();
          },
          onError: (errors) => {
            onError(errors);
          }
        });
    };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Настройки профиля</h2>
            
            <form onSubmit={submit} className="space-y-4">
                {/* Поле Имя */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Имя</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>

                {/* Поле Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                </div>

                {/* Кнопка сохранения */}
                <div className="flex items-center justify-end mt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                        {processing ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                </div>
            </form>
        </div>
  )
}

export default Edit