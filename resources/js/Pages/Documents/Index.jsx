import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import SearchForm from './SearchForm';
import Modal from '@/Components/Modal';
import EditForm from './EditForm';
import Swal from 'sweetalert2';
import CreateForm from './CreateForm';
import UploadedFiles from './UploadedFiles';
import BreadCrubs from './BreadCrubs';

function Index({ auth, documents, filter, query }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
    });

    const [searchForm, setSearchForm] = useState({
        number: query['number'] ?? '',
        title: query['title'] ?? '',
        category_id: query['category_id'] ?? '',
        menu_id: query['menu_id'] ?? '',
        type: query['type'] ?? '',
        status: query['status'] ?? '',
        date: query['date'] ?? '',
    });

    const [documentsList, setDocumentsList] = useState([]);
    const [activeModel, setActiveModel] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        setDocumentsList(documents.data);
    }, [documents.data]);

    const submit = (e) => {
        e.preventDefault();

        post(route('documents.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Вы уверены?',
            text: 'Вы не сможете восстановить этот документ!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('documents.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Удалено!',
                            text: 'Документ был удалён.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        router.visit(window.location.pathname);
                    },
                });
            }
        });
    };

    const onSuccessCreate = () => {
        setShowCreateModal(false);

        Swal.fire({
            title: 'Успешно!',
            text: 'Документ успешно сохранён в системе.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        });

        router.visit(window.location.pathname);
    };

    const onSuccessEdit = () => {
        setShowEditModal(false);

        Swal.fire({
            title: 'Успешно!',
            text: 'Документ успешно сохранён в системе.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        });

        router.visit(window.location.pathname);
    };

    const downloadFile = (file) => {
        axios
            .get(`file/download-link/${file.id}`)
            .then((response) => {
                const link = document.createElement('a');

                link.href = response.data;
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
            setSelectedIds(documentsList?.map((doc) => doc.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleOne = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const removeSelected = () => {
        Swal.fire({
            title: 'Удалить выбранные документы?',
            text: `Будет удалено документов: ${selectedIds.length}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post('/documents/bulk-delete', {
                        ids: selectedIds,
                    })
                    .then(() => {
                        const filteredDocuments = documents?.data?.filter(
                            (doc) => !selectedIds.includes(doc.id)
                        );

                        setDocumentsList(filteredDocuments);
                        setSelectedIds([]);

                        Swal.fire({
                            title: 'Удалено!',
                            text: `Удалено документов: ${selectedIds.length}`,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    })
                    .catch((error) => {
                        console.error('Ошибка при удалении', error);

                        Swal.fire({
                            title: 'Ошибка',
                            text: 'Не удалось удалить выбранные документы.',
                            icon: 'error',
                        });
                    });
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        router.get('/documents', searchForm, {
            preserveScroll: true,
        });
    };

    const breadcrumb = [
        {
            title: 'Панель управления',
            href: 'dashboard',
        },
        {
            title: 'Документы',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        Документы
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Управление нормативно-правовыми и нормативными документами
                    </p>
                </div>
            }
        >
            <Head title="Документы" />

            {/* CREATE MODAL */}
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

            {/* EDIT MODAL */}
            <Modal
                maxWidth="5xl"
                title="Редактирование документа"
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

            {/* UPLOAD MODAL */}
            <Modal
                title="Файлы документа"
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

            <div className="py-6">
                <div className="mx-auto w-full">

                    {/* SEARCH */}
                    <div className="mb-5 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                                        d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-gray-800">
                                    Поиск документов
                                </h2>

                                <p className="mt-0.5 text-sm text-gray-400">
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

                    {/* TOOLBAR */}
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Список документов
                            </h2>

                            <p className="mt-0.5 text-sm text-gray-400">
                                Всего документов: {documents.total}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
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
                                    strokeWidth="2"
                                    d="M12 5v14M5 12h14"
                                />
                            </svg>

                            Создать документ
                        </button>
                    </div>

                    {/* SELECTED */}
                    {selectedIds.length > 0 && (
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m9 12 2 2 4-4m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                </div>

                                <span className="text-sm font-medium text-gray-700">
                                    Выбрано документов:
                                    <span className="ml-1 font-semibold text-blue-600">
                                        {selectedIds.length}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedIds([])}
                                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                                >
                                    Снять выделение
                                </button>

                                <button
                                    type="button"
                                    onClick={removeSelected}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
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
                                            strokeWidth="1.8"
                                            d="M3 6h18M8 6V4h8v2m-9 0 1 15h8l1-15M10 11v6M14 11v6"
                                        />
                                    </svg>

                                    Удалить выбранные
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TABLE */}
                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="border-b border-gray-100 bg-gray-50">
                                    <tr>
                                        <th className="w-12 px-4 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={
                                                    selectedIds.length ===
                                                        documentsList?.length &&
                                                    documentsList?.length > 0
                                                }
                                                onChange={toggleAll}
                                            />
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Номер
                                        </th>

                                        <th className="min-w-[280px] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Заголовок
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Меню
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Категория
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Создано
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Дата документа
                                        </th>

                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Действия
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {documentsList?.length > 0 ? (
                                        documentsList.map((doc) => (
                                            <tr
                                                key={doc.id}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                {/* CHECKBOX */}
                                                <td className="px-4 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        checked={selectedIds.includes(
                                                            doc.id
                                                        )}
                                                        onChange={() =>
                                                            toggleOne(doc.id)
                                                        }
                                                    />
                                                </td>

                                                {/* NUMBER */}
                                                <td className="px-4 py-4">
                                                    <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                                        {doc.number || '—'}
                                                    </span>
                                                </td>

                                                {/* TITLE */}
                                                <td className="px-4 py-4">
                                                    <div className="max-w-md">
                                                        <div className="font-medium text-gray-800">
                                                            {doc.title}
                                                        </div>

                                                        {doc.description && (
                                                            <div className="mt-1 line-clamp-1 text-xs text-gray-400">
                                                                {doc.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* MENU */}
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {doc.category?.menu?.title ? (
                                                        <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                                            {doc.category.menu.title}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">
                                                            Не указано
                                                        </span>
                                                    )}
                                                </td>

                                                {/* CATEGORY */}
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {doc.category?.title ? (
                                                        <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                                            {doc.category.title}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">
                                                            Не указано
                                                        </span>
                                                    )}
                                                </td>

                                                {/* CREATED */}
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className="text-sm text-gray-500">
                                                        {doc.created_at
                                                            ? new Date(
                                                                  doc.created_at
                                                              ).toLocaleDateString()
                                                            : '—'}
                                                    </span>
                                                </td>

                                                {/* DOCUMENT DATE */}
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    {doc.document_date ? (
                                                        <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                            {new Date(
                                                                doc.document_date
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">
                                                            —
                                                        </span>
                                                    )}
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="px-4 py-4">
                                                    <div className="flex justify-end gap-1.5">

                                                        {/* EDIT */}
                                                        <button
                                                            type="button"
                                                            title="Редактировать"
                                                            onClick={() => {
                                                                setActiveModel(doc);
                                                                setShowEditModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 text-blue-600 transition hover:bg-blue-50"
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
                                                                    strokeWidth="1.8"
                                                                    d="M13.5 6.5 17.5 10.5M4 20h4l10.5-10.5a2.8 2.8 0 0 0-4-4L4 16v4Z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* FILES */}
                                                        <button
                                                            type="button"
                                                            title="Файлы"
                                                            onClick={() => {
                                                                setActiveModel(doc);
                                                                setShowUploadModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-100 text-amber-600 transition hover:bg-amber-50"
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
                                                                    strokeWidth="1.8"
                                                                    d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="1.8"
                                                                    d="M14 3v5h5M9 13h6M9 17h6"
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* DELETE */}
                                                        <button
                                                            type="button"
                                                            title="Удалить"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    doc.id
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-600 transition hover:bg-red-50"
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
                                                                    strokeWidth="1.8"
                                                                    d="M6 7h12M9 7V5h6v2m2 0-.7 12H7.7L7 7m3 4v5m4-5v5"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-6 py-14 text-center"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                                                        <svg
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.7"
                                                                d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.7"
                                                                d="M14 3v5h5"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <p className="mt-3 text-sm font-medium text-gray-600">
                                                        Документы не найдены
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Измените параметры поиска
                                                        или создайте новый документ.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* PAGINATION */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-sm text-gray-400">
                            Всего записей:{' '}
                            <span className="font-semibold text-gray-700">
                                {documents.total}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            {documents?.links?.map((link, index) => {
                                const label = link.label
                                    .replace('&laquo; Previous', '«')
                                    .replace('Next &raquo;', '»');

                                return (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        preserveScroll
                                        className={`
                                            flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm transition
                                            ${
                                                link.active
                                                    ? 'border-blue-600 bg-blue-600 font-medium text-white'
                                                    : link.url
                                                        ? 'border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600'
                                                        : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
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

export default Index;