import ExplorerSidebar from "./ExplorerSidebar";
import ExplorerToolbar from "./ExplorerToolbar";
import ExplorerBreadcrumb from "./ExplorerBreadcrumb";
import ExplorerTable from "./ExplorerTable";
import ExplorerPagination from "./ExplorerPagination";

export default function Explorer({
    treeData = [],
    breadcrumb = [],
    tableData = [],
    columns = [],
    pagination = {},
    selectedNode = null,
    onNodeSelect,
    onSearch,
    onCreate,
    onEdit,
    onDelete,
    onRefresh,
}) {
    return (
        <div className="bg-white border rounded overflow-hidden h-[calc(100vh-120px)]">
            <div className="flex h-full">
                {/* ================= LEFT ================= */}
                <ExplorerSidebar
                    treeData={treeData}
                    selectedNode={selectedNode}
                    onSelect={onNodeSelect}
                />
                {/* ================= RIGHT ================= */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    <ExplorerBreadcrumb
                        items={breadcrumb}
                    />
                    <ExplorerToolbar
                        onSearch={onSearch}
                        onCreate={onCreate}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onRefresh={onRefresh}
                    />
                    <div className="flex-1 overflow-auto">

                        <ExplorerTable
                            columns={columns}
                            data={tableData}
                        />

                    </div>

                    <ExplorerPagination
                        pagination={pagination}
                    />

                </div>

            </div>

        </div>

    );

}