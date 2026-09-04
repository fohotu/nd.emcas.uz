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



export default function Index({ auth, documents,filter }) {

    // Форма для создания нового документа через Action
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
    });

    const [documentsList, setDocumentsList] = useState([]);

    const [activeModel,setActiveModel] = useState(null);

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
                /*
                axios.delete(`/documents/${id}`)
                .then(() => {

                    Swal.fire({
                        title:'Удалено!',
                        text:'Документ был удален.',
                        icon:'success',
                        timer:2000,
                    })

                    let filteredDocs = documentsList.filter(doc => doc.id !== id);
                    setDocumentsList({...documents,...documentsList,data:filteredDocs});
                    
                    router.visit(window.location.pathname);


                })
                .catch(err => console.error(err));

                */
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


    const [showEditModal, setShowEditModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Документы</h2>}
        >
            <Head title="Documents" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Modal maxWidth = "5xl" show={showCreateModal} onClose={() => setShowCreateModal(false)}>
                        <CreateForm onSuccessHandler={onSuccessCreate} categories={filter.categories.data} />
                    </Modal>
                    <Modal maxWidth="5xl" title="Редактировать документ" show={showEditModal} onClose={() => setShowEditModal(false)}>
                        <div className="p-4">
                            <EditForm activeModel={activeModel} onSuccessHandler={onSuccessEdit} />
                        </div>
                    </Modal>
                    <Modal title="Загрузить файл" show={showUploadModal} onClose={() => setShowUploadModal(false)}>
                        <div className="p-4">
                           <UploadedFiles activeModel={activeModel}/>
                        </div>
                    </Modal>
                    
                    {/* Таблица документов */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="m-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            >
                                Добавить документ
                            </button>
                        </div>
                        <div className="p-6 text-gray-900">

                            <SearchForm filter={filter} onSearch={(searchData) => {} } />

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Номер</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Относиться</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Форма документа</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {documentsList?.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.number}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.title}</td>
                                           
                                            <td className="px-6 py-4 text-sm text-gray-500">{doc.category?.menu?.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{doc.category?.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(doc.created_at).toLocaleDateString()}
                                            </td>
                                             <td className="px-6 py-4 text-right">
                                    <ul className="flex items-center gap-2 list-none">
                                            {/* 1. Удалить */}
                                            <li>
                                                <button 
                                                    title="Удалить"
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                                    onClick={() => handleDelete(doc.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </li>

                                            {/* 2. Изменить */}
                                            <li>
                                                <button 
                                                title="Изменить"
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                                onClick={()=>{
                                                 
                                                    setActiveModel(doc);
                                                    setShowEditModal(true)
                                                }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                            </li>

                                            {/* 3. Загрузить файл */}
                                            <li>
                                                <button 
                                                title="Загрузить файл"
                                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors border border-yellow-100"
                                                onClick={()=>{
                                                    setActiveModel(doc);
                                                    setShowUploadModal(true)
                                                }}
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
                                            </li>

                                           
                                        </ul>
                                </td>
                                            <td style={{display:"none"}}>
                                                <Link
                                                    href={route('documents.edit', doc.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium m-1"
                                                >
                                                    Изменить
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(doc.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors duration-200 m-1"
                                                >
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Простая пагинация */}
                            {documents.links.length > 3 && (
                                <div className="mt-6 flex justify-center space-x-1">
                                    {documents.links.map((link, index) => (
                                        <button
                                            key={index}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3 py-1 rounded border ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                                            onClick={() => link.url && (window.location.href = link.url)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}