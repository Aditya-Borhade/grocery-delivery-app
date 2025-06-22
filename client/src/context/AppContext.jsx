

  
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast  from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserlogin, setShowUserlogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const addToCart = (id) => {
    const data = { ...cartItems };
    data[id] = (data[id] || 0) + 1;
    setCartItems(data);
    toast.success("Added to cart");
  };

  const updateCartItem = (id, qty) => {
    const data = { ...cartItems, [id]: qty };
    setCartItems(data);
    toast.success("Cart updated");
  };

  const removeFromCart = (id) => {
    const data = { ...cartItems };
    if (data[id] > 1) data[id]--;
    else delete data[id];
    setCartItems(data);
    toast.success("Removed from cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getCartAmount = () =>
    Math.floor(
      Object.entries(cartItems).reduce((sum, [id, qty]) => {
        const p = products.find((x) => x._id === id);
        return p ? sum + p.offerPrice * qty : sum;
      }, 0) * 100
    ) / 100;

  return (
    <AppContext.Provider
      value={{
        navigate,
        products,
        currency,
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        getCartCount,
        getCartAmount,
        showUserlogin,
        setShowUserlogin,
        user,
        setUser,
        isSeller,
        setIsSeller,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
      