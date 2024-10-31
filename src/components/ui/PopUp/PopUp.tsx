import React from "react";
import styles from "./PopUp.module.css";

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: number; // Добавляем опциональный prop для ширины
    padding?: string;
}

const PopUp: React.FC<PopUpProps> = ({ 
    isOpen, 
    onClose, 
    children, 
    width = 300, // Значение по умолчанию
                                         padding
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}  onClick={onClose}>
            <div 
                className={styles.popup} 
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: `${width}px`, padding: padding? padding : '' }} // Применяем ширину из props
            >
                <button className={styles.closeButton} onClick={onClose}>
                    <div className={styles.closeIcon} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default PopUp;
