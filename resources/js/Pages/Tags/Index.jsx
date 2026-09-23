import React, { useState, useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';

import AddTag from './AddTag';
import EditTag from './EditTag';
import TagDocuments from './TagDocuments';
import BreadCrubs from './BreadCrubs';


export default function Index({ tags }) {

    const [createModal, setCreateModal] = useState(false);
    const [documentsOfTag, setDocumentsOfTag] = useState(null);
    const [selected, setSlected] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);


    const toggleAll = () => {

        if (selectedIds.length === tags.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(tags.data.map(tag => tag.id));
        }
    };


    const removeTag = (tag) => {

        Swal.fire({
            title: 'Удалить тег?',
            text: `Вы действительно хотите удалить тег "${tag.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
        }).then((result) => {

            if (result.isConfirmed) {

                axios.delete(route('tags.remove'), {
                    data: {
                        tag_id: tag.id
                    }
                })
                .then(() => {
                    router.reload();
                });

            }

        });

    };

     const breadcrumb = [
            {
                title: 'Главная страница',
                href: '/',
            },
            {
                title: 'Список тегов',
            },
        ];
    


    const removeSelected = () => {

        if (!selectedIds.length) {
            return;
        }

        Swal.fire({
            title: 'Удалить выбранные теги?',
            text: `Будет удалено: ${selectedIds.length}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
        }).then((result) => {

            if (result.isConfirmed) {

                axios.delete(route('tags.bulk-delete'), {
                    data: {
                        ids: selectedIds
                    }
                })
                .then(() => {

                    setSelectedIds([]);

                    router.reload();

                    Swal.fire({
                        icon: 'success',
                        title: 'Успешно',
                        text: 'Выбранные теги удалены',
                        timer: 1500,
                        showConfirmButton: false,
                    });

                });

            }

        });

    };


    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Теги
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Управление тегами документов
                    </p>
                </div>
            }
        >
           
            <BreadCrubs items={breadcrumb} />
            <div className="py-6">

                <div className="mx-auto">


                    {/* Header / Toolbar */}
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Список тегов
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Всего записей: {tags?.total || 0}
                            </p>
                        </div>


                        <button
                            type="button"
                            onClick={() => setCreateModal(true)}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>

                            Создать тег

                        </button>

                    </div>


                    {/* Selected toolbar */}
                    {selectedIds.length > 0 && (

                        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>

                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        Выбрано: {selectedIds.length}
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        Выберите действие
                                    </div>
                                </div>

                            </div>


                            <div className="flex flex-wrap gap-2">

                                <button
                                    type="button"
                                    onClick={() => setSelectedIds([])}
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                    Снять выделение

                                </button>


                                <button
                                    type="button"
                                    onClick={removeSelected}
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 012-2h2a1 1 0 012 2v3m-9 0h10"
                                        />
                                    </svg>

                                    Удалить выбранные

                                </button>

                            </div>

                        </div>

                    )}


                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead className="border-b border-gray-100 bg-gray-50">

                                    <tr>

                                        <th className="w-12 px-4 py-3 text-left">

                                            <input
                                                type="checkbox"
                                                checked={
                                                    tags?.data?.length > 0 &&
                                                    selectedIds.length === tags.data.length
                                                }
                                                onChange={toggleAll}
                                                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />

                                        </th>


                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            #
                                        </th>


                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Название
                                        </th>


                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Действия
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {tags?.data?.length > 0 ? (

                                        tags.data.map((tag, index) => (

                                            <tr
                                                key={tag.id}
                                                className="transition-colors hover:bg-gray-50"
                                            >

                                                {/* Checkbox */}
                                                <td className="px-4 py-4">

                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(tag.id)}
                                                        onChange={() => {

                                                            if (selectedIds.includes(tag.id)) {

                                                                setSelectedIds(
                                                                    selectedIds.filter(id => id !== tag.id)
                                                                );

                                                            } else {

                                                                setSelectedIds([
                                                                    ...selectedIds,
                                                                    tag.id
                                                                ]);

                                                            }

                                                        }}
                                                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />

                                                </td>


                                                {/* Documents count */}
                                                <td className="px-4 py-4">

                                                    <button
                                                        type="button"
                                                        onClick={() => setDocumentsOfTag(tag)}
                                                        className="inline-flex min-w-[40px] cursor-pointer items-center justify-center rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                                                    >
                                                        {tag.documents_count ?? tag.documents?.length ?? 0}
                                                    </button>

                                                </td>


                                                {/* Tag name */}
                                                <td className="px-4 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M20.59 13.41L11 3.83V3H4a1 1 0 00-1 1v7h.83l9.58 9.59a2 2 0 002.83 0l3.35-3.35a2 2 0 000-2.83z"
                                                                />

                                                                <circle
                                                                    cx="7.5"
                                                                    cy="7.5"
                                                                    r="1"
                                                                    fill="currentColor"
                                                                    stroke="none"
                                                                />
                                                            </svg>

                                                        </div>


                                                        <div className="min-w-0">

                                                            <div className="truncate text-sm font-semibold text-gray-800">
                                                                {tag.name}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Actions */}
                                                <td className="px-4 py-4">

                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() => setSlected(tag)}
                                                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                                                            title="Изменить"
                                                        >

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                                                />
                                                            </svg>

                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() => removeTag(tag)}
                                                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                                                            title="Удалить"
                                                        >

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 012-2h2a1 1 0 012 2v3m-9 0h10"
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
                                                colSpan="4"
                                                className="px-4 py-12 text-center"
                                            >

                                                <div className="flex flex-col items-center justify-center">

                                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M20.59 13.41L11 3.83V3H4a1 1 0 00-1 1v7h.83l9.58 9.59a2 2 0 0012.83 0l3.35-3.35a2 2 0 000-2.83z"
                                                            />
                                                        </svg>

                                                    </div>

                                                    <p className="text-sm font-medium text-gray-600">
                                                        Теги не найдены
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Добавьте первый тег
                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* Pagination */}
                    {tags?.links && tags.links.length > 3 && (

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div className="text-sm text-gray-500">
                                Всего записей: {tags?.total || 0}
                            </div>


                            <div className="flex flex-wrap items-center gap-1">

                                {tags.links.map((link, index) => (

                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        preserveScroll
                                        className={`
                                            inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border px-3 py-1.5 text-sm font-medium transition
                                            ${
                                                link.active
                                                    ? 'border-blue-600 bg-blue-600 text-white'
                                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                            }
                                            ${
                                                !link.url
                                                    ? 'pointer-events-none opacity-50'
                                                    : ''
                                            }
                                        `}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label
                                        }}
                                    />

                                ))}

                            </div>

                        </div>
                    )}
                </div>
            </div>
            {/* Create */}
            <Modal
                show={createModal}
                onClose={() => setCreateModal(false)}
            >
                <AddTag
                    onClose={() => setCreateModal(false)}
                    setCreateModal = {setCreateModal}
                />
            </Modal>
            {/* Documents */}
            <Modal
                show={documentsOfTag !== null}
                onClose={() => setDocumentsOfTag(null)}
            >
                {documentsOfTag && (
                    <TagDocuments
                        data={documentsOfTag}
                        onClose={() => setDocumentsOfTag(null)}
                    />
                )}
            </Modal>
            {/* Edit */}
            <Modal
                show={selected !== null}
                onClose={() => setSlected(null)}
            >
                {selected && (
                    <EditTag
                        tag={selected}
                        setEditModal = {setSlected}
                    />
                )}
            </Modal>

        </AuthenticatedLayout>
    );
}