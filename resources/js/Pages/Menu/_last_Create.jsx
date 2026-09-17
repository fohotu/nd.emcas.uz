import React from 'react'
import { useForm,router } from '@inertiajs/react';

function Create ({ parents = [],onSuccessHandler,onErrorHandler,onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm ({
    title: '',
    description: '',
    sys_name: '',
    parent_id: '',
    order: '',
    route: '',
    url: '',
  });

  const submit = (e) => {
        e.preventDefault();
        post(`/menu`,{
          onSuccess: () => {
            onSuccessHandler?.();
            
          },
          onError: (errors) => {
            onErrorHandler?.()
           // onError(errors);
          }
        });
    };


    return (
        <div>
            <form
                onSubmit={submit}
                className="bg-white rounded-2xl p-6 w-full max-w-3xl"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Создание меню
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Заполните информацию о новом пункте меню.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Название *
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e)=>setData("title",e.target.value)}
                            className="
                                w-full
                                rounded
                                border
                                border-gray-300
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-100
                            "
                        />

                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                   

                    {/* System Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            System Name
                        </label>

                        <input
                            type="text"
                            value={data.sys_name}
                            onChange={(e)=>setData("sys_name",e.target.value)}
                            className="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                        />
                         {errors.sys_name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.sys_name}
                            </p>
                        )}
                    </div>

                    {/* Parent */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Родитель
                        </label>

                       

                        <select
                            value={data.parent_id}
                            onChange={(e)=>setData("parent_id",e.target.value)}
                            className="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                        >
                            <option value="">Без родителя</option>

                            {parents.map(parent=>(
                                <option
                                    key={parent.id}
                                    value={parent.id}
                                >
                                    {parent.title}
                                </option>
                            ))}
                        </select>

                        {errors.parent_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.parent_id}
                            </p>
                        )}
                    </div>

                    {/* Order */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Порядок
                        </label>

                         

                        <input
                            type="number"
                            min={0}
                            value={data.order}
                            onChange={(e)=>setData("order",e.target.value)}
                            className="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                        />
                         {errors.order && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.order}
                            </p>
                        )}
                    </div>

                    {/* Route */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Route
                        </label>

                        <input
                            type="text"
                            placeholder="/dashboard"
                            value={data.route}
                            onChange={(e)=>setData("route",e.target.value)}
                            className="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                        />

                        {errors.route && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.route}
                            </p>
                        )}   

                        {
    
                        
                    }
                    </div>

                    {/* Url */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            URL
                        </label>

                        <input
                            type="text"
                            value={data.url}
                            onChange={(e)=>setData("url",e.target.value)}
                            className="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                        />
                         {errors.url && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.url}
                            </p>
                        )}  
                    </div>

                </div>

                {/* Description */}
                <div className="mt-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Описание
                    </label>

                    <textarea
                        rows={4}
                        value={data.description}
                        onChange={(e)=>setData("description",e.target.value)}
                        className="w-full rounded border border-gray-300 px-4 py-3 resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />
                    {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                    )} 
                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            px-5
                            py-3
                            rounded
                            bg-gray-100
                            hover:bg-gray-200
                            transition
                            font-medium
                        "
                    >
                        Отмена
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            px-6
                            py-3
                            rounded
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {processing ? "Сохранение..." : "💾 Сохранить"}
                    </button>

                </div>
            </form>
        </div>
    )
  
  
}

export default Create