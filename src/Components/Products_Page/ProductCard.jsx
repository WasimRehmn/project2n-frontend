import React, { useState, useEffect } from "react";
import {
    addingToBag,
    getCartData,
    getData,
    showItem,
} from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StarRatingShow } from "./StarRatings";

import axios from "axios";
import styled from "styled-components";

const Div = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    background-color: rgb(243, 243, 243);

    & .card {
        background-color: #ffffff;
        height: fit-content;
        overflow: hidden;
    }
    & > div > div:nth-child(1) {
        padding: 0 10%;
    }

    & .card > div > div:nth-child(1) {
        text-align: left;
        color: rgb(92, 210, 133);
        font-size: 13.5px;
        padding-top: 5px;
        background-color: #ffffff;
    }

    & img {
        width: 100%;
        object-fit: cover;
    }
    & h4 {
        font-weight: 500;
        font-size: 15px;
    }

    & .rating {
        margin-top: 5px;
        margin-bottom: 5rem;
        display: flex;
        justify-content: center;
        gap: 5px;
        font-size: 13px;
        color: rgb(101, 119, 134);
    }

    & .rating > div:nth-child(2) {
        padding-top: 4px;
    }

    & .price {
        color: rgb(92, 104, 116);
        display: flex;
        justify-content: center;
        gap: 5px;
        font-size: 15px;

        @media all and (max-width: 1280px) {
            gap: px;
        }
    }

    & .price > span:nth-child(1) {
        text-decoration: line-through;
    }
    & .price > span:nth-child(2) {
        font-weight: 600;
        color: black;
    }
    & .price > span:nth-child(3) {
        margin-left: 2px;
        color: rgb(0, 137, 69);
    }

    & .btn {
        display: none;
        bottom: 0;
        height: 3rem;
    }
    & .btn > div {
        display: none;
        bottom: 0;
        height: 3rem;
    }

    & .btn > button {
        border: none;
        background-color: rgb(252, 39, 121);
        color: white;
        font-size: 17px;
        font-weight: 600;
        width: 75%;
    }

    & .btn > button:nth-child(1) {
        background-color: white;
        padding: 10px 10px 5px 10px;
        width: 25%;
    }
    & .btn > button:nth-child(1) > img {
        width: 70%;
    }

    & .title {
        height: 3rem;
    }

    & .card:hover {
        & .rating {
            margin-bottom: 2rem;
        }

        & .btn {
            display: flex;
        }
        & .btn > div {
            display: flex;
            width: 100%;
            padding: 14px;
            background-color: #f06418;
            justify-content: center;
            padding: auto 0;
            font-size: 17px;
            font-weight: 600;
            color: white;
        }
    }

    @media all and (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const ProductCard = () => {
    const [cartstatus, setCartstatus] = useState(false);
    const [cartmessage, setCartmessage] = useState("ADDED TO BAG");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
        dispatch(getCartData());
    }, []);

    const cartProducts = useSelector((state) => state.cartProducts);

    //checking current data
    let data;

    const products = useSelector((state) => state.products);
    const filter = useSelector((state) => state.filter);

    if (filter.length === 0) {
        data = products;
    } else {
        data = filter;
    }

    // opening OneItem Page
    const sendItem = (item) => {
        dispatch(showItem(item));
        navigate(`/item/${item.id}`);
    };

    // Add to cart
    const addtobag = (item) => {
        setCartstatus(true);
        for (var i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].id === item.id) {
                setCartmessage("ALREADY IN THE BAG");
                return;
            }
        }
        axios
            .post("http://localhost:3005/cartProducts", item)
            .then((res) => dispatch(addingToBag(item)));
    };

    // addtobag btn status change

    const changeState = () => {
        setCartstatus(false);
        setCartmessage("ADDED TO BAG");
    };

    return (
        <Div>
            {data.map((item) => (
                <div key={item.id} className="card" onMouseLeave={changeState}>
                    <div onClick={() => sendItem(item)}>
                        <div>BESTSELLER</div>
                        <img src={item.image1} alt="product_img" />
                        <div className="title">
                            <h4>{item.card_title}</h4>
                        </div>
                        <div className="price">
                            MRP: <span>₹{item.price}</span>{" "}
                            <span>₹{item.off_price}</span>
                            <span>{item.offer}% Off</span>
                        </div>
                        <div className="rating">
                            <StarRatingShow value={`${item.rating}`} />{" "}
                            <div>({item.ratingNum})</div>
                        </div>
                    </div>
                    {cartstatus ? (
                        <div className="btn">
                            <div
                                style={{
                                    backgroundColor: `${
                                        cartmessage === "ADDED TO BAG"
                                            ? "#f06418"
                                            : "black"
                                    }`,
                                }}
                            >
                                {cartmessage}
                            </div>
                        </div>
                    ) : (
                        <div className="btn">
                            <button>
                                <img
                                    src="https://cdn1.iconfinder.com/data/icons/valentine-s-day-21/100/heart-256.png"
                                    alt="favourite"
                                />
                            </button>
                            <button onClick={() => addtobag(item)}>
                                ADD TO BAG
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </Div>
    );
};