import "../App.css"

const Product = ({title, price, description, category, addToCart}) => {
    return (<div className="product">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <p>{category}</p>
        <button onClick={addToCart}>Add to cart</button>
    </div>)
}

export default Product;
//id comes from API