import React, { useState } from "react";
import LiveSelect from "./LiveSelect";
import { router } from '@inertiajs/react';
export default function SearchForm({ filter, onSearch,setSearchForm,searchForm }) {


   

    const handleChange = (e) => {
        setSearchForm({
            ...searchForm,
            [e.target.name]: e.target.value,
        });
    };



    return (
        <form
            onSubmit={onSearch}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-end"
        >
            {/* Номер */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Номер
                </label>
                <input
                    type="text"
                    name="number"
                    value={searchForm.number}
                    onChange={handleChange}
                    placeholder="Введите номер..."
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded
                        px-3
                        py-2.5
                        bg-white
                        transition
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
            </div>


            {/* Заголовок */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заголовок
                </label>

                <input
                    type="text"
                    name="title"
                    value={searchForm.title}
                    onChange={handleChange}
                    placeholder="Введите заголовок..."
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded
                        px-3
                        py-2.5
                        bg-white
                        transition
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
            </div>


            {/* Категория */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Относится
                </label>

                <LiveSelect
                    type="category"
                    placeholder="Выберите категорию..."
                    onChange={(e) => {
                        setSearchForm({
                            ...searchForm,
                            category_id: e?.value || "",
                        });
                    }}
                />
            </div>


            {/* Форма документа */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Форма документа
                </label>

                <LiveSelect
                    type="menu"
                    placeholder="Выберите форму..."
                    onChange={(e) => {
                        setSearchForm({
                            ...searchForm,
                            menu_id: e?.value || "",
                        });
                    }}
                />
            </div>


            {/* Тип */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус
                </label>

                <select
                    name="status"
                    value={searchForm.status}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded
                        px-3
                        py-2.5
                        bg-white
                        transition
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                >
                    <option value="">
                        Все
                    </option>
                    <option value="active">     
                        Действующие
                    </option>
                    <option value="passive">
                        Утративший силу
                    </option>
                </select>
            </div>
            {/* Дата */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата документа
                </label>
                <input
                    type="date"
                    name="date"
                    value={searchForm.date}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded
                        px-3
                        py-2.5
                        bg-white
                        transition
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
            </div>
            {/* Кнопки */}
            <div className="md:col-span-2 lg:col-span-3 flex gap-2">
                <button
                    type="submit"
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-5
                        py-2.5
                        rounded
                        transition
                        shadow-sm
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    Найти 
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const emptyForm = {
                            number: "",
                            title: "",
                            category_id: "",
                            menu_id: "",
                            type: "",
                            date: "",
                        };
                        setSearchForm(emptyForm);
                        router.get('/documents');
                    }}
                    className="
                        flex
                        items-center
                        justify-center
                        px-5
                        py-2.5
                        rounded
                        border
                        border-gray-300
                        bg-gray-100
                        hover:bg-gray-200
                        text-gray-700
                        transition
                    "
                >
                    Сбросить
                </button>
            </div>
        </form>
    );
}