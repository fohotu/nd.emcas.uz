import { useState } from "react";

export default function ExplorerToolbar({

    onCreate,
    onEdit,
    onDelete,
    onRefresh,
    onSearch,

}) {

    const [search, setSearch] = useState("");

    const submitSearch = (e) => {

        e.preventDefault();

        onSearch?.(search);

    };

    const Button = ({
        title,
        onClick,
        children,
    }) => (

        <button
            type="button"
            title={title}
            onClick={onClick}
            className="
                flex
                items-center
                gap-2
                px-3
                py-2
                border
                rounded
                bg-white
                hover:bg-gray-100
                active:bg-gray-200
                transition
            "
        >
            {children}
        </button>

    );

    return (

        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">

            {/* LEFT */}

            <div className="flex items-center gap-2">

                <Button
                    title="Создать"
                    onClick={onCreate}
                >

                    <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 5v14M5 12h14"
                        />
                    </svg>

                    <span>Создать</span>

                </Button>

               

                <Button
                    title="Удалить"
                    onClick={onDelete}
                >

                    <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7L5 7M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
                        />
                    </svg>

                    <span>Удалить</span>

                </Button>

                <Button
                    title="Обновить"
                    onClick={onRefresh}
                >

                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006.34 5.34L4 10M4 15a8 8 0 0013.66 3.66L20 14"
                        />
                    </svg>

                    <span>Обновить</span>

                </Button>

            </div>

            {/* RIGHT */}

            <form
                onSubmit={submitSearch}
                className="flex items-center"
            >

                <input
                    type="text"
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        w-72
                        px-3
                        py-2
                        border
                        rounded-l
                        outline-none
                        focus:border-blue-500
                    "
                />

                <button
                    className="
                        px-4
                        py-2
                        border
                        border-l-0
                        rounded-r
                        bg-blue-600
                        text-white
                        hover:bg-blue-700
                    "
                >

                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            cx="11"
                            cy="11"
                            r="7"
                            strokeWidth="2"
                        />

                        <path
                            d="M20 20l-4-4"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                    </svg>

                </button>

            </form>

        </div>

    );

}