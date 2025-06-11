import { createContext ,useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast  from 'react-hot-toast'

export const AppContext=createContext()

export const AppContextProvoder=({children})=>{
    
    const currency=import.meta.VITE_CURRENCY;
    const navigate=useNavigate();
    const [user, setUser]= useState(null);
    const [isSeller,setIsSeller]= useState(false);
    const [showUserlogin,setShowUserlogin]=useState(false);
    const [product,setProduct]=useState([]);

    const [cartItems,setCartItems]=useState({});
 
    // to fetch all product from backend
    const fetchProduct=async()=>{
        setProduct(dummyProducts);
    }
    // to add product to cart
    const addToCart=(itemId)=>{
        let cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId]+=1;
        }else{
            cartData[itemId]=1;
        }
        setCartItems(cartData);
        toast.success("added to cart");
    }

    // update cart items
    const updateCardItems=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData);
        toast.success("cart updated");
    }

    // remove cart items
    const removeCartItems=()=>{
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
             cartData[itemId]-=1;
             if(cartData[itemId]==0){
                delete cartData[itemId];
             }
        }
        toast.success("Removed from cart");
        setCartItems(cartData)
       
    }
    useEffect(()=>{
        fetchProduct()
    },[]);

    const value={navigate,user, setUser,setIsSeller,isSeller,showUserlogin,setShowUserlogin,product,currency,updateCardItems, 
        removeCartItems,addToCart,cartItems,setCartItems,setProduct};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext=()=>{
   return useContext(AppContext)
}