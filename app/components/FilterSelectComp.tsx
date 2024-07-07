import React from "react";


interface FilterOption {
    value: any;
    display_text: string;
}

interface FilterComponentProps {
    label: string;
    field_name: string;
    values: FilterOption[] | null;
    onFilterChange: (label: string, value: string) => void;
}

const FilterSelectComp: React.FC<FilterComponentProps> = ({
  label,
  field_name,
  values,
  onFilterChange,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onFilterChange(field_name, selectedValue);
  };

  return (
    <div className="block filter">
      <label htmlFor={label} className="block mb-2">
        {label}
      </label>
      <select
        id={label}
        onChange={handleSelectChange}
        className="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static   lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {values && values.length > 0 ? (
          values.map((option, index) => (
            <option key={index} value={option.value}>
              {option.display_text}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </div>
  );
};

export default FilterSelectComp;
