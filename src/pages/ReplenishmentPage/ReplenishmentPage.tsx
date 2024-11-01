/// <reference types="vite-plugin-svgr/client" />
import React, { useEffect, useState } from "react";
import BaseCenterContainer from "../../components/baseCenterContainer";
import Footer from "../../components/footer";
import Header from "../../components/header";

import styles from "./Replenishment.module.css";

import Cross4Icon from "/images/backgrounds/elements/cross_4.png";
import Triangle4Icon from "/images/backgrounds/elements/triangle_4.png";
import Triangle3Icon from "/images/backgrounds/elements/triangle_3.png";
import Triangle2Icon from "/images/backgrounds/elements/triangle_2.png";
import Triangle1Icon from "/images/backgrounds/elements/triangle_1.png";
import Square1Icon from "/images/backgrounds/elements/square_1.png";
import Square3Icon from "/images/backgrounds/elements/square_3.png";
import Square2Icon from "/images/backgrounds/elements/square_2.png";
import Circle3Icon from "/images/backgrounds/elements/circle_3.png";
import Circle2Icon from "/images/backgrounds/elements/circle_2.png";
import TurkishFlag from "/images/bases/tr.png";
import ThumbsUp from "/images/bases/thumbs_up.png";
import Select from "../../components/ui/Select/Select";
import NumInput from "../../components/ui/NumInput/NumInput";

import LineTextImage from "../../assets/line_text.png";

import { Link } from "react-router-dom";
import Input from "../../components/ui/Input/Input";
import ReserveCodeImage from "/images/products/reserve_code.png";
import Slider from "../../components/ui/Slider/Slider";
import PopUp from "../../components/ui/PopUp/PopUp";
import RussianFlag from "/images/bases/rus.png";
import { useUser } from "../../stores/userStore";
import useWindowSize from "../../components/state/useWindowSize";
import MyPhoneInput from "../../components/inputs/MyPhoneInput.tsx";

const sliderConfig = {
    min: 500,
    max: 2500,
    step: 500,
    discounts: [
        {
            from: 500,
            discount: 5,
        },
        {
            from: 1000,
            discount: 5,
        },
        {
            from: 2000,
            discount: 10,
        },
    ],
};

function ReplenishmentPage() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [isOrderPopupOpen, setIsOrderPopupOpen] = React.useState(false); // добавляем ый state
    const [promoCode, setPromoCode] = React.useState("");
    const [isPromoApplied, setIsPromoApplied] = React.useState(false);
    const [discount, setDiscount] = React.useState("00"); // добавляем состояние для скидки
    const [stage, setStage] = useState(1)
    const [valueSlider, setValueSlider] = useState(sliderConfig.min);

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        reserveCode: "",
        comment: "",
        phone: "",
        ps: ""
    });
    const [isAgreed, setIsAgreed] = React.useState(false);

    const { user } = useUser();

    const isFormValid = React.useMemo(() => {
        return formData.email && formData.password && formData.reserveCode;
        // comment не обязательный, поэтому его не проверяем
    }, [formData]);

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSliderChange = (value: number) => {
        // Здесь можно обработать изменение значения слайдера
    };

    const handleSubmit = () =>{
        //todo отправка данных на сервер
        setIsOrderPopupOpen(true)
    }

    const handleOrderSubmit = (e: React.MouseEvent) => {
        e.preventDefault(); // Предотвращает переход по ссылке
       if(stage !==2)  setStage(stage + 1)
        if(stage === 2) handleSubmit();
    };
    const handleOrderPrev = (e: React.MouseEvent) => {
        e.preventDefault(); // Предотвращает переход по ссылке
        setStage(stage - 1)
    };

    const handleApplyPromo = () => {
        if (promoCode) {
            setIsPromoApplied(true);
            setDiscount("500"); // устанавливаем скидку при применении промокода
        }
    };

    const ArrowIcon = () => (
        <svg
            width="16"
            height="8"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
        >
            <path
                d="M10.2778 0.865324C10.0348 0.576142 9.64074 0.576142 9.39765 0.865324C9.15456 1.15455 9.15456 1.62341 9.39765 1.91259L9.87503 2.48059H0.622407C0.278644 2.48059 0 2.81217 0 3.22113C0 3.6301 0.278644 3.96167 0.622407 3.96167H9.87503L9.39765 4.52967C9.15456 4.81885 9.15456 5.28775 9.39765 5.57694C9.51917 5.72153 9.67847 5.79382 9.83773 5.79382C9.99699 5.79382 10.1563 5.72153 10.2778 5.57689L11.8177 3.74474C12.0608 3.45556 12.0608 2.98666 11.8177 2.69747L10.2778 0.865324Z"
                fill="#D4D4D4"
            />
        </svg>
    );

    const [maxWidth, setMaxWidth] = useState(1600.0);
    const [width] = useWindowSize();

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        setMaxWidth(
            parseFloat(
                computedStyle
                    .getPropertyValue("--width-for-mobile")
                    .replace("px", "")
            )
        );
        setIsActive(true);
    }, []);

    return (
        <div
            style={{
                // display: "flex",
                // flexDirection: "column",
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >


            <div
                style={{ background: "#120F25" }}
                className={styles.header_container}
            >
                <Header
                    style={{
                        margin: "auto",
                        maxWidth: "1240px",
                        background: "none",
                        zoom: 0.9,
                    }}
                />
            </div>{" "}
            <img src={LineTextImage} className={styles.line_background_1} />
            <img src={LineTextImage} className={styles.line_background_2} />
            <img src={LineTextImage} className={styles.line_background_3} />
            <div className={styles.ellipce_1} />
            <div className={styles.ellipce_2} />
            <div className={styles.ellipce_3} />
            <img
                src={Cross4Icon}
                className={styles.icon_background}
                style={{ left: "70%", top: "-10%" }}
            />
            <img
                src={Triangle4Icon}
                className={styles.icon_background}
                style={{ left: "85%", bottom: "30%" }}
            />
            <img
                src={Triangle3Icon}
                className={styles.icon_background}
                style={{ left: "25%", bottom: "20%" }}
            />
            <img
                src={Triangle1Icon}
                className={styles.icon_background}
                style={{ left: "4%", bottom: "25%" }}
            />
            <img
                src={Triangle3Icon}
                className={styles.icon_background}
                style={{ left: "55%", bottom: "0%" }}
            />
            <img
                src={Circle2Icon}
                className={styles.icon_background}
                style={{ left: "56%", top: "43%" }}
            />
            <img
                src={Circle2Icon}
                className={styles.icon_background}
                style={{ left: "7%", top: "35%", scale: "2.4" }}
            />
            <img
                src={Triangle2Icon}
                className={styles.icon_background}
                style={{ left: "8.5%", top: "75%" }}
            />
            <img
                src={Square2Icon}
                className={styles.icon_background}
                style={{
                    left: "29.5%",
                    top: "6%",
                    rotate: "-20deg",
                }}
            />
            <img
                src={Square1Icon}
                className={styles.icon_background}
                style={{
                    left: "62.5%",
                    top: "50%",
                    opacity: 0.4,
                }}
            />
            <img
                src={Square3Icon}
                className={styles.icon_background}
                style={{
                    left: "32.5%",
                    top: "50%",
                    opacity: 0.4,
                }}
            />
            <img
                src={Circle3Icon}
                className={styles.icon_background}
                style={{ left: "51%", top: "75%" }}
            />
            <BaseCenterContainer style={{ zoom: 0.9, flex: 1 }}>
                <div className={styles.background}>
                    <div className={styles.base_path}>
                        <Link
                            to={"../"}
                            style={{
                                color: "var(--color-gray-1100)",
                                textDecoration: "none",
                            }}
                        >
                            Главная
                        </Link>{" "}
                        /{" "}
                        <span style={{ color: " var(--color-white)" }}>
                            Пополнение кошелька
                        </span>
                    </div>
                    <div style={{ paddingTop: "60px" }} />
                    {/* <b
                        style={{
                            fontSize: "var(--font-size-13xl)",
                            fontFamily: "Unbounded_Medium",
                        }}
                    >
                        Акции
                    </b>
                    <div style={{ paddingTop: "60px" }} /> */}
                    <div className={styles.wrapper}>
                        {/*авторизованный*/}
                        {user ? (
                            <div className={styles.replenishment}>
                                <div className={styles.wrapper_text}>
                                    <span className={styles.title}>
                                        Пополнение кошелька
                                    </span>
                                    <div className={styles.wrapper_flag}>
                                        <span
                                            data-turkey-text="country_title"
                                            className={styles.title}
                                        >
                                            Турция
                                        </span>
                                        <img
                                            src={TurkishFlag}
                                            className={styles.flag}
                                        />
                                    </div>
                                </div>
                                <div style={{ paddingTop: "20px" }} />
                                <div className={styles.gradient_line} />
                                <div style={{ paddingTop: "20px" }} />
                                <div className={styles.inputs_container}>
                                    <Input
                                        placeholder="Почта от аккаунта"
                                        height={39}
                                        label="Почта от аккаунта"
                                        value={formData.email}
                                        onChange={handleInputChange("email")}
                                    />
                                    <Input
                                        placeholder="Пароль от аккаунта"
                                        height={39}
                                        label="Пароль от аккаунта"
                                        value={formData.password}
                                        onChange={handleInputChange("password")}
                                    />
                                    <Input
                                        placeholder="Резервный код"
                                        height={39}
                                        value={formData.reserveCode}
                                        onChange={handleInputChange(
                                            "reserveCode"
                                        )}
                                        rightElement={
                                            <span
                                                style={{
                                                    cursor: "pointer",
                                                    color: "#D4D4D4",
                                                }}
                                                onClick={() =>
                                                    setIsPopupOpen(true)
                                                }
                                            >
                                                (Где найти?)
                                            </span>
                                        }
                                        label="Резервны код"
                                    />
                                    <Input
                                        placeholder="Комментарий к заказу"
                                        height={39}
                                        label="Комментарий к заказу"
                                        value={formData.comment}
                                        onChange={handleInputChange("comment")}
                                    />
                                </div>
                                <div style={{ paddingTop: "20px" }} />
                                <div className={styles.gradient_line} />
                                <div style={{ paddingTop: "27px" }} />
                                <div className={styles.wrapper_text}>
                                    <span className={styles.title}>
                                        Валюта (₺)
                                    </span>
                                    <div className={styles.wrapper_count}>
                                        <span className={styles.title}>
                                            Кол-во:
                                        </span>
                                        <Input
                                            style={{fontSize:'10px', padding:'0 0 0 15px'}}
                                            placeholder="0"
                                            width={60}
                                            height={39}
                                            value={valueSlider}
                                            onChange={(value) =>
                                                setValueSlider(Number(value))
                                            }
                                        />
                                    </div>
                                </div>
                                <div style={{ paddingTop: "30px" }} />
                                <Slider
                                    stateValue={valueSlider}
                                    setValue={setValueSlider}
                                    min={sliderConfig.min}
                                    max={sliderConfig.max}
                                    step={sliderConfig.step}
                                    discounts={sliderConfig.discounts}
                                    onChange={handleSliderChange}
                                />
                            </div>
                        ) : null}
                        {/*неавторизованный*/}
                        {!user ? (
                            <>
                                {stage === 1 &&
                                    <div className={styles.replenishment}>
                                        <div className={styles.wrapper_text}>
                                    <span className={styles.title}>
                                        Пополнение кошелька
                                    </span>
                                            <div className={styles.wrapper_flag}>
                                        <span
                                            data-turkey-text="country_title"
                                            className={styles.title}
                                        >
                                            Турция
                                        </span>
                                                <img
                                                    src={TurkishFlag}
                                                    className={styles.flag}
                                                />
                                            </div>
                                        </div>
                                        <div style={{paddingTop: "20px"}}/>
                                        <div className={styles.gradient_line}/>
                                        <div style={{paddingTop: "20px"}}/>
                                        <div className={styles.inputs_container}>
                                            <Input
                                                placeholder="Почта от аккаунта"
                                                height={39}
                                                label="Почта от аккаунта"
                                                value={formData.email}
                                                onChange={handleInputChange("email")}
                                            />
                                            <Input
                                                placeholder="Пароль от аккаунта"
                                                height={39}
                                                label="Пароль от аккаунта"
                                                value={formData.password}
                                                onChange={handleInputChange("password")}
                                            />
                                            <Input
                                                placeholder="Резервный код"
                                                height={39}
                                                value={formData.reserveCode}
                                                onChange={handleInputChange(
                                                    "reserveCode"
                                                )}
                                                rightElement={
                                                    <span
                                                        style={{
                                                            cursor: "pointer",
                                                            color: "#D4D4D4",
                                                        }}
                                                        onClick={() =>
                                                            setIsPopupOpen(true)
                                                        }
                                                    >
                                                (Где найти?)
                                            </span>
                                                }
                                                label="Резервны код"
                                            />
                                            <Input
                                                placeholder="Комментарий к заказу"
                                                height={39}
                                                label="Комментарий к заказу"
                                                value={formData.comment}
                                                onChange={handleInputChange("comment")}
                                            />
                                        </div>
                                        <div style={{paddingTop: "20px"}}/>
                                        <div className={styles.gradient_line}/>
                                        <div style={{paddingTop: "27px"}}/>
                                        <div className={styles.wrapper_text}>
                                    <span className={styles.title}>
                                        Валюта (₺)
                                    </span>
                                            <div className={styles.wrapper_count}>
                                        <span className={styles.title}>
                                            Кол-во:
                                        </span>
                                                <Input style={{fontSize:'10px',padding:'0 0 0 15px'}}
                                                    placeholder="0"
                                                    width={60}
                                                    height={39}
                                                    value={valueSlider}
                                                    onChange={(value) =>
                                                        setValueSlider(Number(value))
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div style={{paddingTop: "30px"}}/>
                                        <Slider
                                            stateValue={valueSlider}
                                            setValue={setValueSlider}
                                            min={sliderConfig.min}
                                            max={sliderConfig.max}
                                            step={sliderConfig.step}
                                            discounts={sliderConfig.discounts}
                                            onChange={handleSliderChange}
                                        />
                                        <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
                                            <a
                                                href="#"
                                                onClick={handleOrderSubmit}
                                                style={{
                                                    fontFamily: "Unbounded_Medium",
                                                    fontSize: "12px",
                                                    backgroundColor:
                                                        "var(--color-deeppink)",
                                                    cursor: "pointer",
                                                    width: "145px",
                                                }}
                                                className={styles.btn}
                                            >
                                                Далее
                                            </a>
                                        </div>
                                    </div>}
                                {stage === 2 && <div className={styles.replenishment}>
                                    <div className={styles.wrapper_text}>
                                    <span className={styles.title}>
                                        Покупатель
                                    </span>
                                        <div className={styles.wrapper_flag}>
                                        <span
                                            data-turkey-text="country_title"
                                            className={styles.title}
                                        >
                                            Турция
                                        </span>
                                            <img
                                                src={TurkishFlag}
                                                className={styles.flag}
                                            />
                                        </div>
                                    </div>
                                    <div style={{paddingTop: "20px"}}/>
                                    <div className={styles.gradient_line}/>
                                    <div style={{paddingTop: "20px"}}/>
                                    <div className={styles.inputs_container}>
                                        <Input
                                            placeholder="Ваше имя *"
                                            height={39}
                                            label="Ваше имя"
                                            value={formData.name}
                                            onChange={handleInputChange("name")}
                                        />

                                        <MyPhoneInput
                                            onChange={(event) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    ['phone']: event,
                                                }));
                                            }}
                                            value={formData.phone}
                                            disabled={false}
                                            label="Номер телефона"
                                            style={{ height: "39px" }}
                                        />

                                    <Input
                                        placeholder="Email"
                                        height={39}
                                        value={formData.email}
                                        onChange={handleInputChange(
                                            "email"
                                        )}
                                        label="Email"
                                    />
                                    <Select
                                        placeholder="Поколение консоли *"
                                        value={formData.ps}
                                        onChange={handleInputChange(
                                            "ps"
                                        )}
                                        label="Выбор консоли"
                                        options={[
                                            {
                                                value: "ps4",
                                                label: "PlayStation 4",
                                            },
                                            {
                                                value: "ps5",
                                                label: "PlayStation 5",
                                            },
                                            { value: "xbox", label: "Xbox" },
                                        ]}
                                    />
                                </div>
                                <div className={styles.comment_input}>
                                    <Input
                                        // placeholder="Комментарий к заказу"
                                        height={117}
                                        label="Комментарий к заказу"
                                        value={formData.comment}
                                        onChange={handleInputChange("comment")}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "15px",
                                    }}
                                >
                                    <div className={styles.checkbox_wrapper}>
                                        <label
                                            className={styles.custom_checkbox}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isAgreed}
                                                onChange={(e) =>
                                                    setIsAgreed(
                                                        e.target.checked
                                                    )
                                                }
                                                className={
                                                    styles.checkbox_input
                                                }
                                            />
                                            <span
                                                className={styles.checkbox_mark}
                                            ></span>
                                        </label>
                                        <span className={styles.legal}>
                                            Я соглашаюсь с
                                            <a href="/">
                                                политикой конфиденциальности в
                                                отношении обработки персональных
                                                данных
                                            </a>
                                            и <a href="/">политикой оферты</a>
                                        </span>
                                    </div>
                                </div>
                                <div style={{ paddingTop: "30px" }} />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                    className={styles.wrapper_btn}
                                >
                                    <a
                                        href="#"
                                        onClick={handleOrderPrev}
                                        style={{
                                            width: "145px",
                                        }}
                                        className={styles.outline_btn}
                                    >
                                        Назад
                                    </a>
                                    <a
                                        href="#"
                                        onClick={handleOrderSubmit}
                                        style={{
                                            fontFamily: "Unbounded_Medium",
                                            fontSize: "12px",
                                            backgroundColor:
                                                "var(--color-deeppink)",
                                            cursor: "pointer",
                                            width: "145px",
                                        }}
                                        className={styles.btn}
                                    >
                                        {stage === 2 ? 'Готово' : 'Далее'}
                                    </a>
                                </div>
                            </div>}


                            </>

                        ) : null}
                        <div className={styles.final_price} style={{width: width<=maxWidth? '320px': '', margin: width<=maxWidth? '0 auto 25px': '', padding: width<=maxWidth? '21px': '', }}>
                            <div className={styles.wrapper_text}>
                                <span className={styles.title}>Итог:</span>
                                <div className={styles.wrapper_count}>
                                    <span className={styles.title}>
                                        {valueSlider} ₽
                                    </span>
                                </div>
                            </div>
                            <div style={{ paddingTop: "20px" }} />
                            <div className={styles.gradient_line} />
                            <div style={{ paddingTop: "20px" }} />
                            <div className={styles.wrapper_text}>
                                <span className={styles.text}>
                                    Товаров на сумму:
                                </span>
                                <span className={styles.text}>{valueSlider} ₽</span>
                            </div>
                            <div style={{ paddingTop: "10px" }} />
                            <div className={styles.wrapper_text}>
                                <span className={styles.text}>
                                    Ваша скидка:
                                </span>
                                <span
                                    style={{
                                        color: isPromoApplied
                                            ? "#04E061"
                                            : "#D4D4D4",
                                        fontSize: "12px",
                                        fontFamily: "Unbounded_Light_Base",
                                    }}
                                >
                                    {discount} ₽
                                </span>
                            </div>
                            <div style={{ paddingTop: "20px" }} />
                            <Input
                                placeholder="У вас есть промокод?"
                                height={39}
                                value={promoCode}
                                onChange={(value) => setPromoCode(value)}
                                rightElement={
                                    promoCode &&
                                    (isPromoApplied ? (
                                        <span
                                            style={{
                                                color: "#D4D4D4",
                                                fontSize: "12px",
                                                fontFamily: "Unbounded_Light",
                                            }}
                                        >
                                            Промокод применен
                                        </span>
                                    ) : (
                                        <div onClick={handleApplyPromo}>
                                            <ArrowIcon />
                                        </div>
                                    ))
                                }
                            />
                            <div style={{ paddingTop: "20px" }} />
                            <a
                                href="#"
                                onClick={handleOrderSubmit}
                                style={{
                                    fontFamily: "Unbounded_Medium",
                                    fontSize: "12px",
                                    backgroundColor: isFormValid
                                        ? "var(--color-deeppink)"
                                        : "#A5A3A9",
                                    cursor: isFormValid
                                        ? "pointer"
                                        : "not-allowed",
                                }}
                                className={styles.btn}
                            >
                                Оформить заказ
                            </a>
                            <div style={{ paddingTop: "15px" }} />
                            <span className={styles.legal}>
                                Нажимая на кнопку “Оформить заказ” - вы
                                соглашаетесь с
                                <a href="/">
                                    политикой конфиденциальности в отношении
                                    обработки персональных данных
                                </a>
                                и <a href="/">политикой оферты</a>
                            </span>
                        </div>
                    </div>
                </div>
            </BaseCenterContainer>
            <Footer style={{}} />

            <PopUp
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                width={width >= maxWidth ? 500 : 280}
            >
                <h3
                    style={{
                        fontSize: "20px",
                        fontFamily: "Unbounded_Regular",
                        marginTop: "6px",
                        marginBottom: "30px",
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    Резервный код для входа
                </h3>
                <img src={ReserveCodeImage} style={{ width: "100%" }} />
                <p
                    style={{
                        color: "#D4D4D4",
                        fontSize: "12px",
                        fontFamily: "Unbounded_Light",
                    }}
                >
                    Одноразовый код дя входа на аккаунт по логину и паролю.
                    Проще всего найти через сайт Sony.
                    <br />
                    <br /> Где его найти?
                    <br /> 1. Войдите в аккаунт PlayStation на сайте Sony
                    <br /> 2. Наведите на иконку профиля и нажмите управление
                    учетной записью
                    <br /> 3. Выберите Безопасность, далее Резервные коды
                    <br />
                    <br /> Вам понадобится всего один, но для безопасности
                    аккаунта лучше сохранить их все.
                </p>
            </PopUp>
            <PopUp
                isOpen={isOrderPopupOpen}
                onClose={() => setIsOrderPopupOpen(false)}
                width={width >= maxWidth ? 300 : 280}
            >
                <img
                    src={ThumbsUp}
                    style={{ width: "90px", height: "90px", marginTop: "14px" }}
                />
                <h3
                    style={{
                        fontSize: "20px",
                        fontFamily: "Unbounded_Light",
                        marginTop: "45px",
                        marginBottom: "0px",
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    Спасибо, ваш
                    <br /> заказ оформлен
                </h3>

                <p
                    style={{
                        color: "#D4D4D4",
                        fontSize: "12px",
                        fontFamily: "Unbounded_Light",
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    Перейдите в чат для дальнейшего
                    <br /> оформления
                </p>
                <a
                    href="/chat"
                    className={styles.btn}
                    style={{
                        fontFamily: "Unbounded_Medium",
                        fontSize: "12px",
                        display: "block",
                        textAlign: "center",
                        textDecoration: "none",
                        width: "220px",
                    }}
                >
                    Перейти в чат
                </a>
            </PopUp>
        </div>
    );
}

export default ReplenishmentPage;
