import clsx from 'clsx';
import React, { useState } from 'react';

interface DropdownProps<T> {
  options: { value: T; label: string }[];
  label: string;
  onChange: (value: T) => void;
}

function Dropdown<T>({ options, label, onChange }: DropdownProps<T>): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<T | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = options.find(option => (option.value as any).toString() === event.target.value)?.value;
    if (value !== undefined) {
      setSelectedValue(value);
      onChange(value);
    }
  };

  return (
    <div>
      <label htmlFor="custom-dropdown">{label}</label>
      <select id="custom-dropdown" value={selectedValue?.toString()} onChange={handleChange} className='form-select appearance-none block py-2 bg-no-repeat bg-none transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-none underline font-medium text-lg decoration-4'>
        {options.map(option => (
          <option key={(option.value as any).toString()} value={(option.value as any).toString()} className={clsx(selectedValue == option.value && "underline")}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
