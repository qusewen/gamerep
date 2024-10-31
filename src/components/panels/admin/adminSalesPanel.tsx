import { FunctionComponent, useEffect, useState } from "react";
import styles from "../../../styles/Panels/adminTeamPanel.module.css";
import TrashIcon from "/public/icons/bases/trash.svg?react";
import EmployeeInterface from "../../../interfaces/employeeInterface";
import EyeIcon from "/public/icons/bases/eye.svg?react";
import EyeCloseIcon from "/public/icons/bases/eye_crossed_out.svg?react";
import { useAuth } from "../../../stores/JWTTokenStore";
import { format, parseISO } from "date-fns";
import axios from "axios";
import Input from "../../ui/Input/Input";
import MyTextAreaInput from "../../inputs/MyTextAreaInput";
import Checkbox from "../../inputs/checkbox";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";
import useWindowSize from "../../state/useWindowSize";

interface adminTeamPanelProps {
    product: SaleAdminInterface;
    employee: EmployeeInterface | null;
    funcDelete?: () => void;
    is_edit?: boolean;
}

const AdminSalePanel: FunctionComponent<adminTeamPanelProps> = ({
    product,
    funcDelete,
    is_edit = false,
}) => {
    const { accessToken } = useAuth();
    const [Panel, setPanel] = useState<SaleAdminInterface>(product);

    const [isEdit, setIsEdit] = useState(is_edit);

    const [error, setError] = useState<string>("");

    const [generalImage, setGeneralImage] = useState<File | null>(null);

    const [isVisibleDeleteWindow, setIsVisibleDeleteWindow] = useState(false);

    const HandleDetele = async () => {
        try {
            const response = await axios.delete(
                "/api/v1/admin/sales/" + Panel.id + "/",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status == 204) {
                setIsEdit(false);
                if (funcDelete) funcDelete();
            }
        } catch (error: any) {
            setError(JSON.stringify(error.response.data));

            return;
        }
    };

    const HandleSave = async (changeVisible = false) => {
        if (!accessToken) return;

        let url = "/api/v1/admin/sales/" + Panel.id + "/";
        if (!Panel?.id) {
            url = "/api/v1/admin/sales/";
        }

        if (!Panel?.image && !generalImage) {
            setError("Добавьте картинку");
            return;
        }

        delete Panel?.image;

        try {
            var response = await axios.put(url, Panel, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status == 200) {
                setPanel(response.data);
                setIsEdit(false);
                setError("");
            }
        } catch (error: any) {
            setError(JSON.stringify(error.response.data));
            if (changeVisible) Panel.is_active = !Panel.is_active;
            return;
        }

        url = "/api/v1/admin/sales/" + response.data.id + "/";

        const data = new FormData();
        if (generalImage) {
            data.append("image", generalImage);
        }

        try {
            const response = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status == 200) {
                setPanel(response.data);
                setIsEdit(false);
                setError("");
                setGeneralImage(null);
                if (funcDelete) funcDelete();
            }
        } catch (error: any) {
            setError(JSON.stringify(error.response.data));
        }
    };

    const handleCanceled = () => {
        setIsEdit(false);
        setPanel(product);
        setError("");
        setGeneralImage(null);

        if (funcDelete) funcDelete();
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
            <div className={styles.container}>
                {isEdit ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", gap: "50px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    maxWidth: "80px",
                                }}
                            >
                                <label
                                    htmlFor={"general_image" + Panel?.id}
                                    className={styles.change_image}
                                    style={{
                                        width: "80px",
                                        textAlign: "center",
                                        color: "#C2C2C2",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "25px",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <img
                                        src={
                                            generalImage
                                                ? URL.createObjectURL(
                                                      generalImage
                                                  )
                                                : Panel.image ||
                                                  "/images/bases/new_photo.png"
                                        }
                                        width={"80px"}
                                        height={"80px"}
                                        style={{
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            pointerEvents: "initial",
                                        }}
                                    />
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            pointerEvents: "initial",
                                        }}
                                    >
                                        Добавьте главное фото
                                    </div>
                                </label>
                                <input
                                    id={"general_image" + Panel?.id}
                                    style={{ visibility: "hidden" }}
                                    multiple={false}
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => {
                                        setGeneralImage(
                                            e.target.files
                                                ? e.target.files[0]
                                                : null
                                        );
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                }}
                            >
                                <Input
                                    placeholder={"Заголовок"}
                                    value={Panel.title}
                                    label={"Название"}
                                    style={{ width: "442px", height: "42px" }}
                                    onChange={(value) => {
                                        setPanel({ ...Panel, title: value });
                                    }}
                                />
                                <Input
                                    placeholder={
                                        "Подсвечиваемая часть заголовка"
                                    }
                                    value={Panel.highlighted_text}
                                    label={"Подсвечиваемая часть заголовка"}
                                    style={{ width: "442px", height: "42px" }}
                                    onChange={(value) => {
                                        setPanel({
                                            ...Panel,
                                            highlighted_text: value,
                                        });
                                    }}
                                />

                                <MyTextAreaInput
                                    placeholder={"Описание"}
                                    value={Panel.description}
                                    label="Описание"
                                    style={{ width: "642px", height: "150px" }}
                                    onChange={(value) => {
                                        setPanel({
                                            ...Panel,
                                            description: value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: "250px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    alignItems: "flex-end",
                                }}
                            >
                                <div
                                    onClick={() => {
                                        HandleSave(true);
                                    }}
                                >
                                    {Panel.is_active === false ? (
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Показать{" "}
                                            <EyeIcon width={16} height={16} />
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Скрыть{" "}
                                            <EyeCloseIcon
                                                width={16}
                                                height={16}
                                            />
                                        </span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "5px",
                                        color: "#FF6062",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setIsVisibleDeleteWindow(true);
                                    }}
                                >
                                    Удалить <TrashIcon fill="#FF6062" />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                    alignItems: "center",
                                }}
                            >
                                <div>{error}</div>
                                <div
                                    className={styles.button}
                                    onClick={() => {
                                        HandleSave();
                                    }}
                                    style={{ width: "128px" }}
                                >
                                    Сохранить
                                </div>
                                <div
                                    onClick={handleCanceled}
                                    style={{ cursor: "pointer" }}
                                >
                                    Закрыть / Отмена
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", gap: "40px" }}>
                            <img
                                src={
                                    Panel.image
                                        ? Panel.image
                                        : "https://placehold.co/80"
                                }
                                width={"80px"}
                                height={"80px"}
                                style={{ borderRadius: "10px" }}
                            />
                            <div style={{ color: "white" }}>{Panel.title}</div>
                        </div>
                        <div style={{ display: "flex", gap: "50px" }}>
                            <div></div>
                            <div
                                onClick={() => {
                                    setIsEdit(true);
                                }}
                                style={{
                                    color: "white",
                                    textDecoration: "underline",
                                }}
                            >
                                Редактировать
                            </div>
                        </div>
                    </div>
                )}

                {isVisibleDeleteWindow && (
                    <div
                        className={styles.background_delete}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                setIsVisibleDeleteWindow(false);
                            }
                        }}
                    >
                        <div className={styles.container_delete}>
                            <img
                                src="/icons/bases/trash_delete.svg"
                                width={200}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                    alignItems: "center",
                                }}
                            >
                                <h1>Удалить?</h1>
                                <div
                                    className={styles.button}
                                    onClick={HandleDetele}
                                >
                                    Да
                                </div>
                                <div
                                    className={styles.button}
                                    onClick={() =>
                                        setIsVisibleDeleteWindow(false)
                                    }
                                    style={{
                                        backgroundColor:
                                            "rgba(194, 194, 194, 0.14)",
                                    }}
                                >
                                    Нет
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className={styles.container}>
                {isEdit ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "20px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    maxWidth: "80px",
                                }}
                            >
                                <label
                                    htmlFor={"general_image" + Panel?.id}
                                    className={styles.change_image}
                                    style={{
                                        width: "120px",
                                        textAlign: "center",
                                        color: "#C2C2C2",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "25px",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <img
                                        src={
                                            generalImage
                                                ? URL.createObjectURL(
                                                      generalImage
                                                  )
                                                : Panel.image ||
                                                  "/images/bases/new_photo.png"
                                        }
                                        width={"120px"}
                                        height={"120px"}
                                        style={{
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            pointerEvents: "initial",
                                        }}
                                    />
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            pointerEvents: "initial",
                                        }}
                                    >
                                        Добавьте главное фото
                                    </div>
                                </label>
                                <input
                                    id={"general_image" + Panel?.id}
                                    style={{ visibility: "hidden" }}
                                    multiple={false}
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => {
                                        setGeneralImage(
                                            e.target.files
                                                ? e.target.files[0]
                                                : null
                                        );
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    alignItems: "flex-end",
                                }}
                            >
                                <div
                                    onClick={() => {
                                        HandleSave(true);
                                    }}
                                >
                                    {Panel.is_active === false ? (
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Показать{" "}
                                            <EyeIcon width={16} height={16} />
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Скрыть{" "}
                                            <EyeCloseIcon
                                                width={16}
                                                height={16}
                                            />
                                        </span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "5px",
                                        color: "#FF6062",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setIsVisibleDeleteWindow(true);
                                    }}
                                >
                                    Удалить <TrashIcon fill="#FF6062" />
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                alignItems: "center",
                            }}
                        >
                            <div>{error}</div>
                            <div
                                className={styles.button}
                                onClick={() => {
                                    HandleSave();
                                }}
                                style={{ width: "250px" }}
                            >
                                Сохранить
                            </div>
                            <div
                                onClick={handleCanceled}
                                style={{ cursor: "pointer" }}
                            >
                                Закрыть / Отмена
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    color: "white",
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                <span
                                    style={{
                                        color: "rgba(255, 255, 255, 0.6)",
                                    }}
                                >
                                    Название:{" "}
                                </span>
                                {Panel.title}
                            </div>

                            <div
                                style={{
                                    color: "white",
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                <span
                                    style={{
                                        color: "rgba(255, 255, 255, 0.6)",
                                    }}
                                >
                                    Действия:{" "}
                                </span>
                                <span
                                    onClick={() => {
                                        setIsEdit(true);
                                    }}
                                    style={{ textDecoration: "underline" }}
                                >
                                    Редактировать
                                </span>
                            </div>
                        </div>

                        <img
                            src={
                                Panel.image
                                    ? Panel.image
                                    : "https://placehold.co/42"
                            }
                            width={"42px"}
                            height={"42px"}
                            style={{ borderRadius: "10px" }}
                        />
                    </div>
                )}

                {isVisibleDeleteWindow && (
                    <div
                        className={styles.background_delete}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                setIsVisibleDeleteWindow(false);
                            }
                        }}
                    >
                        <div
                            className={styles.container_delete}
                            style={{ width: "280px", left: "6%", top: "15%" }}
                        >
                            <img
                                src="/icons/bases/trash_delete.svg"
                                width={200}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                    alignItems: "center",
                                }}
                            >
                                <h1>Удалить?</h1>
                                <div
                                    className={styles.button}
                                    onClick={HandleDetele}
                                >
                                    Да
                                </div>
                                <div
                                    className={styles.button}
                                    onClick={() =>
                                        setIsVisibleDeleteWindow(false)
                                    }
                                    style={{
                                        backgroundColor:
                                            "rgba(194, 194, 194, 0.14)",
                                    }}
                                >
                                    Нет
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default AdminSalePanel;
