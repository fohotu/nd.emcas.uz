import React,{ useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm,Link,router } from '@inertiajs/react';
import SearchForm from './SearchForm';
import Modal from '@/Components/Modal';
import UploadFile from '@/Components/UploadFile';
import EditForm from './EditForm';
import Swal from 'sweetalert2';
import CreateForm from './CreateForm';
import UploadedFiles from './UploadedFiles';
import BreadCrubs from './BreadCrubs';

function  Index({ auth, documents,filter,query}) {

        console.log(filter,query);
    
     // Форма для создания нового документа через Action
        const { data, setData, post, processing, reset, errors } = useForm({
            title: '',
            description: '',
        });

        const [searchForm,setSearchForm] = useState(
            {
                number: query['number'] ?? "",
                title: query['title'] ?? "",
                category_id: query['category_id'] ?? "",
                menu_id: query['menu_id'] ?? "",
                type: query['type'] ?? "",
                status:query['status'] ?? "",
                date: query['date'] ?? "",
            }
        )
    
        const [documentsList, setDocumentsList] = useState([]);
    
        const [activeModel,setActiveModel] = useState(null);

        const [selectedIds, setSelectedIds] = useState([]);
    
        useEffect(() => {
            setDocumentsList(documents.data);
        }, []);
    
        const submit = (e) => {
            e.preventDefault();
            post(route('documents.store'), {
                onSuccess: () => reset(),
            });
        };
    
    
    
    
        const handleDelete = (id) => {
            console.log(id);
            Swal.fire({
                title: 'Вы уверены?',
                text: "Вы не сможете восстановить этот документ!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Да, удалить!',
                cancelButtonText: 'Отмена'
            }).then((result) => {
    
                if (result.isConfirmed){
    
                    router.delete(route('documents.destroy', id), {
                        onSuccess: () => {
                            Swal.fire({
                                title: 'Удалено!',
                                text: 'Документ был удален.',
                                icon: 'success',
                                timer: 2000,
                            });
    
    
                           router.visit(window.location.pathname);
    
                        }
                    });
                }
            });
        }
    
    
    
         const onSuccessCreate = () => {
            setShowCreateModal(false);
            Swal.fire({
                title:'Успешно!',
                text:'Документ успешно сохранён в системе.',
                icon:'success',
                timer:2000,
            })
            router.visit(window.location.pathname);
        }
    
         const onSuccessEdit = () => {
            setShowEditModal(false);
            Swal.fire({
                title:'Успешно!',
                text:'Документ успешно сохранён в системе.',
                icon:'success',
                timer:2000,
            })
            router.visit(window.location.pathname);
        }
    

    const downloadFile = (file) => {
      
        axios.get(`file/download-link/${file.id}`)
            .then((response) => {
                const link = document.createElement('a');

                link.href = response.data;
                console.log(response.data);
                link.download = file.file_name || 'download';

                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const toggleAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(documentsList?.map(m => m.id));
        } else {
            setSelectedIds([]);
        }
    };
    
    const [showEditModal, setShowEditModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);


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
                axios.post('/documents/bulk-delete', { ids: selectedIds })
                .then(() => {
                    let filteredDocument = documents?.data?.filter(m => !selectedIds.includes(m.id));
                    setDocumentsList(filteredDocument);

              

                    setSelectedIds([]);
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

    const  breadcrumb = [
        { title: "Панель управления",href: 'dashboard' },
        { title: "Документы" },
    ];

    function handleSearch(e){
        e.preventDefault();
        router.get('/documents',searchForm,{
            onSuccess: (res) => {
                console.log(res);
            },
        })
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Документы
                </h2>
            }
        >

            <Head title="Документы" />

            {/* Create Modal */}
            <Modal
                maxWidth="5xl"
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            >
                <CreateForm
                    onSuccessHandler={onSuccessCreate}
                    categories={filter.categories.data}
                    downloadFile={downloadFile}
                />
            </Modal>


            {/* Edit Modal */}
            <Modal
                maxWidth="5xl"
                title="Редактировать документ"
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
            >
                <div className="p-4">
                    <EditForm
                        activeModel={activeModel}
                        onSuccessHandler={onSuccessEdit}
                        downloadFile={downloadFile}
                    />
                </div>
            </Modal>


            {/* Upload Modal */}
            <Modal
                title="Загрузить файл"
                show={showUploadModal}
                onClose={() => setShowUploadModal(false)}
            >
                <div className="p-4">
                    <UploadedFiles 
                        activeModel={activeModel} 
                        downloadFile={downloadFile}
                    />
                </div>
            </Modal>

            <BreadCrubs items={breadcrumb} />  

            <div className="py-12">

                <div className="">


                    {/* SEARCH */}
                    <div className="bg-white border rounded shadow-sm p-6 mb-6">

                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Поиск документов
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Используйте фильтры для поиска документов.
                                </p>
                            </div>

                        </div>

                        <SearchForm
                            filter={filter}
                            onSearch={handleSearch}
                            searchForm={searchForm}
                            setSearchForm={setSearchForm}
                        />

                    </div>


{/* CREATE BUTTON */}
<div className="mb-5">

    <button
        type="button"
        onClick={() => setShowCreateModal(true)}
        className="
            flex
            items-center
            gap-2
            px-3
            py-2
            border
            rounded
            bg-white
            hover:bg-gray-100
            active:bg-gray-200
            transition
        "
    >

        <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
            />
        </svg>

        <span>
            Создать
        </span>

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


{/* DOCUMENTS TABLE */}
<div className="bg-white border rounded shadow-sm overflow-hidden">

    <div className="overflow-x-auto">

        <table className="min-w-full">

            <thead className="bg-gray-100 border-b">

                <tr>

                    <th className="w-12 px-4 py-3 text-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={
                                selectedIds.length === documentsList?.length &&
                                documentsList?.length > 0
                            }
                            onChange={toggleAll}
                        />
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Номер
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Заголовок
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Относится
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Форма документа
                    </th>
                    
                            
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Создано
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Дата документа
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Действия
                    </th>

                </tr>

            </thead>


            <tbody className="divide-y divide-gray-100">

                {documentsList?.map((doc) => (

                    <tr
                        key={doc.id}
                        className="hover:bg-blue-50 transition-colors"
                    >

                        <td className="px-4 py-4 text-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked = {selectedIds.includes(doc.id)}
                                onChange = {() => {
                                    if (selectedIds.includes(doc.id)){
                                        setSelectedIds(
                                            selectedIds.filter(id => id !== doc.id)
                                        );
                                    } else {
                                        setSelectedIds([...selectedIds, doc.id]);
                                    }
                                }}
                            />
                        </td>

                        {/* Номер */}
                        <td className="px-4 py-4 text-sm text-gray-600">
                            {doc.number}
                        </td>


                        {/* Заголовок */}
                        <td className="px-4 py-4">

                            <div className="font-medium text-gray-800">
                                {doc.title}
                            </div>

                        </td>


                        {/* Категория / menu */}
                        <td className="px-4 py-4 text-sm text-gray-600">
                            {doc.category?.menu?.title || (
                                <span className="text-gray-400 italic">
                                    Не указано
                                </span>
                            )}
                        </td>


                        {/* Категория */}
                        <td className="px-4 py-4 text-sm text-gray-600">
                            {doc.category?.title || (
                                <span className="text-gray-400 italic">
                                    Не указано
                                </span>
                            )}
                        </td>


                        {/* Дата */}
                        <td className="px-4 py-4">

                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {new Date(
                                    doc.created_at
                                ).toLocaleDateString()}
                            </span>

                        </td>

                                  <td className="px-4 py-4">
                            { doc.document_date ?
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                    {
                                        new Date(
                                            doc.document_date
                                        ).toLocaleDateString()
                                    }
                                </span>
                            :""}

                        </td>


                        {/* ACTIONS */}
                        <td className="px-4 py-4">

                            <div className="flex justify-end gap-2">

                                {/* EDIT */}
                                <button
                                    title="Редактировать"
                                    onClick={() => {
                                        setActiveModel(doc);
                                        setShowEditModal(true);
                                    }}
                                    className="
                                        p-2
                                        rounded
                                        border
                                        border-blue-200
                                        text-blue-600
                                        hover:bg-blue-100
                                        transition
                                    "
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>

                                </button>


                                {/* UPLOAD */}
                                <button
                                    title="Загрузить файл"
                                    onClick={() => {
                                        setActiveModel(doc);
                                        setShowUploadModal(true);
                                    }}
                                    className="
                                        p-2
                                        rounded
                                        border
                                        border-yellow-200
                                        text-yellow-600
                                        hover:bg-yellow-100
                                        transition
                                    "
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                    </svg>

                                </button>


                                {/* DELETE */}
                                <button
                                    title="Удалить"
                                    onClick={() => handleDelete(doc.id)}
                                    className="
                                        p-2
                                        rounded
                                        border
                                        border-red-200
                                        text-red-600
                                        hover:bg-red-100
                                        transition
                                    "
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 011 1v3M4 7h16"
                                        />
                                    </svg>

                                </button>

                            </div>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

</div>


{/* PAGINATION */}
<div className="mt-6 flex items-center justify-between">

    <div className="text-sm text-gray-500">
        Всего записей: <b>{documents.total}</b>
    </div>


    <div className="flex items-center gap-1">

        {documents?.links?.map((link, index) => {

            const label = link.label
                .replace("&laquo; Previous", "«")
                .replace("Next &raquo;", "»");

            return (
                <Link
                    key={index}
                    href={link.url || "#"}
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
                            link.active
                                ? "bg-blue-600 border-blue-600 text-white"
                                : link.url
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

</div>


                </div>

            </div>

        </AuthenticatedLayout>
    );

}

export default Index