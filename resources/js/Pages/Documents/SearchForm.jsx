import React from "react";
import LiveSelect from "./LiveSelect";
import { router } from "@inertiajs/react";

export default function SearchForm({
    filter,
    onSearch,
    setSearchForm,
    searchForm,
}) {
    const handleChange = (e) => {
        setSearchForm({
            ...searchForm,
            [e.target.name]: e.target.value,
        });
    };

    const inputClass = `
        w-full
        rounded-lg
        border
        border-gray-200
        bg-white
        px-3.5
        py-2.5
        text-sm
        text-gray-700
        outline-none
        transition
        placeholder:text-gray-400
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-50
    `;

    const labelClass = `
        mb-2
        block
        text-sm
        font-medium
        text-gray-700
    `;

    return (
        <form
            onSubmit={onSearch}
            className="grid grid-cols-1 items-end gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
            {/* Номер */}
            <div>
                <label className={labelClass}>
                    Номер
                </label>

                <input
                    type="text"
                    name="number"
                    value={searchForm.number}
                    onChange={handleChange}
                    placeholder="Введите номер..."
                    className={inputClass}
                />
            </div>

            {/* Заголовок */}
            <div>
                <label className={labelClass}>
                    Заголовок
                </label>

                <input
                    type="text"
                    name="title"
                    value={searchForm.title}
                    onChange={handleChange}
                    placeholder="Введите заголовок..."
                    className={inputClass}
                />
            </div>

            {/* Категория */}
            <div>
                <label className={labelClass}>
                    Категория
                </label>

                <LiveSelect
                    type="category"
                    placeholder="Выберите категорию..."
                    onChange={(option) => {
                        setSearchForm({
                            ...searchForm,
                            category_id: option?.value || "",
                        });
                    }}
                />
            </div>

            {/* Меню */}
            <div>
                <label className={labelClass}>
                    Меню
                </label>

                <LiveSelect
                    type="menu"
                    placeholder="Выберите меню..."
                    onChange={(option) => {
                        setSearchForm({
                            ...searchForm,
                            menu_id: option?.value || "",
                        });
                    }}
                />
            </div>

            {/* Статус */}
            <div>
                <label className={labelClass}>
                    Статус
                </label>

                <select
                    name="status"
                    value={searchForm.status}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="">Все</option>

                    <option value="active">
                        Действующие
                    </option>

                    <option value="passive">
                        Утратившие силу
                    </option>
                </select>
            </div>

            {/* Дата */}
            <div>
                <label className={labelClass}>
                    Дата документа
                </label>

                <input
                    type="date"
                    name="date"
                    value={searchForm.date}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>

            {/* Кнопки */}
            <div className="flex gap-2 md:col-span-2 lg:col-span-3">
                {/* Поиск */}
                <button
                    type="submit"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        shadow-sm
                        transition
                        hover:bg-blue-700
                        focus:outline-none
                        focus:ring-4
                        focus:ring-blue-100
                    "
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                    </svg>

                    Найти
                </button>

                {/* Сброс */}
                <button
                    type="button"
                    onClick={() => {
                        const emptyForm = {
                            number: "",
                            title: "",
                            category_id: "",
                            menu_id: "",
                            type: "",
                            status: "",
                            date: "",
                        };

                        setSearchForm(emptyForm);
                        router.get("/documents");
                    }}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-50
                        hover:text-gray-800
                    "
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M4 4v5h5M20 20v-5h-5M5.5 9A7 7 0 0 1 18 6.5L20 9M18.5 15A7 7 0 0 1 6 17.5L4 15"
                        />
                    </svg>

                    Сбросить
                </button>
            </div>
        </form>
    );
}