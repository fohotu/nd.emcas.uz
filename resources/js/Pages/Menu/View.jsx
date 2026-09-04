import React,{useState,useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrubs from './BreadCrubs';
import { Tree } from 'react-arborist';

function View({category,menu_item}) {
    
    console.log(category,menu_item);

    const  breadcrumb = [
        { title: "Панель управления",href: 'dashboard' },
        { title: menu_item?.title},
    ];

    const [searchForm,setSearchForm] = useState({
            title: '',
            description: '',
    });

    const [treeData, setTreeData] = useState([]);

    const [menuList, setMenuList] = useState([]);

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

    return (
        <AuthenticatedLayout
            title="View Menu"
            description="View menu details"
        >
        <BreadCrubs items={breadcrumb} /> 
        <div style={{"display":"none"}}>
            { treeData.length === 0 ? (
                <p className="text-gray-500">Нет данных для отображения</p>
            ) : (
                  <div className="mt-4">
                <Tree
                    initialData={treeData}
                    openByDefault={true}
                    width={400}
                    height={800}
                    rowHeight={50}
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
                            <span
                                className="block min-w-0 truncate"
                                title={node.data.name}
                            >
                                {node.data.name}
                            </span>
                        </div>
                    )}
                </Tree>
            </div>
            )}
        </div>
          


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
                        rowHeight={50}
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

    <div className="lg:col-span-8">

        <div className="bg-white border rounded shadow-sm overflow-hidden">


            {/* Header */}

            <div className="px-5 py-4 border-b bg-gray-50 flex items-center justify-between">

                <div>

                    <h3 className="font-semibold text-gray-800">
                        Данные категории
                    </h3>

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

                        </tr>

                    </thead>


                    <tbody className="divide-y divide-gray-100">

                        {menuList?.data?.length > 0 ? (

                            menuList.data.map((item, index) => (

                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-50 transition"
                                >

                                    <td className="px-4 py-4 text-gray-500">

                                        {index + 1}

                                    </td>


                                    <td className="px-4 py-4 font-medium text-gray-800">

                                        {item.title}

                                    </td>


                                    <td className="px-4 py-4 text-gray-600">

                                        {item.description || (
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

                                </tr>

                            ))

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