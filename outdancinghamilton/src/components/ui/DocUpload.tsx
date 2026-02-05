import { PhotoIcon } from "@heroicons/react/24/solid";
import { JSX } from "react";

export interface BasicInputProps {
  id?: string;
  type?: string;
  name?: string;
  content?: JSX.Element | string;
  description?: string;
  label?: string;
  showError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extraClassName?: string;
}

export default function DocUpload({
  id,
  type = "file",
  content,
  label,
  description,
  onChange,
  extraClassName,
}: BasicInputProps) {
  return (
    <div className="col-span-2">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-brand-base/80"
      >
        {label}
      </label>

      <div className="flex justify-center rounded-lg border border-dashed border-brand-base px-6 py-8">
        <div className="text-center">
          <PhotoIcon className="mx-auto size-12 text-gray-600" />

          <div className="mt-2 flex text-sm text-gray-400">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md font-semibold text-brand-pink hover:text-brand-pop"
            >
              <span>{content}</span>
              <input
                id={id}
                name={id}
                type={type}
                accept="image/*"
                className="sr-only"
                onChange={onChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>

          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
