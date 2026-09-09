import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrubs from "./BreadCrubs";
import DOMPurify from "dompurify";

function Show({ document }) {

    console.log("document", document);
    const breadcrumb = [
        {
            title: "Панель управления",
            href: "dashboard",
        },
        {
            title: document?.title,
        },
    ];

    const getStatus = (status) => {
        const statuses = {
            active: {
                title: "Активный",
                className:
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            },

            inactive: {
                title: "Неактивный",
                className:
                    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
            },

            draft: {
                title: "Черновик",
                className:
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
            },

            archived: {
                title: "Архив",
                className:
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            },
        };

        return (
            statuses[status] || {
                title: status || "Не указан",
                className:
                    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
            }
        );
    };

    function formatLanguage(language) {
        const languages = {
            uz: "Узбекский",
            ru: "Русский",
            en: "Английский",
        };

        return languages[language] || language || "Не указан";
    }

    const status = getStatus(document?.status);

    return (
        <AuthenticatedLayout
            title={document?.title || "Просмотр документа"}
            description="Просмотр информации о документе"
        >
            <BreadCrubs items={breadcrumb} />
            <div className="mx-auto py-6">
                {/* HEADER */}
                <div className="mb-6 rounded bg-white p-6 shadow-sm dark:bg-gray-800">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Документ
                                </span>

                                <span
                                    className={`rounded px-3 py-1 text-xs font-medium ${status.className}`}
                                >
                                    {status.title}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {document?.title}
                            </h1>

                            {document?.number && (
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    № {document.number}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-2">
                        {/* DESCRIPTION */}
                        <div className="rounded bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                                Описание
                            </h2>
                            {document?.description ? (
                                <div
                                    className="
                                        prose
                                        max-w-none
                                        prose-gray
                                        dark:prose-invert
                                    "
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            document.description
                                        ),
                                    }}
                                />
                            ) : (
                                <div className="rounded border border-dashed border-gray-300 p-6 text-center italic text-gray-400 dark:border-gray-600">
                                    Нет описания
                                </div>
                            )}
                        </div>
                        {/* FILES */}
                        <div className="mt-6 rounded bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                                Файлы
                            </h2>
                            {document?.files?.length ? (
                                <div className="space-y-3">
                                    {document.files.map((file) => (
                                        <div
                                            key={file.id}
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                rounded-lg
                                                border
                                                border-gray-200
                                                p-4
                                                dark:border-gray-700
                                            "
                                        >
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {file.file_name ||
                                                            "Файл"}
                                                    </div>
                                                    {file.size && (
                                                        <div className="text-sm text-gray-400">
                                                            {file.size}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {file.file_link && (
                                                <a
                                                    href={`/storage/${file.file_link}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                                        rounded
                                                        bg-blue-50
                                                        px-4
                                                        py-2
                                                        text-sm
                                                        font-medium
                                                        text-blue-600
                                                        transition
                                                        hover:bg-blue-100
                                                        dark:bg-blue-900/20
                                                        dark:text-blue-400
                                                    "
                                                >
                                                    Открыть
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded border border-dashed border-gray-300 p-6 text-center italic text-gray-400 dark:border-gray-600">
                                    Нет прикреплённых файлов
                                </div>
                            )}
                        </div>
                    </div>
                    {/* SIDEBAR */}
                    <div>
                        <div className="rounded bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                                Информация
                            </h2>
                            <div className="space-y-5">
                                {/* NUMBER */}
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Номер
                                    </div>
                                    <div className="mt-1 font-medium text-gray-900 dark:text-white">
                                        {document?.number || "—"}
                                    </div>
                                </div>
                                {/* MENU */}
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Относится к
                                    </div>
                                    <div className="mt-1 font-medium text-gray-900 dark:text-white">
                                        {document?.menu?.title ||
                                            document?.menu_id ||
                                            "—"}
                                    </div>
                                </div>
                                {/* CATEGORY */}
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Форма документа
                                    </div>
                                    <div className="mt-1 font-medium text-gray-900 dark:text-white">
                                        {document?.category?.title ||
                                            document?.category_id ||
                                            "—"}
                                    </div>
                                </div>
                                {/* LANGUAGE */}
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Язык
                                    </div>
                                    <div className="mt-1 font-medium text-gray-900 dark:text-white">
                                        {formatLanguage(document?.language)}
                                    </div>
                                </div>
                                {/* DATE */}
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Дата документа
                                    </div>
                                    <div className="mt-1 font-medium text-gray-900 dark:text-white">
                                        {document?.document_date || "—"}
                                    </div>
                                </div>
                                {/* STATUS */}
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Статус
                                    </div>
                                    <div className="mt-2">
                                        <span
                                            className={`inline-flex rounded px-3 py-1 text-sm font-medium ${status.className}`}
                                        >
                                            {status.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;