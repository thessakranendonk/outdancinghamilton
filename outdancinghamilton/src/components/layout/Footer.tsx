import { NavigationLinkProps } from "@/types/component-types";


const Footer: React.FC<{ navigationLinks: Array<NavigationLinkProps> }> = ({ navigationLinks }) => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 mt-12">   
    </footer>
    );
};

export default Footer;