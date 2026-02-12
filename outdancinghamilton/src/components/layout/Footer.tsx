import { NavigationLinkProps } from "@/types/component-types";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import AnimateOnScroll from "../ui/animations/AnimateOnScroll";
import { slideInLeftSlow, slowFadeIn } from "@/src/lib/animations";
import { MdOutlineEmail } from "react-icons/md";
import Socials from "../ui/icons/Socials";


const Footer: React.FC<{ navigationLinks: Array<NavigationLinkProps> }> = ({ navigationLinks }) => {
  return (
    <footer className="flex flex-col md:flex-row md:justify-between items-center bg-brand-darkest text-sm text-white border-t-8 border-brand-pink py-6 mt-12"> 
    <a href="/">
    <AnimateOnScroll customVariants={slideInLeftSlow}>
    <h2 className="text-3xl lg:text-6xl text-center md:text-left font-medium mb-8 md:mb-6 tracking-tight leading-tight max-w-xl font-monoton mt-4 md:pl-20">
          Out Dancing <br />
          <span className="text-pink-400">Hamilton</span>
        </h2>
        </AnimateOnScroll>
        </a>
        <AnimateOnScroll customVariants={slowFadeIn}>
          <ul className="md:pr-10 lg:pr-50 text-center space-y-4 text-xl font-[quicksand]">
          
          {navigationLinks.map((link, i) => {
        return (
            <li key={i}>
              <Link href={link.href} className="hover:font-medium hover:text-brand-pink transition-all duration-500 ease-out">
              {link.name}
              </Link>
            </li>
        )
          })}
                  <Socials />
          </ul>
          </AnimateOnScroll>
    </footer>
    );
};

export default Footer;