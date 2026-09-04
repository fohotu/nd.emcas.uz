import { useState } from "react";
import { Link } from "@inertiajs/react";

function TreeItem({
    node,
    level = 0,
    selectedNode,
    onSelect,
}) {

    const [open, setOpen] = useState(node.open ?? true);

    const hasChildren =
        node.children &&
        node.children.length > 0;

    return (
        <>

            <div
                onClick={() => onSelect(node)}
                className={`
                    flex
                    items-center
                    h-9
                    cursor-pointer
                    select-none
                    hover:bg-blue-50
                    transition

                    ${
                        selectedNode?.id === node.id
                            ? "bg-blue-100 text-blue-700"
                            : ""
                    }
                `}
                style={{
                    paddingLeft: `${level * 22 + 10}px`,
                }}
            >

                {/* Expand */}

                <div
                    className="w-5 flex justify-center"
                    onClick={(e) => {

                        e.stopPropagation();

                        if (hasChildren) {
                            setOpen(!open);
                        }

                    }}
                >

                    {hasChildren ? (
                        open ? (
                            <span>▼</span>
                        ) : (
                            <span>▶</span>
                        )
                    ) : (
                        <span></span>
                    )}

                </div>

                {/* Icon */}

                <div className="w-6 text-center">

                    {hasChildren ? (
                        open ? "📂" : "📁"
                    ) : (
                        "📄"
                    )}

                </div>

                {/* Title */}

                <div className="flex-1 truncate">

                    {node.href ? (

                        <Link
                            href={node.href}
                            className="block w-full"
                        >
                            {node.name}
                        </Link>

                    ) : (

                        node.name

                    )}

                </div>

            </div>

            {hasChildren && open && (

                node.children.map((child) => (

                    <TreeItem
                        key={child.id}
                        node={child}
                        level={level + 1}
                        selectedNode={selectedNode}
                        onSelect={onSelect}
                    />

                ))

            )}

        </>
    );

}

export default function ExplorerSidebar({

    treeData = [],
    selectedNode,
    onSelect,

}) {

    return (

        <aside
            className="
                w-80
                border-r
                bg-gray-50
                flex
                flex-col
            "
        >

            {/* Header */}

            <div className="p-4 border-b">

                <h2 className="font-semibold text-gray-700">
                    Навигация
                </h2>

            </div>

            {/* Search */}

            <div className="p-3 border-b">

                <input
                    type="text"
                    placeholder="Поиск..."
                    className="
                        w-full
                        border
                        rounded
                        px-3
                        py-2
                        outline-none
                        focus:border-blue-500
                    "
                />

            </div>

            {/* Tree */}

            <div
                className="
                    flex-1
                    overflow-auto
                "
            >

                {treeData.map((node) => (

                    <TreeItem
                        key={node.id}
                        node={node}
                        selectedNode={selectedNode}
                        onSelect={onSelect}
                    />

                ))}

            </div>

        </aside>

    );

}