'use client'
import { Popover, PopoverPanel, PopoverButton, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import HamburgerIcon from "../ui/icons/HamburgerIcon";
import { HeaderProps } from "@/types/component-types";
import logo from "@/public/svg/disco.svg"
import Socials from "../ui/icons/Socials";


export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/**
 * Header logo link pointing to the home ('/') route.
 */
const LogoLink: React.FC<
  Pick<
    HeaderProps,
    "onLinkClick" | "companyName" | "companyNameClassName" | "logo" | "alt"
  > & {
    logoClassName?: string;
    showSidePanel?: boolean;
    logo: any;
  }
> = ({ onLinkClick, logoClassName }) => {
  return (
    <div className="hover:animate-pulse">
      <Link
        href="/"
        className={clsx(
          "flex lg:inline-block relative  md:ml-3 lg:ml-18",
          "focus:outline-none focus-visible:ring focus-visible:ring-black/20 focus-visible:border-transparent",
          logoClassName
        )}
        onClick={onLinkClick}
      >
        <Image
          src={logo}
          alt="Out Dancing Hamilton"
          className={logoClassName}
          priority
        />
      </Link>
    </div>
  );
};

const slideVerticalAnimation = {
  open: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      mass: 0.8,
      type: "spring",
    },
    display: "block",
  },
  close: {
    rotateX: -15,
    y: -320,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

/**
 * Header navigation links rendered as React `NavLink` siblings encapsulated within a fragment.
 *
 * Each individual link (anchor tag) has the given `linkClassName` applied as its className and the
 * optional `onLinkClick` set as its `onClick` handler.
 */
const MenuLinks: React.FC<
  Pick<
    HeaderProps,
    | "navigationLinks"
    | "currentActiveLocation"
    | "activeLinkClassName"
    | "linkClassName"
    | "hoverClassName"
    | "onLinkClick"
    | "textClassName"
  > & { onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void }
> = ({
  navigationLinks,
  currentActiveLocation,
  activeLinkClassName,
  textClassName,
  hoverClassName,
  linkClassName,
  onLinkClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul>
      {navigationLinks.map((link) => (
        <div key={link.name}>
          {link.name && (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  currentActiveLocation?.includes(link.href)
                    ? activeLinkClassName
                    : linkClassName,
                  hoverClassName,
                  textClassName,
                  "text-center lg:text-left border-white/30 border-b-[1px] font-light py-[0.75rem]",
                  "flex flex-col"
                )}
                onClick={onLinkClick}
              >
                {link.name}
              </Link>
            </li>
          ) }
        </div>
      ))}
    </ul>
  );
};

const DesktopNavBar: React.FC<
  Pick<
    HeaderProps,
    | "navigationLinks"
    | "linkClassName"
    | "hoverClassName"
    | "arrowColor"
    | "dropdownBgColor"
    | "activeLinkClassName"
    | "currentActiveLocation"
    | "textClassName"
  >
> = ({
  navigationLinks,
  currentActiveLocation,
  activeLinkClassName,
  textClassName,
  hoverClassName,
  arrowColor,
  dropdownBgColor,
  linkClassName,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [dropdownVariant, setDropdownVariant] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const isShowing = isClick || isHover;
  useOnClickOutside(ref, (event: MouseEvent | TouchEvent) => {
    setIsClick(false);
  });
  return (
    <ul className="flex md:w-full justify-between">
      <div className="flex">
      {navigationLinks.map((link, i) => {
        return (
          <li key={link.name}>
            {!link.dropdown ? (
              <Link
                href={link.href}
                className={clsx(
                  currentActiveLocation?.includes(link.href)
                    ? activeLinkClassName
                    : linkClassName,
                  hoverClassName,
                  textClassName,
                  "text-center lg:text-left font-semibold text-[18px] font-[quicksand]",
                  "flex flex-col"
                )}
                onClick={() => setIsClick(true)}
                onMouseLeave={() => {
                  setIsHover(false);
                }}
              >
                <span className={clsx(hoverClassName)}>{link.name}</span>
              </Link>
            ) : (
              <Popover as="div" className="h-full">
                {({ close, open }) => (
                  <>
                    <div
                      className="relative h-full transition-all duration-300 ease-in-out"
                      ref={ref}
                      onMouseEnter={() => {
                        if (link.dropdown) {
                          setIsHover(true);
                          setDropdownVariant(link.name);
                        }
                      }}
                      onMouseLeave={() => {
                        setIsHover(false);
                      }}
                      onClick={() => setIsClick(true)}
                    >
                      <PopoverButton
                        className={clsx(textClassName, linkClassName)}
                      >
                        <Link className={hoverClassName} href={link.href}>
                          {link.name}

                          {/* Dropdown Arrow */}
                          {link.dropdown && (
                            <ChevronUpIcon
                              className={clsx(
                                "ml-2 -mr-1 h-5 w-5 mt-1",
                                arrowColor,
                                isHover && dropdownVariant === link.name
                                  ? "rotate-0"
                                  : "rotate-180"
                              )}
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </PopoverButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                      show={
                         link.name !== dropdownVariant
                          ? open
                          : isShowing
                      }
                      as={Fragment}
                    >
                      <PopoverPanel
                        className={clsx(
                          "absolute top-[4.75rem] mt-2 w-64 origin-top-right rounded-md bg-white shadow-md shadow-teal-800 ring-1 ring-black ring-opacity-5 focus:outline-none",
                          dropdownBgColor
                        )}
                        ref={ref}
                        onMouseEnter={() => {
                          if (link.dropdown) {
                            setIsHover(true);
                            setDropdownVariant(link.name);
                          }
                        }}
                        onMouseLeave={() => {
                          setIsHover(false);
                          setDropdownVariant("");
                        }}
                        onClick={() => setIsClick(true)}
                      >
                        <div className="px-10 py-2">
                          <ul>
                            <>
                              {link.dropdown?.map((droplink) => (
                                <li
                                  key={droplink.name}
                                  className="first:mb-2 last:pb-0 border-b-2 border-zinc-200/50 last:border-none"
                                >
                                  <Link
                                    href={droplink.href}
                                    className={textClassName}
                                  >
                                    <span className={hoverClassName}>
                                      {droplink.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </>
                          </ul>
                        </div>
                      </PopoverPanel>
                    </Transition>
                  </>
                )}
              </Popover>
            )}
          </li>
        );
      })}
      </div>
      <Socials />
    </ul>
  );
};

const Header: React.FC<HeaderProps> = ({
  navigationLinks,
  companyName,
  companyNameClassName,
  linkClassName,
  hoverClassName,
  activeLinkClassName,
  currentActiveLocation,
  dropdownBgColor,
  arrowColor,
  textClassName,
  logoClassName,
  alt,
}) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (event: MouseEvent | TouchEvent) => {
    setIsClick(false);
  });
    const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // wait until client hydration

  return (
    <header className="fixed flex w-full justify-between lg:justify-normal h-14 items-center bg-brand-darkest z-40 pb-2 md:pb-2 border-b-5 border-brand-pop">
      <div className="m-0">
      
           {logo ? (
          <LogoLink logo={logo.src} alt={alt} logoClassName={logoClassName} />
        ) : (
          <Link href="/">
            <div className={clsx(companyNameClassName)}>{companyName}</div>
          </Link>
         )}
      </div>
      <div className="flex">

    

        {/* HAMBURGER MENU */}
        <Popover className="lg:hidden">
          {({ open, close }) => (
            <>
              <PopoverButton
                className={clsx(
                  "flex justify-end px-6 mt-2",
                )}
              >
                <span className="sr-only">'open-navigation-menu'</span>
                <HamburgerIcon/>
              </PopoverButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute left-1/2 z-50 mt-15 w-[85%] -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl bg-brand-darkest border-[1px] rounded-lg shadow-2xl">
                  {({ close }) => (
                    <div>
                      <MenuLinks
                        navigationLinks={navigationLinks}
                        linkClassName={linkClassName}
                        hoverClassName={hoverClassName}
                        activeLinkClassName={activeLinkClassName}
                        currentActiveLocation={currentActiveLocation}
                        onLinkClick={() => close()}
                      />
                    </div>
                  )}
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden lg:flex w-full mt-3">
        <DesktopNavBar
          navigationLinks={navigationLinks}
          textClassName={textClassName}
          dropdownBgColor={dropdownBgColor}
          arrowColor={arrowColor}
          linkClassName={linkClassName}
          hoverClassName={hoverClassName}
          activeLinkClassName="text-brand-pop"
          currentActiveLocation={currentActiveLocation}
        />
      </div>
      <div className="hidden lg:flex">
      </div>
    </header>
  );
};
export default Header;