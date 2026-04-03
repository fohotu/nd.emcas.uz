import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Modal from '@/Components/Modal';
import Edit from './Edit';
import ChangePassword from './ChangePassword';
import ChangeRole from './ChangeRole';
import axios from 'axios';



export default function Index({users}) {



    const [editModal,setEditModal] = useState(false);

    const [passwordModal,setPasswordModal] = useState(false);
    const [roleModal,setRoleModal] = useState(false);
    const [blockModal,setBlockModal] = useState(false);

    const [selectedUser,setSelectedUser] = useState(null);

    const [usersList,setUsersList] = useState(null);

    useEffect(()=>{
        setUsersList(users);
    },[]);


    const blockUser = (id) => {
        Swal.fire({
            title: 'Вы собирайтес заблокировать?',
            text: "Вы сможете восстановить этого пользователя любое время!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Да, заблокировать!',
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/users/${id}/block`)  
                .then(() => {
                    Swal.fire(
                        'Заблокировано!',
                        'Пользователь был заблокирован.',
                        'success'
                    )
                   // let filtered = usersList.data.filter(u => u.id !== id);
                   // setUsersList({...usersList, data: filtered});
           
                })
                .catch(err => console.error(err));
                
            }
        });
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
                     Swal.fire(
                        'Удалено!',
                        'Пользователь был удален.',
                        'success'
                    )
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
                {
                    selectedUser ? <Edit user={selectedUser}/> : <div>Loading...</div>
                }
            </Modal>

            <Modal show={passwordModal} onClose={() => setPasswordModal(false)}>
                {
                    selectedUser ? <ChangePassword user={selectedUser}/> : <div>Loading...</div>
                }
            </Modal>

            <Modal show={roleModal} onClose={() => setRoleModal(false)}>
                {
                    selectedUser ? <ChangeRole user={selectedUser}/> : <div>Loading...</div>
                }
            </Modal>
            <div className="py-12">
               
                {
                    !usersList ? <div class="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin float-end my-5"></div> : null
                }
              
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Имя</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата регистрации</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата последнего посещения</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-200">
                        {usersList?.data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-500">{item.id}</td>
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
                                                    blockUser(item.id);
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
            </div>
        </AuthenticatedLayout>
    );
}
