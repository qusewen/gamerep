/// <reference types="vite-plugin-svgr/client" />
import React, { useEffect, useState } from "react";
import BaseCenterContainer from "../components/baseCenterContainer";
import Footer from "../components/footer";
import Header from "../components/header";
import SaleOffer from "../components/ui/SaleOffer/SaleOffer";

import styles from "../styles/pages/SalePage.module.css";

import Cross4Icon from "/images/backgrounds/elements/cross_4.png";
import Triangle4Icon from "/images/backgrounds/elements/triangle_4.png";
import Triangle3Icon from "/images/backgrounds/elements/triangle_3.png";
import Triangle6Icon from "/images/backgrounds/elements/triangle_6.png";
import Triangle2Icon from "/images/backgrounds/elements/triangle_2.png";
import Square3Icon from "/images/backgrounds/elements/square_3.png";
import Circle3Icon from "/images/backgrounds/elements/circle_3.png";
import Circle2Icon from "/images/backgrounds/elements/circle_2.png";
import GamesToChooseBanner from "/images/products/games_to_choose_banner.png";
import WillReturn50Banner from "/images/products/will_return_50_banner.png";
import PsPlusGiftBanner from "/images/products/ps_plus_gift_banner.png";
import WinkySmile from "/images/bases/winky.png";

import { Link } from "react-router-dom";
import Social from "../components/ui/Social/Social";
import axios from "axios";

import sanitizeHtml from "sanitize-html";
import useWindowSize from "../components/state/useWindowSize.tsx";

function SalePage() {
    const [sales, setSales] = useState<SaleInterface[]>([]);

    const [salesList, setSalesList] = useState<SaleInterface[][]>([]);

    useEffect(() => {
        const salePairs = [];
        for (let i = 0; i < sales.length; i += 2) {
            salePairs.push(sales.slice(i, i + 2));
        }
        setSalesList(salePairs);
    }, [sales]);

    useEffect(() => {
        if (sales.length) return;

        const handleGetSales = async () => {
            const response = await axios.get("/api/v1/sales/");
            setSales(response.data);
        };

        handleGetSales();
    });
    const [width, _] = useWindowSize();

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

    const isDesc = width >= maxWidth

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <BaseCenterContainer>
                <Header/>
                <div className={styles.background} style={{overflowX:'hidden'}}>
                    {isDesc && <div className={styles.ellipce_1}/>}
                    {isDesc && <div className={styles.ellipce_2}/>}
                    {!isDesc && <div style={{width:'320px', left:'0'}} className={styles.ellipce_3}/>}


                    {isDesc && <img
                        src={Cross4Icon}
                        className={styles.icon_background}
                        style={{left: "80%", top: "15%"}}
                    />}
                    {isDesc && <img
                        src={Triangle4Icon}
                        className={styles.icon_background}
                        style={{left: "65%", top: "10%"}}
                    />}
                    {isDesc && <img
                        src={Triangle3Icon}
                        className={styles.icon_background}
                        style={{left: "45%", top: "0%"}}
                    />}
                    {!isDesc &&
                        <img
                            src={Triangle6Icon}
                            className={styles.icon_background}
                            style={{
                                left: ' 59%',
                                top: '8%',
                                opacity: '0.2'
                            }}
                        />
                    }
                    <img
                        src={Circle2Icon}
                        className={styles.icon_background}
                        style={{left: "2%", top: "60%"}}
                    />
                    <img
                        src={Triangle2Icon}
                        className={styles.icon_background}
                        style={{left: "8.5%", top: "75%"}}
                    />
                    <img
                        src={Square3Icon}
                        className={styles.icon_background}
                        style={{left: "32.5%", top: "50%", opacity: 0.4}}
                    />
                    <img
                        src={Circle3Icon}
                        className={styles.icon_background}
                        style={{left: "51%", top: "75%"}}
                    />

                    <div className={styles.base_path} style={{display:'flex',
                        alignItems:'center'}}>
                        <Link
                            to={"../"}
                            style={{
                                color: "var(--color-gray-1100)",
                                textDecoration: "none",

                            }}
                        >
                            Главная
                        </Link>
                        <div style={{padding:'0 2px'}}>/</div>
                        <span style={{color: " var(--color-white)"}}>
                            Акции
                        </span>
                    </div>
                    <div style={{paddingTop: "60px"}}/>
                    <b
                        style={{
                            fontSize: "var(--font-size-13xl)",
                            fontFamily: "Unbounded_Bold",
                        }}
                    >
                        Акции
                    </b>
                    <div style={{paddingTop: "60px"}}/>

                    <div className={styles.wrapper_panel}>
                        {salesList.map((pair: any, index) => (
                            <div className={styles.panel} key={index}>
                                <SaleOffer
                                    image={pair[0].image}
                                    title={pair[0].title}
                                    highlightedText={pair[0].highlighted_text}
                                    description={
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeHtml(
                                                    pair[0].description
                                                ),
                                            }}
                                        />
                                    }
                                />

                                {pair.length == 2 ? (
                                    <SaleOffer
                                        image={pair[1].image}
                                        title={pair[1].title}
                                        highlightedText={
                                            pair[1].highlighted_text
                                        }
                                        description={
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeHtml(
                                                        pair[1].description
                                                    ),
                                                }}
                                            />
                                        }
                                    />
                                ) : (
                                    <div className={styles.future_sale_offer}>
                                        <p className={styles.title}>
                                            Место для новой акции,
                                            <br/> следите за новостями
                                            <img
                                                src={WinkySmile}
                                                className={styles.winky_smile}
                                            />
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Social/>
            </BaseCenterContainer>
            <div style={{paddingTop: "120px"}}/>
            <Footer/>
        </div>
    );
}

export default SalePage;
