import React from 'react';
import {router, Link } from '@inertiajs/react';

const TagDocuments = ({ data }) => {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Документы
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Список документов, связанных с тегом <span className="font-bold">{data?.name}</span>
                        </p>
                    </div>

                    <span className="
                        inline-flex items-center justify-center
                        min-w-8 h-8 px-2
                        rounded-full
                        bg-blue-100 text-blue-700
                        text-sm font-semibold
                    ">
                        {data?.documents?.length ?? 0}
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                        

                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Номер
                            </th>

                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Название
                            </th>

                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Дата
                            </th>

                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Статус
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {data?.documents?.length > 0 ? (
                            data.documents.map((document, index) => (
                                <tr
                                    key={document.id}
                                    className="
                                        cursor-pointer
                                        transition-colors
                                        hover:bg-blue-50
                                    "
                                    onClick={() => {                                            
                                                router.visit(
                                                    route(
                                                        'document.show',
                                                        document.id
                                                    )
                                                )
                                            }}
                                >
                                  

                                    <td className="px-5 py-4">
                                        <span className="font-medium text-gray-700">
                                            {document.number || '—'}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="max-w-md">
                                            <div className="font-medium text-gray-800">
                                                {document.title || 'Без названия'}
                                            </div>

                                             {
                                                document.description ? (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: document.description,
                                                        }}
                                                    />
                                                ) : ""
                                            }

                                          
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                        {document.document_date || '—'}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {document.status ? (
                                            <span className="
                                                inline-flex items-center
                                                rounded-full
                                                bg-green-50
                                                px-3 py-1
                                                text-xs font-medium
                                                text-green-700
                                            ">
                                                Действующий
                                            </span>
                                        ) : (
                                            <span className="
                                                inline-flex items-center
                                                rounded-full
                                                bg-gray-100
                                                px-3 py-1
                                                text-xs font-medium
                                                text-gray-500
                                            ">
                                                Пассивный
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-5 py-12 text-center"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="
                                            mb-3 flex h-12 w-12
                                            items-center justify-center
                                            rounded-full bg-gray-100
                                        ">
                                            <svg
                                                className="h-6 w-6 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.8"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414.414L19 8.414V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>

                                        <p className="text-sm font-medium text-gray-600">
                                            Документы отсутствуют
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            Для этого тега пока нет связанных документов
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TagDocuments;


