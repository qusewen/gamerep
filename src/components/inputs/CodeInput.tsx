import React, {Dispatch, useEffect, useRef} from 'react';
import styles from "../ui/Input/Input.module.css";

interface IProps {
    inputCount: number
    setRecoveryCode: Dispatch<string[]>
}
const InputCode = ({ inputsCount, setRecoveryCode }: IProps) => {
    const refInput = useRef([]);
    const [values, setValues] = React.useState(Array(inputsCount).fill(''));
    console.log(values)
    const handleRecoveryCodeChange = (index, value) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value.length === 1 && index < inputsCount - 1) {
            refInput.current[index + 1].focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('Text');

        const newValues = [...values];
        for (let i = 0; i < pastedData.length && i < inputsCount; i++) {
            newValues[i] = pastedData[i];
        }
        setValues(newValues);

        refInput.current[Math.min(pastedData.length, inputsCount - 1)]?.focus();
    };

    useEffect(() => {
        if (refInput.current[0]) {
            refInput.current[0].focus();
        }
    }, []);

    useEffect(() => {
        if(values.length === 6) {
            setRecoveryCode(values)
        }
    }, [values]);

    return (
        <div style={{ display: 'flex', gap:'10px', }} >
            {Array.from({ length: inputsCount }, (_, index) => (
                <div className={styles.input_container} style={{width: 39, height:'39px'}}>

                <input
                    ref={el => refInput.current[index] = el}
                    key={index}
                    type="text"
                    maxLength={1}
                    className={styles.input}
                    style={{

                        textAlign: 'center',
                        fontFamily: 'Unbounded_Light',
                        fontSize: '18px',
                    }}
                    value={values[index]}
                    onChange={(e) => handleRecoveryCodeChange(index, e.target.value)}
                    onPaste={(e) => handlePaste(e, index)}
                />
                </div>
            ))}
        </div>
    );
};

export default InputCode;
