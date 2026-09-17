import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Tree } from 'react-arborist';
import Modal from '@/Components/Modal';
import Create from './Create';
import Swal from 'sweetalert2';
import axios from 'axios';
import Edit from './Edit';
import BreadCrubs from './BreadCrubs';

function Index({ menu, query, treeMenu }) {

    const [selectedIds, setSelectedIds] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState({});

    const [searchForm, setSearchForm] = useState({
        title: query.title || '',
        description: query.description || '',
    });

    const buildTree = (menus) => {
        return menus?.map(menu => ({
            id: menu.id,
            name: menu.title,
            children: menu.children_recursive
                ? buildTree(menu.children_recursive)
                : []
        }));
    };

    useEffect(() => {
        setMenuList(menu);

        const td = buildTree(treeMenu);

        setTreeData(td);
    }, []);

    const deleteMenu = (id) => {
        Swal.fire({
            title: 'Вы уверены?',
            text: 'Вы не сможете восстановить это меню!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {

            if (result.isConfirmed) {

                axios.delete(`/menu/${id}`)
                    .then(() => {

                        Swal.fire({
                            title: 'Удалено!',
                            text: 'Меню успешно удалено.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        const filteredMenu =
                            menu?.data?.filter(m => m.id !== id);

                        const filteredTree =
                            treeMenu?.filter(m => m.id !== id);

                        const newTree = buildTree(filteredTree);

                        setMenuList({
                            ...menu,
                            ...menuList,
                            data: filteredMenu
                        });

                        setTreeData(newTree);
                    })
                    .catch(err => console.error(err));
            }
        });
    };

    const onSuccessCreate = () => {
        setCreateModal(false);

        Swal.fire({
            title: 'Успешно!',
            text: 'Меню успешно создано.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        });

        router.visit(route('menu.index'));
    };

    const onErrorCreate = (errors) => {
        console.error('Ошибка при создании меню:', errors);
    };

    const onSuccessUpdate = () => {
        setEditModal(false);

        Swal.fire({
            title: 'Успешно!',
            text: 'Изменения успешно сохранены.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        });

        router.visit(route('menu.index'));
    };

    const onErrorUpdate = (errors) => {
        console.error('Ошибка при обновлении меню:', errors);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        router.get('/menu', searchForm);
    };

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setSearchForm({
            ...searchForm,
            [key]: value
        });
    };

    function Node({ node, style, dragHandle }) {
        return (
            <div
                style={style}
                ref={dragHandle}
                className="ml-5 flex cursor-pointer items-center"
            >
                <svg
                    className="mr-2 h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                    />
                </svg>

                <span className="text-sm text-gray-700">
                    {node.data.name}
                </span>
            </div>
        );
    }

    const toggleAll = (e) => {

        if (e.target.checked) {
            setSelectedIds(menuList?.data.map(m => m.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const removeSelected = () => {

        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы не сможете восстановить эти ${selectedIds.length} меню!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {

            if (result.isConfirmed) {

                axios.post('/menu/bulk-delete', {
                    ids: selectedIds
                })
                    .then(() => {

                        const filteredMenu =
                            menu?.data?.filter(
                                m => !selectedIds.includes(m.id)
                            );

                        setMenuList({
                            ...menu,
                            ...menuList,
                            data: filteredMenu
                        });

                        const filteredTree =
                            treeMenu?.filter(
                                m => !selectedIds.includes(m.id)
                            );

                        const newTree = buildTree(filteredTree);

                        setTreeData(newTree);
                        setSelectedIds([]);

                        Swal.fire({
                            title: 'Удалено!',
                            text: `${selectedIds.length} меню были удалены.`,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    })
                    .catch(error => {
                        console.error('Ошибка при удалении', error);
                    });
            }
        });
    };

    const handleMove = ({ dragIds, parentId, index }) => {
        console.log('Перемещаем:', dragIds);
        console.log('Новый parent:', parentId);
        console.log('Новая позиция:', index);
    };

    const breadcrumb = [
        {
            title: 'Панель управления',
            href: 'dashboard'
        },
        {
            title: 'Меню',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        Меню
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Управление структурой и разделами системы
                    </p>
                </div>
            }
        >
            <Head title="Меню" />

            {/* Modals */}
            <Modal
                show={createModal}
                onClose={() => setCreateModal(false)}
            >
                <div className="px-5 py-8">
                    <Create
                        parents={menuList?.data}
                        onSuccessHandler={onSuccessCreate}
                        onErrorHandler={onErrorCreate}
                        onClose={() => setCreateModal(false)}
                    />
                </div>
            </Modal>

            <Modal
                show={editModal}
                onClose={() => setEditModal(false)}
            >
                <div className="px-5 py-8">
                    <Edit
                        menu={selectedMenu}
                        parents={menuList?.data}
                        onSuccessHandler={onSuccessUpdate}
                        onErrorHandler={onErrorUpdate}
                        onClose={() => setEditModal(false)}
                    />
                </div>
            </Modal>


            <BreadCrubs items={breadcrumb} />


            <div>
                <div className="mx-auto">

                


                    {/* Search */}
                    <div
                        className="
                            mb-6
                            rounded-xl
                            border
                            border-gray-100
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >
                        <div className="mb-5 flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-blue-50
                                    text-blue-600
                                "
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="6.5"
                                        strokeWidth="1.8"
                                    />

                                    <path
                                        d="m16 16 4.5 4.5"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-gray-800">
                                    Поиск меню
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-400">
                                    Поиск по названию и описанию
                                </p>
                            </div>

                        </div>

                        <form className="grid grid-cols-1 items-end gap-5 md:grid-cols-3">

                            {/* Title */}
                            <div>
                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    Название
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={searchForm.title}
                                    onChange={handleChange}
                                    placeholder="Введите название..."
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-blue-500
                                        focus:ring-4
                                        focus:ring-blue-50
                                    "
                                />
                            </div>


                            {/* Description */}
                            <div>
                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    Описание
                                </label>

                                <input
                                    type="text"
                                    name="description"
                                    value={searchForm.description}
                                    onChange={handleChange}
                                    placeholder="Введите описание..."
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-blue-500
                                        focus:ring-4
                                        focus:ring-blue-50
                                    "
                                />
                            </div>


                            {/* Search buttons */}
                            <div className="flex gap-2">

                                <button
                                    type="submit"
                                    onClick={handleSearch}
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
                                        hover:shadow
                                    "
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="11"
                                            cy="11"
                                            r="6.5"
                                            strokeWidth="1.8"
                                        />

                                        <path
                                            d="m16 16 4.5 4.5"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    Найти
                                </button>


                                <Link
                                    href="/menu"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-medium
                                        text-gray-600
                                        transition
                                        hover:bg-gray-100
                                        hover:text-gray-800
                                    "
                                >
                                    Сбросить
                                </Link>

                            </div>

                        </form>
                    </div>


                    {/* Toolbar */}
                    <div className="mb-4 flex items-center justify-between">

                        <div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Список меню
                            </h2>

                            <p className="mt-0.5 text-xs text-gray-400">
                                Всего записей: {menuList?.total || 0}
                            </p>
                        </div>


                        <button
                            type="button"
                            onClick={() => setCreateModal(true)}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-blue-600
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                shadow-sm
                                transition
                                hover:bg-blue-700
                                hover:shadow
                            "
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 5v14M5 12h14"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>

                            Создать меню
                        </button>

                    </div>


                    {/* Selected toolbar */}
                    {selectedIds.length > 0 && (
                        <div
                            className="
                                mb-4
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-blue-100
                                bg-blue-50
                                px-4
                                py-3
                            "
                        >
                            <div className="flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="m9 12 2 2 4-4"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                            strokeWidth="1.8"
                                        />
                                    </svg>
                                </div>

                                <span className="text-sm font-medium text-gray-700">
                                    Выбрано:
                                    <span className="ml-1 font-semibold text-blue-600">
                                        {selectedIds.length}
                                    </span>
                                </span>

                            </div>


                            <div className="flex gap-2">

                                <button
                                    type="button"
                                    onClick={() => setSelectedIds([])}
                                    className="
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-gray-600
                                        transition
                                        hover:bg-gray-50
                                    "
                                >
                                    Снять выделение
                                </button>

                                <button
                                    type="button"
                                    onClick={removeSelected}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-red-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-red-700
                                    "
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M6 7h12M9 7V4h6v3m2 0-.7 13H7.7L7 7m3 4v6m4-6v6"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    Удалить выбранные
                                </button>

                            </div>

                        </div>
                    )}


                    {/* Table */}
                    <div
                        className="
                            overflow-hidden
                            rounded-xl
                            border
                            border-gray-100
                            bg-white
                            shadow-sm
                        "
                    >
                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead className="border-b border-gray-100 bg-gray-50">

                                    <tr>

                                        <th className="w-12 px-4 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                className="
                                                    h-4
                                                    w-4
                                                    rounded
                                                    border-gray-300
                                                    text-blue-600
                                                    focus:ring-blue-500
                                                "
                                                checked={
                                                    selectedIds.length === menuList?.data?.length &&
                                                    menuList?.data?.length > 0
                                                }
                                                onChange={toggleAll}
                                            />
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Название
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Описание
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Создано
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Обновлено
                                        </th>

                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Действия
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {menuList?.data?.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="
                                                transition-colors
                                                hover:bg-gray-50
                                            "
                                        >

                                            <td className="px-4 py-4 text-center">

                                                <input
                                                    type="checkbox"
                                                    className="
                                                        h-4
                                                        w-4
                                                        rounded
                                                        border-gray-300
                                                        text-blue-600
                                                        focus:ring-blue-500
                                                    "
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => toggleOne(item.id)}
                                                />

                                            </td>


                                            <td className="px-4 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            bg-blue-50
                                                            text-blue-600
                                                        "
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M4 6.5A2.5 2.5 0 0 1 6.5 4h4L13 6.5h4.5A2.5 2.5 0 0 1 20 9v8.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z"
                                                                strokeWidth="1.7"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="font-medium text-gray-800">
                                                        {item.title}
                                                    </div>

                                                </div>

                                            </td>


                                            <td className="max-w-md px-4 py-4 text-sm text-gray-600">

                                                {item.description || (
                                                    <span className="italic text-gray-400">
                                                        Нет описания
                                                    </span>
                                                )}

                                            </td>


                                            <td className="px-4 py-4">

                                                <span
                                                    className="
                                                        inline-flex
                                                        rounded-md
                                                        bg-gray-50
                                                        px-2.5
                                                        py-1
                                                        text-xs
                                                        font-medium
                                                        text-gray-600
                                                    "
                                                >
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </span>

                                            </td>


                                            <td className="px-4 py-4">

                                                <span
                                                    className="
                                                        inline-flex
                                                        rounded-md
                                                        bg-blue-50
                                                        px-2.5
                                                        py-1
                                                        text-xs
                                                        font-medium
                                                        text-blue-600
                                                    "
                                                >
                                                    {new Date(item.updated_at).toLocaleDateString()}
                                                </span>

                                            </td>


                                            <td className="px-4 py-4">

                                                <div className="flex justify-end gap-2">

                                                    {/* Edit */}
                                                    <button
                                                        type="button"
                                                        title="Редактировать"
                                                        onClick={() => {
                                                            setSelectedMenu(item);
                                                            setEditModal(true);
                                                        }}
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            border-blue-100
                                                            bg-blue-50
                                                            text-blue-600
                                                            transition
                                                            hover:border-blue-200
                                                            hover:bg-blue-100
                                                        "
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M15.232 5.232l3.536 3.536M4 20h4l10.5-10.5a2.5 2.5 0 0 0-3.536-3.536L4 16.5z"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>


                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        title="Удалить"
                                                        onClick={() => deleteMenu(item.id)}
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            border-red-100
                                                            bg-red-50
                                                            text-red-600
                                                            transition
                                                            hover:border-red-200
                                                            hover:bg-red-100
                                                        "
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M6 7h12M9 7V4h6v3m2 0-.7 13H7.7L7 7m3 4v6m4-6v6"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
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


                    {/* Pagination */}
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="text-sm text-gray-500">
                            Всего записей:
                            <span className="ml-1 font-semibold text-gray-700">
                                {menuList?.total || 0}
                            </span>
                        </div>


                        <div className="flex items-center gap-1">

                            {menuList?.links?.map((item, index) => {

                                const label = item.label
                                    .replace('&laquo; Previous', '«')
                                    .replace('Next &raquo;', '»');

                                return (
                                    <Link
                                        key={index}
                                        href={item.url || '#'}
                                        preserveScroll
                                        className={`
                                            flex
                                            h-9
                                            min-w-[36px]
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            text-sm
                                            font-medium
                                            transition
                                            ${
                                                item.active
                                                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                                                    : item.url
                                                        ? 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800'
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