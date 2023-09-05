/* eslint-disable react/prop-types */
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import  { useContext } from 'react';
import { AuthContext } from "./AuthProvider";
  
// eslint-disable-next-line react/prop-types
const ProductCard = ({product}) => {
    const {_id, name, image, price} = product;
    const {user} = useContext(AuthContext)

    const handleAddToCart = () => {
      const cartProduct = { name, price, email: user?.email}
      console.log(cartProduct)
      fetch(`https://shopping-cart-server-gamma.vercel.app/cart`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
      },
        body: JSON.stringify(cartProduct)
      })
    }
    return (
        <Card className="w-96">
      <CardHeader floated={false} className="h-full">
        <img src={image} />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          Price: {price}
        </Typography>
        <Typography className="my-4">
          
        <Button onClick={handleAddToCart}>Buy</Button>
        </Typography>
      </CardBody>
    </Card>
    );
};

export default ProductCard;