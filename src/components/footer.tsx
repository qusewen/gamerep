import { FunctionComponent } from "react";
import styles from "../styles/footer.module.css";
import { Link } from "react-router-dom";

const Footer: FunctionComponent<{ style?: React.CSSProperties }> = ({
    style,
}) => {
    return (
        <div className={styles.background} style={style}>
            <div className={styles.container}>
                <div className={styles.main_content}>
                    <Link to="/" className={styles.logo}>
                        GAME
                        <br />
                        VIZOR
                    </Link>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            fontFamily: "Unbounded_Regular",
                        }}
                        className={styles.sitemap}
                    >
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../rules/"}
                            className={styles.item}
                        >
                            Главная
                        </Link>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../rules/"}
                            className={styles.item}
                        >
                            Каталог игр
                        </Link>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../rules/"}
                            className={styles.item}
                        >
                            Подписки
                        </Link>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../rules/"}
                            className={styles.item}
                        >
                            Донат
                        </Link>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../rules/"}
                            className={styles.item}
                        >
                            Пополнения
                        </Link>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../sales/"}
                            className={styles.item}
                        >
                            Акции
                        </Link>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            fontFamily: "Unbounded_Regular",
                        }}
                        className={styles.legal}
                    >
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../blog/"}
                            className={styles.item}
                        >
                            Блог
                        </Link>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../rules/"}
                            className={styles.item}
                        >
                            Правила сайта
                        </Link>

                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../offer/"}
                            className={styles.item}
                        >
                            Публичная оферта
                        </Link>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"../confidential/"}
                            className={styles.item}
                        >
                            Политика конфиденциальности
                        </Link>
                    </div>

                    <Link
                        to={"mailto:support@gamevizor.ru"}
                        style={{ color: "white", textDecoration: "none",
                            width: "152px",
                            fontFamily: "Unbounded_Medium",
                            fontSize: "10px",
                            padding:'14px 0',
                            borderRadius:'10px' }}
                        className={styles.button}
                    >
                        Обратная связь
                    </Link>
                </div>
                <hr className={styles.footer_rule_hr} />
                <span className={styles.footer_rule}>
                    Все права защищены © «GAME VIZOR», 2024
                </span>
            </div>
        </div>
    );
};

export default Footer;
