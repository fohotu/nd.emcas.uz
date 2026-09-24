import React, { useState,useEffect } from 'react'; 
import DocumentViewer from '@/Components/DocumentViewer';
 export default function DocumentShow({ document,open,file,title,onClose }) { 

   
    const [viewerOpen, setViewerOpen] = useState(false); 
    const [viewerFile, setViewerFile] = useState(null);
    
    useEffect(()=>{
        openFile(document);
    },[])

    const openFile = (file) => {
        let test_url = "/test/doc"; //`/documents/file/${file.id}/view`
        setViewerFile({ url: test_url, title: file.file_name || 'Документ', }); 
        setViewerOpen(true); };
        return ( <> 
        {document?.files?.map((file) => ( 
            <button 
                key={file.id} 
                type="button" 
                onClick={() => openFile(file)} 
                className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300"
            > 
                Открыть 
            </button> 
        ))} 
            <DocumentViewer 
                open={open}
                file={viewerFile} 
                title={title} 
                onClose={onClose}
                />     
        </>); 
    }