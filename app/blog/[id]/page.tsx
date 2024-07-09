'use client';

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import BlogCreateUpdateComp from "../components/BlogCreateUpdateFormComp";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  params: { id: number };
};

type Blog = {
  blog_title: string,
  author: string,
  blog_body: string,
  is_active: boolean,
}

const UpdateBlog = (props: Props) => {

  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogIsActive, setBlogIsActive] = useState<boolean>(true);

  const [blogData, setBlogData] = useState<Blog | null>(null);

  // Fetch blog
  const fetchBlog = useCallback(async () => {
    
    try {
      const response = await axios.get( process.env.NEXT_PUBLIC_BASE_URL +  '/get-blogs?is_single_blog=true&blog_id='+props.params.id);
  
      setBlogData(response.data);
      console.log(blogData)

      setBlogTitle(response.data.blog_title)
      setBlogAuthor(response.data.author)
      setBlogBody(response.data.blog_body)
      setBlogIsActive(response.data.is_active)

    } catch (error) {
      
      throw new Error("Failed to fetch blog!");
    }
  }, [props.params.id]);

  // Update blog
  const updateBlog = async (title: string, author: string, body: string, is_active: boolean) => {

    const formData = new FormData();

    formData.append('blog_title', title)
    formData.append('author', author)
    formData.append('blog_body', body)
    formData.append('is_active', `${is_active}`)

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL +  '/update-blog/'+props.params.id, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      toast.success("Blog updated successfully!")
     
    } catch (error) {
     
      throw new Error("Failed to update blog!");
    }
  };


  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);



  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <main className="min-h-screen w-[90%] m-auto mt-[100px]">
      <div className="z-40 w-full  items-center justify-between font-mono text-sm lg:flex">
        <Link href="/" className="fixed gap-2 items-center left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <i className="fa fa-arrow-left" ></i>Back&nbsp;
          <code className="font-mono font-bold"></code>
        </Link>
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

        <div className="max-w-4xl mx-auto p-6 border border-gray-500 rounded-md h-full mt-[10%]">

          {blogData ? (

            <BlogCreateUpdateComp button_name="Update" icon_class="fas fa-pen" is_active={blogIsActive}  title_value={blogTitle} author_value={blogAuthor} body_value={blogBody} onsubmit={updateBlog} />
          ): "Loading . . ."}
        
        
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


export default UpdateBlog;