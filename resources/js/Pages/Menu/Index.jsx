import React,{useState,useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link,router } from '@inertiajs/react';
import { Tree } from 'react-arborist';
import Modal from '@/Components/Modal';
import Create from './Create';
import Swal from 'sweetalert2';
import axios from 'axios';
import Edit from './Edit';
import BreadCrubs from './BreadCrubs';
function Index({ menu, query,treeMenu }) {

    console.log(treeMenu);

    const [selectedIds, setSelectedIds] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState({});

    const [searchForm,setSearchForm] = useState({
            title:query.title || '',
            description:query.description || '',
    });

  


    const deleteMenu = (id) => {
        Swal.fire({
            title: 'Вы уверены?',
            text: "Вы не сможете восстановить это меню!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/menu/${id}`)
                .then(() => {
                    Swal.fire({
                        title:'Удалено!',
                        text:'Меню был удален.',
                        icon:'success',
                        timer:2000,
                    })
                    let filteredMenu = menu?.data?.filter(m => m.id!==id);
                    let filteredTree = treeMenu?.filter(m=>m.id!==id);
                    let newTree = buildTree(filteredTree);
                    setMenuList({...menu,...menuList,data:filteredMenu});
                    setTreeData(newTree);
                })
                .catch(err => console.error(err));
            }
        });
    }

    const buildTree = (menus) => {


        return menus?.map(menu => ({
            id: menu.id,
            name: menu.title,
            children: menu.children_recursive
            ? buildTree(menu.children_recursive)
            : []
        }));



    };

  

    const onSuccessCreate = () => {
        setCreateModal(false);
        Swal.fire({
            title: 'Успешно!',
            text: 'Меню успешно создано.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        });
        router.visit(route('menu.index'))
    };

    const onErrorCreate = (errors) => {
        console.log("Error");
        console.error("Ошибка при создании меню:", errors);
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
        router.visit(route('menu.index'))
    };

    const onErrorUpdate = (errors) => {
        console.log("Error");
        console.error("Ошибка при создании меню:", errors);
    };

    useEffect(() => {
        setMenuList(menu);
        let td = buildTree(treeMenu);
        console.log(td);
        setTreeData(td);
    },[]);

    function handleSearch(e){
            e.preventDefault();
            router.get('/menu',searchForm,{
                onSuccess: (res) => {
                    
                },
            })
    }

    function handleChange(e){
        const key = e.target.name;
        const value = e.target.value;
        setSearchForm({...searchForm,[key]:value});
    }


    function Node({ node, style, dragHandle }) {
        /* This node instance can do many things. See the API reference. */
        return (
            <div style={style} ref={dragHandle}   className="flex items-center ml-5 cursor-pointer">
            {
                /*
                node.isLeaf ? "🍁" : "🗀"
                */
            }
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>
            <span className="ml-1">
                {node.data.name}
            </span>
            </div>
        );
    }

    

    const toggleAll = (e) => {

        if (e.target.checked) {
            setSelectedIds(menuList?.data.map(m => m.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Обработка клика по конкретной строке
    const toggleOne = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id) 
                : [...prev, id]
        );
    };



    const removeSelected = () => {

        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы не сможете восстановить этих ${selectedIds.length} меню!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('/menu/bulk-delete', { ids: selectedIds })
                .then(() => {
                    let filteredMenu = menu?.data?.filter(m => !selectedIds.includes(m.id));
                    setMenuList({...menu,...menuList,data:filteredMenu});

                    let filteredTree = treeMenu?.filter(m=>!selectedIds.includes(m.id));
                    let newTree = buildTree(filteredTree);
                    setTreeData(newTree);

                    setSelectedIds([]);
                    Swal.fire({
                        title:'Удалено!',
                        text:`${selectedIds.length} меню были удалены.`,  
                        icon:'success',
                        timer:1500,
                        showConfirmButton:false,
                    })
                })
                .catch(error => {
                    console.error("Ошибка при удалении", error);
                });
            }
        });
    };


    const handleMove = ({ dragIds, parentId, index }) => {
        console.log("Перемещаем:", dragIds);
        console.log("Новый parent:", parentId);
        console.log("Новая позиция:", index);

        // 👉 обновить состояние (frontend)
        // 👉 отправить на сервер (backend)
        };
    
    const  breadcrumb = [
        { title: "Панель управления",href: 'dashboard' },
        { title: "Меню" },
    ];
   

  return (
          <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menu
                </h2>
            }
        >
            <Head title="Menu" />
            <Modal show={createModal} onClose={() => setCreateModal(false)} >
                <div className="py-10 px-5">
                   <Create 
                        parents={menuList?.data} 
                        onSuccessHandler={onSuccessCreate} 
                        onErrorHandler={onErrorCreate}
                        onClose = {()=>setCreateModal(false)}
                   />
                </div>
            </Modal>

             <Modal show={editModal} onClose={() => setEditModal(false)}>
                <div className="py-10 px-5">
                    <Edit 
                        menu={selectedMenu} 
                        parents={menuList?.data} 
                        onSuccessHandler={onSuccessUpdate} 
                        onErrorHandler={onErrorUpdate}
                        onClose = {()=>setEditModal(false)}
                    />
                </div>
            </Modal>

           
            {
                /*
           treeData.length ?
             <Tree
               // initialData={treeData}
                data={treeData}
                openByDefault={true}
                width="100%"
                height={500}
                indent={24}
                rowHeight={36}
                overscanCount={1}
                paddingTop={30}
                paddingBottom={10}
                padding={25}
                onMove={handleMove}
                className="border-4 border-gray-200 rounded p-10"
                >
                {Node}
                </Tree>
                :""

                */
                }

            <BreadCrubs items={breadcrumb} />   

             <div className="mt-2">
                <div className="bg-white border rounded shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Поиск меню
                            </h2>
                            <p className="text-sm text-gray-500">
                                Используйте фильтры для поиска записей.
                            </p>
                        </div>
                    </div>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                        {/* Название */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Название
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={searchForm.title}
                                onChange={handleChange}
                                placeholder="Введите название..."
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded
                                    px-3
                                    py-2.5
                                    bg-white
                                    transition
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                "
                            />
                        </div>

                        {/* Описание */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Описание
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={searchForm.description}
                                onChange={handleChange}
                                placeholder="Введите описание..."
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded
                                    px-3
                                    py-2.5
                                    bg-white
                                    transition
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                "
                            />
                        </div>
                        {/* Кнопки */}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleSearch}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    px-5
                                    py-2.5
                                    rounded
                                    transition
                                    shadow-sm
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                Найти
                            </button>
                            <Link
                                href="/menu"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    px-5
                                    py-2.5
                                    rounded
                                    border
                                    border-gray-300
                                    bg-gray-100
                                    hover:bg-gray-200
                                    text-gray-700
                                    transition
                                "
                            >
                                Сбросить
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            
            <div>
                 <button
                    type="button"
                    title=""
                    onClick={() => setCreateModal(true)}
                    className="
                        flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        my-5
                        border
                        rounded
                        bg-white
                        hover:bg-gray-100
                        active:bg-gray-200
                        transition
                    "
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
                </button>
            </div>
            {selectedIds.length > 0 && (
                <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded px-4 py-3">
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span className="text-sm font-medium text-gray-700">
                            Выбрано записей:
                            <span className="ml-1 font-bold text-blue-600">
                                {selectedIds.length}
                            </span>
                        </span>
                    </div>

                    <div className="flex gap-2">

                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                            Снять выделение
                        </button>

                        <button
                            type="button"
                            onClick={removeSelected}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            🗑 Удалить выбранные
                        </button>

                    </div>
                </div>
            )}    

            <div className="bg-white border rounded shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="w-12 px-4 py-3 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={
                                            selectedIds.length === menuList?.data?.length &&
                                            menuList?.data?.length > 0
                                        }
                                        onChange={toggleAll}
                                    />
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Название
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Описание
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Создано
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Обновлено
                                </th>

                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Действия
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {menuList?.data?.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-50 transition-colors"
                                >
                                    <td className="px-4 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked = {selectedIds.includes(item.id)}
                                            onChange = {() => {
                                                if (selectedIds.includes(item.id)){
                                                    setSelectedIds(
                                                        selectedIds.filter(id => id !== item.id)
                                                    );
                                                } else {
                                                    setSelectedIds([...selectedIds, item.id]);
                                                }
                                            }}
                                        />
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="font-medium text-gray-800">
                                            {item.title}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-gray-600">
                                        {item.description || (
                                            <span className="text-gray-400 italic">
                                                Нет описания
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                            {new Date(item.updated_at).toLocaleDateString()}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">

                                            <button
                                                title="Редактировать"
                                                onClick={() => {
                                                    setSelectedMenu(item);
                                                    setEditModal(true);
                                                }}
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
                                                onClick={() => deleteMenu(item.id)}
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
            </div>            

           <div className="mt-6 flex items-center justify-between">

    <div className="text-sm text-gray-500">
        Всего записей: <b>{menuList.total}</b>
    </div>

    <div className="flex items-center gap-1">

        {menuList?.links?.map((item, index) => {

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
    
    


        </AuthenticatedLayout>    
  )
}

export default Index