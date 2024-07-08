'use client';

import React from "react";

interface SearchCompProps {
  handleSearch: (searchValue: string) => void;
  placeholder?: string;
}

const SearchComp: React.FC<SearchCompProps> = ({ handleSearch, placeholder }) => {
  
  return (
    <div className="search w-full sm:w-[40%]">
        <label  className="block mb-2">Search</label>
        <input
            className="h-[55px] px-4 w-full outline-none  appearance-none  rounded-xl border border-gray-300 dark:border-neutral-800 bg-transparent"
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder={placeholder || "Search..."}
        />
    </div>
  );
};

export default SearchComp;
