import React from 'react';
import { useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

function AddTag({ setCreateModal }) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError
    } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(route('tags.store'), data)
            .then((res) => {
                if (res.data.success) {
                    reset();
                    setCreateModal(false);
                    router.reload();

                    Swal.fire({
                        icon: 'success',
                        title: 'Tag created',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Tag Created Error',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            })
            .catch((error) => { 
                if (error.response?.status === 422) { 
                    const serverErrors = error.response.data.errors; 
                    Object.keys(serverErrors).forEach((field) => { 
                        setError(field, serverErrors[field][0]); 
                    }); 
                    return; 
                } 
                Swal.fire(
                    { 
                        icon: 'error', 
                        title: 'Tag Created Error', 
                        timer: 1500, 
                        showConfirmButton:false, 
                    }
                ); 
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
                            d="M12 5v14M5 12h14"
                        />
                    </svg>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Создание тега
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Введите название нового тега.
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
                    onClick={() => setCreateModal(false)}
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

export default AddTag;

