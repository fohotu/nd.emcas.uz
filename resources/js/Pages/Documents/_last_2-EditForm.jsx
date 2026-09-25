import { useForm, usePage } from "@inertiajs/react";
import Editor from "@/Components/Editor";
import Upload from "rc-upload";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Swal from "sweetalert2";

export default function EditForm(props) {
    const { activeModel, onSuccessHandler, downloadFile } = props;

    const { csrf_token } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        title: activeModel?.title,
        number: activeModel?.number,
        category_id: activeModel?.category_id,
        version_for: activeModel?.version_for,
        status: activeModel?.status,
        description: activeModel?.description,
        language: activeModel?.language,
        document_date: activeModel?.document_date,
        files: activeModel?.files,
        versions: activeModel?.versions,
    });

    useEffect(() => {
        setData({
            title: activeModel?.title,
            number: activeModel?.number,
            category_id: activeModel?.category_id,
            menu_id: activeModel?.category?.menu?.id,
            version_for: activeModel?.version_for,
            status: activeModel?.status,
            description: activeModel?.description,
            language: activeModel?.language,
            document_date: activeModel?.document_date,
            files: activeModel?.files,
            category: activeModel?.category,
            menu: activeModel?.category?.menu,
            versions: activeModel?.versions,
        });
    }, []);

    const [uploadedError, setUploadedError] = useState([]);
    const [categoryLoaded, setCategoryLoad] = useState([]);

    const getdataList = (input) => {
        return axios
            .get(`/document/live-search?q=${input}`)
            .then((response) => {
                return response.data.map((item) => ({
                    value: item.id,
                    label: item.number
                        ? `${item.number} ${item.title || ""}`
                        : item.title || "",
                }));
            });
    };

    const getMenuList = (input) => {
        return axios
            .get(`/menu/live-search?q=${input}`)
            .then((response) => {
                return response.data.data.map((item) => ({
                    value: item.id,
                    label: item.title || "",
                }));
            });
    };

    const getCategoryByMenu = (menuId) => {
        return axios
            .get(`/category/by-menu?menu_id=${menuId}`)
            .then((response) => {
                return response.data.data.map((item) => ({
                    value: item.id,
                    label: item.title || "",
                }));
            });
    };

    const uploadProps = {
        name: "decision-document",

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
                    (item) => item.id != file.id
                );

                setData({
                    ...data,
                    files: files,
                });
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("documents.update", activeModel.id), {
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
        "mb-2 block text-sm font-medium text-gray-700";

    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: "42px",
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
            padding: "2px 12px",
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
                : "#fff",
            color: state.isSelected
                ? "#fff"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.8}
                                d="M16.5 3.5a2.121 2.121 0 013 3L11 15l-4 1-4-1 1-4 8.5-8.5z"
                            />
                        </svg>
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Редактирование документа
                        </h1>

                        <p className="mt-0.5 text-sm text-gray-400">
                            Изменение информации о документе
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="p-6">

                    {/* Название */}
                    <div className="mb-5">
                        <label className={labelClass}>
                            Название
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) =>
                                setData("title", e.target.value)
                            }
                            className={inputClass}
                        />

                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Номер + Меню */}
                    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className={labelClass}>
                                Номер
                            </label>

                            <input
                                type="text"
                                value={data.number}
                                onChange={(e) =>
                                    setData("number", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Относится к
                            </label>

                            <AsyncSelect
                                isClearable
                                value={
                                    data?.menu
                                        ? {
                                              value: data.menu.id,
                                              label: data.menu.title,
                                          }
                                        : null
                                }
                                onChange={(e) => {
                                    if (e) {
                                        setData({
                                            ...data,
                                            menu_id: e.value,
                                            category_id: "",
                                            menu: {
                                                ...data.menu,
                                                id: e.value,
                                                title: e.label,
                                            },
                                            category: null,
                                        });

                                        getCategoryByMenu(e.value).then(
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
                                loadOptions={getMenuList}
                                placeholder="Выберите меню..."
                                allowCreateWhileLoading
                                createOptionPosition="first"
                                styles={selectStyles}
                            />
                        </div>
                    </div>

                    {/* Категория + Версия */}
                    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className={labelClass}>
                                Форма документа
                            </label>

                            <Select
                                options={categoryLoaded}
                                isClearable
                                value={
                                    data?.category
                                        ? {
                                              value: data.category.id,
                                              label: data.category.title,
                                          }
                                        : null
                                }
                                onChange={(e) => {
                                    if (e) {
                                        const c_d = {
                                            id: e.value,
                                            title: e.label,
                                        };

                                        setData({
                                            ...data,
                                            category: c_d,
                                            category_id: e.value,
                                        });
                                    }
                                }}
                                placeholder="Выберите категорию..."
                                styles={selectStyles}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Версия документа
                            </label>

                            <AsyncSelect
                                isClearable
                                value={
                                    data?.versions
                                        ? {
                                              value: data.versions.id,
                                              label: `${data.versions.number || ""} (${data.versions.title || ""})`,
                                          }
                                        : null
                                }
                                onChange={(e) => {
                                    if (e) {
                                        setData({
                                            ...data,
                                            version_for: e.value,
                                            versions: {
                                                ...data.versions,
                                                id: e.value,
                                                title: e.label,
                                            },
                                        });
                                    }
                                }}
                                loadOptions={getdataList}
                                placeholder="Выберите документ..."
                                allowCreateWhileLoading
                                createOptionPosition="first"
                                styles={selectStyles}
                            />
                        </div>
                    </div>

                    {/* Статус + Язык + Дата */}
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
                                <option value="formation">
                                    Formation
                                </option>

                                <option value="active">
                                    Active
                                </option>

                                <option value="archive">
                                    Archive
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
                        </div>

                        <div>
                            <label className={labelClass}>
                                Дата документа
                            </label>

                            <input
                                type="date"
                                value={
                                    data.document_date
                                        ? data.document_date.substring(
                                              0,
                                              10
                                          )
                                        : ""
                                }
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

                    {/* Описание */}
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
                    </div>

                    {/* Файлы */}
                    <div className="mb-5">
                        <label className={labelClass}>
                            Файлы
                        </label>

                        <Upload {...uploadProps}>
                            <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50/30">

                                <svg
                                    className="mx-auto h-9 w-9 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
                                    />
                                </svg>

                                <p className="mt-2 text-sm font-medium text-gray-700">
                                    Нажмите для выбора файлов
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    PDF, DOCX, XLSX, JPG, PNG
                                </p>
                            </div>
                        </Upload>

                        {data?.files?.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {data.files.map((file, index) => (
                                    <div
                                        key={`${file.file_name}-${index}`}
                                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <svg
                                                className="h-4 w-4 shrink-0 text-gray-400"
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

                                            <span className="truncate text-sm text-gray-700">
                                                {file.file_name}
                                            </span>
                                        </div>

                                        <div className="ml-3 flex shrink-0 gap-1">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    downloadFile(file)
                                                }
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50"
                                                title="Скачать"
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
                                                        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                                                    />
                                                </svg>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteFile(file)
                                                }
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
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
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            {processing
                                ? "Сохранение..."
                                : "Сохранить"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}