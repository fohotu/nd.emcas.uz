import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrubs from "./BreadCrubs";
import DOMPurify from "dompurify";


function InfoItem({ label, value }) {
    return (
        <div className="border-t border-gray-200 px-1 py-4 dark:border-gray-700">
            <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {label}
            </div>

            <div className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                {value || "—"}
            </div>
        </div>
    );
}

function Show({ document }) {
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

            passive: {
                title: "Неактивный",
                className:
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-gray-300",
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

    <div className="mx-auto  py-6">
        <div className="overflow-hidden rounded border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {/* HEADER */}
            <div className="border-b border-gray-200 px-6 py-6 dark:border-gray-700 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Документ
                            </span>
                            <span
                                className={`inline-flex rounded px-3 py-1 text-xs font-semibold ${status.className}`}
                            >
                                {status.title}
                            </span>
                        </div>
                        <h1 className="text-xl font-semibold leading-relaxed text-gray-900 dark:text-white md:text-2xl">
                            {document?.title}
                        </h1>
                        {document?.number && (
                            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                Номер документа:
                                <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                                    {document.number}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* LEFT */}
                <div className="border-b border-gray-200 p-6 dark:border-gray-700 md:p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
                    {/* DESCRIPTION */}
                    <section>
                        <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
                            Описание документа
                        </h2>

                        {document?.description ? (
                            <div
                                className="
                                    prose
                                    max-w-none
                                    prose-gray
                                    prose-sm
                                    dark:prose-invert
                                "
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        document.description
                                    ),
                                }}
                            />
                        ) : (
                            <div className="rounded-xl border border-dashed border-gray-300 px-5 py-8 text-center text-sm text-gray-400 dark:border-gray-600">
                                Описание отсутствует
                            </div>
                        )}
                    </section>

                    {/* FILES */}
                    <section className="mt-10 border-t border-gray-100 pt-8 dark:border-gray-700">
                        <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
                            Прикреплённые файлы
                        </h2>

                        {document?.files?.length ? (
                            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                                {document.files.map((file) => (
                                    <div
                                        key={file.id}
                                        className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
                                    >
                                        <div className="min-w-0">
                                            <div className="truncate font-medium text-gray-900 dark:text-white">
                                                {file.file_name || "Файл"}
                                            </div>

                                            {file.size && (
                                                <div className="mt-1 text-xs text-gray-400">
                                                    {file.size}
                                                </div>
                                            )}
                                        </div>

                                        {file.file_link && (
                                            <a
                                                href={`/storage/${file.file_link}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="
                                                    shrink-0
                                                    rounded-lg
                                                    border
                                                    border-gray-200
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-gray-700
                                                    transition
                                                    hover:border-gray-300
                                                    hover:bg-gray-100
                                                    dark:border-gray-600
                                                    dark:text-gray-300
                                                    dark:hover:bg-gray-700
                                                "
                                            >
                                                Открыть
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-gray-300 px-5 py-8 text-center text-sm text-gray-400 dark:border-gray-600">
                                Нет прикреплённых файлов
                            </div>
                        )}
                    </section>
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="bg-gray-50/70 p-6 dark:bg-gray-800 md:p-8">
                    <h2 className="mb-6 text-base font-semibold text-gray-900 dark:text-white">
                        Информация
                    </h2>

                    <div className="space-y-1">
                        <InfoItem
                            label="Номер"
                            value={document?.number}
                        />

                        <InfoItem
                            label="Относится к"
                            value={
                                document?.menu?.title ||
                                document?.menu_id
                            }
                        />

                        <InfoItem
                            label="Форма документа"
                            value={
                                document?.category?.title ||
                                document?.category_id
                            }
                        />

                        <InfoItem
                            label="Язык"
                            value={formatLanguage(document?.language)}
                        />

                        <InfoItem
                            label="Дата документа"
                            value={document?.document_date}
                        />

                        <div className="border-t border-gray-200 px-1 py-4 dark:border-gray-700">
                            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                                Статус
                            </div>

                            <span
                                className={`inline-flex rounded px-3 py-1 text-xs font-semibold ${status.className}`}
                            >
                                {status.title}
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
  )
}

export default Show