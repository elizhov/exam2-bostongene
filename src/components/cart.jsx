import "../App.css";

const Cart = ({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotalPrice }) => {
    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <p>{item.title} - ${item.price} x {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove item</button>
                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                            <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        </li>
                    ))}
                    <p>Total price: ${getTotalPrice()}</p>
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
