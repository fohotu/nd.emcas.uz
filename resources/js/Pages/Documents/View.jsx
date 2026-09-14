import React,{useState,useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrubs from './BreadCrubs';
import { Tree } from 'react-arborist';
import {router, Link } from '@inertiajs/react';
import SearchForm from './SearchForm';

import Modal from '@/Components/Modal';
import TagForm from './TagForm';
import Swal from 'sweetalert2';

function View({category,menu_item,documents,favoriteIds,selectedCategoryId}) {
    
  

    
    let query = {};
    let filter = {};

    const  breadcrumb = [
        { title: "Панель управления",href: 'dashboard' },
        { title: menu_item?.title},
    ];

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

    const [treeData, setTreeData] = useState([]);

    const [menuList, setMenuList] = useState([]);

    const [favoriteDocuments, setFavoriteDocuments] = useState([]);
    const [selectedDocument,setSelectedDocument] = useState(null);



    const addToFavorites = (documentId) => {
        axios.post(route('favorites.store'), {
            document_id: documentId,
        }).then((res)=>{
            const isFavorite = favoriteDocuments.includes(documentId);
            if (isFavorite) {
                setFavoriteDocuments((prev) =>
                    prev.filter((id) => id !== documentId)
                );
            } else {
                setFavoriteDocuments((prev) => [...prev, documentId]);
            }
        });
    };
    
    const attachTag = (document) => {
        setSelectedDocument(document);
    }

    const removeTag = (document_id, tag_id) => {
        axios.delete(route('tags.remove'), {
           data:{ 
            document_id,
            tag_id,
           } 
        }).then((res) => {
            if(res.data.success){
                router.reload();
            }
        });
    
    }
    
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
    }
    
    const errorAtachTag = (error) => {
        Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to add tags',
        });
    }

     useEffect(() => {
            if(favoriteIds?.length){
                setFavoriteDocuments(favoriteIds);
            }
        },[]);

    useEffect(() => {
        setTreeData(buildTree(category));
    }, [category]);

    function handleSearch(e){
       
            e.preventDefault();
            router.get('/menu',searchForm,{
                onSuccess: (res) => {
                    
                },
            })
    }

    const buildTree = (items, parentId = null) => {
        return items
            .filter(item => item.parent_id === parentId)
            .map(item => ({
                id: item.id,
                name: item.title,
                data: item,
                children: buildTree(items, item.id),
        }));
    };

    function handleChange(e){
        const key = e.target.name;
        const value = e.target.value;
        setSearchForm({...searchForm,[key]:value});
    }

    function handleSearch(e){
            e.preventDefault();
            let url = `/documents/menu/${menu_item.id}/category/${selectedCategoryId ?? ""}`
            router.get(url,searchForm,{
                onSuccess: (res) => {
                    console.log(res);
                },
            })
        }

  

    return (
        <AuthenticatedLayout
            title="View Menu"
            description="View menu details"
        >
        <BreadCrubs items={breadcrumb} /> 
     


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
    {/* =========================
        LEFT COLUMN - TREE
    ========================= */}

    <div className="lg:col-span-4">

        <div className="bg-white border rounded shadow-sm overflow-hidden">

            {/* Header */}

            <div className="px-5 py-4 border-b bg-gray-50">

                <h3 className="font-semibold text-gray-800">
                    Категории
                </h3>

                <p className="text-sm text-gray-500">
                    Выберите категорию
                </p>

            </div>


            {/* Tree */}

            <div className="p-3">

                {treeData.length === 0 ? (

                    <p className="py-5 text-center text-gray-500">
                        Нет данных для отображения
                    </p>

                ) : (

                    <Tree
                        initialData={treeData}
                        openByDefault={true}
                        width="100%"
                        height={800}
                        rowHeight={33}
                    >
                        {({ node, style }) => (
                            <div
                                style={style}
                                className="
                                    flex
                                    items-center
                                    px-3
                                    cursor-pointer
                                    hover:bg-gray-100
                                    min-w-0
                                "
                                onClick={() => {
                                    console.log(node.data);
                                }}
                            >
                            <Link
                                href={`/documents/menu/${menu_item.id}/category/${node.data.id}`}
                                className="
                                    flex
                                    items-center
                                    w-full
                                    h-full
                                    px-3
                                    min-w-0
                                    cursor-pointer
                                "
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
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


    {/* =========================
        RIGHT COLUMN - TABLE
    ========================= */}

     <Modal show={selectedDocument} onClose={() => setSelectedDocument(null)}>
        <TagForm 
            documentId = {selectedDocument?.id}
            successCalback={successAtachTag}
            errorCalback={errorAtachTag}
        />
    </Modal>    


    <div className="lg:col-span-8">

        <div className="bg-white border rounded shadow-sm overflow-hidden">

           
            {/* Header */}
            <div className="px-5 py-4 border-b bg-gray-50">
                <SearchForm
                    filter={filter}
                    onSearch={handleSearch}
                    searchForm={searchForm}
                    setSearchForm={setSearchForm}
                />
            </div>
            <div className="px-5 py-4 border-b bg-gray-50 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Всего записей: {menuList?.total || 0}
                    </p>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                #
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                Название
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                Описание
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                Создано
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                Статус
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                Тегы
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {documents?.data?.length > 0 ? (
                            documents.data.map((item, index) => {
                        
                                const isFavorite = favoriteDocuments.includes(item.id);

                                return (
                                <tr
                                    key={item.id}
                                    className="cursor-pointer hover:bg-blue-50 transition"
                                    onClick={() => {                                            
                                        router.visit(
                                            route(
                                                'document.show',
                                                item.id
                                            )
                                        )
                                    }}
                                >
                                       <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                                            <div className="flex items-center gap-2">
                                                {/* Избранное */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToFavorites(item.id);
                                                    }}
                                                    className={`
                                                        inline-flex items-center justify-center
                                                        w-8 h-8
                                                        rounded-md
                                                        text-gray-400
                                                        hover:text-yellow-500
                                                        hover:bg-yellow-50
                                                        transition
                                                        cursor-pointer
                                                        ${isFavorite
                                                            ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                                            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                                                        }
                                                    `}
                                                    
                                                    title="Добавить в избранное"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11.48 3.499a.75.75 0 011.04 0l2.52 2.52a.75.75 0 00.53.22h3.57a.75.75 0 01.75.75v3.57a.75.75 0 00.22.53l2.52 2.52a.75.75 0 010 1.04l-2.52 2.52a.75.75 0 00-.22.53v3.57a.75.75 0 01-.75.75h-3.57a.75.75 0 00-.53.22l-2.52 2.52a.75.75 0 01-1.04 0l-2.52-2.52a.75.75 0 00-.53-.22H6.38a.75.75 0 01-.75-.75v-3.57a.75.75 0 00-.22-.53l-2.52-2.52a.75.75 0 010-1.04l2.52-2.52a.75.75 0 00.22-.53v-3.57a.75.75 0 01.75-.75h3.57a.75.75 0 00.53-.22l2.52-2.52z"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Прикрепить к тегу */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        attachTag(item);
                                                    }}
                                                    className="
                                                        inline-flex items-center justify-center
                                                        w-8 h-8
                                                        rounded-md
                                                        text-gray-400
                                                        hover:text-blue-600
                                                        hover:bg-blue-50
                                                        transition
                                                        cursor-pointer
                                                    "
                                                    title="Прикрепить к тегу"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M7 7h.01M3 11.5V6a3 3 0 013-3h5.5a3 3 0 012.12.88l6.5 6.5a3 3 0 010 4.24l-3 3a3 3 0 01-4.24 0l-6.5-6.5A3 3 0 013 11.5z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td> 

                                    <td className="px-4 py-4 text-gray-800">
                                      
                                        {item.title}
                                      
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">
                                            {item.description ? (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description,
                                                    }}
                                                />
                                            ) : (
                                                <span className="italic text-gray-400">
                                                    Нет описания
                                                </span>
                                            )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="
                                            px-2
                                            py-1
                                            text-xs
                                            bg-gray-100
                                            text-gray-700
                                            rounded
                                        ">
                                            {new Date(
                                                item.created_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </td>

                                      <td className="px-4 py-3 text-right text-sm font-medium">

                                                {item.status === 'active' && (

                                                    <span className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                        Действующий
                                                    </span>

                                                )}
                                                {item.status === 'passive' && (
                                                    <span className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                        Утратил силу
                                                    </span>
                                                )}

                                                {!['active', 'passive'].includes(item.status) && (

                                                    <span className="text-sm text-gray-500">
                                                        -
                                                    </span>

                                                )}
                                            </td>


                                            <td className="px-4 py-3 text-right text-sm font-medium">
                                                <div className="flex flex-wrap justify-end gap-1">
                                                    {item.tags.map((tag) => (
                                                        <span
                                                            key={tag.id}
                                                            className="
                                                                inline-flex items-center gap-1
                                                                rounded-md
                                                                bg-gray-100
                                                                px-2 py-1
                                                                text-gray-700
                                                            "
                                                        >
                                                            {tag.name}

                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeTag(item.id, tag.id);
                                                                }}
                                                                className="
                                                                    inline-flex items-center justify-center
                                                                    w-4 h-4
                                                                    rounded
                                                                    text-gray-400
                                                                    hover:text-red-500
                                                                    hover:bg-red-50
                                                                "
                                                                title="Remove tag"
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                </tr>
                            )})

                        ) : (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="
                                        px-4
                                        py-12
                                        text-center
                                        text-gray-400
                                    "
                                >
                                    Нет данных
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* =========================
                PAGINATION
            ========================= */}

            {menuList?.links?.length > 0 && (

                <div className="
                    px-5
                    py-4
                    border-t
                    flex
                    items-center
                    justify-between
                    gap-4
                ">

                    <div className="text-sm text-gray-500">

                        Всего записей:

                        <b className="ml-1">
                            {menuList.total}
                        </b>

                    </div>


                    <div className="flex items-center gap-1">

                        {menuList.links.map((item, index) => {

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

                </div>

            )}

        </div>

    </div>

</div>

        </AuthenticatedLayout>
    )
}

export default View