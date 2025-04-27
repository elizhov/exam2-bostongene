import "../App.css";
import { useEffect, useState, useRef } from "react";
import fetchData from "../api/api.js";
import Product from "./product.jsx";
import Cart from "./cart.jsx";

const Products = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const prevCart = useRef([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch {
                console.log("Error fetching data");
            }
        };

        getData();
    }, []);

    const updatePrevCart = () => {
        prevCart.current = [...cart];
    };

    const resetCart = () => {
        setCart([...prevCart.current]);
    };

    const addToCart = (product) => {
        updatePrevCart();

        setCart((prevCartState) => {
            const existingItem = prevCartState.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCartState.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCartState, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (id) => {
        updatePrevCart();

        setCart((prevCartState) =>
            prevCartState.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        updatePrevCart();

        setCart((prevCartState) =>
            prevCartState
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) //henc 0 a jnji
        );
    };

    const getTotalPrice = () => {
        return cart.reduce((curr, item) => curr + item.price * item.quantity, 0);
    };

    const removeFromCart = (id) => {
        updatePrevCart();

        setCart((prevCartState) => prevCartState.filter((item) => item.id !== id));
    };

    return (
        <div className="products-container">
            <h2 className="products-title">Data from API:</h2>
            {data && data.length > 0 ? (
                <div className="products-grid">
                    {data.map((item) => (
                        <Product
                            key={item.id}
                            {...item}
                            addToCart={() => addToCart(item)}
                        />
                    ))}
                </div>
            ) : (
                <p>No data available.</p>
            )}
            <Cart
                cartItems={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                getTotalPrice={getTotalPrice}
            />
            <button onClick={resetCart} className="reset-cart-button">Reset Cart</button>
        </div>
    );
};

export default Products;
