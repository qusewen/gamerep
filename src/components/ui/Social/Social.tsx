import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Social.module.css";
import InfoPanel from "../../infoQuestionPanel";
import InfoPanelContext from "../../../context/infoQuestionPanel";
import InformationList from "../../informationList";
import useWindowSize from "../../state/useWindowSize";
import SmileImage from "/images/bases/smile.png";
import HandsHeartImage from "/images/bases/hands_heart.png";
import TelegramCircleImage from "/icons/social/telegram_circle.png";
import YoutubeCircleImage from "/icons/social/youtube_circle.png";
import { Link } from "react-router-dom";

const Social: FunctionComponent = () => {
    return (
        <div
            className={styles.background}
            style={{
                maxWidth: "1240px",
                color: "var(--color-white)",
                marginTop:'60px'
            }}
        >
            <div className={styles.box}>
                <div className={styles.telegram_shadow} />
                <img src={TelegramCircleImage} className={styles.icon} />
                <b
                    className={styles.title}
                    style={{
                        fontFamily: "Unbounded_Bold",
                    }}
                >
                    Подписывайся
                    <br />
                    на нас в
                    <span style={{ color: "var(--color-deeppink)" }}>
                        &nbsp;TELEGRAM
                    </span>
                </b>
                <div className={styles.description_wrapper}>
                    <span className={styles.description}>
                        И узнавай первым о новых
                        <br className={styles.font_brake_mobile} /> акциях
                        <br className={styles.font_brake} /> и скидках
                        <img src={SmileImage} className={styles.emoji} />
                    </span>
                </div>
                <div style={{ paddingTop: "30px" }} />
                <a
                    href={"https://t.me/gamevizor"}
                    style={{
                        textDecoration: "none",
                        pointerEvents: "all",
                    }}
                    className={styles.button}
                >
                    <span
                        style={{
                            fontFamily: "Unbounded_Medium",
                            fontSize: "15px",
                        }}
                        className={styles.button_inner}
                    >
                        перейти
                    </span>
                </a>
            </div>
            <div className={styles.box}>
                <div className={styles.youtube_shadow} />
                <img src={YoutubeCircleImage} className={styles.icon} />
                <b
                    className={styles.title}
                    style={{
                        fontFamily: "Unbounded_Bold",
                    }}
                >
                    {" "}
                    <span style={{ color: "var(--color-deeppink)" }}>
                        YOUTUBE-канал
                    </span>
                    <br />
                    GAME VIZOR
                </b>
                <div style={{ paddingTop: "10px" }} />
                <div className={styles.description_wrapper}>
                    <span className={styles.description}>
                        Делаем юмористический
                        <br className={styles.font_brake_mobile} /> контент
                        <br className={styles.font_brake} /> для вас&nbsp;
                        <img src={HandsHeartImage} className={styles.emoji} />
                    </span>
                </div>
                <div style={{ paddingTop: "30px" }} />
                <a
                    href={"https://www.youtube.com/@GAME_VIZOR"}
                    style={{
                        textDecoration: "none",
                        pointerEvents: "all",
                    }}
                    className={styles.button}
                >
                    <span
                        style={{
                            width: "210px",
                            fontFamily: "Unbounded_Medium",
                            fontSize: "15px",
                        }}
                        className={styles.button_inner}
                    >
                        перейти
                    </span>
                </a>
            </div>
        </div>
    );
};

export default Social;
