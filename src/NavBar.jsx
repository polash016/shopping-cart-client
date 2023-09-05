import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  DialogHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  Badge,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import  { AuthContext } from "./AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
 


const NavBar = () => {
  const [carts, setCarts] = useState([])
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const {user, logOut} = useContext(AuthContext)
 
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    fetch(`https://shopping-cart-server-gamma.vercel.app/cart/${user?.email}`)
    .then(res => res.json())
    .then(data => setCarts(data))
  }, [user?.email, carts])

  const totalPrizeProduct = carts.reduce((prevPrice, cart) => prevPrice+cart.price , 0)
  const totalPrize = totalPrizeProduct.toFixed(2);
  const handleLogOut = () => {
    logOut()
    .then()
    .catch(err => console.log(err))
  }

  const handleDelete = id => {
    fetch(`https://shopping-cart-server-gamma.vercel.app/cart/${id}`, {
      method: 'DELETE',
    })
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const TABLE_HEAD = ["Name", "Price", "Delete"];

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
         <Badge content={carts? carts.length : ''} withBorder>
         <Button className="text-xl" onClick={handleOpen} variant="gradient">
        <FaShoppingCart></FaShoppingCart>
      </Button>
         </Badge>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Cart</DialogHeader>
        <DialogBody divider>
        <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        {
            carts.map(cart => <tbody key={cart._id}>
              <tr className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {cart.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {cart.price}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    <button onClick={()=>handleDelete(cart._id)}><FaTrash></FaTrash></button>
                  </Typography>
                </td>
              </tr>
          </tbody>)
          }
      </table>
         
        </DialogBody>
        <h1 className="text-center">Total Price: {totalPrize}</h1>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>

      </Typography>
    </ul>
  );
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">{navList}</div>
           {
            user ? <Button onClick={handleLogOut}>Logout</Button> :
            <Link to='/login'>
           <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Login</span>
            </Button>
           </Link>
           }
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Buy Now</span>
              </Button>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
