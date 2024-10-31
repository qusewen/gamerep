import React from "react";
import styles from "./SaleOffer.module.css";

interface SaleOfferProps {
    image: string;
    title: string;
    highlightedText: string;
    description: React.ReactNode;
}

const SaleOffer: React.FC<SaleOfferProps> = ({
    image,
    title,
    highlightedText,
    description,
}) => {
    console.log(highlightedText)
    return (
        <div className={styles.pannel_inner}>
            <img src={image} className={styles.banner} alt={title} />
            <span className={styles.title}>
                {title}{" "}
                <span className={styles.highlightedText}>
                    {highlightedText}
                </span>
            </span>
            <div className={styles.description}>{description}</div>
        </div>
    );
};

export default SaleOffer;
