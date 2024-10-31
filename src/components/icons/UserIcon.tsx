import React, { useState } from 'react';

interface UserIconProps {
  color?: string;
  hoverColor?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ color = '#7E7E7E', hoverColor = '#5A5A5A' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 39 39"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <circle cx="19.501" cy="11.7" r="5.2" fill={isHovered ? hoverColor : color} />
      <ellipse cx="19.5" cy="26" fill={isHovered ? hoverColor : color} rx="9.1" ry="5.2" />
    </svg>
  );
};

export default UserIcon;

