import clsx from "clsx"
import { JSX } from "react";

export interface DancingButtonProps{
    title: string | JSX.Element,
    color: string,
    onclick?: () => void; 
}
export default function DancingButton({title, color, onclick}: DancingButtonProps){
    return (
        <button className={clsx("text-white w-10 h-10 text-center p-2 rounded-full border-1 shadow-xl hover:bg-white font-medium", color)}
            onClick={onclick}>
                {title}
        </button>
    )
}