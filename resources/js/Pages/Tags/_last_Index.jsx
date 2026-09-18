import React, { useState,useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import AddTag from './AddTag';
import EditTag from './EditTag';
import TagDocuments from './TagDocuments';
function Index({tags}) {
    
    const [createModal,setCreateModal] = useState(false);
    const [documentsOfTag,setDocumentsOfTag] = useState(null);
    const [selected,setSlected] = useState(null);

    const [selectedIds, setSelectedIds] = useState([]);

     const toggleAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(tags?.data.map(m => m.id));
        } else {
            setSelectedIds([]);
        }
    };
    const removeTag = (tag) => {
        axios.delete(route('tags.remove'), {
            data: {
                tag_id: tag.id
            }
        })
        .then((res) => {
            if (res.data.success) {
                router.reload();
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const removeSelected = () => {
    
            Swal.fire({
                title: 'Вы уверены?',
                text: `Вы не сможете восстановить этих ${selectedIds.length} меню!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Да, удалить!',
                cancelButtonText: 'Отмена'
            }).then((result) => {
    
                if (result.isConfirmed) {

                    axios.delete(route('tags.bulk-delete'), {
                        data: {
                            ids: selectedIds
                        }
                    })
                    .then(() => {
                        //let filteredDocument = tags?.data?.filter(m => !selectedIds.includes(m.id));
                      //  setDocumentsList(filteredDocument);

                      //tags.data = filteredDocument;
    
                  
    
                        setSelectedIds([]);
                        router.reload();
                        Swal.fire({
                            title:'Удалено!',
                            text:`${selectedIds.length} меню были удалены.`,  
                            icon:'success',
                            timer:1500,
                            showConfirmButton:false,
                        })
                    })
                    .catch(error => {
                        console.error("Ошибка при удалении", error);
                    });
                }
            });
        };

    return (
        <AuthenticatedLayout>
            <Modal show={createModal} onClose={()=>setCreateModal(false)}>
                <div className="p-5">
                    <AddTag setCreateModal={setCreateModal} />
                </div>
            </Modal>
            <Modal maxWidth="6xl" show={documentsOfTag} onClose={()=>setDocumentsOfTag(null)}>
                <div className="p-5">
                    <TagDocuments data={documentsOfTag} />
                </div>
            </Modal>
            <Modal show={selected} onClose={()=>setSlected(null)}>
                <EditTag tag={selected} setEditModal={setSlected} />
            </Modal>
            <div>
                <button
                    type="button"
                    onClick={() => setCreateModal(true)}
                    className="
                        inline-flex items-center gap-2
                        rounded-md
                        bg-blue-600
                        px-4 py-2
                        text-sm font-semibold text-white
                        shadow-sm
                        transition-all
                        hover:bg-blue-700
                        hover:shadow
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        cursor-pointer
                    "
                >
                    <span className="text-lg leading-none">+</span>
                    Add
                </button>
            </div>
            {selectedIds.length > 0 && (
                <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded px-4 py-3">
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span className="text-sm font-medium text-gray-700">
                            Выбрано записей:
                            <span className="ml-1 font-bold text-blue-600">
                                {selectedIds.length}
                            </span>
                        </span>
                    </div>

                    <div className="flex gap-2">

                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                            Снять выделение
                        </button>

                        <button
                            type="button"
                            onClick={removeSelected}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            🗑 Удалить выбранные
                        </button>

                    </div>
                </div>
            )}  
            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                 <th className="w-12 px-4 py-3 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={
                                            selectedIds.length === tags?.data.length &&
                                            tags?.data.length > 0
                                        }
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="px-4 py-3 font-semibold text-gray-700">
                                    #
                                </th>
                                <th className="px-4 py-3 font-semibold text-gray-700">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tags?.data?.map((tag, index) => (
                                <tr
                                    key={tag.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked = {selectedIds.includes(tag.id)}
                                        onChange = {() => {
                                            if (selectedIds.includes(tag.id)){
                                                setSelectedIds(
                                                    selectedIds.filter(id => id !== tag.id)
                                                );
                                            } else {
                                                setSelectedIds([...selectedIds, tag.id]);
                                            }
                                        }}
                                    />
                                </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        <button
                                            type="button"
                                            className="
                                                inline-flex items-center justify-center
                                                min-w-8 h-8 px-2
                                                rounded-full
                                                bg-blue-50 text-blue-600
                                                border border-blue-200
                                                text-sm font-semibold
                                                hover:bg-blue-100 hover:text-blue-700
                                                transition-colors
                                                cursor-pointer
                                            "
                                            onClick={()=>setDocumentsOfTag(tag)}
                                        >
                                            {tag.documents?.length ?? 0}
                                        </button>

                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {tag.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {/* Edit */}
                                            <button
                                                type="button"
                                                onClick={() => setSlected(tag)}
                                                className="
                                                    inline-flex items-center justify-center
                                                    w-8 h-8
                                                    rounded-md
                                                    text-blue-500
                                                    hover:bg-blue-50
                                                    hover:text-blue-700
                                                    transition
                                                "
                                                title="Edit"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 3.487a2.1 2.1 0 013.65 2.1L8.5 17.6l-4.5 1 1-4.5L16.862 3.487z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.5 5l3.5 3.5"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Delete */}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="
                                                    inline-flex items-center justify-center
                                                    w-8 h-8
                                                    rounded-md
                                                    text-red-500
                                                    hover:bg-red-50
                                                    hover:text-red-700
                                                    transition
                                                "
                                                title="Delete"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10zM10 11v5M14 11v5"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {(!tags || tags.length === 0) && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-4 py-8 text-center text-gray-400"
                                    >
                                        No tags found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                            
                   
            </div>

            <div className="flex items-center gap-1 my-5">
                        {tags?.links?.map((item, index) => {
            
                        const label = item.label
                            .replace("&laquo; Previous", "«")
                            .replace("Next &raquo;", "»");
            
                        return (
                            <Link
                                key={index}
                                href={item.url || "#"}
                                preserveScroll
                                className={`
                                    min-w-[38px]
                                    h-[38px]
                                    flex
                                    items-center
                                    justify-center
                                    border
                                    rounded
                                    transition
                                    ${
                                        item.active
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : item.url
                                                ? "bg-white hover:bg-gray-100 text-gray-700"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    }
                                `}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: label,
                                    }}
                                />
                            </Link>
                        );
                    })}
            </div>
        </AuthenticatedLayout>

    )

}

export default Index