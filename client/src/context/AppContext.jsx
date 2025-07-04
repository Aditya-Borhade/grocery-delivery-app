

  
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast  from 'react-hot-toast';
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

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

  // fetch seller status

    const fetchSeller = async () =>{
        try{
            const {data} = await axios.get('/api/seller/is-auth');
            if(data.success){
              setIsSeller(true);
            }else{
              setIsSeller(false);
            }
        }catch(error){
                setIsSeller(false);
        }
    }
    
    // fetch user auth status 
     const fetchUser = async()=>{
        try{
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
              setUser(data.user);
              setCartItems(data.user.cartItems);
            }
        }catch(error){
                    setUser(null);
        }
     }


    // fetch all products
    const fetchProducts = async () => {
  try {
    const { data } = await axios.get("/api/product/list");
    console.log("📦 API Response:", data);

    if (data.success) {
      setProducts(data.products);
      console.log("✅ Products set in context:", data.products);
    } else {
      console.error("❌ API success false:", data.message);
    }

  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
  }
};

      



  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
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
        axios,
        fetchProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
      