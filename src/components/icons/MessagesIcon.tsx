import React from 'react';

interface MessagesIconProps {
  color?: string;
  hoverColor?: string;
}

const MessagesIcon: React.FC<MessagesIconProps> = ({ color = "#7E7E7E", hoverColor }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 12.7597 0.413176 14.4228 1.1478 15.8977C1.34303 16.2897 1.40801 16.7377 1.29483 17.1607L0.63966 19.6093C0.355247 20.6723 1.32771 21.6448 2.39068 21.3603L4.83932 20.7052C5.26233 20.592 5.71033 20.657 6.10228 20.8522C7.5772 21.5868 9.24035 22 11 22Z"
        fill={isHovered && hoverColor ? hoverColor : color}
      />
      <path
        d="M14.3 11C14.3 11.6075 14.7925 12.1 15.4 12.1C16.0075 12.1 16.5 11.6075 16.5 11C16.5 10.3925 16.0075 9.9 15.4 9.9C14.7925 9.9 14.3 10.3925 14.3 11Z"
        fill="#1A1B20"
      />
      <path
        d="M9.9 11C9.9 11.6075 10.3925 12.1 11 12.1C11.6075 12.1 12.1 11.6075 12.1 11C12.1 10.3925 11.6075 9.9 11 9.9C10.3925 9.9 9.9 10.3925 9.9 11Z"
        fill="#1A1B20"
      />
      <path
        d="M5.5 11C5.5 11.6075 5.99249 12.1 6.6 12.1C7.20751 12.1 7.7 11.6075 7.7 11C7.7 10.3925 7.20751 9.9 6.6 9.9C5.99249 9.9 5.5 10.3925 5.5 11Z"
        fill="#1A1B20"
      />
    </svg>
  );
};

export default MessagesIcon;

