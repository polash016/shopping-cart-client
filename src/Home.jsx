import { useEffect } from "react";
import { useState } from "react"
import ProductCard from "./ProductCard";


const Home = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://shopping-cart-server-gamma.vercel.app/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])
    return (
        <div>
      <h1 className='text-center text-3xl'>Shop Here</h1>

    <div className="grid grid-cols-3 gap-4">
    {
      products.map(product => <ProductCard
      key={product._id}
      product={product}
      ></ProductCard>)
    }
    </div>
    </div>
    );
};

export default Home;