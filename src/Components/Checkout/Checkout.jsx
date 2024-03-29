import React, { useState } from "react";
import login from "./login.png";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Cart } from "../Cart_Page/Cart";
import foot from "./foot.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, empty_bag } from "../../Redux/action";
import axios from "axios";
import { API_KEY } from "../../config";
import { Collapisble, Collapisble2 } from "../Products_Page/Collapisble";

const Nav = styled.nav`
    width: 100%;
    height: 4.5rem;
    display: flex;
    background-color: white;
    top: 0px;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    & > .above500 {
        margin: auto;
        padding-left: 10px;
        text-align: left;
        border-bottom: 2px solid white;

        & > h3 {
            padding-top: 6px;
        }
    }

    & > .below500 {
        display: none;
    }

    @media all and (max-width: 500px) {
        & > .above500 {
            display: none;
        }
        & > .below500 {
            display: flex;
            height: 50px;
            padding: 15px 10% 0;
        }
        height: 50px;
    }
`;

const Div = styled.div`
    display: flex;
    gap: 1%;
    width: 76%;
    margin-left: 12%;
    margin-right: 12%;

    & > div {
        background-color: white;
        width: 42%;
        height: fit-content;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        & > button {
            border: 2px solid rgb(252, 39, 121);
        }
        & input {
            border: none;
            border-bottom: 2px solid rgb(235, 235, 235);
            height: 2rem;
            font-size: 16px;
            width: 88%;
            padding-left: 2%;
            margin: 2% 5%;
            outline: none;

            &:focus {
                border-bottom: 1px solid rgb(252, 39, 121);
            }
        }
    }
    & > .opt {
        text-align: left;
        width: 20%;

        & > div {
            height: 2rem;
            padding: 8% 5% 3% 5%;
            color: rgb(252, 39, 121);
            border-right: 2px solid rgb(252, 39, 121);
        }
    }
    & > .pyOpt {
        text-align: left;
        width: 20%;

        & > div {
            height: 2rem;
            padding: 8% 5% 3% 5%;
            color: black;
            border-right: 2px solid white;

            & > hr {
                border-block-color: rgb(235, 235, 235);
                opacity: 30%;
            }
        }
    }
    & > .display {
        width: 33%;
        height: fit-content;

        & > .head {
            display: flex;
            padding: 0 5%;
            justify-content: space-between;
        }
        & > .card {
            max-height: 21rem;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        & > .foot {
            padding: 0 5%;

            & > p,
            & > h3 {
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .payment500 {
        display: none;
        width: 100%;
    }

    @media all and (max-width: 500px) {
        .opt,
        .display,
        .pyOpt,
        .middlePay {
            display: none;
            width: 0%;
        }
        .middle {
            width: 100%;
            & > input {
                width: 50%;
            }
        }
        width: 96%;
        margin-left: 2%;
        margin-right: 2%;

        & > .payment500 {
            display: block;
            min-whidth: 200%;
            margin: auto;
            background-color: rgb(243, 243, 243);
            height: 500px;
            overflow-y: scroll;
            overflow-x: hidden;

            & > .col {
                height: fit-content;
            }
        }
    }
`;

export const Checkout = () => {
    let body = document.querySelector("body");
    body.setAttribute("style", "overflow: scroll");

    const cartProducts = useSelector((state) => state.cartProducts);
    const Navigate = useNavigate();

    const [edit, setEdit] = useState(true);
    const [address, setAddress] = useState({
        name: "",
        email: "",
        number: "",
        pincode: "",
        address: "",
        amount: "",
        country: "India",
    });
    const [payOpt, setPayOpt] = useState(0);

    const handleInput = (e) => {
        const { name } = e.target;
        setAddress({
            ...address,
            [name]: e.target.value,
        });
    };

    let off_price = 0;

    for (let item of cartProducts) {
        off_price += +item.off_price * +item.quan;
    }

    let loginData = JSON.parse(localStorage.getItem("loginData"));

    let isLogin = localStorage.getItem("isLogin");

    const checkAdd = () => {
        if (address.number.length !== 10 && address.pincode.length !== 6) {
            alert("Enter Correct Mobile Number and Pincode");
            return;
        }

        setPage(2);
    };

    const [page, setPage] = useState(isLogin === "true" ? 1 : 0);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkOutItem = () => {
        setAddress({
            ...address,
            amount: off_price,
        });
        dispatch(setUser(address));
        axios
            .post(`${API_KEY}/emptycart`, { id: loginData._id })
            .then((res) => dispatch(empty_bag([])));

        alert("Order Placed Successfully!!  Thank You for Ordering");
        navigate("/thankyou");
    };

    const Previous = () => {
        if (page === 1 && isLogin === "true") {
            Navigate("/");
        } else if (page === 0) {
            Navigate("/");
        } else {
            setPage(page - 1);
        }
    };
    return (
        <div
            style={{
                backgroundColor: "rgb(243,243,243)",
                width: "101.5%",
                textAlign: "left",
            }}
        >
            {/*  Navbar */}

            <Nav>
                <div className="below500">
                    <div style={{ marginRight: "90px" }} onClick={Previous}>
                        🡸
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: "600" }}>
                        {page === 0
                            ? "Login/Register"
                            : page === 1
                            ? "Enter Address"
                            : "Select And Pay"}
                    </div>
                </div>
                <div
                    className="above500"
                    style={{
                        width: "27.5%",
                        height: "99.999%",
                        borderBottom: "2px solid white",
                    }}
                >
                    {" "}
                    <img
                        style={{
                            width: "6.5rem",
                            // border: "1px solid red",
                            marginTop: "1rem",
                            marginLeft: "50%",
                        }}
                        src="https://logos-download.com/wp-content/uploads/2021/01/Nykaa_Logo.png"
                        alt="Nykaa-logo"
                        onClick={() => Navigate("/")}
                    />
                </div>
                <div
                    className="above500"
                    style={{
                        width: "15%",
                        height: "100%",
                        borderRight: "1px solid grey",
                        borderLeft: "1px solid grey",
                        color: `${page === 0 ? "rgb(252, 39, 121)" : "black"}`,
                        borderBottom: `${
                            page === 0
                                ? "2px solid rgb(252, 39, 121)"
                                : "2px solid grey"
                        }`,
                    }}
                >
                    <h3>
                        1-
                        {page === 0
                            ? "LOGIN"
                            : isLogin === "true"
                            ? ` Welcome ${loginData.name.split(" ")[0]}`
                            : "GUEST CHECKOUT"}
                    </h3>
                </div>
                <div
                    className="above500"
                    style={{
                        width: "15%",
                        height: "100%",
                        borderRight: "1px solid grey",
                        borderBottom: "2px solid grey",
                        color: `${page === 1 ? "rgb(252, 39, 121)" : "black"}`,
                        borderBottom: `${
                            page === 1
                                ? "2px solid rgb(252, 39, 121)"
                                : "2px solid grey"
                        }`,
                    }}
                >
                    <h3>2- ADDRESS</h3>
                </div>
                <div
                    className="above500"
                    style={{
                        width: "15%",
                        height: "100%",
                        borderRight: "1px solid grey",
                        borderBottom: "2px solid grey",
                        color: `${page === 2 ? "rgb(252, 39, 121)" : "black"}`,
                        borderBottom: `${
                            page === 2
                                ? "2px solid rgb(252, 39, 121)"
                                : "2px solid grey"
                        }`,
                    }}
                >
                    <h3>3- PAYMENT</h3>
                </div>
                <div
                    className="above500"
                    style={{
                        width: "27.5%",
                        height: "99.999%",
                        borderBottom: "2px solid white",
                    }}
                ></div>
            </Nav>

            {/*  Pages of Heading*/}

            <div style={{ marginTop: "6rem", width: "100%" }}>
                {page === 0 ? (
                    <Div>
                        <div className="opt">
                            <div>Login/Register</div>
                        </div>
                        <div>
                            <div>
                                <img src={login} alt="login/register" />
                            </div>
                            <div>
                                <button
                                    style={{
                                        width: "90%",
                                        margin: "0 5% 5%",
                                        padding: "2% 1%",
                                        fontSize: "17px",
                                        fontWeight: "600",
                                        color: "rgb(252, 39, 121)",
                                        backgroundColor: "white",
                                        border: "1px solid rgb(252, 39, 121)",
                                        letterSpacing: "3px",
                                    }}
                                    onClick={() => setPage(1)}
                                >
                                    CONTINUE AS GUEST ᐳ
                                </button>
                            </div>
                        </div>

                        {/* <div> */}
                        <div className="display">
                            <div className="head">
                                <p style={{ color: "orange" }}>
                                    {cartProducts.length} Items in your Bag
                                </p>
                                <button
                                    onClick={() => setEdit(!edit)}
                                    style={{
                                        color: "rgb(252, 39, 121)",
                                        border: "none",
                                        backgroundColor: "white",
                                        fontWeight: "600",
                                    }}
                                >
                                    EDIT{" "}
                                </button>
                            </div>

                            {edit && (
                                <div className="card">
                                    <Cart />
                                </div>
                            )}
                            <div className="foot">
                                <p>
                                    <span>Sub Total</span>
                                    <span>₹{off_price}</span>
                                </p>
                                <p>
                                    <span>Shipping Charge</span>
                                    <span style={{ color: "rgb(77,182,172)" }}>
                                        🛈 Free
                                    </span>
                                </p>
                                <p style={{ color: "rgb(77,182,172)" }}>
                                    <span>Bag Discount</span>
                                    <span>-₹0</span>
                                </p>
                                <h3>
                                    <span>Grand Total</span>
                                    <span>₹{off_price}</span>
                                </h3>
                            </div>
                        </div>
                        {/* </div> */}
                    </Div>
                ) : page === 1 ? (
                    <Div>
                        <div className="opt">
                            <div>New Address</div>
                        </div>
                        <div className="middle">
                            <h3 style={{ padding: "0 5%" }}>New Address</h3>
                            <hr
                                style={{
                                    width: "90%",
                                    borderBlockColor: "rgb(235, 235, 235)",
                                }}
                            />
                            <form action="">
                                <input
                                    type="text"
                                    name="County"
                                    value={"India"}
                                />
                                <br />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleInput}
                                />
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleInput}
                                />
                                <br />
                                <span style={{ marginLeft: "5%" }}>+91</span>
                                <input
                                    style={{ width: "75%" }}
                                    type="number"
                                    name="number"
                                    placeholder="Number"
                                    onChange={handleInput}
                                />
                                <br />
                                <input
                                    type="number"
                                    name="pincode"
                                    placeholder="Postal Code"
                                    onChange={handleInput}
                                />
                                <br />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    style={{
                                        height: "5rem",
                                        border: "2px solid rgb(243,243,243)",
                                    }}
                                    onChange={handleInput}
                                />
                            </form>
                            <div>
                                <button
                                    style={{
                                        width: "90%",
                                        margin: "0 5% 5%",
                                        padding: "2% 1%",
                                        fontSize: "17px",
                                        fontWeight: "600",
                                        color: "white",
                                        backgroundColor: "rgb(252, 39, 121)",
                                        border: "1px solid rgb(252, 39, 121)",
                                        letterSpacing: "1px",
                                    }}
                                    onClick={() => checkAdd()}
                                >
                                    SHIP TO THIS ADDRESS ᐳ
                                </button>
                            </div>
                        </div>
                        <div className="display">
                            <div className="head">
                                <p style={{ color: "orange" }}>
                                    {cartProducts.length} Items in your Bag
                                </p>
                                <button
                                    onClick={() => setEdit(!edit)}
                                    style={{
                                        color: "rgb(252, 39, 121)",
                                        border: "none",
                                        backgroundColor: "white",
                                        fontWeight: "600",
                                    }}
                                >
                                    EDIT{" "}
                                </button>
                            </div>

                            {edit && (
                                <div className="card">
                                    <Cart />
                                </div>
                            )}
                            <div className="foot">
                                <p>
                                    <span>Sub Total</span>
                                    <span>₹{off_price}</span>
                                </p>
                                <p>
                                    <span>Shipping Charge</span>
                                    <span style={{ color: "rgb(77,182,172)" }}>
                                        🛈 Free
                                    </span>
                                </p>
                                <p style={{ color: "rgb(77,182,172)" }}>
                                    <span>Bag Discount</span>
                                    <span>-₹0</span>
                                </p>
                                <h3>
                                    <span>Grand Total</span>
                                    <span>₹{off_price}</span>
                                </h3>
                            </div>
                        </div>
                    </Div>
                ) : (
                    <Div>
                        <div className="pyOpt">
                            <div
                                style={{
                                    color: `${
                                        payOpt === 0
                                            ? "rgb(252, 39, 121)"
                                            : "black"
                                    }`,
                                    borderRight: `${
                                        payOpt === 0
                                            ? "2px solid rgb(252, 39, 121)"
                                            : "2px solid white"
                                    }`,
                                }}
                                onClick={() => setPayOpt(0)}
                            >
                                Credit/Debit Card
                                <hr />
                            </div>
                            <div
                                style={{
                                    color: `${
                                        payOpt === 1
                                            ? "rgb(252, 39, 121)"
                                            : "black"
                                    }`,
                                    borderRight: `${
                                        payOpt === 1
                                            ? "2px solid rgb(252, 39, 121)"
                                            : "2px solid white"
                                    }`,
                                }}
                                onClick={() => setPayOpt(1)}
                            >
                                UPI <hr />
                            </div>
                            <div
                                style={{
                                    color: `${
                                        payOpt === 2
                                            ? "rgb(252, 39, 121)"
                                            : "black"
                                    }`,
                                    borderRight: `${
                                        payOpt === 2
                                            ? "2px solid rgb(252, 39, 121)"
                                            : "2px solid white"
                                    }`,
                                }}
                                onClick={() => setPayOpt(2)}
                            >
                                GooglePay <hr />
                            </div>
                            <div
                                style={{
                                    color: `${
                                        payOpt === 3
                                            ? "rgb(252, 39, 121)"
                                            : "black"
                                    }`,
                                    borderRight: `${
                                        payOpt === 3
                                            ? "2px solid rgb(252, 39, 121)"
                                            : "2px solid white"
                                    }`,
                                }}
                                onClick={() => setPayOpt(3)}
                            >
                                Net Banking <hr />
                            </div>
                            <div
                                style={{
                                    color: `${
                                        payOpt === 4
                                            ? "rgb(252, 39, 121)"
                                            : "black"
                                    }`,
                                    borderRight: `${
                                        payOpt === 4
                                            ? "2px solid rgb(252, 39, 121)"
                                            : "2px solid white"
                                    }`,
                                }}
                                onClick={() => setPayOpt(4)}
                            >
                                Mobile Wallets <hr />
                            </div>
                            <div
                                style={{
                                    color: `${
                                        payOpt === 5
                                            ? "rgb(252, 39, 121)"
                                            : "black"
                                    }`,
                                    borderRight: `${
                                        payOpt === 5
                                            ? "2px solid rgb(252, 39, 121)"
                                            : "2px solid white"
                                    }`,
                                }}
                                onClick={() => setPayOpt(5)}
                            >
                                Cash on Delivery <hr />
                            </div>
                            <div
                                style={{
                                    color: `${
                                        payOpt === 6
                                            ? "rgb(252, 39, 121)"
                                            : "black"
                                    }`,
                                    borderRight: `${
                                        payOpt === 6
                                            ? "2px solid rgb(252, 39, 121)"
                                            : "2px solid white"
                                    }`,
                                }}
                                onClick={() => setPayOpt(6)}
                            >
                                Gift Card <hr />
                            </div>
                        </div>
                        <div className="middlePay">
                            {payOpt === 0 ? (
                                <>
                                    <h3 style={{ padding: "0 5%" }}>
                                        Credit/Debit Card
                                    </h3>
                                    <hr
                                        style={{
                                            borderBlockColor:
                                                "rgb(235,235,235)",
                                            opacity: "40%",
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                    />
                                    <div style={{ display: "flex", gap: "2%" }}>
                                        <input
                                            type="text"
                                            placeholder="Expiry (MM/YY)"
                                        />
                                        <input type="text" placeholder="CVV" />
                                    </div>
                                    <button
                                        style={{
                                            width: "90%",
                                            margin: "0 5%",
                                            height: "3rem",
                                            color: "white",
                                            backgroundColor:
                                                "rgb(252, 39, 121)",
                                            fontWeight: "600",
                                            marginTop: "5%",
                                            marginBottom: "6%",
                                            fontSize: "17px",
                                            borderRadius: "5px",
                                        }}
                                        onClick={checkOutItem}
                                    >
                                        Pay ₹{off_price} Now
                                    </button>
                                </>
                            ) : payOpt === 1 ? (
                                <>
                                    <h3 style={{ padding: "0 5%" }}>UPI</h3>
                                    <hr
                                        style={{
                                            borderBlockColor:
                                                "rgb(235,235,235)",
                                            opacity: "40%",
                                        }}
                                    />
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="VPA/UPI ID (eg. 9876543210@upi)"
                                        />
                                    </div>
                                    <button
                                        style={{
                                            width: "90%",
                                            margin: "0 5%",
                                            height: "3rem",
                                            color: "white",
                                            backgroundColor:
                                                "rgb(252, 39, 121)",
                                            fontWeight: "600",
                                            marginBottom: "5%",
                                        }}
                                        onClick={checkOutItem}
                                    >
                                        Pay ₹{off_price} Now
                                    </button>
                                </>
                            ) : payOpt === 2 ? (
                                <>
                                    <h3 style={{ padding: "0 5%" }}>
                                        Google pay
                                    </h3>
                                    <hr
                                        style={{
                                            borderBlockColor:
                                                "rgb(235,235,235)",
                                            opacity: "40%",
                                        }}
                                    />
                                    <div style={{ margin: "4% 0" }}>
                                        <p
                                            style={{
                                                padding: "0 5%",
                                                fontSize: "12px",
                                                opacity: "60%",
                                            }}
                                        >
                                            Enter Mobile Number/ Google Pay UPI
                                            ID
                                        </p>
                                        <input
                                            type="text"
                                            placeholder={address.Number}
                                        />
                                    </div>
                                    <button
                                        style={{
                                            width: "90%",
                                            margin: "0 5%",
                                            height: "3rem",
                                            color: "white",
                                            backgroundColor:
                                                "rgb(252, 39, 121)",
                                            fontWeight: "600",
                                            marginBottom: "6%",
                                        }}
                                        onClick={checkOutItem}
                                    >
                                        Pay ₹{off_price} Now
                                    </button>
                                </>
                            ) : payOpt === 5 ? (
                                <>
                                    <h3
                                        style={{
                                            padding: "0 5%",
                                            fontSize: "19px",
                                        }}
                                    >
                                        CASH ON DELIVERY
                                    </h3>
                                    <hr
                                        style={{
                                            borderBlockColor:
                                                "rgb(235,235,235)",
                                            opacity: "40%",
                                        }}
                                    />
                                    <button
                                        style={{
                                            width: "90%",
                                            margin: "0 5%",
                                            height: "3rem",
                                            color: "white",
                                            backgroundColor:
                                                "rgb(252, 39, 121)",
                                            fontWeight: "600",
                                            marginTop: "5%",
                                            marginBottom: "6%",
                                            fontSize: "17px",
                                        }}
                                        onClick={checkOutItem}
                                    >
                                        Pay ₹{off_price} by Cash
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={{ padding: "5% 5%" }}>
                                        {" "}
                                        Use
                                        <br />
                                        <br />
                                        <span
                                            onClick={() => setPayOpt(1)}
                                            style={{
                                                color: "rgb(252, 39, 121)",
                                            }}
                                        >
                                            {" "}
                                            UPI
                                        </span>{" "}
                                        /{" "}
                                        <span
                                            onClick={() => setPayOpt(2)}
                                            style={{
                                                color: "rgb(252, 39, 121)",
                                            }}
                                        >
                                            Google Pay
                                        </span>{" "}
                                        /{" "}
                                        <span
                                            onClick={() => setPayOpt(5)}
                                            style={{
                                                color: "rgb(252, 39, 121)",
                                            }}
                                        >
                                            Cash On Delivery
                                        </span>
                                        <br />
                                        <br />
                                        For Checkout
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="display">
                            <div className="head">
                                <p style={{ color: "orange" }}>
                                    {cartProducts.length} Items in your Bag
                                </p>
                                <button
                                    onClick={() => setEdit(!edit)}
                                    style={{
                                        color: "rgb(252, 39, 121)",
                                        border: "none",
                                        backgroundColor: "white",
                                        fontWeight: "600",
                                        marginTop: "5%",
                                        marginBottom: "6%",
                                    }}
                                >
                                    EDIT{" "}
                                </button>
                            </div>

                            {edit && (
                                <div className="card">
                                    <Cart />
                                </div>
                            )}
                            <div className="foot">
                                <p>
                                    <span>Sub Total</span>
                                    <span>₹{off_price}</span>
                                </p>
                                <p>
                                    <span>Shipping Charge</span>
                                    <span style={{ color: "rgb(77,182,172)" }}>
                                        🛈 Free
                                    </span>
                                </p>
                                <p style={{ color: "rgb(77,182,172)" }}>
                                    <span>Bag Discount</span>
                                    <span>-₹0</span>
                                </p>
                                <h3>
                                    <span>Grand Total</span>
                                    <span>₹{off_price}</span>
                                </h3>
                            </div>
                            <div
                                style={{
                                    backgroundColor: "rgb(243,243,243)",
                                    padding: "0 5% 5%",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h4>SHIPPING ADDRESS</h4>
                                    <button
                                        style={{
                                            border: "none",
                                            backgroungColor: "white",
                                            color: "rgb(252, 39, 121)",
                                        }}
                                        onClick={() => setPage(1)}
                                    >
                                        CHANGE
                                    </button>
                                </div>
                                <p>{address.name}</p>
                                <p>
                                    {address.address} - {address.pincode}, " "
                                    {address.country}
                                </p>
                                <p>+91 - {address.number}</p>
                            </div>
                        </div>
                        <div className="payment500">
                            <div
                                style={{
                                    backgroundColor: "rgb(243,243,243)",
                                    padding: "0 5%",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h4>SHIPPING ADDRESS</h4>
                                    <button
                                        style={{
                                            border: "none",
                                            backgroungColor: "white",
                                            color: "rgb(252, 39, 121)",
                                        }}
                                        onClick={() => setPage(1)}
                                    >
                                        CHANGE
                                    </button>
                                </div>
                                <p>{address.name}</p>
                                <p>
                                    {address.address} - {address.pincode}
                                    <br />
                                    {address.country}
                                </p>
                                <p>+91 - {address.number}</p>
                            </div>
                            <Collapisble name="Google Pay" className="col">
                                <div style={{ margin: "4% 0" }}>
                                    <p
                                        style={{
                                            padding: "0 5%",
                                            fontSize: "12px",
                                            opacity: "60%",
                                        }}
                                    >
                                        Enter Mobile Number/ Google Pay UPI ID
                                    </p>
                                    <input
                                        type="text"
                                        placeholder={address.number}
                                    />
                                </div>
                                <button
                                    style={{
                                        width: "90%",
                                        margin: "0 5%",
                                        height: "3rem",
                                        color: "white",
                                        backgroundColor: "rgb(252, 39, 121)",
                                        fontWeight: "600",
                                        marginBottom: "6%",
                                        borderRadius: "5px",
                                    }}
                                    onClick={checkOutItem}
                                >
                                    Pay ₹{off_price} Now
                                </button>
                            </Collapisble>
                            <Collapisble name="UPI" className="col">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="VPA/UPI ID (eg. 9876543210@upi)"
                                    />
                                </div>
                                <button
                                    style={{
                                        width: "90%",
                                        margin: "0 5%",
                                        height: "3rem",
                                        color: "white",
                                        backgroundColor: "rgb(252, 39, 121)",
                                        fontWeight: "600",
                                        marginBottom: "5%",
                                        borderRadius: "5px",
                                    }}
                                    onClick={checkOutItem}
                                >
                                    Pay ₹{off_price} Now
                                </button>
                            </Collapisble>
                            <Collapisble
                                name="Credit/Debit Card"
                                className="col"
                            >
                                <input type="text" placeholder="Card Number" />
                                <div style={{ display: "flex", gap: "2%" }}>
                                    <input
                                        type="text"
                                        placeholder="Expiry (MM/YY)"
                                    />
                                    <input type="text" placeholder="CVV" />
                                </div>
                                <button
                                    style={{
                                        width: "90%",
                                        margin: "0 5%",
                                        height: "3rem",
                                        color: "white",
                                        backgroundColor: "rgb(252, 39, 121)",
                                        fontWeight: "600",
                                        marginTop: "5%",
                                        marginBottom: "6%",
                                        fontSize: "17px",
                                        borderRadius: "5px",
                                    }}
                                    onClick={checkOutItem}
                                >
                                    Pay ₹{off_price} Now
                                </button>
                            </Collapisble>
                            <Collapisble
                                name="Cash On Delivery"
                                className="col"
                            >
                                <button
                                    style={{
                                        width: "90%",
                                        margin: "0 5%",
                                        height: "3rem",
                                        color: "white",
                                        backgroundColor: "rgb(252, 39, 121)",
                                        fontWeight: "600",
                                        marginTop: "5%",
                                        marginBottom: "6%",
                                        fontSize: "17px",
                                        borderRadius: "5px",
                                    }}
                                    onClick={checkOutItem}
                                >
                                    Pay ₹{off_price} by Cash
                                </button>
                            </Collapisble>
                        </div>
                    </Div>
                )}
            </div>

            {/* Footer*/}
            <div>
                <img
                    style={{ width: "94%", marginLeft: "3%", marginTop: "1%" }}
                    src={foot}
                    alt="footer"
                />
            </div>
        </div>
    );
};
