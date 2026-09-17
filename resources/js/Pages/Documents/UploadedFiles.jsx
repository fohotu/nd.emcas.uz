import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Upload from "rc-upload";
import axios from "axios";

function UploadedFiles(props) {
    const { activeModel, downloadFile } = props;
    const { csrf_token } = usePage().props;

    const [dataFiles, setDataFiles] = useState([]);

    useEffect(() => {
        setDataFiles(activeModel?.files || []);
    }, [activeModel]);

    const uploadProps = {
        name: "decision-document",

        withCredentials: true,

        data: {
            _token: csrf_token,
            object_id: activeModel?.id,
            object_type: "document",
        },

        onStart: function () {
            console.log("start");
        },

        onSuccess: function (result) {
            setDataFiles((prev) => [...prev, result]);
        },

        onError: function (err) {
            console.error(err);
        },

        action: "/file/upload",

        multiple: true,
    };

    const deleteFile = (file) => {
        axios.post("/file/remove", file).then((response) => {
            if (response.data.message === "success") {
                setDataFiles((prev) =>
                    prev.filter((item) => item.id !== file.id)
                );
            }
        });
    };

    return (
        <div>
            {/* Upload */}
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

            {/* Files */}
            {dataFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                    {dataFiles.map((file, index) => (
                        <div
                            key={`${file.file_name}-${index}`}
                            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
                        >
                            {/* File name */}
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

                            {/* Actions */}
                            <div className="ml-3 flex shrink-0 items-center gap-1">

                                {/* Download */}
                                <button
                                    type="button"
                                    onClick={() => downloadFile(file)}
                                    title="Скачать"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
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

                                {/* Delete */}
                                <button
                                    type="button"
                                    onClick={() => deleteFile(file)}
                                    title="Удалить"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
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
    );
}

export default UploadedFiles;