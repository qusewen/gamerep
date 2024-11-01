import React, { useState } from 'react';

interface NotificationIconProps {
  color?: string;
  hoverColor?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ color = '#7E7E7E', hoverColor = '#5A5A5A' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="30"
      fill="none"
      viewBox="0 0 22 24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        fill={isHovered ? hoverColor : color}
        d="M6.541 21.89A5.697 5.697 0 0 0 11 24c1.816 0 3.43-.827 4.459-2.11a33.79 33.79 0 0 1-8.918 0ZM19.249 8.4v.845c0 1.014.295 2.005.847 2.849l1.354 2.067c1.236 1.889.292 4.456-1.858 5.053a32.088 32.088 0 0 1-17.184 0C.258 18.617-.686 16.05.55 14.16l1.354-2.067a5.203 5.203 0 0 0 .847-2.85V8.4C2.751 3.76 6.444 0 11 0c4.556 0 8.249 3.76 8.249 8.4Z"
      />
    </svg>
  );
};

export default NotificationIcon;

