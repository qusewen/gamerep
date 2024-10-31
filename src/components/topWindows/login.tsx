import {FC, useEffect, useRef, useState} from "react";
import styles from "../../styles/topWindows/login.module.css";
import { useUser } from "../../stores/userStore";
import Input from "../ui/Input/Input";
import useWindowSize from "../state/useWindowSize";
import { Link } from "react-router-dom";
import PopUp from "../ui/PopUp/PopUp";
import axios from "axios";
import InputCode from "../inputs/CodeInput.tsx";

interface ChildProps {
    changeVisibleLogin: () => void;
    changeVisibleRegister: () => void;
}

const validateEmail = (email: string) => {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const Login: FC<ChildProps> = ({
    changeVisibleLogin,
    changeVisibleRegister,
}) => {
    const { LoginCTX } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setshowPassword] = useState("password");
    const [Error, setError] = useState("");
    const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
    const [isInputEmailRecovery, setisInputEmailRecovery] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState(["", "", "", "", "", ""]);
    const [emailForSendPassword, setEmailForSendPassword] = useState("");
    const [isNewPasswordOpen, setIsNewPasswordOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendEmailRecovery = async () => {
        if (!validateEmail(emailForSendPassword)) {
            setError("Введите корректную почту");
            return;
        }

        const response = await axios.post("/api/v1/send_otp/", {
            email: emailForSendPassword,
        });

        if (response.status === 200) {
            setRecoveryCode(["", "", "", "", "", ""]);
            setisInputEmailRecovery(false);
            setIsRecoveryOpen(true);
            setError("");
        } else {
            setError(response.data.error);
        }
    };

    const handleSendCode = async () => {
        const code = recoveryCode.join("");
        // Add your code verification logic here

        try {
            const response = await axios.post("/api/v1/verify_otp/", {
                email: emailForSendPassword,
                code: code,
            });

            setIsRecoveryOpen(false);
            setIsNewPasswordOpen(true);
            setError("");
        } catch (error: any) {
            setError(error.response.data.error);
        }
    };



    const sendNewPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("У вас не совпадают пароли");
            return;
        }

        const code = recoveryCode.join("");
        try {
            const response = await axios.post("/api/v1/change_password/", {
                email: emailForSendPassword,
                code: code,
                new_password: newPassword,
            });

            setIsNewPasswordOpen(false);
            changeVisibleLogin();
        } catch (error: any) {
            setError(error.response.data.error);
        }
    };

    const VisiblePassword = () => {
        return setshowPassword(showPassword === "text" ? "password" : "text");
    };

    const ExitingLogin = () => {
        setError("");
        changeVisibleLogin();
    };

    const OpenRegister = () => {
        setError("");
        changeVisibleRegister();
    };

    const Login = async () => {
        try {
            const success = await LoginCTX(email, password);
            if (success) {
                ExitingLogin();
                window.location.reload();
            } else {
                setError("Неверный логин или пароль");
            }
        } catch (error) {
            setError("Ошибка входа");
        }
    };

    const handleClick = (event: any) => {
        // Проверяем, является ли целевой элемент (event.target)
        //  элементом, который вызвал событие (event.currentTarget)
        if (event.target === event.currentTarget) {
            ExitingLogin();
        }
    };

    const [width, height] = useWindowSize();
    const [maxWidth, setMaxWidth] = useState(1600);

    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        setMaxWidth(
            parseInt(
                computedStyle
                    .getPropertyValue("--width-for-mobile")
                    .replace("px", "")
            )
        );
    }, []);


    if (width >= maxWidth) {
        return (
            <>
                <div className={styles.background} onClick={handleClick}>
                    <div className={styles.window}>
                        <img
                            className={styles.close}
                            src="/icons/bases/close.svg"
                            onClick={ExitingLogin}
                        />
                        <div className={styles.content}>
                            <div className={styles.title}>
                                Вход в личный кабинет
                            </div>
                            <Input
                                label="Email"
                                placeholder={"example@domain.com"}
                                value={email}
                                label_style={{ background: "none" }}
                                onChange={(value) => setEmail(value)}
                                style={{ width: "370px", background: "none" }}
                            />
                            <div style={{ position: "relative" }}>
                                <Input
                                    label="Password"
                                    placeholder={"*****************"}
                                    type={showPassword}
                                    value={password}
                                    label_style={{ background: "none" }}
                                    onChange={(value) => setPassword(value)}
                                    style={{
                                        width: "370px",
                                        background: "none",
                                    }}
                                    maxlenght={32}
                                />
                                <img
                                    src={
                                        showPassword == "password"
                                            ? "/icons/bases/eye.svg"
                                            : "/icons/bases/eye_crossed_out.svg"
                                    }
                                    className={styles.eye}
                                    onClick={VisiblePassword}
                                />
                            </div>

                            <div>{Error}</div>

                            <button
                                className={styles.btn_login}
                                onClick={Login}
                            >
                                войти
                            </button>

                            <div className={styles.information}>
                                <span>
                                    Нет аккаута?{" "}
                                    <span
                                        className={styles.register}
                                        onClick={OpenRegister}
                                    >
                                        Регистрация
                                    </span>
                                </span>
                                <span
                                    className={styles.underline}
                                    onClick={() =>
                                        setisInputEmailRecovery(true)
                                    }
                                >
                                    Забыли пароль?
                                </span>
                            </div>

                            <div className={styles.footer}>
                                {`Нажимая на кнопку «войти» я соглашаюсь с `}
                                <span className={styles.underline}>
                                    политикой конфиденциальности в отношении
                                    обработки персональных данных
                                </span>
                                {` и `}
                                <span className={styles.underline}>
                                    политикой оферты
                                </span>
                            </div>

                            <PopUp padding={'40px'}
                                isOpen={isInputEmailRecovery}
                                onClose={() => {
                                    setisInputEmailRecovery(false),
                                        setError("");
                                }}
                                width={400}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0px",
                                        color: "white", // Добавляем цвет текста
                                    }}
                                >
                                    <h3 style={{ fontSize: "24px", margin: 0 }}>
                                        Введите почту от аккаунта на сайте
                                    </h3>
                                    <div style={{ paddingTop: "14px" }} />
                                    <div style={{ paddingTop: "14px" }} />
                                    <Input
                                        type="text"
                                        width={400}
                                        height={39}
                                        value={emailForSendPassword}
                                        placeholder={"example@example.org"}
                                        onChange={(value) =>
                                            setEmailForSendPassword(value)
                                        }
                                    />
                                    <div style={{ paddingTop: "25px" }} />
                                </div>
                                <div style={{ paddingTop: "14px" }} />
                                <div>{Error}</div>
                                <button
                                    className={styles.btn_login}
                                    style={{
                                        width: "100%",
                                        margin: "10px 0",
                                    }}
                                    onClick={handleSendEmailRecovery}
                                >
                                    Далее
                                </button>
                                <div style={{ paddingTop: "14px" }} />
                            </PopUp>

                            <PopUp
                                isOpen={isRecoveryOpen}
                                onClose={() => {
                                    setIsRecoveryOpen(false);
                                    setError("");
                                }}
                                width={600}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0px",
                                        color: "white", // Добавляем цвет текста
                                    }}
                                >
                                    <h3 style={{ textShadow:'0px 4px 25px rgba(0, 0, 0, 0.25)', fontSize: "20px", margin: 0, textTransform:'uppercase', letterSpacing:'3.2px', fontWeight:'500', fontFamily: "Unbounded_Medium" }}>
                                        Восстановление пароля
                                    </h3>
                                    <div style={{ paddingTop: "14px" }} />
                                    <p
                                        style={{
                                            margin: 0,
                                            fontFamily: "Unbounded_Light",
                                            fontSize: "12px",
                                            color:'#d4d4d4',
                                            letterSpacing:'1px',
                                            marginBottom:'25px'
                                        }}
                                    >
                                        Мы отправили вам письмо с кодом на почту
                                    </p>
                                    <span
                                        style={{
                                            fontFamily: "Unbounded_Medium",
                                            fontSize: "12px",
                                            color:'#d4d4d4', lineHeight:'140%',
                                            letterSpacing:'1px',
                                        }}
                                    >
                                        Код с почты
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Unbounded_Medium",
                                            fontSize: "12px",
                                            letterSpacing:'1px',
                                        }}
                                    >
                                        {emailForSendPassword}:
                                    </span>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "center",
                                            paddingTop:'20px'
                                        }}
                                    >
                                        <InputCode inputsCount={6} setRecoveryCode={setRecoveryCode}/>
                                    </div>
                                    <div>{Error}</div>
                                    <button
                                        className={styles.btn_login}
                                        style={{
                                            width: "284px",
                                            margin: "20px auto 0",
                                        }}
                                        onClick={handleSendCode}
                                    >
                                        Отправить
                                    </button>
                                    <div style={{ paddingTop: "14px" }} />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                        }}
                                    >
                                        <span>
                                            Не получили код?
                                        </span>
                                        <span
                                            className={styles.register}
                                            onClick={() => {
                                                handleSendCode();
                                            }}
                                        >
                                            Отправить код повторно
                                        </span>
                                    </div>
                                </div>
                            </PopUp>

                            {/* Добавляем новый PopUp */}
                            <PopUp
                                isOpen={isNewPasswordOpen}
                                onClose={() => {
                                    setIsNewPasswordOpen(false);
                                    setError("");
                                }}
                                width={400}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0px",
                                        color: "white",
                                    }}
                                >
                                    <h3 style={{ fontSize: "24px", margin: 0 }}>
                                        Восстановление пароля
                                    </h3>
                                    <div style={{ paddingTop: "25px" }} />
                                    <Input
                                        type="password"
                                        placeholder="Новый пароль *"
                                        value={newPassword}
                                        onChange={(value) =>
                                            setNewPassword(value)
                                        }
                                        style={{
                                            width: "100%",
                                            background: "none",
                                        }}
                                    />
                                    <div style={{ paddingTop: "14px" }} />
                                    <Input
                                        type="password"
                                        placeholder="Новый пароль (повторно) *"
                                        value={confirmPassword}
                                        onChange={(value) =>
                                            setConfirmPassword(value)
                                        }
                                        style={{
                                            width: "100%",
                                            background: "none",
                                        }}
                                    />
                                    <div style={{ paddingTop: "14px" }} />
                                    <div>{Error}</div>
                                    <button
                                        className={styles.btn_login}
                                        style={{
                                            width: "100%",
                                            margin: "10px 0",
                                        }}
                                        onClick={() => {
                                            // Здесь добавить логику обновления пароля
                                            sendNewPassword();
                                        }}
                                    >
                                        Восстановить доступ?
                                    </button>
                                </div>
                            </PopUp>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className={styles.background} onClick={handleClick}>
                    <div className={styles.window} style={{ padding: "15px" }}>
                        <div
                            className={styles.content}
                            style={{ padding: "0px", margin: "0 auto" }}
                        >
                            <img
                                className={styles.close}
                                src="/icons/bases/close.svg"
                                style={{ alignSelf: "flex-end" }}
                                onClick={ExitingLogin}
                            />
                            <div
                                className={styles.title}
                                style={{ fontSize: "14px" }}
                            >
                                Вход в личный кабинет
                            </div>

                            <Input
                                label="Email"
                                placeholder={"example@domain.com"}
                                value={email}
                                label_style={{ background: "none" }}
                                onChange={(value) => setEmail(value)}
                                style={{ width: "290px", background: "none" }}
                            />

                            <div style={{ position: "relative" }}>
                                <Input
                                    label="Пароль"
                                    placeholder={"*****************"}
                                    type={showPassword}
                                    value={password}
                                    label_style={{ background: "none" }}
                                    onChange={(value) => setPassword(value)}
                                    style={{
                                        width: "290px",
                                        background: "none",
                                    }}
                                    maxlenght={32}
                                />
                                <img
                                    src={
                                        showPassword == "password"
                                            ? "/icons/bases/eye.svg"
                                            : "/icons/bases/eye_crossed_out.svg"
                                    }
                                    className={styles.eye}
                                    onClick={VisiblePassword}
                                />
                            </div>

                            {Error.length > 1 ? <div>{Error}</div> : null}

                            <button
                                className={styles.btn_login}
                                onClick={Login}
                            >
                                войти
                            </button>

                            <div
                                className={styles.information}
                                style={{ flexDirection: "column", gap: "10px" }}
                            >
                                <div>
                                    Нет аккаута?{" "}
                                    <span
                                        className={styles.register}
                                        onClick={OpenRegister}
                                    >
                                        Регистрация
                                    </span>
                                </div>
                                <div
                                    className={styles.underline}
                                    onClick={() =>
                                        setisInputEmailRecovery(true)
                                    }
                                >
                                    Забыли пароль?
                                </div>
                            </div>

                            <div
                                className={styles.footer}
                                style={{ width: "294px" }}
                            >
                                {`Нажимая на кнопку «войти» я соглашаюсь с `}
                                <Link
                                    to={"../confidential/"}
                                    style={{
                                        color: "var(--color-lightgray-100)",
                                        textDecoration: "underline",
                                    }}
                                >
                                    <span className={styles.underline}>
                                        политикой конфиденциальности в отношении
                                        обработки персональных данных
                                    </span>
                                </Link>
                                {` и `}
                                <Link
                                    to={"../offer/"}
                                    style={{
                                        color: "var(--color-lightgray-100)",
                                        textDecoration: "underline",
                                    }}
                                >
                                    <span className={styles.underline}>
                                        олитикой оферты
                                    </span>
                                </Link>
                            </div>

                            <PopUp
                                isOpen={isInputEmailRecovery}
                                onClose={() => {
                                    setisInputEmailRecovery(false),
                                        setError("");
                                }}
                                width={280}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0px",
                                        color: "white", // Добавляем цвет текста
                                    }}
                                >
                                    <h3 style={{ fontSize: "24px", margin: 0 }}>
                                        Введите почту от аккаунта на сайте
                                    </h3>
                                    <div style={{ paddingTop: "14px" }} />
                                    <div style={{ paddingTop: "14px" }} />
                                    <Input
                                        type="text"
                                        width={280}
                                        height={39}
                                        value={emailForSendPassword}
                                        placeholder={"example@example.org"}
                                        onChange={(value) =>
                                            setEmailForSendPassword(value)
                                        }
                                    />
                                    <div style={{ paddingTop: "25px" }} />
                                </div>
                                <div style={{ paddingTop: "14px" }} />
                                <div>{Error}</div>
                                <button
                                    className={styles.btn_login}
                                    style={{
                                        width: "100%",
                                        margin: "10px 0",
                                    }}
                                    onClick={handleSendEmailRecovery}
                                >
                                    Далее
                                </button>
                                <div style={{ paddingTop: "14px" }} />
                            </PopUp>

                            <PopUp
                                isOpen={isRecoveryOpen}
                                onClose={() => {
                                    setIsRecoveryOpen(false);
                                    setError("");
                                }}
                                width={310}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0px",
                                        color: "white", // Добавляем цвет текста
                                    }}
                                >
                                    <h3 style={{ fontSize: "24px", margin: 0 }}>
                                        Восстановление пароля
                                    </h3>
                                    <div style={{ paddingTop: "14px" }} />
                                    <p
                                        style={{
                                            margin: 0,
                                            fontFamily: "Unbounded_Light",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Мы отправили вам письмо с кодом на почту
                                    </p>
                                    <div style={{ paddingTop: "14px" }} />
                                    <span
                                        style={{
                                            fontFamily: "Unbounded_Medium",
                                            fontSize: "12px",
                                            color:'#d4d4d4'
                                        }}
                                    >
                                        Код с почты
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Unbounded_Medium",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {emailForSendPassword}:
                                    </span>
                                    <div style={{ paddingTop: "25px" }} />
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "center",
                                        }}
                                    >
                                    <InputCode inputsCount={6} setRecoveryCode={setRecoveryCode}/>
                                    </div>
                                    <div style={{ paddingTop: "14px" }} />
                                    <div>{Error}</div>
                                    <button
                                        className={styles.btn_login}
                                        style={{
                                            width: "100%",
                                            margin: "10px 0",
                                        }}
                                        onClick={handleSendCode}
                                    >
                                        Отправить
                                    </button>
                                    <div style={{ paddingTop: "14px" }} />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                        }}
                                    >
                                        <span>
                                            Не получили код?
                                        </span>
                                        <span
                                            className={styles.register}
                                            onClick={() => {
                                                handleSendCode();
                                            }}
                                        >
                                            Отправить код повторно
                                        </span>
                                    </div>
                                </div>
                            </PopUp>

                            <PopUp
                                isOpen={isNewPasswordOpen}
                                onClose={() => {
                                    setIsNewPasswordOpen(false);
                                    setError("");
                                }}
                                width={280}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0px",
                                        color: "white",
                                    }}
                                >
                                    <h3 style={{ fontSize: "24px", margin: 0 }}>
                                        Восстановление пароля
                                    </h3>
                                    <div style={{ paddingTop: "25px" }} />
                                    <Input
                                        type="password"
                                        placeholder="Новый пароль *"
                                        value={newPassword}
                                        onChange={(value) =>
                                            setNewPassword(value)
                                        }
                                        style={{
                                            width: "100%",
                                            background: "none",
                                        }}
                                    />
                                    <div style={{ paddingTop: "14px" }} />
                                    <Input
                                        type="password"
                                        placeholder="Новый пароль (повторно) *"
                                        value={confirmPassword}
                                        onChange={(value) =>
                                            setConfirmPassword(value)
                                        }
                                        style={{
                                            width: "100%",
                                            background: "none",
                                        }}
                                    />
                                    <div style={{ paddingTop: "14px" }} />
                                    <div>{Error}</div>
                                    <button
                                        className={styles.btn_login}
                                        style={{
                                            width: "100%",
                                            margin: "10px 0",
                                        }}
                                        onClick={() => {
                                            // Здесь добавить логику обновления пароля
                                            sendNewPassword();
                                        }}
                                    >
                                        Восстановить доступ
                                    </button>
                                </div>
                            </PopUp>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Login;
