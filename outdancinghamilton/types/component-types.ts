export interface DropdownLink {
  name: string;
  href: string;
}

export interface NavigationLinkProps {
  name: string;
  href: string;
  dropdown?: Array<DropdownLink>;
}

export interface HeaderProps {
  navigationLinks: NavigationLinkProps[];
  linkClassName: string;
  hoverClassName: string;
  activeLinkClassName: string;
  currentActiveLocation?: string;
  dropdownBgColor?: string;
  arrowColor?: string;
  dropdownBorderColor?: string;
  textClassName?: string;
  companyName?: string;
  companyNameClassName?: string;
  logo?: any | undefined;
  logoClassName?: string;
  alt?: string;
  onLinkClick?: () => void;
}