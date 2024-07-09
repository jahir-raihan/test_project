"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import Image from "next/image";
import SearchComp from "@/app/components/SearchComp";
import ButtonComp from "@/app/components/ButtonComp";
import FilterSelectComp from "@/app/components/FilterSelectComp";
import { deleteBlog } from "./api/delete";
import toast, { Toaster } from "react-hot-toast";

type Blog = {
  blog_title: string,
  author: string,
  blog_body: string,
  id: number,
  created_at: string,
  is_active: boolean
}


export default function Home() {


  // Filtering state variables
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [queryParam, setQueryParam] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogsList, setBlogsList] = useState<Blog[]>([]);

  // Handle search query using this function
  const handleSearch = (searchValue: string) => {
    
    setSearchQuery(searchValue);
  };

  // Handle filter change using below function
  const handleFilterChange = (label: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: value,
    }));
  };

  // Filter data by applying filters and search query
  const  applyFilters = () => {
    const filterParams = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const searchParam = searchQuery
      ? `query=${encodeURIComponent(searchQuery)}`
      : "";
    const combinedParams = [searchParam, filterParams]
      .filter(Boolean)
      .join("&");

    const updatedQueryParam = `?${combinedParams}`;
    setQueryParam(updatedQueryParam);

    getBlogs(updatedQueryParam);

    // Call api and update data

   
  }

  const handleDeleteBlog = async (blog_id: number) => {
    
    const response = await deleteBlog(blog_id);
    console.log("response", response)
    if (response == "Deleted") {
      toast.success("Blog deleted successfully");
      await getBlogs(queryParam);
    }
  };

  const getBlogs = useCallback(async (param:string) => {
    
    try {
      
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +  '/get-blogs' + param, 
        
      );
      
      setBlogsList(response.data)
  
    } catch (error) {
     
      throw new Error("Failed to update blog!");
    }
  }, []);

  useEffect(() => {
    getBlogs('');
    
  }, [getBlogs]);

  return (
    <>
    <main className="min-h-screen w-[90%] m-auto mt-[100px]">
      <div className="z-40 w-full  items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Example website&nbsp;
          <code className="font-mono font-bold"></code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" Joy "}
            
          </a>
        </div>
      </div>

      <div className="w-full mt-[5em] flex items-center gap-4  flex-wrap">
        <SearchComp handleSearch={handleSearch} onEnter={applyFilters} placeholder="Search by blog title, title autor . . ." />
        <FilterSelectComp
          label="Is Active"
          field_name="is_active"
          values={[
            { display_text: "All", value: "all" },
            { display_text: "Active", value: true },
            { display_text: "Inactive ", value: false },
          ]}
          onFilterChange={handleFilterChange}
        />
        <ButtonComp buttonName="Filter" icon_class="fas fa-cogs" execute_function={applyFilters}/>
      </div>

      <div className="line w-full h-[2px] bg-slate-400 mt-[2em]"></div>
      
      <div className="title-and-creat flex justify-between items-center">
        <h5 style={{marginTop:"2em"}}>Blogs</h5>
        <Link href="/blog/create-blog">
          <ButtonComp buttonName="Create" icon_class="fas fa-plus" execute_function={() => {}} />
        </Link>
      </div>

      <div className=" mt-[2em] overflow-x-scroll">
        <div className=" bg-slate-50 rounded-xl  dark:bg-slate-800/75 min-w-[1000px] ">

          <div className="absolute -z-10 inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

          <div className=" rounded-xl w-full overflow-auto">
            <div className="shadow-sm  my-8 w-full">
              <table className="table-auto z-10 border-collapse text-sm w-full blog-table">
                <thead>

                  <tr>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Blog Title</th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Author</th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Published In</th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Status</th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
                  </tr>
                  
                
                </thead>
                <tbody className="bg-white dark:bg-slate-800">

                  {blogsList.map((blog) => (
                    <tr key={blog.id}>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        {blog.blog_title}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        {blog.author}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        {blog.is_active ? "Active": "Inactive"}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        <div className="flex gap-3">
                          <Link key={`blog${blog.id}`} href={`/blog/${blog.id}`} className="text-[16px]">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <div className="text-[16px]">
                            <i onClick={ () => handleDeleteBlog(blog.id)} className="fas fa-trash text-orange-300"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

          </div>


        </div>


        
      </div>

      
    </main>
    <footer className="mb-32 grid text-center ">
    <a
      href="https://github.com/jahir-raihan"
      className="group rounded-lg border border-transparent text-center  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      
      <p className="m-0 text-sm opacity-50">
        Copyright 2024 @github.com/jahir-raihan
      </p>
    </a>
  </footer>
  </>
  );
}
