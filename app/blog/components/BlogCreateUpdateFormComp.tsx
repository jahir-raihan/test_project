'use client';

import React, { useCallback, useEffect, useState } from "react";

interface BlogFormProps {
  title_value: string | "";
  author_value: string | "";
  body_value: string | "";
  onsubmit: (event: React.FormEvent) => void | void;
  setTitle: any;
  setAuthor: any;
  setBody: any ;
  setIsActive: any;
  is_active: string | "";

}

const BlogCreateUpdateComp: React.FC<BlogFormProps> = (

    {
        title_value,
        author_value,
        body_value,
        onsubmit, 
        setTitle,
        setAuthor,
        setBody,
        setIsActive,
        is_active
    }
    
    ) => {
  
    return (
        <form className="space-y-6" onSubmit={onsubmit}>
                    
            <div className="md:flex md:space-x-4">
                <div className="md:flex-1">
                    <label htmlFor="blog_title" className="block text-sm font-medium text-slate-300">Blog Title</label>
                    <input type="text" id="blog_title" name="blog_title" onChange={(e) => setTitle(e.target.value)} value={title_value} className="mt-1 block w-full rounded-md border-gray-100 shadow-sm  sm:text-sm  outline-none  appearance-none h-[40px] px-4   border  dark:border-neutral-800 bg-zinc-700" />
                </div>
                <div className="md:flex-1 mt-4 md:mt-0">
                    <label htmlFor="author_name" className="block text-sm font-medium text-slate-300">Author Name</label>
                    <input type="text" id="author_name" name="author_name" onChange={(e) => setAuthor(e.target.value)} value={author_value} className="mt-1 block w-full rounded-md border-gray-100 shadow-sm  sm:text-sm  outline-none  appearance-none h-[40px] px-4   border  dark:border-neutral-800 bg-zinc-700" />
                </div>
            </div>
            
            <div>
                <label htmlFor="blog_body" className="block text-sm font-medium text-slate-300">Blog Body</label>
                <textarea id="blog_body" name="blog_body" rows={10} onChange={(e) => setBody(e.target.value)} value={body_value} className="mt-1 block w-full rounded-md border-gray-100 shadow-sm  sm:text-sm  outline-none  appearance-none  p-4   border  dark:border-neutral-800 bg-zinc-700"></textarea>
            </div>
            <div className="flex items-center gap-3">
                
                <input type="checkbox" id="is_active" name="is_active" onChange={(e) => setIsActive(e.target.value)} value={is_active} className="h-[20px] w-[20px]" />
                <label htmlFor="is_active" className=" text-sm font-medium text-slate-300">Is Active</label>
            </div>
        
            <div>
                <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white order-gray-300 dark:border-neutral-800 bg-slate-800 ">
                    Create
                </button>
            </div>
        </form>
    );
};

export default BlogCreateUpdateComp;
