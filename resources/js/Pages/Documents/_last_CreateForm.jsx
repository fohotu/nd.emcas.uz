import { useForm,usePage } from "@inertiajs/react";
import Editor from "@/Components/Editor";
import UploadFile from "@/Components/UploadFile";
import Upload from 'rc-upload';
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import Swal from "sweetalert2";

export default function CreateForm(props) {

    const { categories = [], documents = [], onSuccessHandler } = props;

    console.log("CreateForm props:", props);

    const {  csrf_token } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        number: "",
        reg_date: "",
        menu_id:"",
        category_id: "",
        version_for: "",
        status: "formation",
        type: "uz",
        added: "",
        system_date: "",
        description: "",
        let_comment: true,
        language: "uz",
        doc_date: "",
        document_date: "",
        files: [],
    });


    const [uploadedError,setUploadedError] = useState([]);
    const [categoryLoaded,setCategoryLoad] = useState([]);

    useEffect(() => {
        if (categories.length) {
            const options = categories.map(category => ({
                label: category.title,
                value: category.id,
            }));
            setCategoryLoad(options);
        }
    }, [categories]);

    const getdataList = (input) => {
        return axios.get(`/document/live-search?q=${input}`).then((response) => {
            let options = response.data.map((item) => ({ value:item.id, label: item.number ? item.number :'' +' '+item.title ? item.title : '',status:item.status }));
            return options;
        });
    }

    const getMenuList = (input) => {
        return axios.get(`/menu/live-search?q=${input}`).then((response) => {
            console.log("Menu search response data:", response.data);
            //let options = response.data.data.map((item) => ({ value:item.id, label: item.title ? item.title :''}));
            let options = response.data;
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
        e.preventDefault();
        //post(route("documents.store"));
        post(route("documents.store"),{
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
                                Название*
                                {errors.title && (
                                    <span className="text-red-500 text-sm mt-1 ml-1">
                                        {errors.title}
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />

                           
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-6">
                        {/* Number */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Номер*
                                {errors.number && (
                                <span className="text-red-500 text-sm mt-1 ml-1">
                                     {errors.number}
                                </span>
                            )}
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
                            <AsyncSelect className="bg-gray-50 border  text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                onChange = { (e) => {
                                    if(e){
                                        setData({...data,"menu_id": e.value,"category_id": ""}) 
                                        getCategoryByMenu(e.value).then((categories) => {
                                            setCategoryLoad(categories);
                                        });  
                                    }else{
                                        setData({...data,"menu_id": "","category_id": ""}) 
                                        setCategoryLoad([]);
                                    }
                                }} 
                                loadOptions={getMenuList}
                                isClearable
                                allowCreateWhileLoading={true}
                                createOptionPosition="first"
                                styles = {{
                                    control: (baseStyles, state) => ({
                                    ...baseStyles,
                                        minHeight: "42px",
                                        height: "42px",
                                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                                        borderRadius: "0.25rem",
                                    }),
                                    valueContainer: (baseStyles) => ({
                                        ...baseStyles,
                                        height: "45px",
                                        padding: "0 12px",
                                    }),
                                    indicatorsContainer: (baseStyles) => ({
                                        ...baseStyles,
                                        height: "45px",
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
                                isClearable
                                value={
                                    data.category_id
                                        ? categoryLoaded.find(
                                            option => option.value === data.category_id
                                        ) || null
                                        : null
                                }
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        category_id: e ? e.value : null
                                    });
                                }}
                                className="bg-gray-50 border  text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                          
                                styles = {{
                                        control: (baseStyles, state) => ({
                                        ...baseStyles,
                                            minHeight: "42px",
                                            height: "42px",
                                            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                                            borderRadius: "0.25rem",
                                            boxShadow: state.isFocused
                                                ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                                                : "none",
                                        }),

                                        valueContainer: (baseStyles) => ({
                                            ...baseStyles,
                                            height: "42px",
                                            padding: "0 12px",
                                        }),

                                        indicatorsContainer: (baseStyles) => ({
                                            ...baseStyles,
                                            height: "42px",
                                        }),
                                }}

                            />
                        </div>            
                            {/* Version */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Версия документа
                            </label>
                            <AsyncSelect className="bg-gray-50 border text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                onChange = { (e) => {
                                    if(e){
                                        setData({...data,"version_for": e.value}) 
                                    }else{
                                        setData({...data,status_justifications_status:""});
                                       // setStatusDisable(true);
                                    }
                                }} 
                                loadOptions={getdataList}
                                isClearable
                                allowCreateWhileLoading={true}
                                createOptionPosition="first"
                                styles={{
                                    control: (baseStyles, state) => ({
                                    ...baseStyles,
                                        minHeight: "42px",
                                        height: "42px",
                                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                                        borderRadius: "0.25rem",
                                        boxShadow: state.isFocused
                                            ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                                            : "none",
                                    }),

                                    valueContainer: (baseStyles) => ({
                                        ...baseStyles,
                                        height: "42px",
                                        padding: "0 12px",
                                    }),

                                    indicatorsContainer: (baseStyles) => ({
                                        ...baseStyles,
                                        height: "45px",
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
                                    <option value="active">     
                                        Действующие
                                    </option>
                                    <option value="passive">
                                        Утративший силу
                                    </option>
                                </select>
                            </div>

                            <div>
                            <label className="block mb-2 text-sm font-medium">
                                Язык 
                                {errors.language && (
                                    <span className="text-red-500 text-sm mt-1 ml-1">
                                        {errors.language}
                                    </span>
                                )}
                       
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
                                value={data.document_date}
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
                                        {errors.description && (
                                            <span className="text-red-500 text-sm mt-1 ml-1">
                                                {errors.description}
                                            </span>
                                        )}
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
                            {data.files.length > 0 && (
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