import React,{useState} from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BreadCrubs from "./BreadCrubs";
import DOMPurify from "dompurify";
import Modal from "@/Components/Modal";
import DocumentViewer from "@/Components/DocumentViewer";


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

    console.log(document);
    const breadcrumb = [
        {
            title: 'Главная страница',
            href: '/',
        },
        {
            title: 'Все документы',
            href:'/documents/all',
        },
        {
            title: document?.menu?.title,
            href:'/documents/menu/'+document?.menu?.id+'/category/'
        },
        {
            title: document?.category?.title,
            href:'/documents/menu/'+document?.menu?.id+'/category/'+document?.category?.id
        },
        {
            title: document?.title,
        },

    ];

    const [documentShow,setDocumentShow] = useState(false);

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

    const [selectedFile,setSelectedFile] = useState(null);
    /** Document View Modal */  
   
    const [viewerOpen, setViewerOpen] = useState(false); 
    const [viewerFile, setViewerFile] = useState(null); 
    const openDocument = (file) => { 
        let url  = `/file/view/${file.id}`;
        
        let title = file.file_name;

        setViewerFile({
            url,
            title,
        }); 
        setViewerOpen(true); 
    }; 
    const closeDocument = () => { 
        setViewerOpen(false); 
        setViewerFile(null); 
    };
    /** Document View Modal */

  return (
    <AuthenticatedLayout
    title={document?.title || "Просмотр документа"}
    description="Просмотр информации о документе"
>
    <BreadCrubs items={breadcrumb} />

    <Modal show={viewerOpen} maxWidth="full">
    <div className="w-[99vw] h-[95vh] max-w-none max-h-none">
        <DocumentViewer 
                        document={document}
                        open={viewerOpen} 
                        file={viewerFile?.url}
                        title={viewerFile?.title}
                        onClose={closeDocument}
        />   
    </div>
</Modal>



     <div className="mx-auto py-6">
    <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">

        {/* HEADER */}
        <div className="border-b border-gray-200 px-6 py-6 dark:border-gray-700 md:px-8">
            <div className="max-w-5xl">

                <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                        Документ
                    </span>

                    <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                        {status.title}
                    </span>
                </div>

             

            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">

            {/* MAIN CONTENT */}
            <main className="p-6 md:p-8 lg:col-span-2">

                {/* DESCRIPTION */}
                <section>
                    <div className="mb-5 flex items-center gap-3">
                        <h2 className="mb-4 text-sm font-normal text-gray-700 dark:text-gray-200">
                            Описание документа
                        </h2>
                    </div>

                    {document?.description ? (
                        <div
                            className="
                                prose
                                max-w-none
                                prose-sm
                                prose-gray
                                leading-7
                                dark:prose-invert
                            "
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    document.description
                                ),
                            }}
                        />
                    ) : (
                        <div className="rounded-lg border border-dashed border-gray-300 px-5 py-8 text-center text-sm text-gray-400 dark:border-gray-600">
                            Описание отсутствует
                        </div>
                    )}
                </section>

                {/* FILES */}
                <section className="mt-10">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="mb-4 text-sm font-normal text-gray-700 dark:text-gray-200">
                                Прикреплённые файлы  
                            </h2>
                        </div>

                        
                    </div>



                    {/** */}
                
{document?.files?.length ? (
    <div className="space-y-3">
        {document.files.map((file) => {
            const extension = (file.file_extension || "")
                .toLowerCase()
                .replace(".", "");

            const fileName = file.file_name || "Файл";

            const shortName =
                fileName.length > 5
                    ? `${fileName.substring(0, 5)}...${
                          extension ? `.${extension}` : ""
                      }`
                    : fileName;

            const isPdf = extension === "pdf";
            const isWord = ["doc", "docx"].includes(extension);

            const iconClass = isPdf
                ? "bg-red-600 text-white ring-red-900"
                : isWord
                    ? "bg-blue-600 text-white ring-blue-900"
                    : "bg-gray-600 text-white ring-gray-800";

            return (
                <div
                    key={file.id}
                    className="
                        flex
                        items-center
                        gap-5
                        border-gray-200
                        bg-white
                        px-5
                        py-4
                        transition
                       
                        
                    "
                >
                    {/* BIG FILE ICON */}
                    <div
                        className={`
                            flex
                            h-[72px]
                            w-[72px]
                            shrink-0
                            items-center
                            justify-center
                            rounded
                            ring-1
                            shadow-sm
                            ${iconClass}
                        `}
                    >
                       {extension}
                    </div>

                    {/* FILE INFORMATION */}
                    <div className="min-w-0 flex-1">
                        {/* NAME LABEL */}
                        <div className="text-xs font-medium text-gray-400 dark:text-gray-500">
                            Название файла
                        </div>

                        {/* FILE NAME */}
                        <div
                            className="mt-0.5 truncate text-sm font-medium text-gray-800 dark:text-gray-100"
                            title={fileName}
                        >
                            {shortName}
                        </div>

                        {/* CREATED DATE */}
                        <div className="mt-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                            Дата создания
                        </div>

                        <div className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                            {file.created_at
                                ? new Date(file.created_at).toLocaleDateString(
                                      "ru-RU"
                                  )
                                : "—"}
                        </div>

                        {/* BUTTONS */}
                        <div className="mt-3 flex items-center gap-2">
                            {/* DOWNLOAD */}
                            {file.file_link && (
                                <a
                                    href={`/storage/${file.file_link}`}
                                    download
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded
                                        border
                                        border-indigo-700
                                        bg-indigo-700
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        text-white
                                        transition
                                        hover:border-indigo-800
                                        hover:bg-indigo-800
                                        hover:text-white
                                        dark:border-indigo-800
                                        dark:bg-indigo-800
                                        dark:text-white
                                        dark:hover:border-indigo-900
                                        dark:hover:bg-indigo-900
                                        dark:hover:text-white
                                    "
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3v12"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m7 10 5 5 5-5"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 21h14"
                                        />
                                    </svg>

                                    Скачать
                                </a>
                            )}

                            {/* VIEW */}
                            <button
                                type="button"
                                onClick={() => {
                                   // setSelectedFile(file);
                                    openDocument(file);
                                 
                                }}
                                className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded
                                        border
                                        border-indigo-700
                                        bg-indigo-700
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        text-white
                                        transition
                                        hover:border-indigo-800
                                        hover:bg-indigo-800
                                        hover:text-white
                                        dark:border-indigo-800
                                        dark:bg-indigo-800
                                        dark:text-white
                                        dark:hover:border-indigo-900
                                        dark:hover:bg-indigo-900
                                        dark:hover:text-white
                                    "
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6-9.75-6-9.75-6z"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="2.5"
                                    />
                                </svg>

                                Посмотреть
                            </button>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
) : (
    <div className="rounded-lg border border-dashed border-gray-300 px-5 py-8 text-center text-sm text-gray-400 dark:border-gray-600">
        Нет прикреплённых файлов
    </div>
)}


                    {/** */}


                </section>
            </main>

            {/* INFORMATION */}
            <aside className="border-t border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/40 md:p-8 lg:border-l lg:border-t-0">

                <div className="mb-6">
                    <h2 className="text-base font-medium text-gray-900 dark:text-white">
                        Информация
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                        Основные сведения о документе
                    </p>
                </div>

                <div className="space-y-0">

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
                        <div className="mb-2 text-xs text-gray-400">
                            Статус
                        </div>

                        <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
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