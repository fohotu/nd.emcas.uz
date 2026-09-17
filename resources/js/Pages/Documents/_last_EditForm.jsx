import { useForm,usePage } from "@inertiajs/react";
import Editor from "@/Components/Editor";
import UploadFile from "@/Components/UploadFile";
import Upload from 'rc-upload';
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import Swal from "sweetalert2";

export default function EditForm(props) {

    const { activeModel, onSuccessHandler,downloadFile } = props;
    console.log(activeModel,'DEFAULT');


    const {  csrf_token } = usePage().props;
    const { data, setData, post,put, processing, errors } = useForm({
        title: activeModel?.title,
        number: activeModel?.number,
        category_id: activeModel?.category_id,
        version_for: activeModel?.version_for,
        status: activeModel?.status,
        description: activeModel?.description,
        language: activeModel?.language,
        document_date:activeModel?.document_date,
        files: activeModel?.files,
        versions:activeModel?.versions
    });

   


    useEffect(()=>{
      setData({
        title: activeModel?.title,
        number: activeModel?.number,
        category_id: activeModel?.category_id,
        menu_id:activeModel?.category?.menu?.id,
        version_for: activeModel?.version_for,
        status: activeModel?.status,
        description: activeModel?.description,
        language: activeModel?.language,
        document_date:activeModel?.document_date,
        files: activeModel?.files,
        category:activeModel?.category,
        menu:activeModel?.category?.menu,
        versions:activeModel?.versions,
      })
    },[])


    const selectedMenu = data?.category?.menu
        ? {
            value: data.category.menu.id,
            label: data.category.menu.title,
        }
        : null;

    const [uploadedError,setUploadedError] = useState([]);
    const [categoryLoaded,setCategoryLoad] = useState([]);

    const getdataList = (input) => {
        return axios.get(`/document/live-search?q=${input}`).then((response) => {
            let options = response.data.map((item) => ({ value:item.id, label: item.number ? item.number :'' +' '+item.title ? item.title : ''}));
            return options;
        });
    }

    const getMenuList = (input) => {
        return axios.get(`/menu/live-search?q=${input}`).then((response) => {
            console.log("Menu search response:", response);
            let options = response.data.data.map((item) => ({ value:item.id, label: item.title ? item.title :''}));
            return options;
        });
    }

    const getCategoryByMenu = (menuId) => {
        return axios.get(`/category/by-menu?menu_id=${menuId}`).then((response) => {
            let options = response.data.data.map((item) => ({ value:item.id, label: item.title ? item.title :''}));
            return options;
        });
    }



     const uploadProps = {
        name:'decision-document',
        onStart : function(){
            console.log('start');
        },
        withCredentials:true,
        data:{
            "_token":csrf_token,
        },    
        onSuccess : function(result,file){
            setData({...data,files:[...data.files,result]})
       
        },
        onError : function(err,response,file){
           setUploadedError([...uploadedError,file])
        },
        action: '/file/upload',
        multiple:true,
    
    }

    const deleteFile = (file) => {
        axios.post('/file/remove',file).then((response) => {
                console.log(response);
                if(response.data.message=='success'){
                    let files = data.files.filter((item) => item.id!=file.id);
                    setData({...data,files:files});          
                }
            });
    }


     const deleteUploadedError = (file) => { 
        let errors = uploadedError.filter((item) => item.uid!=file.uid);
        setUploadedError(errors);
    };

    const submit = (e) => {
        console.log("Submitting form with data:", data);
        e.preventDefault();
       // post(route("documents.store"));
        
        put(route("documents.update",activeModel.id),{
          onSuccess: () => {
            //alert("Документ успешно создан!");
            onSuccessHandler?.();
          },
          onError: (errors) => {
           //onError(errors);
            Swal.fire({
                icon: "error",
                title: "Ошибка",
                text: "Неправильное заполнение формы",
            });
          }
        });
    };

    return (
        <div className="max-w-screen-2xl mx-auto p-6">
            <div className="bg-white">
                <div className="border-b px-6 py-4">
                    <h1 className="text-2xl font-semibold">
                        Создание документа 
                    </h1>
                </div>

                <form onSubmit={submit} className="p-6">
                    <div className="grid grid-cols-1  gap-6">
                         <div>
                            <label className="block mb-2 text-sm font-medium">
                                Название
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-6">
                        {/* Number */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Номер
                            </label>
                            <input
                                type="text"
                                value={data.number}
                                onChange={(e) =>
                                    setData("number", e.target.value)
                                }
                                className="w-full rounded border-gray-300"
                            />
                        </div>

                         {/* Category */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Относиться
                            </label>
                             

                            <AsyncSelect isClearable className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              
                            
                                 value={{
                                    id:data?.menu?.id,
                                    label:data?.menu?.title,
                                 }}

                                onChange = { (e) => {
                                    if(e){
                                        setData({
                                            ...data,
                                            menu_id: e.value,
                                            category_id: '',
                                            menu:{
                                                ...data.menu,
                                                id:e.value,
                                                title:e.label,
                                            },
                                            category:null,
                                        });

                                        getCategoryByMenu(e.value).then((categories) => {
                                            setCategoryLoad(categories);
                                        });
                                    }else{
                                        setData({...data,"menu_id": ""}) 
                                        setData({...data,"category_id": ""}) 
                                        setCategoryLoad([]);
                                    }
                                }} 
                                
                                loadOptions={getMenuList}
                             
                                allowCreateWhileLoading={true}
                                createOptionPosition="first"
                                styles={{
                                    control: (baseStyles, state) => ({
                                    ...baseStyles,
                                        borderColor: state.isFocused ? 'grey' : '#6b7280',
                                        paddingBlock:'1px',
                                        paddingInline:'2px',
                                    }),
                                }}
                            />

                        
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                             <label className="block mb-2 text-sm font-medium">
                                Форма документа
                            </label>
                            
                            <Select options={categoryLoaded} 
                                value = {{
                                    value: data?.category?.id,
                                    label: data?.category?.title
                                }}
                            //value={data.category_id ? categoryLoaded.find(option => option.value === data.category_id) : null}
                                onChange = {(e) => {
                                    if(e){
                                        let c_d = {
                                            id:e.value,
                                            title:e.label
                                        }
                                        setData({...data,category:c_d,"category_id": e.value}) 
                                    }
                                }} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            
                            
                           
                        </div>            

                               {/* Version */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Версия документа
                            </label>
                            <AsyncSelect className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                value={data.versions? {
                                       value: data.versions.id,
                                        label: `${data.versions.number} (${data.versions.title})`,
                                }:null}
                                onChange = { (e) => {
                                    if(e){
                                        setData({...data,"version_for": e.value,
                                            versions:{
                                                ...data.versions,
                                                id:e.value,
                                                title:e.label,
                                            }
                                        }) 
                                    }
                                }} 
                                loadOptions={getdataList}
                                isClearable
                                allowCreateWhileLoading={true}
                                createOptionPosition="first"
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? 'grey' : '#6b7280',
                                        paddingBlock:'1px',
                                        paddingInline:'2px',
                                    }),
                                }}
                            />
                        </div>       
                    </div>  

                    <div className="grid grid-cols-3 gap-6">
                            {/* Status */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Статус
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full rounded border-gray-300"
                                >
                                    <option value="formation">
                                        Formation
                                    </option>
                                    <option value="active">
                                        Active
                                    </option>
                                    <option value="archive">
                                        Archive
                                    </option>
                                </select>
                            </div>

                            <div>
                            <label className="block mb-2 text-sm font-medium">
                                Язык
                            </label>

                            <select
                                value={data.language}
                                onChange={(e) =>
                                    setData("language", e.target.value)
                                }
                                className="w-full rounded border-gray-300"
                            >
                                <option value="uz">Uzbek</option>
                                <option value="ru">Russian</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        {/* Document Date */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Дата документа
                            </label>
                            <input
                                type="date"
                                value={data.document_date ? data.document_date.substring(0, 10) : ""}
                                onChange={(e) =>
                                    setData(
                                        "document_date",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded border-gray-300"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                                 {/* Description */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Описание
                                    </label>

                                    <Editor
                                        value={data.description}
                                        onChange={(html) =>
                                            setData("description", html)
                                        }
                                    />

                                </div>

                                <div>
                                        <Upload { ...uploadProps}>
                                            <div
                                                className="
                                                    border-2 border-dashed border-gray-300
                                                    rounded p-6 my-5
                                                    text-center cursor-pointer
                                                    hover:border-blue-500
                                                    transition
                                                "
                                            >

                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
                                                    />
                                                </svg>

                                                <p className="mt-2 text-sm text-gray-600">
                                                    Нажмите для выбора файлов
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    PDF, DOCX, XLSX, JPG, PNG
                                                </p>

                                            </div>
                                        </Upload>
                                </div>
                                <div>
                            {data?.files?.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {data.files.map((file, index) => (
                                        <div
                                            key={`${file.file_name
}-${index}`}
                                            className="
                                                flex items-center justify-between
                                                rounded-lg border p-3
                                                bg-gray-50
                                            "
                                        >
                                            <div>
                                                <div className="font-medium text-sm">
                                                    {file.file_name}
                                                </div>

                                                
                                            </div>

                                              <button
                                                type="button"
                                                onClick={() => downloadFile(file)}
                                                className="
                                                    px-3 py-1
                                                    text-sm
                                                    text-green-600
                                                    hover:bg-green-50
                                                    rounded
                                                "
                                            >
                                                Скачать
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deleteFile(file)}
                                                className="
                                                    px-3 py-1
                                                    text-sm
                                                    text-red-600
                                                    hover:bg-red-50
                                                    rounded
                                                "
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                                </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing
                                ? "Сохранение..."
                                : "Сохранить"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}