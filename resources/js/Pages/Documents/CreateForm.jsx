import { useForm, usePage } from "@inertiajs/react";
import Editor from "@/Components/Editor";
import Upload from "rc-upload";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Swal from "sweetalert2";

export default function CreateForm(props) {
    const { categories = [], documents = [], onSuccessHandler } = props;

    const { csrf_token } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        number: "",
        reg_date: "",
        menu_id: "",
        category_id: "",
        version_for: "",
        status: "formation",
        type: "uz",
        added: "",
        system_date: "",
        description: "",
        let_comment: true,
        language: "uz",
        doc_date: "",
        document_date: "",
        files: [],
    });

    const [uploadedError, setUploadedError] = useState([]);
    const [categoryLoaded, setCategoryLoad] = useState([]);

    useEffect(() => {
        if (categories.length) {
            const options = categories.map((category) => ({
                label: category.title,
                value: category.id,
            }));

            setCategoryLoad(options);
        }
    }, [categories]);

    const getdataList = (input) => {
        return axios
            .get(`/document/live-search?q=${input}`)
            .then((response) =>
                response.data.map((item) => ({
                    value: item.id,
                    label: item.number
                        ? `${item.number} ${item.title || ""}`
                        : item.title || "",
                    status: item.status,
                }))
            );
    };

    const getMenuList = (input) => {
        return axios
            .get(`/menu/live-search?q=${input}`)
            .then((response) => response.data);
    };

    const getCategoryByMenu = (menuId) => {
        return axios
            .get(`/category/by-menu?menu_id=${menuId}`)
            .then((response) =>
                response.data.data.map((item) => ({
                    value: item.id,
                    label: item.title || "",
                }))
            );
    };

    const uploadProps = {
        name: "decision-document",

        onStart: function () {},

        withCredentials: true,

        data: {
            _token: csrf_token,
        },

        onSuccess: function (result) {
            setData({
                ...data,
                files: [...data.files, result],
            });
        },

        onError: function (err, response, file) {
            setUploadedError([...uploadedError, file]);
        },

        action: "/file/upload",

        multiple: true,
    };

    const deleteFile = (file) => {
        axios.post("/file/remove", file).then((response) => {
            if (response.data.message === "success") {
                const files = data.files.filter(
                    (item) => item.id !== file.id
                );

                setData({
                    ...data,
                    files,
                });
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("documents.store"), {
            onSuccess: () => {
                onSuccessHandler?.();
            },

            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Ошибка",
                    text: "Неправильное заполнение формы",
                });
            },
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

    const labelClass =
        "mb-1.5 block text-sm font-medium text-gray-700";

    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: "42px",
            height: "42px",
            borderRadius: "8px",
            borderColor: state.isFocused
                ? "#3b82f6"
                : "#e5e7eb",
            boxShadow: state.isFocused
                ? "0 0 0 4px rgba(59, 130, 246, 0.08)"
                : "none",
            "&:hover": {
                borderColor: "#3b82f6",
            },
        }),

        valueContainer: (provided) => ({
            ...provided,
            height: "42px",
            padding: "2px 12px",
        }),

        indicatorsContainer: (provided) => ({
            ...provided,
            height: "42px",
        }),

        placeholder: (provided) => ({
            ...provided,
            color: "#9ca3af",
            fontSize: "14px",
        }),

        singleValue: (provided) => ({
            ...provided,
            color: "#374151",
            fontSize: "14px",
        }),

        input: (provided) => ({
            ...provided,
            fontSize: "14px",
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#2563eb"
                : state.isFocused
                ? "#eff6ff"
                : "#ffffff",
            color: state.isSelected
                ? "#ffffff"
                : "#111827",
            cursor: "pointer",
            fontSize: "14px",
            padding: "9px 12px",
        }),

        menu: (provided) => ({
            ...provided,
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #f1f5f9",
            boxShadow:
                "0 10px 25px -5px rgba(0,0,0,0.08)",
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),
    };

    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                {/* Header */}
                <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.8}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Создание документа
                        </h1>

                        <p className="mt-0.5 text-sm text-gray-400">
                            Заполните информацию о новом документе
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="p-6">

                    {/* Title */}
                    <div className="mb-5">
                        <label className={labelClass}>
                            Название
                            <span className="ml-1 text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) =>
                                setData("title", e.target.value)
                            }
                            placeholder="Введите название документа..."
                            className={`${inputClass} ${
                                errors.title
                                    ? "border-red-400"
                                    : ""
                            }`}
                        />

                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Number + Menu */}
                    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className={labelClass}>
                                Номер
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                value={data.number}
                                onChange={(e) =>
                                    setData("number", e.target.value)
                                }
                                placeholder="Введите номер..."
                                className={`${inputClass} ${
                                    errors.number
                                        ? "border-red-400"
                                        : ""
                                }`}
                            />

                            {errors.number && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.number}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelClass}>
                                Меню
                            </label>

                            <AsyncSelect
                                loadOptions={getMenuList}
                                isClearable
                                placeholder="Выберите меню..."
                                onChange={(option) => {
                                    if (option) {
                                        setData({
                                            ...data,
                                            menu_id: option.value,
                                            category_id: "",
                                        });

                                        getCategoryByMenu(option.value).then(
                                            (categories) => {
                                                setCategoryLoad(categories);
                                            }
                                        );
                                    } else {
                                        setData({
                                            ...data,
                                            menu_id: "",
                                            category_id: "",
                                        });

                                        setCategoryLoad([]);
                                    }
                                }}
                                styles={selectStyles}
                            />
                        </div>
                    </div>

                    {/* Category + Version */}
                    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className={labelClass}>
                                Категория
                            </label>

                            <Select
                                options={categoryLoaded}
                                isClearable
                                placeholder="Выберите категорию..."
                                value={
                                    data.category_id
                                        ? categoryLoaded.find(
                                              (option) =>
                                                  option.value ===
                                                  data.category_id
                                          ) || null
                                        : null
                                }
                                onChange={(option) => {
                                    setData({
                                        ...data,
                                        category_id: option
                                            ? option.value
                                            : null,
                                    });
                                }}
                                styles={selectStyles}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Версия документа
                            </label>

                            <AsyncSelect
                                loadOptions={getdataList}
                                isClearable
                                placeholder="Выберите документ..."
                                onChange={(option) => {
                                    setData({
                                        ...data,
                                        version_for: option
                                            ? option.value
                                            : "",
                                    });
                                }}
                                styles={selectStyles}
                            />
                        </div>
                    </div>

                    {/* Status + Language + Date */}
                    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">

                        <div>
                            <label className={labelClass}>
                                Статус
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData(
                                        "status",
                                        e.target.value
                                    )
                                }
                                className={inputClass}
                            >
                                <option value="active">
                                    Действующие
                                </option>

                                <option value="passive">
                                    Утратившие силу
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>
                                Язык
                            </label>

                            <select
                                value={data.language}
                                onChange={(e) =>
                                    setData(
                                        "language",
                                        e.target.value
                                    )
                                }
                                className={inputClass}
                            >
                                <option value="uz">
                                    Uzbek
                                </option>

                                <option value="ru">
                                    Russian
                                </option>

                                <option value="en">
                                    English
                                </option>
                            </select>

                            {errors.language && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.language}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelClass}>
                                Дата документа
                            </label>

                            <input
                                type="date"
                                value={data.document_date}
                                onChange={(e) =>
                                    setData(
                                        "document_date",
                                        e.target.value
                                    )
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className={labelClass}>
                            Описание
                        </label>

                        <Editor
                            value={data.description}
                            onChange={(html) =>
                                setData("description", html)
                            }
                        />

                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Upload */}
                    <div className="mb-5">
                        <label className={labelClass}>
                            Файлы документа
                        </label>

                        <Upload {...uploadProps}>
                            <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50/30">

                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.7}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M12 12v8m0-8l-3 3m3-3l3 3"
                                        />
                                    </svg>
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-700">
                                    Нажмите для выбора файлов
                                </p>

                                <p className="mt-0.5 text-xs text-gray-400">
                                    PDF, DOCX, XLSX, JPG, PNG
                                </p>
                            </div>
                        </Upload>

                        {/* Uploaded files */}
                        {data.files.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {data.files.map((file, index) => (
                                    <div
                                        key={`${file.file_name}-${index}`}
                                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
                                    >
                                        <div className="flex min-w-0 items-center gap-2.5">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500">
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.7}
                                                        d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.7}
                                                        d="M14 3v6h6"
                                                    />
                                                </svg>
                                            </div>

                                            <span className="truncate text-sm text-gray-700">
                                                {file.file_name}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteFile(file)
                                            }
                                            className="ml-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                                            title="Удалить"
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
                                                    strokeWidth={1.8}
                                                    d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10zM10 11v5M14 11v5"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end border-t border-gray-100 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? (
                                <>
                                    <svg
                                        className="h-4 w-4 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.8}
                                            d="M5 12l4 4L19 6"
                                        />
                                    </svg>
                                    Сохранить
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}