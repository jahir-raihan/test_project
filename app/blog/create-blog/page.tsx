'use client';

import Image from "next/image";
import SearchComp from "@/app/components/SearchComp";
import ButtonComp from "@/app/components/ButtonComp";
import FilterSelectComp from "@/app/components/FilterSelectComp";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import BlogCreateUpdateComp from "../components/BlogCreateUpdateFormComp";
import axios from "axios";

export default function CreateBlog() {

  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogBody, setBlogBody] = useState("");

  const createBlog = useCallback(async (event: React.FormEvent) => {

    event.preventDefault();
    const formData = new FormData();

    formData.append('blog_title', blogTitle)
    formData.append('author', blogAuthor)
    formData.append('blog_body', blogBody)

    try {
      const response = await axios.post(
        process.env.BACKEND_BASE_URL +  '/blog-create', 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
  
      
    } catch (error) {
     
      throw new Error("Failed to update blog!");
    }
  }, []);

  return (
    <>
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
          <BlogCreateUpdateComp  title_value={blogTitle} author_value={blogAuthor} body_value={blogBody} onsubmit={createBlog} setTitle={setBlogTitle} setAuthor={setBlogAuthor} setBody={setBlogBody} />
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
