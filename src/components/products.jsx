import "../App.css"
import { useEffect, useState } from "react";
import fetchData from "../api/api.js";
import Product from "./product.jsx";
import Cart from "./cart.jsx";

const Products = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

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

    // const addToCart = (product) => {
    //     setCart((prevCart) => [...prevCart, product]);
    // };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) //henc 0 a hani
        );
    };

    const getTotalPrice = () => {
        return cart.reduce((curr, item) => curr + item.price * item.quantity, 0);
    };


    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    console.log(cart);

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
        </div>
    );
}

export default Products;
