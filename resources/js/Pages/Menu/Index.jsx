import React,{useState,useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link,router } from '@inertiajs/react';
import { Tree } from 'react-arborist';
import Modal from '@/Components/Modal';
import Create from './Create';
import Swal from 'sweetalert2';
import axios from 'axios';
function Index({ menu, query }) {

    const [selectedIds, setSelectedIds] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState({});

     const [searchForm,setSearchForm] = useState({
            title:query.title || '',
            description:query.description || '',
        });

    const deleteMenu = (id) => {
        if (confirm("Вы уверены, что хотите удалить это меню?")) {
            router.delete(route('menu.destroy', id), {
                onSuccess: () => {
                    setMenuList(menuList.filter(m => m.id !== id));
                    setSelectedIds(selectedIds.filter(sid => sid !== id));
                }
            });
        }
    }

    const onSuccessCreate = () => {
        console.log("Success");
        setCreateModal(false);
        router.visit(route('menu.index'))
    };

    const onErrorCreate = (errors) => {
        console.log("Error");
        console.error("Ошибка при создании меню:", errors);
    };

    useEffect(() => {
        setMenuList(menu);
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

    const treeData = [
        { id: "1", name: "Документы Республики Узбекистан" },
        { id: "21", name: "Документы МСЭ" },
        { id: "22", name: "Документы РСС" },
        { id: "23", name: "Документы стран мира" },
        { id: "24", name: "Документы подготовительные комиссии" },
        { id: "25", name: "АР/ВКР" ,
            children: [
                { id: "c11", name: "Ход подготовки к АР/ВКР 2023" },
                { id: "c21", name: "Рабочей группы ПК по пунктам повестки дня ВКR-23" },
                { id: "c31", name: "Ход подготовки к АР/ВКР 27" },
            ],
        },
    ];

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
            text: `Вы не сможете восстановить этих ${selectedIds.length} пользователей!`,
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
                    setSelectedIds([]);
                    Swal.fire({
                        title:'Удалено!',
                        text:`${selectedIds.length} пользователей были удалены.`,  
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
                   <Create parents={menuList?.data} onSuccessHandler={onSuccessCreate} onErrorHandler={onErrorCreate}/>
                </div>
            </Modal>

             <Modal show={editModal} onClose={() => setEditModal(false)}>
                <div className="py-10 px-5">
                    Edit
                </div>
            </Modal>

            <div>
                <button 
                    className="mb-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    onClick={() => setCreateModal(true)}
                >
                    Создать
                </button>
            </div>
             <Tree
                initialData={treeData}
                openByDefault={true}
                width="100%"
                height={500}
                indent={24}
                rowHeight={36}
                overscanCount={1}
                paddingTop={30}
                paddingBottom={10}
                padding={25}
                className="border-4 border-gray-200 rounded p-10"
                >
                {Node}
                </Tree>

             <div>
                                <div className="mx-auto p-6 my-5 bg-gray-50 border">
                                    <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
                                   
            
                                       
                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Название
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Название"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={handleChange}
                                            name="title"
                                            value={searchForm.title}
            
                                        />
                                        </div>
            
                                 
                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Описание
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Введите описание"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={handleChange}
                                            name="description"
                                            value={searchForm.description}
                                        />
                                        </div>
            
            
                                        <div>
                                        <div className="flex items-center">
                                             <button
                                            onClick={handleSearch}
                                            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-l hover:bg-blue-700 transition"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                >
                                                    <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                            </button>
            
                                             <Link
                                                href="/menu"
                                                className="flex items-center justify-center px-3 py-3 bg-gray-200 rounded-r hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                                            >   
                                                Сбросить
                                                  
                                            </Link>
                                        </div>
                                       
                                        </div>
            
                                    </form>
                                    </div>
                            </div>
            <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">
                                <input 
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    onChange={toggleAll}
                                    checked={selectedIds.length === menuList?.data?.length && menuList?.data?.length > 0}
                                />
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Название</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Описание</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата создания</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата обновления</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuList?.data?.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    <input 
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        onChange={() => {
                                            if (selectedIds.includes(item.id)) {
                                                setSelectedIds(selectedIds.filter(id => id !== item.id));
                                            } else {
                                                setSelectedIds([...selectedIds, item.id]);
                                            }
                                        }}
                                        checked={selectedIds.includes(item.id)}
                                    />
                                </td>
                                <td className="px-6 py-4">{item.title}</td>
                                <td className="px-6 py-4">{item.description}</td>
                                <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{new Date(item.updated_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <ul className="flex items-center gap-2 list-none">
                                            {/* 1. Удалить */}
                                            <li>
                                                <button 
                                                    title="Удалить"
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                                    onClick={() => deleteMenu(item.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </li>
                                            {/* 2. Изменить */}
                                            <li>
                                                <button 
                                                title="Изменить"
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                                onClick={()=>{
                                                        setSelectedMenu(item); 
                                                        setEditModal(true);
                                                    }
                                                }
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                </button>
                                            </li>
                                        </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>   

                <div className="my-5">
                                {
                                    menuList?.links?.map((item,i)=>{
                                        let label = item.label
                                                            .replace("&laquo; Previous", "«")   
                                                            .replace("Next &raquo;", "»"); 
                                        let active = item.active ? "bg-sky-500 border-sky-500 text-white":"";
                                        return <Link className={"p-2 border "+active} href={item.url || '#'} key={Math.random()}><span dangerouslySetInnerHTML={{ __html: label }} ></span></Link>
                
                                        
                                    })
                                }
                                </div> 
                
                                  {/* Панель действий, если кто-то выбран */}
                                {selectedIds.length > 0 && (
                                    <div className="bg-indigo-50 p-3 mb-2 rounded flex justify-between items-center">
                                        <span className="text-sm text-indigo-700 font-medium">
                                            Выбрано: {selectedIds.length}
                                        </span>
                                        <button onClick={removeSelected} className="text-red-600 hover:text-red-800 text-sm font-bold">
                                            Удалить выбранных
                                        </button>
                                    </div>
                                )} 


        </AuthenticatedLayout>    
  )
}

export default Index