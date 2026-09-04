import {useEffect} from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <form onSubmit={submit} className="space-y-5" autoComplete="off">

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Имя</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full border rounded px-3 py-2"
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm mb-1">Роль</label>
          <select
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Выберите роль</option>
            <option value="user">User (Пользователь)</option>
            <option value="manager">Manager (Менеджер)</option>
            <option value="admin">Admin (Администратор)</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Пароль</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm mb-1">Повтор пароля</label>
          <input
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Создать
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Очистить
          </button>
        </div>

      </form>
    </div>
  );
}