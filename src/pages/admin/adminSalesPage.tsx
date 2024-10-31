import { FunctionComponent, Key, useEffect, useState } from "react";
import styles from "../../styles/pages/admin/AdminClientPage.module.css";
import axios from "axios";
import BaseCenterContainer from "../../components/baseCenterContainer";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useAuth } from "../../stores/JWTTokenStore";
import AdminMenu from "../../components/menus/adminMenu";
import Input from "../../components/ui/Input/Input";
import SearchIcon from "/public/icons/bases/search.svg?react";
import { useUser } from "../../stores/userStore";
import useWindowSize from "../../components/state/useWindowSize";
import { Link } from "react-router-dom";
import AdminSalePanel from "../../components/panels/admin/adminSalesPanel";

interface ReactSelectEmail {
    value: number | null;
    label: string;
}

const AdminSalesPage: FunctionComponent = () => {
    const { employee } = useUser();
    const { accessToken } = useAuth();

    const [sales, setSales] = useState<SaleAdminInterface[]>([]);

    const [search, setSearch] = useState("");

    const [newProduct, setNewProduct] = useState<SaleAdminInterface | null>(
        null
    );

    const HandleSearch = () => {
        fetchFeedback(true);
    };

    const fetchFeedback = async (is_search = false) => {
        if (!accessToken) return;

        let url = "/api/v1/admin/sales/?"; // Base URL

        // Add filters to the URL if they are true

        if (is_search) {
            url += "&search=" + search;
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setSales(response.data.results);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, [accessToken]);

    const DeleteFeedback = async () => {
        fetchFeedback();
    };

    const [maxWidth, setMaxWidth] = useState(1600.0);
    const [width, _] = useWindowSize();

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
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <BaseCenterContainer style={{ zoom: 0.9 }}>
                    <Header />
                    <div className={styles.background}>
                        <div className={styles.ellipce_1} />
                        <div className={styles.ellipce_2} />
                        <div className={styles.ellipce_3} />

                        <img
                            src="/images/backgrounds/elements/cross_4.png"
                            className={styles.icon_background}
                            style={{ left: "80%", top: "15%" }}
                        />
                        <img
                            src="/images/backgrounds/elements/triangle_4.png"
                            className={styles.icon_background}
                            style={{ left: "65%", top: "10%" }}
                        />
                        <img
                            src="/images/backgrounds/elements/triangle_3.png"
                            className={styles.icon_background}
                            style={{ left: "45%", top: "0%" }}
                        />
                        <img
                            src="/images/backgrounds/elements/circle_2.png"
                            className={styles.icon_background}
                            style={{ left: "2%", top: "60%" }}
                        />
                        <img
                            src="/images/backgrounds/elements/triangle_2.png"
                            className={styles.icon_background}
                            style={{ left: "8.5%", top: "75%" }}
                        />
                        <img
                            src="/images/backgrounds/elements/square_3.png"
                            className={styles.icon_background}
                            style={{ left: "32.5%", top: "50%", opacity: 0.4 }}
                        />
                        <img
                            src="/images/backgrounds/elements/circle_3.png"
                            className={styles.icon_background}
                            style={{ left: "51%", top: "75%" }}
                        />

                        <div className={styles.base_path}>
                            <Link
                                style={{
                                    color: "var(--color-gray-1100)",
                                    textDecoration: "none",
                                }}
                                to={"../"}
                            >
                                Главная
                            </Link>{" "}
                            /{" "}
                            <Link
                                to={"../admin/"}
                                style={{
                                    color: "var(--color-gray-1100)",
                                    textDecoration: "none",
                                }}
                            >
                                Админка
                            </Link>{" "}
                            /{" "}
                            <span style={{ color: " var(--color-white)" }}>
                                Акции
                            </span>
                        </div>
                        <div className={styles.main_panel}>
                            <AdminMenu selected={11} />
                            <div className={styles.general}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div className={styles.title}>Акции</div>
                                    <div
                                        style={{ display: "flex", gap: "25px" }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        ></div>
                                        <div
                                            className={styles.button}
                                            onClick={() => setNewProduct({})}
                                        >
                                            Создать акцию
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        maxWidth: "950px",
                                        justifyContent: "space-between",
                                        color: "rgba(255, 255, 255, 0.6)",
                                        marginTop: "50px",
                                        fontSize: "0.6rem",
                                    }}
                                >
                                    <div
                                        style={{ display: "flex", gap: "60px" }}
                                    >
                                        <div>Название</div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "100px",
                                        }}
                                    >
                                        <div>Действия</div>
                                    </div>
                                </div>

                                <div className={styles.line} />

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "25px",
                                        marginBottom: "150px",
                                        maxHeight: "1600px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {newProduct !== null && (
                                        <AdminSalePanel
                                            product={{}}
                                            funcDelete={() => {
                                                setNewProduct(null);
                                                DeleteFeedback();
                                            }}
                                            employee={employee}
                                            is_edit={true}
                                        />
                                    )}
                                    {sales.map(
                                        (product: SaleAdminInterface) => (
                                            <AdminSalePanel
                                                product={product}
                                                key={product.id}
                                                employee={employee}
                                                funcDelete={DeleteFeedback}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseCenterContainer>
                <Footer />
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <BaseCenterContainer style={{ zoom: 0.9 }}>
                    <Header />
                    <div
                        className={styles.background}
                        style={{
                            padding: "0px",
                            paddingLeft: "25px",
                            paddingRight: "25px",
                            gap: "30px",
                        }}
                    >
                        <div className={styles.base_path}>
                            <Link
                                style={{
                                    color: "var(--color-gray-1100)",
                                    textDecoration: "none",
                                }}
                                to={"../"}
                            >
                                Главная
                            </Link>{" "}
                            /{" "}
                            <Link
                                to={"../admin/"}
                                style={{
                                    color: "var(--color-gray-1100)",
                                    textDecoration: "none",
                                }}
                            >
                                Админка
                            </Link>{" "}
                            /{" "}
                            <span style={{ color: " var(--color-white)" }}>
                                Предложения
                            </span>
                        </div>
                        <div className={styles.general}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div className={styles.title}>Предложения</div>
                                <div
                                    className={styles.button}
                                    style={{
                                        width: "300px",
                                        textWrap: "nowrap",
                                    }}
                                    onClick={() => setNewProduct({})}
                                >
                                    Создать промокод
                                </div>
                            </div>
                            <div
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Input
                                    style={{ width: "340px", height: "29px" }}
                                    maxlenght={30}
                                    placeholder="Поиск"
                                    onEventEnterPressed={HandleSearch}
                                    value={search}
                                    onChange={setSearch}
                                />
                                <div
                                    onClick={HandleSearch}
                                    style={{
                                        position: "absolute",
                                        left: "330px",
                                        top: "32%",
                                    }}
                                >
                                    <SearchIcon />
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "25px",
                                    marginBottom: "150px",
                                    maxHeight: "1600px",
                                    overflowY: "auto",
                                }}
                            >
                                {newProduct !== null && (
                                    <AdminSalePanel
                                        product={{}}
                                        funcDelete={() => {
                                            setNewProduct(null);
                                            DeleteFeedback();
                                        }}
                                        employee={employee}
                                        is_edit={true}
                                    />
                                )}
                                {sales.map((product: SaleAdminInterface) => (
                                    <AdminSalePanel
                                        product={product}
                                        key={product.id}
                                        employee={employee}
                                        funcDelete={DeleteFeedback}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </BaseCenterContainer>
                <div style={{ marginTop: "auto" }}>
                    <Footer />
                </div>
            </div>
        );
    }
};

export default AdminSalesPage;
