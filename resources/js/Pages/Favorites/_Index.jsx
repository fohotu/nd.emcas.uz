import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm,Link,router } from '@inertiajs/react';
function Index({documents}) {
  return (
    <AuthenticatedLayout>
        Favorite


          <div className="overflow-x-auto">
        
                                <table className="min-w-full divide-y divide-gray-200">
        
                                    <thead className="bg-gray-50">
        
                                        <tr>
        
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                #
                                            </th>
        
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Номер документа
                                            </th>
        
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Название
                                            </th>
        
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Принадлежит
                                            </th>
        
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Дата
                                            </th>
        
                  
        
                                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                                                Статус
                                            </th>
        
                                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                                                #
                                            </th>
        
                                        </tr>
        
                                    </thead>
        
        
                                    <tbody className="divide-y divide-gray-200 bg-white">
        
                                        {documents?.data?.length > 0 ? (
                                            documents.data.map((document, index) => {
                                                const isFavorite = true;
                                                return (
                                                    <tr
                                                        key={document.id}
                                                        className="cursor-pointer hover:bg-gray-50"
                                                        onClick={() => {
                                                                router.visit(
                                                                    route(
                                                                        'document.show',
                                                                        document.id
                                                                    )
                                                                )
                                                            }
                                                        }
                                                    >
        
                                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                                                    <div className="flex items-center gap-2">
                                                        {/* Избранное */}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addToFavorites(document.id);
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
                                                                attachTag(document);
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
        
                                                    {/* Номер */}
        
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
        
                                                        {document.number || '-'}
        
                                                    </td>
        
        
                                                    {/* Название */}
        
                                                    <td className="max-w-md px-4 py-3 text-sm text-gray-700">
        
                                                        <div className="line-clamp-2">
        
                                                            {document.title}
        
                                                        </div>
        
                                                    </td>
        
        
                                                    {/* Тип */}
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {document.category?.menu?.title || ''} ({document.category?.title || '-'})
                                                    </td>
                                                    {/* Дата */}
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
        
                                                        {document.document_date || '-'}
        
                                                    </td>
        
        
                                                    {/* Статус */}
        
                                                    <td className="px-4 py-3 text-right text-sm font-medium">
        
                                                        {document.status === 'active' && (
        
                                                            <span className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                                Действующий
                                                            </span>
        
                                                        )}
                                                        {document.status === 'passive' && (
                                                            <span className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                                Утратил силу
                                                            </span>
                                                        )}
        
                                                        {!['active', 'passive'].includes(document.status) && (
        
                                                            <span className="text-sm text-gray-500">
                                                                -
                                                            </span>
        
                                                        )}
                                                    </td>
        
                                                    <td className="px-4 py-3 text-right text-sm font-medium">
                                                        <div className="flex flex-wrap justify-end gap-1">
                                                            {document.tags.map((tag) => (
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
                                                                            removeTag(document.id, tag.id);
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
                                                );
                                            }
        
                                            )
        
                                        ) : (
        
                                            <tr>
        
                                                <td
                                                    colSpan="7"
                                                    className="px-4 py-10 text-center text-gray-500"
                                                >
                                                    Документы не найдены
                                                </td>
        
                                            </tr>
        
                                        )}
        
                                    </tbody>
        
                                </table>
        
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
    </AuthenticatedLayout>
  )
}

export default Index