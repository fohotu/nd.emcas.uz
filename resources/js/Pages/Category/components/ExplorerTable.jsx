import { useState } from "react";

export default function ExplorerTable({
    columns = [],
    data = [],

    selected = [],
    onSelect,

    onOpen,
    onEdit,
    onDelete,

    loading = false,
}) {

    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const changeSort = (field) => {

        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }

    };

    const sortedData = [...data].sort((a, b) => {

        if (!sortField) return 0;

        if (a[sortField] > b[sortField])
            return sortDirection === "asc" ? 1 : -1;

        if (a[sortField] < b[sortField])
            return sortDirection === "asc" ? -1 : 1;

        return 0;

    });

    const toggleAll = (checked) => {

        if (checked) {
            onSelect?.(data.map(item => item.id));
        } else {
            onSelect?.([]);
        }

    };

    const toggleRow = (id) => {

        if (selected.includes(id)) {

            onSelect?.(
                selected.filter(x => x !== id)
            );

        } else {

            onSelect?.([
                ...selected,
                id
            ]);

        }

    };

    return (

        <div className="h-full overflow-auto">

            <table className="w-full border-collapse">

                <thead className="sticky top-0 bg-gray-100 z-10">

                    <tr>

                        <th className="w-12 border-b p-3">

                            <input
                                type="checkbox"
                                checked={
                                    data.length > 0 &&
                                    selected.length === data.length
                                }
                                onChange={(e) =>
                                    toggleAll(e.target.checked)
                                }
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                          
                            />

                        </th>

                        {columns.map(col => (

                            <th
                                key={col.key}
                                className="
                                    border-b
                                    p-3
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    cursor-pointer
                                    select-none
                                    hover:bg-gray-200
                                "
                                onClick={() => changeSort(col.key)}
                            >

                                <div className="flex items-center gap-2">

                                    {col.title}

                                    {sortField === col.key && (

                                        <span>

                                            {sortDirection === "asc"
                                                ? "▲"
                                                : "▼"}

                                        </span>

                                    )}

                                </div>

                            </th>

                        ))}

                        <th className="border-b p-3 w-36 text-center">

                            Действия

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loading && (

                        <tr>

                            <td
                                colSpan={columns.length + 2}
                                className="text-center p-10 text-gray-500"
                            >

                                Загрузка...

                            </td>

                        </tr>

                    )}

                    {!loading && sortedData.length === 0 && (

                        <tr>

                            <td
                                colSpan={columns.length + 2}
                                className="text-center p-10 text-gray-500"
                            >

                                Нет данных

                            </td>

                        </tr>

                    )}

                    {!loading && sortedData.map(item => (

                        <tr
                            key={item.id}
                            className={`
                                border-b
                                hover:bg-blue-50
                                cursor-pointer

                                ${
                                    selected.includes(item.id)
                                        ? "bg-blue-100"
                                        : ""
                                }
                            `}
                            onDoubleClick={() => onOpen?.(item)}
                        >

                            <td className="p-3">

                                <input
                                    type="checkbox"
                                    checked={selected.includes(item.id)}
                                    onChange={() =>
                                        toggleRow(item.id)
                                    }
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                          
                                />

                            </td>

                            {columns.map(col => (

                                <td
                                    key={col.key}
                                    className="p-3"
                                >

                                    {col.key === "title" && (

                                        <div className="flex items-center gap-2">
                                            <span>
                                                {item[col.key]}
                                            </span>
                                        </div>
                                    )}

                                    {col.key !== "title" &&
                                        item[col.key]}

                                </td>

                            ))}

                            <td>

                                <div className="flex justify-center gap-2">


                                    <button
                                                title="Редактировать"
                                                onClick={() => onEdit?.(item)}
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
                                  


                                     <button
                                                title="Удалить"
                                                onClick={() => onDelete?.(item)}
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
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

    );

}