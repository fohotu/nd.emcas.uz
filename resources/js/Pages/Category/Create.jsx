import React, { useEffect } from 'react'
import { useForm,router } from '@inertiajs/react';
import AsyncSelect from "react-select/async";
//function Create ({ parents = [],onSuccessHandler,onErrorHandler,onClose })
function Create ({ parents = [],onSuccessHandler,onErrorHandler,menu,onClose,loadCategories,loadMenu }) {


  /*
const { data, setData, post, processing, errors, reset } = useForm ({
    title: '',
    description: '',
    sys_name: '',
    parent_id: '',
    order: '',
    route: '',
    url: '',
  });
  */

   const { data, setData, post, processing, errors,reset } = useForm({
        title: '',
        description: '',
        parent: null,
        parent_id: null,
        menu_id: "",
        menu:null,
        order: '',
    });


    useEffect(()=>{
            /*
                setData(prev => ({
                    ...prev,
                    parent: null,
                    parent_id: null,
                }))
            */
    },[data.menu])

  const submit = (e) => {
        e.preventDefault();
       // console.log(data);return;
        post(`/category`,{
          onSuccess: () => {
            onSuccessHandler?.(); 
          },
          onError: (errors) => {
            onErrorHandler?.(errors)
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

                <div className="grid grid-cols-1  gap-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Название *
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title",e.target.value)}
                                className={`
                                        w-full
                                        rounded
                                        border
                                        px-4
                                        py-3
                                        outline-none
                                        transition
                                        ${errors?.title
                                            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                            : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        }
                                    `}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    {/* Menu */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Меню
                        </label>
                        <AsyncSelect
                            cacheOptions={false}
                            defaultOptions
                            loadOptions={loadMenu}
                            value={data.menu ?? null}
                            placeholder="Выберите меню..."
                            isClearable
                            onChange = {(option) => 
                                    setData(prev => ({
                                        ...prev,
                                        menu: option,
                                        menu_id:option?.value ?? null,
                                    }))
                            }
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: errors?.menu_id ? "#ef4444" : provided.borderColor,
                                    "&:hover": {
                                        borderColor: errors?.menu_id
                                            ? "#ff5f5f"
                                            : provided.borderColor,
                                    },
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                        ? "#2563eb"
                                        : state.isFocused
                                            ? "#eff6ff"
                                            : "white",
                                    color: state.isSelected ? "white" : "#111827",
                                    cursor: "pointer",
                                }),
                            }}
                        />
                        {errors.menu_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.menu_id}
                            </p>
                        )}   

                        {
    
                        
                    }
                    </div>


                    {/* Parent */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Родитель
                        </label>

                        <AsyncSelect
                            key={data.menu_id || 'empty'}
                            cacheOptions={false}
                            defaultOptions
                            value={data.parent}
                            loadOptions={(inputValue) => loadCategories(inputValue, data.menu)}
                            placeholder="Выберите категорию..."
                            isClearable
                            onChange = {(option) => 
                                    setData(prev => ({
                                        ...prev,
                                        parent: option,
                                        parent_id: option?.value ?? null,
                                    }))
                            }
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: errors?.parent_id ? "#ef4444" : provided.borderColor,
                                    boxShadow: errors?.parent_id
                                        ? "0 0 0 1px #f75858"
                                        : state.isFocused
                                            ? provided.boxShadow
                                            : "none",
                                    "&:hover": {
                                        borderColor: errors?.parent_id
                                            ? "#ff5f5f"
                                            : provided.borderColor,
                                    },
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                        ? "#2563eb"
                                        : state.isFocused
                                            ? "#eff6ff"
                                            : "white",
                                    color: state.isSelected ? "white" : "#111827",
                                    cursor: "pointer",
                                }),
                            }}
                          
                        />

                        

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