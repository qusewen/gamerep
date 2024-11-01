import React, { useState } from 'react';

interface MenuIconProps {
  color?: string;
  hoverColor?: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({ color = '#FFFFFF', hoverColor = '#CCCCCC' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g clipPath="url(#clip0_648_146)">
        <path
          d="M27.72 0H0.28C0.126 0 0 0.122727 0 0.272727V2.45455C0 2.60455 0.126 2.72727 0.28 2.72727H27.72C27.874 2.72727 28 2.60455 28 2.45455V0.272727C28 0.122727 27.874 0 27.72 0ZM16.72 21.2727H0.28C0.126 21.2727 0 21.3955 0 21.5455V23.7273C0 23.8773 0.126 24 0.28 24H16.72C16.874 24 17 23.8773 17 23.7273V21.5455C17 21.3955 16.874 21.2727 16.72 21.2727ZM27.72 10.6364H0.28C0.126 10.6364 0 10.7591 0 10.9091V13.0909C0 13.2409 0.126 13.3636 0.28 13.3636H27.72C27.874 13.3636 28 13.2409 28 13.0909V10.9091C28 10.7591 27.874 10.6364 27.72 10.6364Z"
          fill={isHovered ? hoverColor : color}
        />
      </g>
      <defs>
        <clipPath id="clip0_648_146">
          <rect width="28" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MenuIcon;

