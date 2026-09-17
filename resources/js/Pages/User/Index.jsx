import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import AdminIcon from "./Partials/AdminIcon";
import UserIcon from "./Partials/UserIcon";
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import Edit from "./Edit";
import Create from "./Create";
import ChangePassword from "./ChangePassword";
import ChangeRole from "./ChangeRole";
import BreadCrubs from "./BreadCrubs";
import axios from "axios";

export default function Index({ users, query }) {
    const [editModal, setEditModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [roleModal, setRoleModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [usersList, setUsersList] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const [searchForm, setSearchForm] = useState({
        name: query.name || "",
        email: query.email || "",
        role: query.role || "",
    });

    useEffect(() => {
        setUsersList(users);
    }, [users]);

    const toggleAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(usersList?.data.map((u) => u.id) || []);
        } else {
            setSelectedIds([]);
        }
    };

    const toggleOne = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const removeSelected = () => {
        Swal.fire({
            title: "Вы уверены?",
            text: `Вы не сможете восстановить этих ${selectedIds.length} пользователей!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Да, удалить!",
            cancelButtonText: "Отмена",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/users/bulk-delete", {
                        ids: selectedIds,
                    })
                    .then(() => {
                        const count = selectedIds.length;

                        setUsersList((prev) => ({
                            ...prev,
                            data: prev.data.filter(
                                (user) => !selectedIds.includes(user.id)
                            ),
                        }));

                        setSelectedIds([]);

                        Swal.fire({
                            title: "Удалено!",
                            text: `${count} пользователей были удалены.`,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    })
                    .catch((error) => {
                        console.error("Ошибка при удалении", error);
                    });
            }
        });
    };

    const successChangeRoleHandler = () => {
        setRoleModal(false);

        Swal.fire({
            title: "Успешно!",
            text: "Роль пользователя успешно изменена.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        });
    };

    const errorChangeRoleHandler = () => {
        Swal.fire({
            title: "Ошибка!",
            text: "Не удалось изменить роль пользователя.",
            icon: "error",
        });
    };

    const successChangePasswordHandler = () => {
        setPasswordModal(false);

        Swal.fire({
            title: "Успешно!",
            text: "Пароль пользователя успешно изменен.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        });
    };

    const errorChangePasswordHandler = () => {
        Swal.fire({
            title: "Ошибка!",
            text: "Не удалось изменить пароль пользователя.",
            icon: "error",
        });
    };

    const successEditHandler = () => {
        setEditModal(false);

        Swal.fire({
            title: "Успешно!",
            text: "Пользователь успешно обновлен.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        });
    };

    const errorEditHandler = () => {
        Swal.fire({
            title: "Ошибка!",
            text: "Не удалось обновить пользователя.",
            icon: "error",
        });
    };

    const blockUser = (user) => {
        const title = user.status
            ? "Заблокировать"
            : "Разблокировать";

        const text = user.status
            ? "Вы сможете восстановить этого пользователя в любое время!"
            : "Доступ пользователя к системе будет полностью восстановлен!";

        const confirm = user.status
            ? "Да, заблокировать!"
            : "Да, разблокировать!";

        Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: confirm,
            cancelButtonText: "Отмена",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`/users/${user.id}/block`)
                    .then(() => {
                        const alertTitle = user.status
                            ? "Заблокировано!"
                            : "Разблокировано!";

                        const alertText = user.status
                            ? "Пользователь был заблокирован."
                            : "Доступ для пользователя восстановлен.";

                        Swal.fire({
                            title: alertTitle,
                            text: alertText,
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });

                        setUsersList((prev) => ({
                            ...prev,
                            data: prev.data.map((u) =>
                                u.id === user.id
                                    ? {
                                          ...u,
                                          status: !u.status,
                                      }
                                    : u
                            ),
                        }));
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        router.get("/users", searchForm);
    };

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setSearchForm({
            ...searchForm,
            [key]: value,
        });
    };

    const deleteUser = (id) => {
        Swal.fire({
            title: "Вы уверены?",
            text: "Вы не сможете восстановить этого пользователя!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Да, удалить!",
            cancelButtonText: "Отмена",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/users/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Удалено!",
                            text: "Пользователь был удален.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });

                        setUsersList((prev) => ({
                            ...prev,
                            data: prev.data.filter(
                                (u) => u.id !== id
                            ),
                        }));
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    const breadcrumb = [
        {
            title: "Панель управления",
            href: "dashboard",
        },
        {
            title: "Пользователи",
        },
    ];

    const inputClass = `
        w-full
        rounded-lg
        border
        border-gray-200
        bg-white
        px-3.5
        py-2.5
        text-sm
        text-gray-700
        outline-none
        transition
        placeholder:text-gray-400
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-50
    `;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        Пользователи
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Управление пользователями и их доступом к системе
                    </p>
                </div>
            }
        >
            <Head title="Пользователи" />

            {/* Edit */}
            <Modal
                show={editModal}
                onClose={() => setEditModal(false)}
            >
                <div className="p-5">
                    {selectedUser ? (
                        <Edit
                            user={selectedUser}
                            onSuccess={successEditHandler}
                            onError={errorEditHandler}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </Modal>

            {/* Password */}
            <Modal
                show={passwordModal}
                onClose={() => setPasswordModal(false)}
            >
                <div className="p-5">
                    {selectedUser ? (
                        <ChangePassword
                            user={selectedUser}
                            onSuccess={successChangePasswordHandler}
                            onError={errorChangePasswordHandler}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </Modal>

            {/* Role */}
            <Modal
                show={roleModal}
                onClose={() => setRoleModal(false)}
            >
                <div className="p-5">
                    {selectedUser ? (
                        <ChangeRole
                            user={selectedUser}
                            onSuccess={successChangeRoleHandler}
                            onError={errorChangeRoleHandler}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </Modal>

            {/* Create */}
            <Modal
                show={createModal}
                onClose={() => setCreateModal(false)}
            >
                <div className="p-5">
                    <Create />
                </div>
            </Modal>

            <BreadCrubs items={breadcrumb} />

            <div className="pb-8">
                {!usersList && (
                    <div className="flex justify-end py-5">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
                    </div>
                )}

                {/* Search */}
                <div className="mb-5 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-base font-semibold text-gray-800">
                            Поиск пользователей
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Используйте фильтры для поиска пользователей.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="grid grid-cols-1 items-end gap-4 md:grid-cols-4"
                    >
                        {/* Role */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Роль
                            </label>

                            <select
                                name="role"
                                value={searchForm.role}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">Все</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="manager">
                                    Manager
                                </option>
                            </select>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Имя
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={searchForm.name}
                                onChange={handleChange}
                                placeholder="Введите имя"
                                className={inputClass}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={searchForm.email}
                                onChange={handleChange}
                                placeholder="Введите email"
                                className={inputClass}
                            />
                        </div>

                        {/* Search buttons */}
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="m21 21-4.35-4.35m1.35-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>

                                Найти
                            </button>

                            <Link
                                href="/users"
                                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                            >
                                Сбросить
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Toolbar */}
                <div className="mb-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => setCreateModal(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v14M5 12h14"
                            />
                        </svg>

                        Создать
                    </button>

                    <span className="text-sm text-gray-400">
                        {usersList?.total || 0} пользователей
                    </span>
                </div>

                {/* Selected toolbar */}
                {selectedIds.length > 0 && (
                    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-5 w-5 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M9 12l2 2 4-4m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>

                            <span className="text-sm font-medium text-gray-700">
                                Выбрано:
                                <span className="ml-1 font-semibold text-blue-600">
                                    {selectedIds.length}
                                </span>
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedIds([])}
                                className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                            >
                                Снять выделение
                            </button>

                            <button
                                type="button"
                                onClick={removeSelected}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7h10Z"
                                    />
                                </svg>

                                Удалить
                            </button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            onChange={toggleAll}
                                            checked={
                                                selectedIds.length ===
                                                    usersList?.data
                                                        ?.length &&
                                                usersList?.data?.length > 0
                                            }
                                        />
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Роль
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Имя
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Email
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Дата регистрации
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Последнее посещение
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Действия
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {usersList?.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={`transition hover:bg-blue-50/40 ${
                                            !item.status
                                                ? "bg-red-50"
                                                : ""
                                        }`}
                                    >
                                        {/* Checkbox */}
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={selectedIds.includes(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    toggleOne(item.id)
                                                }
                                            />
                                        </td>

                                        {/* Role */}
                                        <td className="px-4 py-3">
                                            {item.role === "admin" ? (
                                                <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-indigo-700">
                                                    <AdminIcon className="h-4 w-4 text-indigo-500" />

                                                    <span className="text-xs font-medium">
                                                        Администратор
                                                    </span>
                                                </div>
                                            ) : item.role === "manager" ? (
                                                <div className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-2.5 py-1.5 text-purple-700">
                                                    <AdminIcon className="h-4 w-4 text-purple-500" />

                                                    <span className="text-xs font-medium">
                                                        Менеджер
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-1.5 text-gray-600">
                                                    <UserIcon className="h-4 w-4 text-gray-400" />

                                                    <span className="text-xs font-medium">
                                                        Пользователь
                                                    </span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Name */}
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-medium text-gray-800">
                                                {item.name}
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-4 py-3">
                                            <div className="text-sm text-gray-500">
                                                {item.email}
                                            </div>
                                        </td>

                                        {/* Created */}
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {item.created_at}
                                        </td>

                                        {/* Last visit */}
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {item.last_visit}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-1.5">

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    title="Удалить"
                                                    onClick={() =>
                                                        deleteUser(item.id)
                                                    }
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.8}
                                                            d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7h10ZM10 11v5m4-5v5"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    type="button"
                                                    title="Изменить"
                                                    onClick={() => {
                                                        setSelectedUser(item);
                                                        setEditModal(true);
                                                    }}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 text-blue-500 transition hover:bg-blue-50"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.8}
                                                            d="m15.232 5.232 3.536 3.536M16.5 4a2.5 2.5 0 1 1 3.536 3.536L6.5 21H3v-3.5L16.5 4Z"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Password */}
                                                <button
                                                    type="button"
                                                    title="Изменить пароль"
                                                    onClick={() => {
                                                        setSelectedUser(item);
                                                        setPasswordModal(true);
                                                    }}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-amber-100 text-amber-500 transition hover:bg-amber-50"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.8}
                                                            d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Zm10-10V7a4 4 0 0 0-8 0v4h8Z"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Role */}
                                                <button
                                                    type="button"
                                                    title="Изменить роль"
                                                    onClick={() => {
                                                        setSelectedUser(item);
                                                        setRoleModal(true);
                                                    }}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-purple-100 text-purple-500 transition hover:bg-purple-50"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.8}
                                                            d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2a3 3 0 0 0-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2a5 5 0 0 1 10 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Block */}
                                                <button
                                                    type="button"
                                                    title={
                                                        item.status
                                                            ? "Заблокировать"
                                                            : "Разблокировать"
                                                    }
                                                    onClick={() =>
                                                        blockUser(item)
                                                    }
                                                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                                                        item.status
                                                            ? "border-amber-100 text-amber-500 hover:bg-amber-50"
                                                            : "border-emerald-100 text-emerald-500 hover:bg-emerald-50"
                                                    }`}
                                                >
                                                    {item.status ? (
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={1.8}
                                                                d="M18.364 18.364A9 9 0 1 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={1.8}
                                                                d="M9 11V7a3 3 0 0 1 6 0v4m-8 0h10a2 2 0 0 1 2 2v7H5v-7a2 2 0 0 1 2-2Z"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {usersList?.links?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 border-t border-gray-100 px-4 py-3">
                            {usersList.links.map((item, i) => {
                                const label = item.label
                                    .replace(
                                        "&laquo; Previous",
                                        "«"
                                    )
                                    .replace("Next &raquo;", "»");

                                return (
                                    <Link
                                        key={i}
                                        href={item.url || "#"}
                                        className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-sm transition ${
                                            item.active
                                                ? "border-blue-600 bg-blue-600 text-white"
                                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        } ${
                                            !item.url
                                                ? "pointer-events-none opacity-40"
                                                : ""
                                        }`}
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
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}