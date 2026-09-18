import React from 'react';
import { useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

function EditTag({ tag, setEditModal }) {

    const {
        data,
        setData,
        processing,
        errors,
        reset
    } = useForm({
        name: tag?.name || '',
    });

    const handleSubmit = (e) => {
      
        e.preventDefault();

        axios.put(route('tags.update', tag.id), data)
            .then((res) => {
                if (res.data.success===true) {
                     
                    reset();
                    setEditModal(null);
                    router.reload();

                    Swal.fire({
                        icon: 'success',
                        title: 'Tag updated',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } else {
                     
                    Swal.fire({
                        icon: 'error',
                        title: 'Tag Update Error',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            })
            .catch((error) => {
                

                Swal.fire({
                    icon: 'error',
                    title: 'Tag Update Error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            });
    };

    const inputClass = `
        mt-2
        block
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
        block
        text-sm
        font-medium
        text-gray-700
    `;

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-sm sm:p-7"
        >
            {/* Header */}
            <div className="mb-7 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 3.5a2.121 2.121 0 013 3L12 16l-4 1 1-4 9.5-9.5z"
                        />
                    </svg>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Редактирование тега
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Измените название существующего тега.
                    </p>
                </div>
            </div>

            {/* Tag name */}
            <div>
                <label
                    htmlFor="name"
                    className={labelClass}
                >
                    Название <span className="text-red-500">*</span>
                </label>

                <input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Введите название тега"
                    className={inputClass}
                />

                {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="mt-7 flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-50
                        hover:text-gray-800
                    "
                >
                    Отмена
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="
                        inline-flex
                        items-center
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
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
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
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3z"
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
                                    strokeWidth="1.8"
                                    d="M5 12.5l4.5 4.5L19 7.5"
                                />
                            </svg>

                            Сохранить
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default EditTag;

