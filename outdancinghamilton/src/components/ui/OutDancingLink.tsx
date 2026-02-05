import clsx from "clsx"
import { ChevronRightIcon } from "flowbite-react"


export interface OutDancingLinkProps {
  link: string
  title?: string
  extraClassName?: string
  target?: string
}

export const OutDancingLink: React.FC<OutDancingLinkProps> = ({ link, title, extraClassName, target }) => {
  return (
    <a href={link}
        target={target}
        rel="noopener noreferrer"
        className={clsx(
          'flex w-full px-4 py-2 sm:py-3 rounded-md border-2',
          'text-lg font-normal font-[Bungee] no-underline',
          'transition-colors duration-150 ease-in',
          'focus:outline-none focus-visible:ring focus-visible:ring-brand-orange/20 focus-visible:border-transparent',
          extraClassName
        )}
      >
        <span className="inline-block flex-1">{title}</span>
        {/* <ChevronRightIcon className="w-5 h-6 mt-1 inline-block text-brand-blue-dark" /> */}
    </a>
  )
}