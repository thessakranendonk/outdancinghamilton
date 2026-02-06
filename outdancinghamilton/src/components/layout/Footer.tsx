import { NavigationLinkProps } from "@/types/component-types";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import AnimateOnScroll from "../ui/animations/AnimateOnScroll";
import { slideInLeftSlow, slowFadeIn } from "@/src/lib/animations";


const Footer: React.FC<{ navigationLinks: Array<NavigationLinkProps> }> = ({ navigationLinks }) => {
  return (
    <footer className="flex justify-between items-center bg-brand-darkest text-sm text-white border-t-8 border-brand-pink py-6 mt-12"> 
    <a href="/">
    <AnimateOnScroll customVariants={slideInLeftSlow}>
    <h2 className="text-6xl font-medium mb-6 tracking-tight leading-tight max-w-xl font-monoton mt-4 pl-20">
          Out Dancing <br />
          <span className="text-pink-400">Hamilton</span>
        </h2>
        </AnimateOnScroll>
        </a>
        <AnimateOnScroll customVariants={slowFadeIn}>
          <ul className="pr-50 text-center space-y-4 text-xl font-[quicksand]">
          
          {navigationLinks.map((link, i) => {
        return (
            <li key={i}>
              <Link href={link.href} className="hover:font-medium hover:text-brand-pink transition-all duration-500 ease-out">
              {link.name}
              </Link>
            </li>
        )
          })}
          <div className="flex space-x-6 mt-auto text-white/80 text-xl">
                    <a href="https://www.instagram.com/outdancinghamilton/?hl=en" target="_blank" aria-label="Instagram" className="flex mx-auto hover:text-brand-pink transition">
                    <FaInstagram  className="mt-0.5 text-2xl"/>
                    </a>
                  </div>  
                  
          </ul>
          </AnimateOnScroll>
    </footer>
    );
};

export default Footer;