import React, { useState } from 'react';

interface PsPlusIconProps {
  primaryColor?: string;
  secondaryColor?: string;
  hoverPrimaryColor?: string;
  hoverSecondaryColor?: string;
}

const PsPlusIcon: React.FC<PsPlusIconProps> = ({
  primaryColor = '#7E7E7E',
  secondaryColor = '#212229',
  hoverPrimaryColor = '#5A5A5A',
  hoverSecondaryColor = '#000000',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5036 2.16675C16.5036 1.06218 15.6082 0.166748 14.5036 0.166748H10.5977C9.49309 0.166748 8.59766 1.06218 8.59766 2.16675V6.07273C8.59766 7.1773 7.70223 8.07273 6.59766 8.07273H2.69141C1.58684 8.07273 0.691406 8.96816 0.691406 10.0727V13.9787C0.691406 15.0833 1.58684 15.9787 2.69141 15.9787H6.59766C7.70223 15.9787 8.59766 16.8741 8.59766 17.9787V21.8847C8.59766 22.9893 9.49309 23.8847 10.5977 23.8847H14.5036C15.6082 23.8847 16.5036 22.9893 16.5036 21.8847V17.9787C16.5036 16.8741 17.3991 15.9787 18.5036 15.9787H22.4094C23.5139 15.9787 24.4094 15.0833 24.4094 13.9787V10.0727C24.4094 8.96816 23.5139 8.07273 22.4094 8.07273H18.5036C17.3991 8.07273 16.5036 7.1773 16.5036 6.07273V2.16675Z"
        fill={isHovered ? hoverPrimaryColor : primaryColor}
      />
      <path
        d="M12.1161 2.70727C12.3085 2.37394 12.7897 2.37394 12.9821 2.70728L13.9888 4.45087C14.1812 4.7842 13.9407 5.20086 13.5558 5.20086H11.5424C11.1575 5.20086 10.917 4.7842 11.1094 4.45086L12.1161 2.70727Z"
        stroke={isHovered ? hoverSecondaryColor : secondaryColor}
      />
      <rect
        x="2.77344"
        y="10.5493"
        width="2.95299"
        height="2.95299"
        rx="0.5"
        stroke={isHovered ? hoverSecondaryColor : secondaryColor}
      />
      <circle
        cx="20.8517"
        cy="12.0257"
        r="1.4765"
        stroke={isHovered ? hoverSecondaryColor : secondaryColor}
      />
      <rect
        x="11.5273"
        y="18.3503"
        width="3.95299"
        height="0.790598"
        rx="0.395299"
        transform="rotate(45 11.5273 18.3503)"
        fill={isHovered ? hoverSecondaryColor : secondaryColor}
      />
      <rect
        x="10.9688"
        y="21.1455"
        width="3.95299"
        height="0.790598"
        rx="0.395299"
        transform="rotate(-45 10.9688 21.1455)"
        fill={isHovered ? hoverSecondaryColor : secondaryColor}
      />
    </svg>
  );
};

export default PsPlusIcon;
