import React from 'react'
import { useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

function EditTag({ tag, setEditModal }) {

    const { data, setData, processing, errors, reset } = useForm({
        name: tag?.name || '',
    });

    const handleSubmit = (e) => {
        console.log(route('tags.update', tag.id));
        e.preventDefault();
        axios.put(route('tags.update', tag.id), data)
            .then((res) => {
                if (res.data.success) {
                    reset();
                    setEditModal(false);
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
                console.log(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Tag Update Error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Tag name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter tag name"
                        className="
                            w-full rounded-lg
                            border border-gray-300
                            px-3 py-2
                            text-sm
                            shadow-sm
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-100
                        "
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setEditModal(false)}
                        className="
                            rounded-lg
                            border border-gray-300
                            bg-white
                            px-4 py-2
                            text-sm font-medium text-gray-700
                            shadow-sm
                            transition
                            hover:bg-gray-50
                            active:scale-95
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            rounded-lg
                            bg-blue-600
                            px-4 py-2
                            text-sm font-medium text-white
                            shadow-sm
                            transition
                            hover:bg-blue-700
                            active:scale-95
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {processing ? 'Updating...' : 'Update Tag'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTag

