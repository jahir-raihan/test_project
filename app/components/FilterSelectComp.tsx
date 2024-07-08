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
        className="h-[55px] px-4 w-[200px] sm:w-full outline-none  appearance-none  rounded-xl border border-gray-300 dark:border-neutral-800 bg-transparent"
        
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
