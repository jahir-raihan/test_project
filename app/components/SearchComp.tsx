'use client';

import React from "react";

interface SearchCompProps {
  handleSearch: (searchValue: string) => void;
  placeholder?: string;
}

const SearchComp: React.FC<SearchCompProps> = ({ handleSearch, placeholder }) => {
  
  return (
    <div style={{width:"40%"}} className="search">
        <label  className="block mb-2">Search</label>
        <input
            className="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static   lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder={placeholder || "Search..."}
        />
    </div>
  );
};

export default SearchComp;
