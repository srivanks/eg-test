import "./header.css";
import { AiOutlineShopping } from "react-icons/ai";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  return (
    <header className='text-gray-600 bg-gray-300 shadow z-50 w-full px-8 flex justify-between items-center'>
      <img src={logo} className='logo' alt='Shopping Cart Application' />
      <div role='button' onClick={() => navigate("cart")}>
        <div className='flex justify-center items-center'>
          <div className='relative'>
            <AiOutlineShopping size={40}></AiOutlineShopping>
            <div className='w-[10px] h-[10px] top-0 right-[-5px] absolute bg-gray-300 text-lg'>
              {cart.totalNumberOfProducts}
            </div>
          </div>
        </div>
        <Link
          to={"/cart"}
          className='flex font-semibold text-indigo-600 text-sm'
        >
          Go to cart
        </Link>
      </div>
    </header>
  );
};

export default Header;
