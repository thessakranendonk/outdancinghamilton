import { PhotoIcon } from '@heroicons/react/24/solid'
import { JSX } from "react";


export interface BasicInputProps {
  id?: string;
  type?: string;  
  name?: string;     
  content?: JSX.Element | string;
  description?: string;
  label?: string;
  showError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  extraClassName?: string;
}

export default function DocUpload({ id, extraClassName,type,content,label,description }: BasicInputProps) {
  return (
<div className="col-span-2">
          <label htmlFor={id} className="block mb-2 text-sm/6 font-medium text-brand-base/80">
              {label}
            </label>
          <div className="col-span-2 flex justify-center rounded-lg border border-dashed border-brand-base px-6 py-8">
                
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-600" />
                  <div className="mt-2 flex text-sm/6 text-gray-400">
                    <label
                      htmlFor={id}
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-brand-pink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-brand-pop"
                    >
                      <span>{content}</span>
                      <input id={id} name={id} type={type} className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-400">{description}</p>
                </div>
          </div>
</div>
  );
};