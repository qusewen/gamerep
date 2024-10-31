import React from "react";
import styles from "./NumInput.module.css";
import RussianFlag from "/images/bases/rus.png";

interface CountryOption {
    value: string;
    label: string;
    code: string;
    flag: string;
}

interface NumInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

const NumInput: React.FC<NumInputProps> = ({
    value,
    onChange,
    label,
    placeholder,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState<CountryOption>({
        value: "ru",
        label: "Россия",
        code: "+7",
        flag: RussianFlag
    });
    
    const selectRef = React.useRef<HTMLDivElement>(null);

    const countries: CountryOption[] = [
        {
            value: "ru",
            label: "Россия",
            code: "+7",
            flag: RussianFlag
        },
        // Добавьте другие страны по необходимости
    ];

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        onChange(inputValue);
    };

    return (
        <div className={styles.input_container} ref={selectRef}>
            {label && <div className={styles.input_label}>{label}</div>}
            <div className={styles.input_wrapper}>
                <div 
                    className={styles.country_selector} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img 
                        src={selectedCountry.flag} 
                        alt={selectedCountry.label} 
                        className={styles.country_flag}
                    />
                    <span className={styles.arrow}>▼</span>
                    <span className={styles.country_code}>{selectedCountry.code}</span>
                </div>
                <input
                    type="tel"
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={styles.phone_input}
                />
            </div>
            {isOpen && (
                <div className={styles.countries_dropdown}>
                    {countries.map((country) => (
                        <div
                            key={country.value}
                            className={styles.country_option}
                            onClick={() => {
                                setSelectedCountry(country);
                                setIsOpen(false);
                            }}
                        >
                            <img 
                                src={country.flag} 
                                alt={country.label} 
                                className={styles.country_flag}
                            />
                            <span>{country.label}</span>
                            <span className={styles.country_code}>{country.code}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NumInput;
