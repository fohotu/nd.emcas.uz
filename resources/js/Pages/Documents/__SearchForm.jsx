import React,{ useState,useRef } from "react";
import Select from 'react-select';
import AsyncSelect from "react-select/async";
import axios from "axios";
import LiveSelect from "./LiveSelect";

export default function SearchForm({ filter, onSearch }) {


 
  const [form, setForm] = useState({
    number: "",
    title: "",
    category_id: "",
    menu_id: "",
    type: "",
    date: "",
  });

  const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });  
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log("Submitting search with form data:", form);
    onSearch(form);

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end"
    >
      {/* Номер */}
      <input
        name="number"
        value={form.number}
        onChange={handleChange}
        placeholder="Номер"
        className="border rounded px-2 py-1 w-full"
      />

      {/* Заголовок */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Заголовок"
        className="border rounded px-2 py-1 w-full"
      />


     

    

        <LiveSelect 
        type="category"
        placeholder="Относиться"
       
        onChange={(e)=>{
            setForm({
                ...form,
                category_id: e.value,
            });  
        }}/>
        <LiveSelect type="menu"
            placeholder="Форма документа"
        
            onChange={(e)=>{
                setForm({
                    ...form,
                    menu_id: e.value,
                });  
            }}

        />

   

      {/* Дата */}
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
      />

      {/* Кнопка */}
      <button
        type="submit"
        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
        </button>
    </form>
  );
}