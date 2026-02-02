import { HeaderProps, NavigationLinkProps } from "@/types/component-types";

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
  return (
    <header className="bg-white shadow-md py-4 mb-8">   
    </header>
    );
};

export default Header;