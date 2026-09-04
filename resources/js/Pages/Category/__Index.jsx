import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Explorer from "./components/Explorer";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Index({
    category,
    query = {},
    treeCategory = [],
    menu = []
}) {
    const [treeData, setTreeData] = useState([]);

    // Преобразуем дерево в формат Explorer
    const buildTree = (categories) => {
        return categories?.map((category) => ({
            id: category.id,
            title: category.title,
            name: category.title,
            children: category.children_recursive
                ? buildTree(category.children_recursive)
                : []
        })) || [];
    };

    useEffect(() => {
        setTreeData(buildTree(treeCategory));
    }, [treeCategory]);

    // Поиск
    const handleSearch = (searchForm) => {
        router.get(route('category.index'), searchForm);
    };

    // Создание
    const handleCreate = () => {
        console.log('create');
    };

    // Редактирование
    const handleEdit = (item) => {
        console.log('edit', item);
    };

    // Удаление
    const handleDelete = (item) => {
        console.log('delete', item);
    };

    // Обновление
    const handleRefresh = () => {
        router.reload();
    };

    return (

        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            category
                        </h2>
                    }
                >
        <Explorer
                treeData={treeData}
                breadcrumb={[
                    { title: "Главная" },
                    { title: "Документы"},
                    { title: "Законы" },
                ]}
                columns={[
                    {
                        title: "Название",
                        key: "title",
                    },
                    {
                        title: "Описание",
                        key: "description",
                    },
                    {
                        title: "Дата создания",
                        key: "created_at",
                    },
                    {
                        title: "Дата обновления",
                        key: "updated_at",
                    }
                ]}
                tableData={category?.data || []}
                pagination={category}
                onCreate={handleCreate}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSearch={handleSearch}
                onRefresh={handleRefresh}
        />


        </AuthenticatedLayout>

    );  
}