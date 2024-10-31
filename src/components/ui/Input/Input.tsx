import { CSSProperties } from "react";
import styles from "./Input.module.css";

interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onEventEnterPressed?: () => void;
    value?: any;
    min?: number;
    max?: number;
    suffix?: string;
    style?: CSSProperties;
    maxlenght?: number;
    isDisabled?: boolean;
    styles_suffix?: CSSProperties;
    label_style?: CSSProperties;
    rightElement?: React.ReactNode;
    width?: string | number;
    height?: string | number; // добавляем новый prop для высоты
    textAlign?: 'left' | 'center' | 'right';
    placeholderAlign?: 'left' | 'center' | 'right';
    fontFamily?: string;
    fontSize?: string | number;
}

const Input: React.FC<InputProps> = ({
    label,
    type = "text",
    placeholder,
    onChange,
    value,
    min,
    max,
    suffix,
    style,
    maxlenght,
    onEventEnterPressed,
    isDisabled,
    styles_suffix,
    label_style,
    rightElement,
    width,
    height, // добавляем в параметры
    textAlign,
    placeholderAlign,
    fontFamily,
    fontSize,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (onEventEnterPressed) onEventEnterPressed();
        }
    };

    return (
        <div style={{ position: "relative", width: width || "100%" }}>
            {label && (
                <div className={styles.label} style={label_style}>
                    {label}
                </div>
            )}
            <div className={styles.input_container}>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className={`${styles.input} ${
                        rightElement ? styles.with_right_element : ""
                    }`}
                    min={min}
                    max={max}
                    style={{
                        ...style,
                        height: height || undefined, // добавляем height в стили
                        cursor: isDisabled ? "not-allowed" : "initial",
                        textAlign: textAlign || 'left',
                        fontFamily: fontFamily || "Unbounded_Light_Base",
                        fontSize: fontSize || '12px',
                        '--placeholder-align': placeholderAlign || textAlign || 'left'
                    } as React.CSSProperties}
                    maxLength={maxlenght}
                    onKeyDown={handleKeyDown}
                    disabled={isDisabled}
                />
                {rightElement && (
                    <div className={styles.right_element}>{rightElement}</div>
                )}
                <img
                    className={styles.suffix}
                    style={styles_suffix}
                    src={suffix}
                />
                {type === "date" && (
                    <img
                        src="/icons/bases/date_icon.svg"
                        width={10}
                        height={12}
                        style={{
                            width: "15px",
                            height: "25px",
                            transform: "translateX(-95%) translateY(-50%)",
                            position: "absolute",
                            left: "95%",
                            top: "50%",
                            pointerEvents: "none",
                            zIndex: 1,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
