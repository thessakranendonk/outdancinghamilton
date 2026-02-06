import clsx from "clsx"

export interface DancingButtonProps{
    title: string,
    color: string,
    onclick?: () => void; 
}
export default function DancingButton({title, color, onclick}: DancingButtonProps){
    return (
        <button className={clsx("text-white px-3 py-1 rounded border-2 w-full hover:bg-white font-medium", color)}
            onClick={onclick}>
                {title}
        </button>
    )
}