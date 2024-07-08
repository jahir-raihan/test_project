'use client';

import Image from "next/image";
import SearchComp from "@/app/components/SearchComp";
import ButtonComp from "@/app/components/ButtonComp";
import FilterSelectComp from "@/app/components/FilterSelectComp";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {


  // Filtering state variables
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [queryParam, setQueryParam] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
  const applyFilters = () => {
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

    const updatedQueryParam = `${combinedParams}`;
    setQueryParam(updatedQueryParam);

    // Call api and update data
  }

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
            <form className="space-y-6">
                
                <div className="md:flex md:space-x-4">
                    <div className="md:flex-1">
                        <label htmlFor="blog_title" className="block text-sm font-medium text-slate-300">Blog Title</label>
                        <input type="text" id="blog_title" name="blog_title" className="mt-1 block w-full rounded-md border-gray-100 shadow-sm  sm:text-sm  outline-none  appearance-none h-[40px] px-4   border  dark:border-neutral-800 bg-zinc-700" />
                    </div>
                    <div className="md:flex-1 mt-4 md:mt-0">
                        <label htmlFor="author_name" className="block text-sm font-medium text-slate-300">Author Name</label>
                        <input type="text" id="author_name" name="author_name" className="mt-1 block w-full rounded-md border-gray-100 shadow-sm  sm:text-sm  outline-none  appearance-none h-[40px] px-4   border  dark:border-neutral-800 bg-zinc-700" />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="blog_body" className="block text-sm font-medium text-slate-300">Blog Body</label>
                    <textarea id="blog_body" name="blog_body" rows={10} className="mt-1 block w-full rounded-md border-gray-100 shadow-sm  sm:text-sm  outline-none  appearance-none  p-4   border  dark:border-neutral-800 bg-zinc-700"></textarea>
                </div>
               
                <div>
                    <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white order-gray-300 dark:border-neutral-800 bg-slate-800 ">
                        Create
                    </button>
                </div>
            </form>
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
