import { AiOutlineMail } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";

export default function Socials(){
    return (
        <div className="grid grid-cols-6 mt-auto text-white/80 text-xl">
                            <a href="mailto:info@outdancinghamilton.com" target="_blank" aria-label="Email" className="flex col-start-3 mx-auto hover:text-brand-pink transition mr-1">
                              <AiOutlineMail className="mt-0.5 text-[26px]"/>
                            </a>
                            <a href="https://www.instagram.com/outdancinghamilton/?hl=en" target="_blank" aria-label="Instagram" className="flex mx-auto hover:text-brand-pink transition">
                            <FaInstagram  className="mt-0.5 text-2xl"/>
                            </a>
                            
                          </div>  
    )
}