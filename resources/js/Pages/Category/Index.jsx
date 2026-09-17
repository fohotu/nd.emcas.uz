import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Create from './Create';
import Swal from 'sweetalert2';
import axios from 'axios';
import Edit from './Edit';
import BreadCrubs from './BreadCrubs';

function Index({
    category,
    query = {},
    treeCategory = [],
    menu = [],
    treeMenu,
}) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState({});

    const [searchForm, setSearchForm] = useState({
        title: query.title || '',
        description: query.description || '',
    });

    const buildTree = (categories) => {
        return categories?.map((category) => ({
            id: category.id,
            name: category.title,
            children: category.children_recursive
                ? buildTree(category.children_recursive)
                : [],
        }));
    };

    const deleteCategory = (id) => {
        Swal.fire({
            title: 'Вы уверены?',
            text: 'Вы не сможете восстановить эту категорию!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Да, удалить',
            cancelButtonText: 'Отмена',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/category/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: 'Удалено!',
                            text: 'Категория успешно удалена.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        const filteredCategory = category?.data?.filter(
                            (item) => item.id !== id
                        );

                        const filteredTree = treeCategory?.filter(
                            (item) => item.id !== id
                        );

                        setCategoryList({
                            ...category,
                            data: filteredCategory,
                        });

                        setTreeData(buildTree(filteredTree));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    };

    const onSuccessCreate = () => {
        setCreateModal(false);

        Swal.fire({
            title: 'Успешно!',
            text: 'Категория успешно создана.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        });

        router.visit(route('category.index'));
    };

    const onErrorCreate = (errors) => {
        console.error('Ошибка при создании категории:', errors);
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

        router.visit(route('category.index'));
    };

    const onErrorUpdate = (errors) => {
        console.error('Ошибка при обновлении категории:', errors);
    };

    useEffect(() => {
        setCategoryList(category);
        setMenuList(menu);
        setTreeData(buildTree(treeCategory));
    }, [category, menu, treeCategory]);

    const handleSearch = (e) => {
        e.preventDefault();

        router.get('/category', searchForm);
    };

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setSearchForm({
            ...searchForm,
            [key]: value,
        });
    };

    const toggleAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(
                categoryList?.data?.map((item) => item.id) || []
            );
        } else {
            setSelectedIds([]);
        }
    };

    const toggleOne = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((selectedId) => selectedId !== id)
                : [...current, id]
        );
    };

    const removeSelected = () => {
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы не сможете восстановить выбранные ${selectedIds.length} категории!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Да, удалить',
            cancelButtonText: 'Отмена',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post('/category/bulk-delete', {
                        ids: selectedIds,
                    })
                    .then(() => {
                        const filteredCategory = category?.data?.filter(
                            (item) => !selectedIds.includes(item.id)
                        );

                        const filteredTree = treeCategory?.filter(
                            (item) => !selectedIds.includes(item.id)
                        );

                        setCategoryList({
                            ...category,
                            data: filteredCategory,
                        });

                        setTreeData(buildTree(filteredTree));
                        setSelectedIds([]);

                        Swal.fire({
                            title: 'Удалено!',
                            text: `${selectedIds.length} категорий удалено.`,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    })
                    .catch((error) => {
                        console.error(
                            'Ошибка при удалении категорий:',
                            error
                        );
                    });
            }
        });
    };

    const breadcrumb = [
        {
            title: 'Панель управления',
            href: 'dashboard',
        },
        {
            title: 'Категории',
        },
    ];

    const loadCategories = async (inputValue, menu = null) => {
        const { data } = await axios.get(
            route('category.live-search'),
            {
                params: {
                    title: inputValue,
                    menu: menu?.value,
                },
            }
        );

        return data;
    };

    const loadMenu = async (inputValue) => {
        const { data } = await axios.get(
            route('menu.live-search'),
            {
                params: {
                    title: inputValue,
                },
            }
        );

        return data;
    };

    const allSelected =
        categoryList?.data?.length > 0 &&
        selectedIds.length === categoryList.data.length;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        Категории
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Управление категориями электронного сборника
                    </p>
                </div>
            }
        >
            <Head title="Категории" />

            {/* Create Modal */}
            <Modal
                show={createModal}
                onClose={() => setCreateModal(false)}
            >
                <div className="px-5 py-10">
                    <Create
                        parents={categoryList?.data}
                        onSuccessHandler={onSuccessCreate}
                        onErrorHandler={onErrorCreate}
                        onClose={() => setCreateModal(false)}
                        menu={menuList}
                        loadMenu={loadMenu}
                        loadCategories={loadCategories}
                    />
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                show={editModal}
                onClose={() => setEditModal(false)}
            >
                <div className="px-5 py-10">
                    <Edit
                        category={selectedMenu}
                        parents={categoryList?.data}
                        onSuccessHandler={onSuccessUpdate}
                        onErrorHandler={onErrorUpdate}
                        onClose={() => setEditModal(false)}
                        loadMenu={loadMenu}
                        loadCategories={loadCategories}
                    />
                </div>
            </Modal>

            <BreadCrubs items={breadcrumb} />

            <div className="space-y-6">

                {/* Search */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-start gap-3">
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
                                    d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Поиск категорий
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Используйте фильтры для поиска категорий.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="grid grid-cols-1 items-end gap-5 md:grid-cols-3"
                    >
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Название
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={searchForm.title}
                                onChange={handleChange}
                                placeholder="Введите название..."
                                className="
                                    mt-2
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3.5
                                    py-2.5
                                    text-sm
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
                            <label className="block text-sm font-medium text-gray-700">
                                Описание
                            </label>

                            <input
                                type="text"
                                name="description"
                                value={searchForm.description}
                                onChange={handleChange}
                                placeholder="Введите описание..."
                                className="
                                    mt-2
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3.5
                                    py-2.5
                                    text-sm
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
                                "
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
                                        d="m21 21-4.35-4.35m1.35-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                                    />
                                </svg>

                                Найти
                            </button>

                            <Link
                                href="/category"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-gray-600
                                    transition
                                    hover:bg-gray-50
                                    hover:text-gray-800
                                "
                            >
                                Сбросить
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Список категорий
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Всего записей:{' '}
                            <span className="font-medium text-gray-600">
                                {categoryList?.total || 0}
                            </span>
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setCreateModal(true)}
                        className="
                            inline-flex
                            items-center
                            justify-center
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
                            focus:outline-none
                            focus:ring-4
                            focus:ring-blue-100
                        "
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
                                d="M12 5v14M5 12h14"
                            />
                        </svg>

                        Создать категорию
                    </button>
                </div>

                {/* Selected toolbar */}
                {selectedIds.length > 0 && (
                    <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
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
                                        strokeWidth="1.8"
                                        d="M5 13l4 4L19 7"
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M6 7h12M9 7V5h6v2m2 0-.7 12H7.7L7 7m3 4v5m4-5v5"
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
                                    <th className="w-12 px-4 py-3 text-center">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={toggleAll}
                                            className="
                                                h-4
                                                w-4
                                                cursor-pointer
                                                rounded
                                                border-gray-300
                                                text-blue-600
                                                focus:ring-blue-500
                                            "
                                        />
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Название
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Описание
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Создано
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Обновлено
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Действия
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {categoryList?.data?.length > 0 ? (
                                    categoryList.data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition-colors hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        item.id
                                                    )}
                                                    onChange={() =>
                                                        toggleOne(item.id)
                                                    }
                                                    className="
                                                        h-4
                                                        w-4
                                                        cursor-pointer
                                                        rounded
                                                        border-gray-300
                                                        text-blue-600
                                                        focus:ring-blue-500
                                                    "
                                                />
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                                                                d="M4 7.5A1.5 1.5 0 0 1 5.5 6h4l2 2h7A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-10z"
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
                                                <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                    {new Date(
                                                        item.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                                                    {new Date(
                                                        item.updated_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="flex justify-end gap-2">
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
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.8"
                                                                d="M15.5 5.5l3 3M4 20h4l10.5-10.5a2.12 2.12 0 0 0-3-3L5 17v3z"
                                                            />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title="Удалить"
                                                        onClick={() =>
                                                            deleteCategory(
                                                                item.id
                                                            )
                                                        }
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
                                            colSpan="6"
                                            className="px-4 py-12 text-center"
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
                                                            strokeWidth="1.8"
                                                            d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0-3-3-3 3m6 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5"
                                                        />
                                                    </svg>
                                                </div>

                                                <p className="mt-3 text-sm font-medium text-gray-600">
                                                    Категории не найдены
                                                </p>

                                                <p className="mt-1 text-sm text-gray-400">
                                                    Попробуйте изменить параметры поиска.
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
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-500">
                        Всего записей:{' '}
                        <span className="font-semibold text-gray-700">
                            {categoryList?.total || 0}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                        {categoryList?.links?.map((item, index) => {
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
                                        min-w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        border
                                        px-2
                                        text-sm
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
        </AuthenticatedLayout>
    );
}

export default Index;