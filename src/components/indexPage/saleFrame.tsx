import { FunctionComponent, useEffect, useState } from "react";
import styles from "../../styles/frames/thridFrame.module.css";
import ProductTable from "../productTable";
import axios from "axios";
import { Link } from "react-router-dom";
import Cross2Icon from "/images/backgrounds/elements/cross_2.png";
import Square1Icon from "/images/backgrounds/elements/square_1.png";
import Square2Icon from "/images/backgrounds/elements/square_2.png";
import { ProductInterface } from "../../interfaces/productInterface";
import useWindowSize from "../state/useWindowSize";
import Product from "../product";
import GamesToChooseBanner from "/images/products/games_to_choose_banner.png";
import WillReturn50Banner from "/images/products/will_return_50_banner.png";
import GamesToChooseBannerMobileBanner from "/images/products/games_to_choose_mobile_banner.png";
import WillReturn50MobileBanner from "/images/products/will_return_50_mobile_banner.png";
import PsPlusGiftBanner from "/images/products/ps_plus_gift_banner.png";

const ThirdFrame: FunctionComponent = () => {
    const [Products, setProducts] = useState<ProductInterface[]>([]);

    const GetProducts = async () => {
        try {
            const response = await axios.get("/api/v1/products/", {
                params: {
                    page: 1,
                    page_size: 8,
                    type: "PRODUCT",
                },
            });
            setProducts(response.data.results);
        } catch (error) {
            console.error("Ошибка при получении продуктов:", error);
            throw error;
        }
    };

    useEffect(() => {
        GetProducts();
    }, []);
    const [maxWidth, setMaxWidth] = useState(1600.0);
    const [width, _] = useWindowSize();

    const [sales, setSales] = useState<SaleInterface[]>([])

    useEffect(() => {
        if (sales.length) return

        const handleGetSales = async () => {
            const response = await axios.get("/api/v1/sales/")
            setSales(response.data)
        }

        handleGetSales()
    })

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
    }, []);

    if (width >= maxWidth) {
        return (
            <div
                className={styles.background}
                style={{
                    padding: "0",
                    paddingLeft: "100px",
                    marginTop: "120px",
                    maxWidth: "1342px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                {/* <div className={styles.circle} />
                <div className={styles.circle_2} />

                <img
                    src={Cross2Icon}
                    className={styles.icon_background}
                    style={{
                        left: "90%",
                        top: "-5%",
                        opacity: 0.1,
                        transform: "scale(0.6)",
                    }}
                />
                <img
                    src={Square1Icon}
                    className={styles.icon_background}
                    style={{
                        left: "80%",
                        top: "-5%",
                        opacity: 0.2,
                        transform: "scale(0.5)",
                    }}
                />
                <img
                    src={Square2Icon}
                    className={styles.icon_background}
                    style={{
                        left: "66%",
                        top: "47%",
                        opacity: 0.2,
                        transform: "scale(1.5)",
                    }}
                />
                <img
                    src={Square1Icon}
                    className={styles.icon_background}
                    style={{ left: "-5%", top: "25%", opacity: 0.2 }}
                /> */}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <div
                        className={styles.header}
                        style={{ marginBottom: "40px", maxWidth: "1250px" }}
                    >
                        <b
                            style={{
                                fontSize: "var(--font-size-13xl)",
                                fontFamily: "Unbounded_Bold",
                            }}
                        >
                            Акции
                            <br />
                            {/* <span style={{ color: "var(--color-silver-100)" }}>
                                в наличии
                            </span> */}
                        </b>
                        <Link
                            to={"../sales/"}
                            className={styles.button}
                            style={{ fontFamily: "Unbounded_Medium" }}
                        >
                            Смотреть все акции
                        </Link>
                    </div>
                    <div
                        style={{
                            maxWidth: "1250px",
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            paddingBottom: "20px",
                        }}
                    >
                        <div style={{ display: "flex", gap: "25px" }}>
                            {sales.map((sale, index) => (
                                <img
                                    src={sale.image}
                                    height={"212px"}
                                    alt={sale.title}
                                    style={{ borderRadius: "24px", objectFit: "cover" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={styles.background}
                style={{
                    padding: "0px",
                    margin: "0 auto",
                    marginTop: "50px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    width: "320px",
                }}
            >
                <b style={{ fontSize: "25px", fontFamily: "Unbounded_Bold" }}>
                    Акции
                </b>
                <div
                    style={{
                        maxWidth: "1250px",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        paddingBottom: "20px",
                    }}
                >
                    <div style={{ display: "flex", gap: "25px" }}>
                        {sales.map((sale, index) => (
                            <img
                                src={sale.image}
                                height={"212px"}
                                alt={sale.title}
                                style={{ borderRadius: "24px", objectFit: "cover" }}
                            />
                        ))}
                    </div>
                </div>
                <Link
                    to={"../sales/"}
                    style={{
                        width: "320px",
                        fontFamily: "Unbounded_Medium",
                        fontSize: "10px",
                        padding:'14px 0',
                        borderRadius:'10px'
                    }}
                    className={styles.button}
                >
                    Смотреть все акции
                </Link>
            </div>
        );
    }
};

export default ThirdFrame;
