import clsx from "clsx"
import { JSX } from "react";

export interface DancingButtonProps{
    title: string | JSX.Element,
    color: string,
    tooltip?: string
    onclick?: () => void; 
}
export default function DancingButton({title, color, tooltip, onclick}: DancingButtonProps){
    return (
        <div className="relative group w-fit">
        <button className={clsx("text-white w-10 h-10 text-center p-2 rounded-full shadow-xl hover:bg-white font-medium", color)}
            onClick={onclick}>
                {title}
        </button>
        {tooltip && (
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                         scale-0 group-hover:scale-100 
                         transition-transform duration-200
                         bg-black text-white text-xs px-2 py-1 
                         rounded whitespace-nowrap">
          {tooltip}
        </span>
      )}
      </div>
    )
}