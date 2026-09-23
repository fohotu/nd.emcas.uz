import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrubs from './BreadCrubs';
import { Tree } from 'react-arborist';
import { router, Link , usePage} from '@inertiajs/react';
import SearchForm from './SearchForm';

import Modal from '@/Components/Modal';
import TagForm from './TagForm';
import Swal from 'sweetalert2';

function View({
    documents,
    favoriteIds,
}) {
    let query = {};
    let filter = {};

    const breadcrumb = [
        {
            title: 'Главная страница',
            href: '/',
        },
        {
            title: 'Все документы',
        },
    ];

    const [searchForm, setSearchForm] = useState({
        number: query['number'] ?? '',
        title: query['title'] ?? '',
        category_id: query['category_id'] ?? '',
        menu_id: query['menu_id'] ?? '',
        type: query['type'] ?? '',
        status: query['status'] ?? '',
        date: query['date'] ?? '',
    });

    const { main_menu } = usePage().props;

    

     console.log(main_menu);

    const [treeData, setTreeData] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [favoriteDocuments, setFavoriteDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const addToFavorites = (documentId) => {
        axios
            .post(route('favorites.store'), {
                document_id: documentId,
            })
            .then(() => {
                const isFavorite =
                    favoriteDocuments.includes(documentId);

                if (isFavorite) {
                    setFavoriteDocuments((prev) =>
                        prev.filter((id) => id !== documentId)
                    );
                } else {
                    setFavoriteDocuments((prev) => [
                        ...prev,
                        documentId,
                    ]);
                }
            });
    };

    const attachTag = (document) => {
        setSelectedDocument(document);
    };

    const removeTag = (document_id, tag_id) => {
        axios
            .delete(route('tags.remove'), {
                data: {
                    document_id,
                    tag_id,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    router.reload();
                }
            });
    };

    const successAtachTag = () => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Tags successfully added',
            timer: 1500,
            showConfirmButton: false,
        });

        setSelectedDocument(null);
        router.reload();
    };

    const errorAtachTag = (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
                error.response?.data?.message ||
                'Failed to add tags',
        });
    };

    useEffect(() => {
        if (favoriteIds?.length) {
            setFavoriteDocuments(favoriteIds);
        }
    }, []); 

    useEffect(() => {
        if(main_menu){
            setTreeData(buildTree(main_menu));

           
        }
    }, [main_menu]);

    const buildTree = (items, parentId = null) => {
        return items
            .filter((item) => item.parent_id === parentId)
            .map((item) => ({
                id: item.id,
                name: item.title,
                data: item,
                children: buildTree(items, item.id),
            }));
    };

    const prepareTree = (items = []) => {
        return items.map((item) => ({
            ...item,
            name: item.title,
            href: '/documents/menu/' + item.id + '/category',
            children: prepareTree(item.children_recursive || []),
        }));
    };
    const data = prepareTree(main_menu || []);
    

    function handleSearch(e) {
        e.preventDefault();

        const url = `/documents/menu/${menu_item.id}/category/${
            selectedCategoryId ?? ''
        }`;

        router.get(url, searchForm, {
            onSuccess: (res) => {
                console.log(res);
            },
        });
    }

    return (
        <AuthenticatedLayout
            title="View Menu"
            description="View menu details"
        >
            <BreadCrubs items={breadcrumb} />

            <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">

                {/* =====================================================
                    LEFT COLUMN - CATEGORY TREE
                ===================================================== */}

                <div className="lg:col-span-4">

                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                        {/* Header */}
                        <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5">

                        </div>
                        {/* Tree */}
                        <div className="p-3">

                            {treeData.length === 0 ? (

                                <div className="rounded-lg border border-dashed border-gray-200 px-4 py-10 text-center">

                                    <svg
                                        className="mx-auto h-8 w-8 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.6"
                                            d="M20 13V6a2 2 0 0 0-2-2h-5l-2-2H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h8"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.6"
                                            d="m16 16 2 2 4-4"
                                        />
                                    </svg>

                                    <p className="mt-3 text-sm text-gray-400">
                                        Нет данных для отображения
                                    </p>

                                </div>

                            ) : (

                                <Tree
                                    initialData={data}
                                    openByDefault={true}
                                    width="100%"
                                    height={800}
                                    rowHeight={36}
                                >
                                    {({ node, style }) => (
                                        <div
                                            style={style}
                                            className="
                                                flex
                                                min-w-0
                                                items-center
                                                px-1
                                            "
                                        >
                                            <Link
                                                href={`/documents/menu/${node.data.id}/category/`}
                                                className="
                                                    flex
                                                    h-full
                                                    w-full
                                                    min-w-0
                                                    cursor-pointer
                                                    items-center
                                                    rounded-lg
                                                    px-3
                                                    text-sm
                                                    text-gray-600
                                                    transition
                                                    hover:bg-blue-50
                                                    hover:text-blue-600
                                                "
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <svg
                                                    className="mr-2 h-4 w-4 shrink-0 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.7"
                                                        d="M3.75 6.75h5.5l2 2h9v8.5a2 2 0 0 1-2 2h-14.5a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Z"
                                                    />
                                                </svg>

                                                <span
                                                    className="
                                                        block
                                                        min-w-0
                                                        flex-1
                                                        truncate
                                                    "
                                                    title={node.data.name}
                                                >
                                                    {node.data.name}
                                                </span>

                                            </Link>

                                        </div>

                                    )}
                                </Tree>

                            )}

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    RIGHT COLUMN
                ===================================================== */}

                <div className="lg:col-span-8">

                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                        {/* Search */}
                        <div className="border-b border-gray-100 p-5">

                            <SearchForm
                                filter={filter}
                                onSearch={handleSearch}
                                searchForm={searchForm}
                                setSearchForm={setSearchForm}
                            />

                        </div>


                        {/* Table header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

                            <div>

                                <h3 className="text-base font-semibold text-gray-800">
                                    Документы
                                </h3>

                                <p className="mt-1 text-sm text-gray-400">
                                    Список документов выбранного раздела
                                </p>

                            </div>

                            <div className="rounded-lg bg-gray-50 px-3 py-2">

                                <span className="text-xs text-gray-400">
                                    Всего записей
                                </span>

                                <span className="ml-2 text-sm font-semibold text-gray-700">
                                    {documents?.total || 0}
                                </span>

                            </div>

                        </div>


                        {/* Table */}
                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead className="border-b border-gray-100 bg-gray-50">

                                    <tr>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            #
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
                                            Статус
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Теги
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {documents?.data?.length > 0 ? (

                                        documents.data.map((item) => {

                                            const isFavorite =
                                                favoriteDocuments.includes(
                                                    item.id
                                                );

                                            return (

                                                <tr
                                                    key={item.id}
                                                    className="
                                                        cursor-pointer
                                                        transition
                                                        hover:bg-blue-50/50
                                                    "
                                                    onClick={() => {
                                                        router.visit(
                                                            route(
                                                                'document.show',
                                                                item.id
                                                            )
                                                        );
                                                    }}
                                                >

                                                    {/* Actions */}
                                                    <td className="whitespace-nowrap px-4 py-4">

                                                        <div className="flex items-center gap-1">

                                                            {/* Favorite */}
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    addToFavorites(
                                                                        item.id
                                                                    );
                                                                }}
                                                                className={`
                                                                    inline-flex
                                                                    h-8
                                                                    w-8
                                                                    cursor-pointer
                                                                    items-center
                                                                    justify-center
                                                                    rounded-lg
                                                                    transition
                                                                    ${
                                                                        isFavorite
                                                                            ? 'bg-red-50 text-red-500 hover:bg-red-100'
                                                                            : 'text-gray-400 hover:bg-yellow-50 hover:text-yellow-500'
                                                                    }
                                                                `}
                                                                title="Добавить в избранное"
                                                            >

                                                                <svg
                                                                    className="h-5 w-5"
                                                                    fill={
                                                                        isFavorite
                                                                            ? 'currentColor'
                                                                            : 'none'
                                                                    }
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="1.8"
                                                                        d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3-6 3V4.75Z"
                                                                    />
                                                                </svg>

                                                            </button>


                                                            {/* Tag */}
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    attachTag(item);
                                                                }}
                                                                className="
                                                                    inline-flex
                                                                    h-8
                                                                    w-8
                                                                    cursor-pointer
                                                                    items-center
                                                                    justify-center
                                                                    rounded-lg
                                                                    text-gray-400
                                                                    transition
                                                                    hover:bg-blue-50
                                                                    hover:text-blue-600
                                                                "
                                                                title="Прикрепить к тегу"
                                                            >

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
                                                                        d="M20.5 13.5 13.5 20.5a2 2 0 0 1-2.83 0L3.5 13.33A2 2 0 0 1 3 11.91V5a2 2 0 0 1 2-2h6.91a2 2 0 0 1 1.42.59l7.17 7.08a2 2 0 0 1 0 2.83Z"
                                                                    />

                                                                    <circle
                                                                        cx="7.5"
                                                                        cy="7.5"
                                                                        r="1.25"
                                                                        strokeWidth="1.8"
                                                                    />
                                                                </svg>

                                                            </button>

                                                        </div>

                                                    </td>


                                                    {/* Title */}
                                                    <td className="max-w-[260px] px-4 py-4">

                                                        <div
                                                            className="
                                                                truncate
                                                                text-sm
                                                                font-medium
                                                                text-gray-800
                                                            "
                                                            title={item.title}
                                                        >
                                                            {item.title}
                                                        </div>

                                                    </td>


                                                    {/* Description */}
                                                    <td className="max-w-[300px] px-4 py-4">

                                                        {item.description ? (

                                                            <div
                                                                className="
                                                                    line-clamp-2
                                                                    text-sm
                                                                    leading-5
                                                                    text-gray-500
                                                                "
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        item.description,
                                                                }}
                                                            />

                                                        ) : (

                                                            <span className="text-sm italic text-gray-400">
                                                                Нет описания
                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* Created */}
                                                    <td className="whitespace-nowrap px-4 py-4">

                                                        <span className="
                                                            inline-flex
                                                            rounded-lg
                                                            bg-gray-50
                                                            px-2.5
                                                            py-1.5
                                                            text-xs
                                                            font-medium
                                                            text-gray-600
                                                        ">
                                                            {new Date(
                                                                item.created_at
                                                            ).toLocaleDateString()}
                                                        </span>

                                                    </td>


                                                    {/* Status */}
                                                    <td className="whitespace-nowrap px-4 py-4">

                                                        {item.status === 'active' && (

                                                            <span className="
                                                                inline-flex
                                                                rounded-lg
                                                                bg-green-50
                                                                px-2.5
                                                                py-1.5
                                                                text-xs
                                                                font-medium
                                                                text-green-700
                                                            ">
                                                                Действующий
                                                            </span>

                                                        )}


                                                        {item.status === 'passive' && (

                                                            <span className="
                                                                inline-flex
                                                                rounded-lg
                                                                bg-red-50
                                                                px-2.5
                                                                py-1.5
                                                                text-xs
                                                                font-medium
                                                                text-red-700
                                                            ">
                                                                Утратил силу
                                                            </span>

                                                        )}


                                                        {![
                                                            'active',
                                                            'passive',
                                                        ].includes(item.status) && (

                                                            <span className="text-sm text-gray-400">
                                                                —
                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* Tags */}
                                                    <td className="px-4 py-4">

                                                        <div className="flex min-w-[120px] flex-wrap gap-1.5">

                                                            {item.tags?.length > 0 ? (

                                                                item.tags.map((tag) => (

                                                                    <span
                                                                        key={tag.id}
                                                                        className="
                                                                            inline-flex
                                                                            items-center
                                                                            gap-1
                                                                            rounded-lg
                                                                            bg-gray-50
                                                                            px-2
                                                                            py-1
                                                                            text-xs
                                                                            font-medium
                                                                            text-gray-600
                                                                        "
                                                                    >

                                                                        {tag.name}

                                                                        <button
                                                                            type="button"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();

                                                                                removeTag(
                                                                                    item.id,
                                                                                    tag.id
                                                                                );
                                                                            }}
                                                                            className="
                                                                                inline-flex
                                                                                h-4
                                                                                w-4
                                                                                cursor-pointer
                                                                                items-center
                                                                                justify-center
                                                                                rounded
                                                                                text-gray-400
                                                                                transition
                                                                                hover:bg-red-50
                                                                                hover:text-red-500
                                                                            "
                                                                            title="Удалить тег"
                                                                        >
                                                                            ×
                                                                        </button>

                                                                    </span>

                                                                ))

                                                            ) : (

                                                                <span className="text-xs text-gray-400">
                                                                    —
                                                                </span>

                                                            )}

                                                        </div>

                                                    </td>

                                                </tr>

                                            );

                                        })

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan={6}
                                                className="px-4 py-16 text-center"
                                            >

                                                <div className="flex flex-col items-center">

                                                    <div className="
                                                        flex
                                                        h-12
                                                        w-12
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-gray-50
                                                        text-gray-300
                                                    ">

                                                        <svg
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.6"
                                                                d="M9 13h6m-6 4h4M7 4h7l4 4v12H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                                                            />
                                                        </svg>

                                                    </div>

                                                    <p className="mt-3 text-sm font-medium text-gray-500">
                                                        Нет данных
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Документы не найдены
                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* Pagination */}
                        {menuList?.links?.length > 0 && (

                            <div className="
                                flex
                                flex-col
                                items-center
                                justify-between
                                gap-4
                                border-t
                                border-gray-100
                                px-5
                                py-4
                                sm:flex-row
                            ">

                                <div className="text-sm text-gray-500">

                                    Всего записей:

                                    <b className="ml-1 font-semibold text-gray-700">
                                        {menuList.total}
                                    </b>

                                </div>


                                <div className="flex items-center gap-1">

                                    {menuList.links.map((item, index) => {

                                        const label = item.label
                                            .replace(
                                                '&laquo; Previous',
                                                '«'
                                            )
                                            .replace(
                                                'Next &raquo;',
                                                '»'
                                            );

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

                        )}

                    </div>

                </div>

            </div>


            {/* Tag Modal */}
            <Modal
                show={selectedDocument}
                onClose={() => setSelectedDocument(null)}
            >
                <TagForm
                    documentId={selectedDocument?.id}
                    successCalback={successAtachTag}
                    errorCalback={errorAtachTag}
                />
            </Modal>

        </AuthenticatedLayout>
    );
}

export default View;

