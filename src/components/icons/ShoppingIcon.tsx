import React, { useState } from "react";

interface ShoppingIconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    hoverColor?: string;
}

const ShoppingIcon: React.FC<ShoppingIconProps> = ({
    color = "#7E7E7E",
    hoverColor = "#5A5A5A",
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            fill="none"
            viewBox="0 0 35 35"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <path
                fill={isHovered ? hoverColor : color}
                d="M6.61 7.476a.975.975 0 0 1 1.243-.596l.392.137c.802.282 1.482.521 2.018.784.573.281 1.064.628 1.434 1.168.366.537.518 1.125.587 1.77.032.29.048.61.057.96h13.83c2.19 0 4.162 0 4.739.75.577.751.351 1.881-.1 4.142l-.65 3.152c-.41 1.988-.614 2.982-1.331 3.566-.718.584-1.732.584-3.762.584h-6.893c-3.626 0-5.439 0-6.565-1.187-1.126-1.188-1.209-2.45-1.209-6.274v-3.383c0-.962 0-1.605-.054-2.1-.052-.472-.142-.708-.26-.88-.114-.167-.288-.324-.682-.517-.42-.206-.99-.408-1.858-.713l-.34-.12a.975.975 0 0 1-.596-1.243ZM13.65 27.3a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9Zm11.7 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9Z"
            />
        </svg>
    );
};

export default ShoppingIcon;
