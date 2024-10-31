import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Feedback from "../../panels/feedbacks/Feedback";
import AvatarsImage from "/images/bases/avatars.png";
import ArrowIcon from "/icons/bases/arrows/arrow.svg";

import Cross4Icon from "/images/backgrounds/elements/cross_4.png";
import Triangle4Icon from "/images/backgrounds/elements/triangle_4.png";
import Triangle3Icon from "/images/backgrounds/elements/triangle_3.png";
import Triangle2Icon from "/images/backgrounds/elements/triangle_2.png";
import Circle2Icon from "/images/backgrounds/elements/circle_2.png";
import Square3Icon from "/images/backgrounds/elements/square_3.png";
import Circle3Icon from "/images/backgrounds/elements/circle_3.png";

import TrophiesImage from "../../../assets/psn_trophies.png";
import LineTextImage from "../../../assets/line_text.png";
import PercentageImage from "/images/backgrounds/elements/percentage.png";

import axios from "axios";
import feedbackInterface from "../../../interfaces/feedbackInterface";
import { Link } from "react-router-dom";
import useWindowSize from "../../state/useWindowSize";

const FirstFrame: FunctionComponent = () => {
    const [feedbacks, setFeedbacks] = useState<feedbackInterface[]>([]);
    const [selectPage, setSelectPage] = useState(1);
    const [maxPage] = useState(5);
    const [isStopLoadingFeedbacks, setIsStopLoadingFeedbacks] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (isStopLoadingFeedbacks) return;
            if (selectPage > maxPage) return;
            try {
                let url = "/api/v1/feedbacks/?page=" + selectPage;
                if (feedbacks.length) {
                    url += "&page_size=1";
                }
                const response = await axios.get(url);
                setFeedbacks([...feedbacks, ...response.data.results]);
                setSelectPage(selectPage + 1);
            } catch (error) {
                setIsStopLoadingFeedbacks(true);
                console.error("Ошибка загрузки отзывов", error);
            }
        };

        if (!feedbacks.length) {
            fetchData();
        }
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, [selectPage, isStopLoadingFeedbacks, feedbacks]);

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
        <div className={styles.container}>
            {width >= maxWidth ? (
                <div
                    className={
                        !isActive ? styles.background : styles.background_active
                    }
                >
                    <div className={styles.ellipse_up}></div>
                    <div className={styles.ellipse}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.rect} />
                    <div className={styles.text_background} />
                    <div className={styles.circle_2} />
                    {/* <div className={styles.circle_3} /> */}

                    <img
                        src={Cross4Icon}
                        className={styles.icon_background}
                        style={{ left: "85%", top: "13%" }}
                    />
                    <img
                        src={Triangle4Icon}
                        className={styles.icon_background}
                        style={{ left: "74%", top: "2%" }}
                    />
                    <img
                        src={Triangle3Icon}
                        className={styles.icon_background}
                        style={{ left: "46.5%", top: "-4%" }}
                    />
                    <img
                        src={Circle2Icon}
                        className={styles.icon_background}
                        style={{ left: "1%", top: "59%" }}
                    />
                    <img
                        src={Triangle2Icon}
                        className={styles.icon_background}
                        style={{ left: "8.5%", top: "75%" }}
                    />
                    <img
                        src={Square3Icon}
                        className={styles.icon_background}
                        style={{ left: "34%", top: "55.5%", opacity: 0.14 }}
                    />
                    <img
                        src={Circle3Icon}
                        className={styles.icon_background}
                        style={{ left: "51%", top: "75%" }}
                    />

                    <img
                        src={TrophiesImage}
                        className={styles.main_background}
                        style={{ filter: "saturate(1.2)" }}
                    />
                    <img
                        src={LineTextImage}
                        className={styles.line_background}
                    />
                    {/* Картинки процентов */}
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background}
                        style={{
                            right: "-7%",
                            top: "-1%",
                            height: "300px",
                            opacity: "0.9",
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background}
                        style={{
                            left: "3.8%",
                            bottom: "13.2%",
                            height: "300px",
                            opacity: "0.9",
                            transform: "rotate(-76deg)",
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background}
                        style={{
                            right: "50%",
                            top: "2%",
                            height: "140px",
                            opacity: "0.7",
                            transform: "rotate(30deg)",
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background}
                        style={{
                            right: "-3%",
                            bottom: "-11%",
                            height: "240px",
                            transform: "rotate(160deg) scaleY(-1)",
                            filter: "blur(5px)",
                            opacity: "0.4",
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background}
                        style={{
                            left: "-2%",
                            top: "-1%",
                            height: "240px",
                            transform: "rotate(-20deg)",
                            filter: "blur(5px)",
                            opacity: "0.7",
                        }}
                    />
                    <div className={styles.hero_info}>
                        <div>
                            <b
                                className={
                                    !isActive
                                        ? styles.title
                                        : styles.title_active
                                }
                            >
                                Вернём{" "}
                                <span
                                    style={{ color: "var(--color-deeppink)" }}
                                >
                                    до 50%
                                </span>
                                <br /> стоимости игры
                            </b>
                            <div style={{ paddingTop: "10px" }} />
                            <div
                                className={
                                    !isActive
                                        ? styles.description
                                        : styles.description_active
                                }
                            >
                                Переходи в раздел акции и узнай
                                <br /> полные условия предложения
                            </div>
                            <div style={{ paddingTop: "30px" }} />
                            <Link
                                to={"../sales/"}
                                style={{
                                    textDecoration: "none",
                                    pointerEvents: "all",
                                }}
                            >
                                <div
                                    className={
                                        !isActive
                                            ? styles.button_anim
                                            : styles.button_anim_active
                                    }
                                    style={{
                                        width: "210px",
                                        fontFamily: "Unbounded_Medium",
                                        fontSize: "15px",
                                    }}
                                >
                                    подробнее
                                </div>
                            </Link>
                            <div style={{ paddingTop: "100px" }} />
                            <div className={styles.boxes}>
                                <div className={styles.box_completed_tasks}>
                                    <div className={styles.box_top}>
                                        <div className={styles.box_description}>
                                            В меню каждого товара есть описание
                                            с преимуществами каждой подписки
                                        </div>
                                        <div className={styles.box_arrow}>
                                            <img src={ArrowIcon} />
                                        </div>
                                    </div>
                                    <div className={styles.box_bottom}>
                                        <b
                                            className={
                                                styles.box_number_completed_task
                                            }
                                            style={{
                                                fontFamily: "Unbounded_Bold",
                                            }}
                                        >
                                            10 000 +
                                        </b>
                                        <b
                                            className={
                                                styles.box_bottom_description
                                            }
                                            style={{
                                                fontFamily: "Unbounded_Bold",
                                            }}
                                        >
                                            ВЫПОЛНЕННЫХ <br /> ЗАКАЗОВ
                                        </b>
                                    </div>
                                </div>
                                <div className={styles.box_number_clients}>
                                    <div className={styles.box_up}>
                                        <img src={AvatarsImage} />
                                        <div
                                            className={
                                                styles.box_number_clients_value
                                            }
                                        >
                                            8000+
                                        </div>
                                    </div>
                                    <div className={styles.box_bottom_2}>
                                        <div
                                            className={styles.box_description_1}
                                        >
                                            Довольных
                                        </div>
                                        <b
                                            className={styles.box_description_2}
                                            style={{
                                                fontFamily: "Unbounded_Bold",
                                            }}
                                        >
                                            Клиентов
                                        </b>
                                    </div>
                                </div>
                                <div className={styles.box_age_work}>
                                    <div
                                        style={{
                                            padding: "20px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <div className={styles.box_age_top}>
                                            <b
                                                className={styles.box_text_2022}
                                                style={{
                                                    fontFamily:
                                                        "Unbounded_Bold",
                                                    alignSelf: "center",
                                                    paddingTop: "10px",
                                                }}
                                            >
                                                2022
                                            </b>
                                        </div>
                                        <div
                                            className={styles.box_bottom_3}
                                            style={{ flexDirection: "row" }}
                                        >
                                            <div>
                                                <b
                                                    style={{
                                                        fontFamily:
                                                            "Unbounded_Bold",
                                                    }}
                                                >
                                                    РАБОТАЕМ ДЛЯ ВАС
                                                </b>
                                            </div>
                                            <img src="/icons/bases/arrows/arrow_diagonal.svg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.boxes}>
                            <div style={{ width: "350px" }}>
                                <Link
                                    to={"../all_feedbacks/"}
                                    style={{
                                        textDecoration: "none",
                                        pointerEvents: "all",
                                    }}
                                >
                                    <div
                                        className={
                                            !isActive
                                                ? styles.button_anim
                                                : styles.button_anim_active
                                        }
                                        style={{
                                            width: "288px",
                                            fontFamily: "Unbounded_Medium",
                                            fontSize: "15px",
                                        }}
                                    >
                                        ВСЕ ОТЗЫВЫ
                                    </div>
                                </Link>
                                <div
                                    className={styles.feedbacks}
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    {feedbacks.map((feedback, index) => (
                                        <Feedback
                                            index={index}
                                            type_buy={feedback.order.title}
                                            key={feedback.id}
                                            username={feedback.order.user}
                                            rating={feedback.rating}
                                            text={feedback.text}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{paddingBottom:'60px'}}
                    className={
                        !isActive
                            ? styles.background_mobile
                            : styles.background_mobile_active
                    }
                >
                    <div className={styles.ellipse_mobile} />
                    <div className={styles.text_background_mobile} />
                    <img
                        src={Triangle3Icon}
                        className={styles.icon_background_mobile}
                        style={{ left: "5%", top: "-18%", opacity: 0.1 }}
                    />
                    <img
                        src={Square3Icon}
                        className={styles.icon_background_mobile}
                        style={{ left: "-10%", top: "3%", opacity: 0.04 }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background_mobile}
                        style={{
                            left: "75% !important",
                            top: "2% !important",
                            height: "52px",
                            opacity: "0.5",
                            width: '58px',
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background_mobile}
                        style={{
                            left: "-2% ",
                            top: "34%",
                            height: "50px",
                            opacity: "0.9",
                            transform: "rotate(-76deg)",
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background_mobile}
                        style={{
                            left: "53%  !important",
                            top: "-5%  !important",
                            height: "35px",
                            opacity: "0.6",
                            transform: "rotate(30deg)",
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background_mobile}
                        style={{
                            left: "80% !important",
                            top: "25% !important",
                            height: "96px",
                            transform: "rotate(160deg) scaleY(-1)",
                            filter: "blur(7px)",
                            opacity: "0.6",
                        }}
                    />
                    <img
                        src={PercentageImage}
                        className={styles.percentage_background_mobile}
                        style={{
                            left: "-6%  !important",
                            top: "-1%  !important",
                            height: "54px",
                            transform: "rotate(-20deg)",
                            filter: "blur(5px)",
                            opacity: "0.7",
                        }}
                    />
                    <img
                        src={TrophiesImage}
                        className={styles.main_background_mobile}
                        style={{ filter: "saturate(1.2)" }}
                    />
                    <div className={styles.glow}>

                    </div>
                    <img
                        src={LineTextImage}
                        className={styles.line_background_mobile}
                    />
                    <div style={{ paddingTop: "172px" }} />
                    <div
                        className={styles.background_title}
                        style={{
                            alignSelf: "flex-start",
                            background: "none",
                            backgroundColor: "none",
                            alignItems: "center",
                            margin: "11px auto",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <b
                            className={
                                !isActive ? styles.title : styles.title_active
                            }
                            style={{
                                fontFamily: "Unbounded_Bold",
                                fontSize: "25px",
                                textAlign: "center",
                            }}
                        >
                            Вернём{" "}
                            <span style={{ color: "var(--color-deeppink)" }}>
                                до 50%
                            </span>
                            <br /> стоимости игры
                        </b>
                        <div
                            className={
                                !isActive
                                    ? styles.description
                                    : styles.description_active
                            }
                            style={{
                                textAlign: "center",
                                marginTop: "10px",
                                fontSize: "12px",
                                alignSelf: "center",
                                width: "350px",
                            }}
                        >
                            Переходи в раздел акции и узнай полные условия
                            предложения
                        </div>
                        <div style={{ paddingTop: "15px" }} />
                        <Link
                            to={"../all_feedbacks/"}
                            style={{
                                textDecoration: "none",
                                pointerEvents: "all",
                                height:'39px'
                            }}
                        >
                            <div
                                className={
                                    !isActive
                                        ? styles.button_anim
                                        : styles.button_anim_active
                                }
                                style={{
                                    width: "164px",
                                    fontFamily: "Unbounded_Medium",
                                    fontSize: "10px",
                                    padding:'13px 0'
                                }}
                            >
                                подробнее
                            </div>
                        </Link>
                    </div>
                    <div
                        className={styles.boxes}
                        style={{
                            marginTop: "19px",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:'16px'

                        }}
                    >
                        <div
                            className={styles.box_completed_tasks}
                            style={{
                                width: "320px",
                                gap: "10px",
                                height: "163px",
                                padding:'20px 0 0'
                            }}
                        >
                            <div className={styles.box_top} style={{paddingLeft:'15px'}}>
                                <div
                                    className={styles.box_description}
                                    style={{
                                        fontSize: "10px",
                                        maxWidth: "290px",
                                    }}
                                >
                                    В меню каждого товара есть описание <br />с
                                    преимуществами каждой подписки
                                </div>
                            </div>
                            <div className={styles.box_bottom} style={{width:'300px', marginTop:'25px', paddingLeft:'15px'}}>
                                <b
                                    className={styles.box_number_completed_task}
                                    style={{
                                        fontSize: "27px",
                                        fontFamily: "Unbounded_Bold",
                                        marginBottom:'12px'
                                    }}
                                >
                                    10 000 +
                                </b>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width:'290px'
                                    }}
                                >
                                    <b
                                        className={
                                            styles.box_bottom_description
                                        }
                                        style={{ fontSize: "14px", width:'213px' }}
                                    >
                                        ВЫПОЛНЕННЫХ <br /> ЗАКАЗОВ
                                    </b>
                                    <div
                                        className={styles.box_arrow}
                                        style={{ alignSelf: "flex-end" }}
                                    >
                                        <img src={ArrowIcon} width={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div
                                className={styles.box_number_clients}
                                style={{
                                    width: "152px",
                                    height: "141px",
                                    padding:'0'
                                }}
                            >
                                <div className={styles.box_up} style={{padding:'20px 15px 0 15px', display:'flex', gap:'16px', width:'116px'}}>
                                    <img
                                        src={AvatarsImage}
                                        width={56}
                                        height={30}
                                    />
                                    <div
                                        className={
                                            styles.box_number_clients_value
                                        }
                                        style={{ fontSize: "12px" }}
                                    >
                                        8000+
                                    </div>
                                </div>
                                <div className={styles.box_bottom_2} style={{marginTop:'36px', paddingLeft:'15px'}}>
                                    <div
                                        className={styles.box_description_1}
                                        style={{ fontSize: "12px" }}
                                    >
                                        Довольных
                                    </div>
                                    <b
                                        className={styles.box_description_2}
                                        style={{
                                            fontSize: "14px",
                                            fontFamily: "Unbounded_Bold",
                                        }}
                                    >
                                        Клиентов
                                    </b>
                                </div>
                            </div>
                            <div
                                className={styles.box_age_work}
                                style={{
                                    width: "calc(152px)",
                                    height: "calc(143px)",
                                    backgroundPositionX: "86%",
                                    backgroundPositionY: "50%",
                                    backgroundSize: "78px",
                                }}
                            >
                                <div
                                    style={{
                                        padding: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div className={styles.box_age_top} style={{padding:'20px 15px 0'}}>
                                        <b
                                            className={styles.box_text_2022}
                                            style={{
                                                fontSize: "26px",
                                                alignSelf: "flex-start",
                                                fontFamily: "Unbounded_Bold",
                                                marginBottom:'41px'
                                            }}
                                        >
                                            2022
                                        </b>
                                    </div>
                                    <div
                                        className={styles.box_bottom_3}
                                        style={{ fontSize: "14px", padding:'0 0 20px 15px' }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    fontFamily:
                                                        "Unbounded_Bold",
                                                }}
                                            >
                                                РАБОТАЕМ ДЛЯ ВАС
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={styles.feedbacks}
                            style={{
                                overflowX: "auto",
                                overflowY: "hidden",
                                width: "300px",
                                display: "flex",
                                gap: "20px",
                                marginTop: "-21px",
                                alignItems: "center",
                                height: "auto",
                            }}
                        >
                            {feedbacks.map((feedback, index) => (
                                <Feedback
                                    index={index}
                                    type_buy={feedback.order.title}
                                    key={feedback.id}
                                    username={feedback.order.user}
                                    rating={feedback.rating}
                                    text={feedback.text}
                                />
                            ))}
                        </div>

                        <Link
                            to={"../all_feedbacks/"}
                            style={{
                                textDecoration: "none",
                                pointerEvents: "all",
                            }}
                        >
                            <div
                                className={
                                    !isActive
                                        ? styles.button_anim
                                        : styles.button_anim_active
                                }
                                style={{
                                    width: "320px",
                                    fontFamily: "Unbounded_Medium",
                                    fontSize: "10px",
                                    padding:'13px 0'
                                }}
                            >
                                Смотреть все отзывы
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FirstFrame;
