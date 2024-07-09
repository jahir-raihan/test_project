'use client';

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import BlogCreateUpdateComp from "../components/BlogCreateUpdateFormComp";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateBlog() {

  const router = useRouter();

  const createBlog = (title: string, author: string, body: string, is_active: boolean) => {

    const formData = new FormData();

    formData.append('blog_title', title)
    formData.append('author', author)
    formData.append('blog_body', body)
    formData.append('is_active', `${is_active}`)

    try {
      const response = axios.post(
        process.env.NEXT_PUBLIC_BASE_URL +  '/create-blog', 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
        
      toast.success("Blog created successfully!")
      router.push('/')
      
    } catch (error) {
     
      throw new Error("Failed to update blog!");
    }
  };

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
          <BlogCreateUpdateComp button_name="Create" icon_class="fas fa-plus" is_active={false}  title_value="" author_value="" body_value="" onsubmit={createBlog} />
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
