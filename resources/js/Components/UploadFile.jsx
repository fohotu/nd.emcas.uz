import { useRef } from "react";

export default function UploadFile({
    label = "Выберите файлы",
    files = [],
    onChange,
    accept = "*",
    error = null,
}) {
    const inputRef = useRef();

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files);

        onChange([...files, ...newFiles]);

        e.target.value = "";
    };

    const removeFile = (index) => {
        onChange(files.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div
                onClick={() => inputRef.current?.click()}
                className="
                    border-2 border-dashed border-gray-300
                    rounded-xl p-6
                    text-center cursor-pointer
                    hover:border-blue-500
                    transition
                "
            >
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={accept}
                    className="hidden"
                    onChange={handleFiles}
                />

                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
                    />
                </svg>

                <p className="mt-2 text-sm text-gray-600">
                    Нажмите для выбора файлов
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    PDF, DOCX, XLSX, JPG, PNG
                </p>
            </div>

            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="
                                flex items-center justify-between
                                rounded-lg border p-3
                                bg-gray-50
                            "
                        >
                            <div>
                                <div className="font-medium text-sm">
                                    {file.name}
                                </div>

                                <div className="text-xs text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="
                                    px-3 py-1
                                    text-sm
                                    text-red-600
                                    hover:bg-red-50
                                    rounded
                                "
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}