import React, { useState } from "react";
import styles from "./Slider.module.css";

interface SliderProps {
    stateValue: number;
    setValue: (value: number) => void;
    min: number;
    max: number;
    step: number;
    discounts: Array<{ from: number; discount: number }>;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
                                           stateValue,
                                           setValue,
                                           min,
                                           max,
                                           step,
                                           discounts,
                                           onChange,
                                       }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setValue(newValue);
            onChange(newValue);
        }
    };

    const getDiscount = (value: number) => {
        const applicableDiscount = discounts.find((d) => value >= d.from);
        return applicableDiscount?.discount || 0;
    };

    const points = [];
    for (let i = min; i <= max; i += step) {
        points.push(i);
    }

    const calculateBackground = () => {
        const percentage = ((stateValue - min) / (max - min)) * 100;
        return `linear-gradient(90deg, 
            var(--color-deeppink) 0%, 
            var(--color-deeppink) ${percentage}%, 
            rgba(194, 194, 194, 1) ${percentage}%, 
            rgba(194, 194, 194, 0.12) 100%)`;
    };

    return (
        <div className={styles.slider_container}>
            <div className={styles.slider_wrapper}>
                <div className={styles.discount_labels}>
                    <div className={styles.discount_label} style={{ left: '25%' }}>
                        -5%
                    </div>
                    <div className={styles.discount_label} style={{ left: '75%' }}>
                        -10%
                    </div>
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={1}
                    value={stateValue}
                    onChange={handleChange}
                    className={styles.slider}
                    style={{ background: calculateBackground() }}
                />
                <div className={styles.points}>
                    {points.map((point) => (
                        <div
                            key={point}
                            className={`${styles.point} ${point <= stateValue ? styles.active : ""}`}
                            style={{
                                left: `${((point - min) / (max - min)) * 100}%`
                            }}
                        />
                    ))}
                </div>
                <div className={styles.values}>
                    {points.map((point) => (
                        <span
                            key={point}
                            className={`${styles.value} ${point <= stateValue ? styles.active : ""}`}
                            style={{
                                left: `${((point - min) / (max - min)) * 100}%`
                            }}
                        >
                            {point}₺
                        </span>
                    ))}
                </div>
            </div>
            <div style={{ paddingTop: "20px" }} />
            <div className={styles.gradient_line} />
            <div style={{ paddingTop: "20px" }} />

        </div>
    );
};

export default Slider;
