import React, { useState,useEffect } from 'react'
import {usePage } from "@inertiajs/react";
import Upload from 'rc-upload';
function UploadedFiles(props) {
    const {activeModel,downloadFile} = props;
    const { csrf_token } = usePage().props;
    const [dataFiles,setDataFiles] = useState([]);

    useEffect(() => {
        setDataFiles(activeModel?.files);
    },[])


     const uploadProps = {
        name:'decision-document',
        onStart : function(){
            console.log('start');
        },
        withCredentials:true,
        data:{
            "_token":csrf_token,
            "object_id":activeModel?.id,
            "object_type":"document",
        },    
        onSuccess : function(result,file){
            setDataFiles([...dataFiles,result])
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
                        let files_filter = dataFiles.filter((item) => item.id!=file.id);
                        setDataFiles(files_filter); 
                        
                     
                    }
                });
    }



    
  return (
    <div>
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
                                    {dataFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {dataFiles.map((file, index) => (
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
  )
}

export default UploadedFiles