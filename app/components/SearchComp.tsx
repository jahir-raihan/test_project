

import React from "react";

interface SearchCompProps {
  handleSearch: (searchValue: string) => void;
  placeholder?: string;
  onEnter: () => void;
}

const SearchComp: React.FC<SearchCompProps> = ({ handleSearch, placeholder, onEnter }) => {
  
  const handleEnterPress = (event: any) => {
    if (event.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <div className="search w-full sm:w-[40%]">
        <label  className="block mb-2">Search</label>
        <input
            className="h-[55px] px-4 w-full outline-none  appearance-none  rounded-xl border border-gray-300 dark:border-neutral-800 bg-transparent"
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleEnterPress}
            type="text"
            placeholder={placeholder || "Search..."}
        />
    </div>
  );
};

export default SearchComp;
