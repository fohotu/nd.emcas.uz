import React from "react";
import LiveSelect from "./LiveSelect";
import { router, usePage } from "@inertiajs/react";

export default function SearchForm({
    filter,
    onSearch,
    setSearchForm,
    searchForm,
    reloadUrl = "/favorites"
}) {
    const { translations } = usePage().props;

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
                    {translations.number}
                </label>

                <div className="relative">
                    <svg
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <input
                        type="text"
                        name="number"
                        value={searchForm.number}
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                    />
                </div>
            </div>

            {/* Заголовок */}
            <div>
                <label className={labelClass}>
                    {translations.title}
                </label>

               <div className="relative">
                    <svg
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <input
                        type="text"
                        name="title"
                        value={searchForm.title}
                        onChange={handleChange}
                        placeholder=""
                        className={`${inputClass} pl-10`}
                    />
                </div>
            </div>

            {/* Тег */}
            <div>
                <label className={labelClass}>
                    {translations.tag}
                </label>

                <LiveSelect
                    type="tag"
                    placeholder=""
                    value={searchForm.defaultTag}
                    onChange={(option) => {
                        setSearchForm({
                            ...searchForm,
                            defaultTag: option,
                            tag_id: option?.value || "",
                        });
                    }}
                />
            </div>

            {/* Описание */}
            <div>
                <label className={labelClass}>
                    {translations.description}
                </label>

                <input
                    type="text"
                    name="description"
                    value={searchForm.description}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>

            {/* Статус */}
            <div>
                <label className={labelClass}>
                    {translations.status}
                </label>

                <select
                    name="status"
                    value={searchForm.status}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="">
                        {translations.all_documents}
                    </option>

                    <option value="active">
                        {translations.active}
                    </option>

                    <option value="passive">
                        {translations.passive}
                    </option>
                </select>
            </div>

            {/* Дата */}
            <div>
                <label className={labelClass}>
                    {translations.document_date}
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
                    {translations.find}
                </button>

                {/* Сброс */}
                <button
                    type="button"
                    onClick={() => {
                        const emptyForm = {
                            number: "",
                            title: "",
                            tag_id: "",
                            description: "",
                            status: "",
                            date: "",
                        };

                        setSearchForm(emptyForm);
                        router.get(reloadUrl);
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

                    {translations.cancel}
                </button>
            </div>
        </form>
    );
}