import React, { useState,useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import TagForm from './TagForm';
import Swal from 'sweetalert2';

function Index({ documents,filter,favoriteIds }) {
    console.log(filter,documents,favoriteIds);
    useEffect(() => {
        if(filter?.menus?.length){
            setMenuOptions(filter.menus.map((item) => ({
                value: item.id,
                label: item.title,
            })));
        }
        if(favoriteIds?.length){
            setFavoriteDocuments(favoriteIds);
        }
    },[]);

const [searchField, setSearchField] = useState({
    number: '',
    number_d: false,
    title: '',
    title_d: false,
    menu_id: '',
    start: '',
    end: '',
    description: '',
    status_all: false,
    status_active: false,
    status_passive: false,
    date_d: false,
    date_i: false,
});

const [favoriteDocuments, setFavoriteDocuments] = useState([]);
const [menuOptions, setMenuOptions] = useState([]);

const [selectedDocument,setSelectedDocument] = useState(null);





const handleChange = (e) => {
    const {
        name,
        value,
        type,
        checked,
    } = e.target;

    setSearchField((prev) => ({
        ...prev,
        [name]: type === 'checkbox'
            ? checked
            : value,
    }));
};


const handleDateType = (type) => {

    if (type === 'exact') {

        setSearchField((prev) => ({
            ...prev,
            date_d: !prev.date_d,
            date_i: false,
            end: '',
        }));

    }


    if (type === 'range') {

        setSearchField((prev) => ({
            ...prev,
            date_i: !prev.date_i,
            date_d: false,
        }));

    }

};

const renderMenuOptions = (items, level = 0) => {
    return items.flatMap((item) => [
        <option key={item.id} value={item.id}>
            {'— '.repeat(level)}
            {item.title}
        </option>,

        ...(item.children_recursive?.length
            ? renderMenuOptions(
                item.children_recursive,
                level + 1
            )
            : []),
    ]);
};


const handleStatus = (status) => {

    if (status === 'all') {

        setSearchField((prev) => ({
            ...prev,
            status_all: !prev.status_all,
            status_active: false,
            status_passive: false,
        }));

    }


    if (status === 'active') {

        setSearchField((prev) => ({
            ...prev,
            status_active: !prev.status_active,
            status_all: false,
        }));

    }


    if (status === 'passive') {

        setSearchField((prev) => ({
            ...prev,
            status_passive: !prev.status_passive,
            status_all: false,
        }));

    }

};


const handleSubmit = (e) => {
    e.preventDefault();
    router.get(
        route('home'),
        searchField,
        {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        }
    );
};


const handleReset = () => {

    const resetData = {
        number: '',
        number_d: false,
        title: '',
        title_d: false,
        type: '',
        start: '',
        end: '',
        description: '',
        status_all: false,
        status_active: false,
        status_passive: false,
        status: 'all',
        date_d: false,
        date_i: false,
    };

    setSearchField(resetData);

    router.get(
        route('home'),
        {},
        {
            preserveState: false,
            replace: true,
        }
    );

};


const addToFavorites = (documentId) => {
    axios.post(route('favorites.store'), {
        document_id: documentId,
    }).then((res)=>{
        const isFavorite = favoriteDocuments.includes(documentId);
        if (isFavorite) {
            setFavoriteDocuments((prev) =>
                prev.filter((id) => id !== documentId)
            );
        } else {
            setFavoriteDocuments((prev) => [...prev, documentId]);
        }
    });
};

const attachTag = (document) => {
    setSelectedDocument(document);
    /*
    axios.post(route('tags.attach'), {
        document_id: documentId,
    });*/
}

const successAtachTag = () => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tags successfully added',
        timer: 1500,
        showConfirmButton: false,
    });

    setSelectedDocument(null);
    router.reload();
}

const errorAtachTag = (error) => {
    Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'Failed to add tags',
    });
}

const removeTag = (document_id, tag_id) => {
    axios.delete(route('tags.remove'), {
       data:{ 
        document_id,
        tag_id,
       } 
    }).then((res) => {
        if(res.data.success){
            router.reload();
        }
    });

}

return (

    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Поиск документов
            </h2>
        }
    >
        <Modal show={selectedDocument} onClose={() => setSelectedDocument(null)}>
           <TagForm 
            documentId = {selectedDocument?.id}
            successCalback={successAtachTag}
            errorCalback={errorAtachTag}
            />
        </Modal>
        <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                {/* ===================== */}
                {/* SEARCH FORM */}
                {/* ===================== */}

                <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded">

                    <div className="p-6">

                        <form onSubmit={handleSubmit}>

                            {/* Номер документа */}

                            <div className="mb-5 grid grid-cols-1 items-center gap-3 lg:grid-cols-12">

                                <div className="lg:col-span-2">

                                    <label
                                        htmlFor="number"
                                        className="font-medium text-gray-700"
                                    >
                                        Номер документа
                                    </label>

                                </div>


                                <div className="lg:col-span-5">

                                    <input
                                        id="number"
                                        name="number"
                                        type="text"
                                        value={searchField.number}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm"
                                    />

                                </div>


                                <div className="lg:col-span-3">

                                    <label className="flex cursor-pointer items-center gap-2">

                                        <input
                                            type="checkbox"
                                            name="number_d"
                                            checked={searchField.number_d}
                                            onChange={handleChange}
                                        />

                                        <span>
                                            Точное соответствие
                                        </span>

                                    </label>

                                </div>

                            </div>


                            {/* Название */}

                            <div className="mb-5 grid grid-cols-1 items-center gap-3 lg:grid-cols-12">

                                <div className="lg:col-span-2">

                                    <label
                                        htmlFor="title"
                                        className="font-medium text-gray-700"
                                    >
                                        Название документа
                                    </label>

                                </div>

                                <div className="lg:col-span-7">

                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={searchField.title}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm"
                                    />

                                </div>
                                <div className="lg:col-span-3">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="title_d"
                                            checked={searchField.title_d}
                                            onChange={handleChange}
                                        />
                                        <span>
                                            Точное соответствие
                                        </span>
                                    </label>

                                </div>

                            </div>


                            {/* Тип */}

                            <div className="mb-5 grid grid-cols-1 items-center gap-3 lg:grid-cols-12">

                                <div className="lg:col-span-2">

                                    <label className="font-medium text-gray-700">
                                        Принадлежит
                                    </label>

                                </div>
                                <div className="lg:col-span-8">
                                    <select
                                        name="menu_id"
                                        value={searchField.menu_id || ''}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    >
                                        <option value="">Все разделы</option>
                                        {renderMenuOptions(filter?.menus || [])}
                                    </select>
                                </div>
                            </div>


                            {/* Дата */}

                            <div className="mb-5 grid grid-cols-1 items-center gap-3 lg:grid-cols-12">

                                <div className="lg:col-span-2">

                                    <label className="font-medium text-gray-700">
                                        Дата
                                    </label>

                                </div>


                                <div className="lg:col-span-3">

                                    <input
                                        name="start"
                                        type="date"
                                        value={searchField.start}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm"
                                    />

                                </div>


                                <div className="lg:col-span-3">

                                    <input
                                        name="end"
                                        type="date"
                                        value={searchField.end}
                                        onChange={handleChange}
                                        disabled={!searchField.date_i}
                                        className="w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                                    />

                                </div>


                                <div className="lg:col-span-2">

                                    <label className="flex items-center gap-2">

                                        <input
                                            type="checkbox"
                                            checked={searchField.date_d}
                                            onChange={() => handleDateType('exact')}
                                        />

                                        Точная дата

                                    </label>

                                </div>


                                <div className="lg:col-span-2">

                                    <label className="flex items-center gap-2">

                                        <input
                                            type="checkbox"
                                            checked={searchField.date_i}
                                            onChange={() => handleDateType('range')}
                                        />

                                        Диапазон

                                    </label>

                                </div>

                            </div>


                            {/* Описание */}

                            <div className="mb-5 grid grid-cols-1 items-center gap-3 lg:grid-cols-12">

                                <div className="lg:col-span-2">

                                    <label className="font-medium text-gray-700">
                                        Часть описания
                                    </label>

                                </div>


                                <div className="lg:col-span-8">

                                    <input
                                        name="description"
                                        type="text"
                                        value={searchField.description}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>
                            {/* Статус */}
                           <div className="mb-6 grid grid-cols-1 items-center gap-3 lg:grid-cols-12">
                                <div className="lg:col-span-2">
                                    <span className="font-medium text-gray-700">
                                        Статус документа
                                    </span>
                                </div>
                                <div className="lg:col-span-4">
                                    <select
                                        value = {searchField.status}
                                        onChange = {(e) =>
                                            setSearchField((prev) => ({
                                                ...prev,
                                                status: e.target.value,
                                            }))
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    >
                                        <option value="">Все</option>
                                        <option value="active">Действующие</option>
                                        <option value="passive">Утратившие силу</option>
                                    </select>
                                </div>
                            </div>
                            {/* Кнопки */}
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                                >
                                    Найти
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="rounded-md bg-gray-500 px-5 py-2 text-white hover:bg-gray-600"
                                >
                                    Очистить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* ===================== */}
                {/* RESULTS TABLE */}
                {/* ===================== */}

                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                    <div className="border-b border-gray-200 px-6 py-4">

                        <h3 className="text-lg font-semibold text-gray-800">
                            Результаты поиска
                        </h3>


                        <p className="mt-1 text-sm text-gray-500">

                            Найдено: {
                                documents?.total ?? 0
                            }

                        </p>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="min-w-full divide-y divide-gray-200">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        #
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Номер документа
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Название
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Принадлежит
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Дата
                                    </th>

          

                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                                        Статус
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                                        #
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-gray-200 bg-white">

                                {documents?.data?.length > 0 ? (
                                    documents.data.map((document, index) => {
                                        const isFavorite = favoriteDocuments.includes(document.id);
                                        return (
                                               <tr
                                            key={document.id}
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() => {
                                            
                                                router.visit(
                                                    route(
                                                        'document.show',
                                                        document.id
                                                    )
                                                )
                                            }
                                        }
                                        >

                                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                                            <div className="flex items-center gap-2">
                                                {/* Избранное */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToFavorites(document.id);
                                                    }}
                                                    className={`
                                                        inline-flex items-center justify-center
                                                        w-8 h-8
                                                        rounded-md
                                                        text-gray-400
                                                        hover:text-yellow-500
                                                        hover:bg-yellow-50
                                                        transition
                                                        cursor-pointer
                                                        ${isFavorite
                                                            ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                                            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                                                        }
                                                    `}
                                                    
                                                    title="Добавить в избранное"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11.48 3.499a.75.75 0 011.04 0l2.52 2.52a.75.75 0 00.53.22h3.57a.75.75 0 01.75.75v3.57a.75.75 0 00.22.53l2.52 2.52a.75.75 0 010 1.04l-2.52 2.52a.75.75 0 00-.22.53v3.57a.75.75 0 01-.75.75h-3.57a.75.75 0 00-.53.22l-2.52 2.52a.75.75 0 01-1.04 0l-2.52-2.52a.75.75 0 00-.53-.22H6.38a.75.75 0 01-.75-.75v-3.57a.75.75 0 00-.22-.53l-2.52-2.52a.75.75 0 010-1.04l2.52-2.52a.75.75 0 00.22-.53v-3.57a.75.75 0 01.75-.75h3.57a.75.75 0 00.53-.22l2.52-2.52z"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Прикрепить к тегу */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        attachTag(document);
                                                    }}
                                                    className="
                                                        inline-flex items-center justify-center
                                                        w-8 h-8
                                                        rounded-md
                                                        text-gray-400
                                                        hover:text-blue-600
                                                        hover:bg-blue-50
                                                        transition
                                                        cursor-pointer
                                                    "
                                                    title="Прикрепить к тегу"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M7 7h.01M3 11.5V6a3 3 0 013-3h5.5a3 3 0 012.12.88l6.5 6.5a3 3 0 010 4.24l-3 3a3 3 0 01-4.24 0l-6.5-6.5A3 3 0 013 11.5z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td> 

                                            {/* Номер */}

                                            <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">

                                                {document.number || '-'}

                                            </td>


                                            {/* Название */}

                                            <td className="max-w-md px-4 py-3 text-sm text-gray-700">

                                                <div className="line-clamp-2">

                                                    {document.title}

                                                </div>

                                            </td>


                                            {/* Тип */}
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {document.category?.menu?.title || ''} ({document.category?.title || '-'})
                                            </td>
                                            {/* Дата */}
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">

                                                {document.document_date || '-'}

                                            </td>


                                            {/* Статус */}

                                            <td className="px-4 py-3 text-right text-sm font-medium">

                                                {document.status === 'active' && (

                                                    <span className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                        Действующий
                                                    </span>

                                                )}
                                                {document.status === 'passive' && (
                                                    <span className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                        Утратил силу
                                                    </span>
                                                )}

                                                {!['active', 'passive'].includes(document.status) && (

                                                    <span className="text-sm text-gray-500">
                                                        -
                                                    </span>

                                                )}
                                            </td>

                                            <td className="px-4 py-3 text-right text-sm font-medium">
                                                <div className="flex flex-wrap justify-end gap-1">
                                                    {document.tags.map((tag) => (
                                                        <span
                                                            key={tag.id}
                                                            className="
                                                                inline-flex items-center gap-1
                                                                rounded-md
                                                                bg-gray-100
                                                                px-2 py-1
                                                                text-gray-700
                                                            "
                                                        >
                                                            {tag.name}

                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeTag(document.id, tag.id);
                                                                }}
                                                                className="
                                                                    inline-flex items-center justify-center
                                                                    w-4 h-4
                                                                    rounded
                                                                    text-gray-400
                                                                    hover:text-red-500
                                                                    hover:bg-red-50
                                                                "
                                                                title="Remove tag"
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                           
                                          

                                        </tr>
                                        );
                                    }

                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="px-4 py-10 text-center text-gray-500"
                                        >
                                            Документы не найдены
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}

                    {documents?.links?.length > 3 && (

                        <div className="flex flex-wrap gap-2 border-t border-gray-200 p-4">

                            {documents.links.map((link, index) => (

                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    preserveState
                                    preserveScroll
                                    className={`
                                        rounded-md
                                        border
                                        px-3
                                        py-2
                                        text-sm
                                        ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700'
                                        }
                                        ${
                                            !link.url
                                                ? 'cursor-not-allowed opacity-50'
                                                : 'hover:bg-gray-100'
                                        }
                                    `}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    </AuthenticatedLayout>

);


}

export default Index;
