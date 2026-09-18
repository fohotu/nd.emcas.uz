import React from 'react'
import { useForm,router } from '@inertiajs/react';
import Swal from 'sweetalert2';

function AddTag({setCreateModal}) {

    const { data, setData, post, processing, errors,reset } = useForm({
        name: '',
    }); 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(route('tags.store'), data)
        .then((res) => {
            if(res.data.success){
                reset();
                setCreateModal(false);
                router.reload();
                Swal.fire({
                    icon: 'success',
                    title: 'Tag created',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Tag Created Error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }       
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

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="
                        rounded-lg
                        bg-blue-600
                        px-4 py-2
                        text-sm font-medium text-white
                        shadow-sm
                        transition
                        hover:bg-blue-700
                        active:scale-95
                    "
                >
                    Add Tag
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddTag