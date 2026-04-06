import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link,router } from '@inertiajs/react';
import AdminIcon from './Partials/AdminIcon';
import UserIcon from './Partials/UserIcon';
import Swal from 'sweetalert2';
import Modal from '@/Components/Modal';
import Edit from './Edit';
import Create from './Create';
import ChangePassword from './ChangePassword';
import ChangeRole from './ChangeRole';
import axios from 'axios';


export default function Index({users,query}) {



    const [editModal,setEditModal] = useState(false);

    const [passwordModal,setPasswordModal] = useState(false);
    const [roleModal,setRoleModal] = useState(false);
    const [blockModal,setBlockModal] = useState(false);
    const [createModal,setCreateModal] = useState(false);


    const [selectedUser,setSelectedUser] = useState(null);

    const [usersList,setUsersList] = useState(null);

    const [searchForm,setSearchForm] = useState({
        name:query.name || '',
        email:query.email || '',
        role:query.role || '',
    });

    useEffect(()=>{
        console.log("Пропсы обновились:", users); // Проверьте в консоли
        setUsersList(users);
    },[users.data,users]);


    // Состояние для хранения ID выбранных пользователей
    const [selectedIds, setSelectedIds] = useState([]);

    // Обработка клика по главному чекбоксу (Выделить всё)
    const toggleAll = (e) => {

        if (e.target.checked) {
            setSelectedIds(usersList?.data.map(u => u.id));
        } else {
            setSelectedIds([]);
        }
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
                axios.post('/users/bulk-delete', { ids: selectedIds })
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

    // Обработка клика по конкретной строке
    const toggleOne = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id) 
                : [...prev, id]
        );
    };


    const successChangeRoleHandler = () => {
        setRoleModal(false);
        Swal.fire({
            title:'Успешно!',
            text:'Роль пользователя успешно изменена.',
            icon:'success',
            iconColor: '#28a745',
            timer:1500,
            showConfirmButton:false,
        })
    };

    const errorChangeRoleHandler = (errors) => {
        let errorText = '';
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
               // errorText += `${errors[key]}\n`;
            }
        }
        Swal.fire({
            title:'Ошибка!',
            text:errorText,
            icon:'error',
        })
    }

    const  successChangePasswordHandler = () => {
        setPasswordModal(false);
        Swal.fire({
            title:'Успешно!',
            text:'Пароль пользователя успешно изменен.',
            icon:'success',
            iconColor: '#28a745',
            timer:1500,
            showConfirmButton:false,
        })
    };

    const errorChangePasswordHandler = (errors) => {    
        let errorText = '';
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
               // errorText += `${errors[key]}\n`;
            }
        }
        Swal.fire({
            title:'Ошибка!',
            text:errorText,
            icon:'error',
        })
    }

    const  successEditHandler = () => {
        setEditModal(false);
        Swal.fire({
            title:'Успешно!',
            text:'Пользователь успешно обновлен.',
            icon:'success',
            iconColor: '#28a745',
            timer:1500,
            showConfirmButton:false,
        })
    };

    const errorEditHandler = (errors) => {
  
        let errorText = '';
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
               // errorText += `${errors[key]}\n`;
            }
        }
        Swal.fire({
            title:'Ошибка!',
            text:errorText,
            icon:'error',
        })
    }

    const blockUser = (user) => {

        let title = user.status ? 'Заблокировать' : 'Разблокировать';
        let text = user.status ? 'Вы сможете восстановить этого пользователя любое время!' : 'Доступ пользователя к системе будет полностью восстановлен!';
        let confirm = user.status ? 'Да, заблокировать!' : 'Да, разблокировать!';
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText:confirm,
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/users/${user.id}/block`)  
                .then(() => {

                    let alertTitle = user.status ? 'Заблокировано!' : 'Разблокировано!';
                    let alertText = user.status ? 'Пользователь был заблокирован.' : 'Доступ для пользователя восстановлен.';
                    let alertIcon = 'success';
                        
                    Swal.fire({
                            title:alertTitle,
                            text:alertText,
                            icon:alertIcon,
                            timer:2000,
                    })
                   
                    
                    let updatedUsers = usersList.data.map(u => {
                        if(u.id === user.id){
                            return {...u, status: !u.status};
                        }
                        return u;
                    });
                    setUsersList({...usersList, data: updatedUsers});
       
           
                })
                .catch(err => console.error(err));
                
            }
        });
    }

     function handleSearch(e){
        e.preventDefault();
        router.get('/users',searchForm,{
            onSuccess: (res) => {
                //console.log(res.props.query);
                //setSearchForm(res.props.query);
            },
        })
    }


    function handleChange(e){
        const key = e.target.name;
        const value = e.target.value;
        setSearchForm({...searchForm,[key]:value});
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Вы уверены?',
            text: "Вы не сможете восстановить этого пользователя!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
             
                axios.delete(`/users/${id}`)
                .then(() => {
                     Swal.fire({
                        title:'Удалено!',
                        text:'Пользователь был удален.',
                        icon:'success',
                        timer:2000,
                })
                    let filtered = usersList.data.filter(u => u.id !== id);
                    setUsersList({...usersList, data: filtered});
           
                })
                .catch(err => console.error(err));
            }
        });
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <Modal show={editModal} onClose={() => setEditModal(false)}>
                <div className="py-10 px-5">
                {
                    selectedUser ? <Edit user={selectedUser} onSuccess={successEditHandler} onError={errorEditHandler}/> : <div>Loading...</div>
                }
                </div>
            </Modal>

            <Modal show={passwordModal} onClose={() => setPasswordModal(false)}>
                <div className="py-10 px-5">
                {
                    selectedUser ? <ChangePassword user={selectedUser} onSuccess={successChangePasswordHandler} onError={errorChangePasswordHandler}/> : <div>Loading...</div>
                }
                </div>
            </Modal>

            <Modal show={roleModal} onClose={() => setRoleModal(false)}>
                <div className="py-10 px-5">
                {
                    selectedUser ? <ChangeRole user={selectedUser} onSuccess={successChangeRoleHandler} onError={errorChangeRoleHandler}/> : <div>Loading...</div>
                }
                </div>
            </Modal>

             <Modal show={createModal} onClose={() => setCreateModal(false)}>
                <div className="py-10 px-5">
                    <Create />
                </div>
            </Modal>
            <div className="py-12">
               
                {
                    !usersList ? <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin float-end my-5"></div> : null
                }
                 <div>
                    <button 
                        className="mb-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        onClick={() => setCreateModal(true)}
                    >
                        Создать пользователя
                    </button>
                </div>
                <div>
                    <div className="mx-auto p-6 my-5 bg-gray-50 border">
                        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                       
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Роль
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                name="role"
                                value={searchForm.role}
                            >
                                <option value="">Все</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="manager">Manager</option>
                            </select>
                            </div>

                           
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Имя
                            </label>
                            <input
                                type="text"
                                placeholder="Введите имя"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                name="name"
                                value={searchForm.name}

                            />
                            </div>

                     
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Введите email"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                name="email"
                                value={searchForm.email}
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
                                    href="/users"
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
                                    checked={selectedIds.length === usersList?.data.length && usersList?.data.length > 0}
                                />
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Роль</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Имя</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата регистрации</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата последнего посещения</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-200">
                        {usersList?.data.map((item) => (
                            <tr key={item.id} className={`hover:bg-gray-50 transition ${item.status ? '':'bg-red-200'}`}>
                                <td className="p-3 text-sm text-gray-500">
                                    <input 
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => toggleOne(item.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {item.role === 'admin' ? (
                                        // Пример для админа (с использованием Indigo цвета)
                                        <div className="flex items-center space-x-2 bg-indigo-50 px-2 py-1 rounded text-indigo-700">
                                            <AdminIcon className="w-4 h-4 text-indigo-500" />
                                            <span className="text-sm font-medium">Администратор</span>
                                        </div>
                                    ) : (
                                        // Пример для обычного пользователя
                                        <div className="flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded text-gray-700">
                                            <UserIcon className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm">Пользователь</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.created_at}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.last_visit}</td>    
                                <td className="px-6 py-4 text-right">
                                    <ul className="flex items-center gap-2 list-none">
                                            {/* 1. Удалить */}
                                            <li>
                                                <button 
                                                    title="Удалить"
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                                    onClick={() => deleteUser(item.id)}
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
                                                        setSelectedUser(item); 
                                                        setEditModal(true);
                                                    }
                                                }
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                </button>
                                            </li>

                                            {/* 3. Изменить пароль */}
                                            <li>
                                                <button 
                                                title="Изменить пароль"
                                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors border border-yellow-100"
                                                onClick={()=>{
                                                        setSelectedUser(item); 
                                                        setPasswordModal(true);
                                                    }
                                                }
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                </button>
                                            </li>

                                            {/* 4. Изменить роль */}
                                            <li>
                                                <button 
                                                title="Изменить роль"
                                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-100"
                                                onClick={()=>{
                                                        setSelectedUser(item); 
                                                        setRoleModal(true);
                                                    }
                                                }
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                </button>
                                            </li>
                                            {/* 5. Блокировать пользователя */}
                                            <li>
                                            <button 
                                                title="Блокировать"
                                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border border-amber-100"
                                                onClick={() => {
                                                    // Твоя логика, например:
                                                    blockUser(item);
                                                    setBlockModal(true);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
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
                    usersList?.links.map((item,i)=>{
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
            </div>
        </AuthenticatedLayout>
    );
}
