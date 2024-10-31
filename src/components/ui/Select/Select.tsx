import React from "react";
import styles from "./Select.module.css";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    options: Option[];
}

const Select: React.FC<SelectProps> = ({
    value,
    onChange,
    label,
    placeholder,
    options,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={styles.select_container} ref={selectRef}>
            {label && <div className={styles.input_label}>{label}</div>}
            <div
                className={styles.select_value}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? selectedOption.label : placeholder}
                <span className={styles.arrow}>▼</span>
            </div>
            {isOpen && (
                <div className={styles.options_container}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles.option}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
