import React from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

function ChangeRole({user,onSuccess,onError}) {
  // Инициализируем форму текущей ролью пользователя
    const { data, setData, patch, processing, errors } = useForm({
        role: user.role || 'user', 
    });

    const submit = (e) => {
        e.preventDefault();
        
        patch(route('users.role.update', user.id), {
            preserveScroll: true,
             onSuccess: () => {  
                onSuccess();
            },
            onError: (errors) => {
                onError(errors);
            }
        });
    };


  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Управление правами доступа</h3>
            
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Выберите роль для {user.email}
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.role ? 'border-red-500' : ''}`}
                    >
                        <option value="user">User (Пользователь)</option>
                        <option value="manager">Manager (Менеджер)</option>
                        <option value="admin">Admin (Администратор)</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing || data.role === user.role}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                        {processing ? 'Сохранение...' : 'Обновить роль'}
                    </button>
                </div>
            </form>
        </div>
  )
}

export default ChangeRole