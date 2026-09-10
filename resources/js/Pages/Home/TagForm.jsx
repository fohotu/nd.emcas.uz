import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

function TagForm({ documentId , successCalback , errorCalback }) {

    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadOptions = async (inputValue) => {
        if (!inputValue) {
            return [];
        }

        const response = await axios.get(route('tags.search'), {
            params: {
                input: inputValue,
            },
        });

        return response.data;
    };

    const addTags = async () => {
        if (selectedTags.length === 0 || loading) {
            return;
        }

        setLoading(true);

        console.log(documentId);

        try {
           let res = await axios.post(
                route('tags.attach'),
                { 
                    tag_id: selectedTags.map(tag => tag.value),
                    document_id:documentId,
                }
            );

            if(res.data.success){
              successCalback()
            }else{
              errorCalback();
            }

        


            setSelectedTags([]);

        } catch (error) {
            errorCalback(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 min-h-[200px]">

            <div className="flex items-start gap-2">

                <div className="flex-1">
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        loadOptions={loadOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        placeholder="Search tags..."
                        noOptionsMessage={() => "Tag not found"}
                        loadingMessage={() => "Searching..."}
                        isClearable
                    />
                </div>

                <button
                    type="button"
                    onClick={addTags}
                    disabled={selectedTags.length === 0 || loading}
                    className="
                        w-10 h-10
                        flex items-center justify-center
                        rounded-md
                        bg-blue-600
                        text-white
                        text-xl
                        hover:bg-blue-700
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    +
                </button>

            </div>

        </div>
    );
}

export default TagForm;