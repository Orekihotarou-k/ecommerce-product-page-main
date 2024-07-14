import data from "../data.json"
import { useState } from "react";

const Navigation = () => {
  // State to manage the menu's open or close state
  const [isOpen, setIsOpen] = useState(false)

  // State to toggle the cart
  const [cartIsOpen, setCartIsOpen] = useState(true)

  // set state to keep track of the item added
  const [isAdded, setIsAdded] = useState(false)

  // state to keep track of card items
  const [cartItems, setCartItems] = useState([]);

    // Function to handle adding items to the cart
    const handleAddToCart = (product) => {
      setCartItems((prevItems) => {
        const itemIndex = prevItems.findIndex((item) => item.id === product.id);
        if (itemIndex >= 0) {
          // Item already in cart, update quantity
          const updatedItems = [...prevItems];
          updatedItems[itemIndex].quantity += product.quantity;
          return updatedItems;
        } else {
          // Add new item to cart
          return [...prevItems, product];
        }
      });
    };

    // Function to remove item from the cart
    const removeItemFromCart = (productId) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };
  
  // function to handle changes in the cart
  const handleCart = (  ) => {
    setIsAdded(!isAdded)
  } 

  // Function to toggle the cart
  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen)
  }

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex justify-between items-center p-6 font-bold relative border-b-2 lg:px-0 lg:mb-20">
      <div className="flex items-center gap-4">
        {/* Menu Toggle Button */}
        <div>
          <button
            aria-label="toggle menu"
            onClick={toggleMenu}
            className="md:hidden"
          >
            <img
              src="/images/icon-menu.svg"
              alt="toggle menu"
              width={18}
              height={18}
              className="mt-2"
            />
          </button>
        </div>

        <div className="md:flex md:items-center gap-16">
            <div>
              <a href="#">
                <img src="/images/logo.svg" alt="logo" width={140} />
              </a>
            </div>
            {/* Sliding Menu */}
            <div
              className={`${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } bg-white min-h-screen md:min-h-fit absolute md:relative top-0 left-0 w-2/3 p-[1.75rem] md:p-0 transition-transform duration-300 ease-in-out shadow-2xl z-10 md:-translate-x-0 md:shadow-none md:bg-transparent`}
            >
              <button aria-label="toggle menu off" onClick={toggleMenu}>
                <img
                    src="/images/icon-close.svg"
                    alt="close menu"
                    className="md:hidden"/>
              </button>
              <ul className="mt-14 md:mt-0 md:mb-6 grid gap-4 text-xl md:text-sm md:gap-6 md:flex md:items-center md:font-medium">
                <li>
                  <a href="#" aria-label="Collections" className="hover:font-bold">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Men" className="hover:font-bold">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Women" className="hover:font-bold">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="About" className="hover:font-bold">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Contact" className="hover:font-bold">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-12 relative">

        {/* Cart Toggle Button */}
        <div>
          <button aria-label="toggle cart">
            <img
              src="/images/icon-cart.svg"
              alt="toggle cart"
              width={23}
              height={23}
              className="mt-1"
              onClick={toggleCart}
            />
          </button>
        </div>

        {/* Cart Content */}
        <div className={`${ cartIsOpen ? "translate-x-[40rem]" : "-translate-x-0"} transition-transform duration-300 ease-in-out absolute top-20 lg:right-6 w-[20rem] min-h-[15rem] bg-white rounded-lg shadow-2xl z-10`}>
              <h2 className="p-6 border-b-2">Cart</h2>
              
              {cartItems.length === 0 ? (
            <div className="grid place-items-center pt-10">
              <p className="text-dark-grayish-blue">Your cart is empty</p>
            </div>
          ) : (
            <div className="p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <img src={item.imgURL} alt={item.alt} className="w-12 h-12 rounded-lg" />
                  <div className="flex flex-col">
                    <span className="text-dark-grayish-blue">{item.name}</span>
                    <span className="text-dark-grayish-blue">
                      ${item.price.toFixed(2)} x {item.quantity}{" "}
                      <span className="font-bold text-very-dark-blue">${(item.price * item.quantity).toFixed(2)}</span>
                    </span>
                  </div>
                  <button aria-label="remove item from cart" onClick={() => removeItemFromCart(item.id)}>
                    <img src="/images/icon-delete.svg" alt="Remove" />
                  </button>
                </div>
              ))}
              <button className="bg-orange text-white font-bold w-full py-3 rounded-lg">Checkout</button>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div>
          <a href="#">
            <img
              src="/images/image-avatar.png"
              alt="user avatar"
              width={30}
              className="rounded-full md:w-12 hover:border-2 border-orange"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
