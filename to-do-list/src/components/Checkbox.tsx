import { Check } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';

interface CheckboxProps {
  id: string;
  label?: string;
  isChecked: boolean;
  setIsChecked: () => void;
}

const Checkbox = ({ id, label = "", isChecked, setIsChecked }: CheckboxProps) => {
  return (
    <div className='flex items-start justify-start mr-4'>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <div
            className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full border ${isChecked ? 'border-primary' : 'border-ignite_blue'
              }`}
          >
            <span
              className={`h-full w-full rounded-full bg-transparent flex items-center justify-center ${isChecked && '!bg-primary'
                }`}
            >
              {isChecked && <Check size={17} weight="bold" />}
            </span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
