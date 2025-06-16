import { createContext ,useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast  from 'react-hot-toast'

export const AppContext=createContext()

export const AppContextProvider=({children})=>{
    
    const currency=import.meta.VITE_CURRENCY;
    const navigate=useNavigate();
    const [user, setUser]= useState(null);
    const [isSeller,setIsSeller]= useState(false);
    const [showUserlogin,setShowUserlogin]=useState(false);
    const [products,setProducts]=useState([]);

    const [cartItems,setCartItems]=useState({});
    const [searchQuery , setSearchQuery] =useState({});
 
    // to fetch all product from backend
    const fetchProduct=async()=>{
        setProducts(dummyProducts);
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
    const updateCardItem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData);
        toast.success("cart updated");
    }

    // remove cart items
    const removeFromCart=(itemId)=>{
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

    //to get cart items count 
     const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
        return totalCount;
     }

     // to get cart total amount 
     const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let iteminfo=products.find((product)=>products._id === items);
            if(cartItems[items] > 0){
                totalAmount+=iteminfo.offerPrice*cartItems[items];
            }
        }    
        return Math.floor(totalAmount*100)/100;
     }
     


    useEffect(() => {
         fetchProduct();
          //console.log("Loaded products:", dummyProducts); // 👈 Add this
    }, []);


    const value={navigate,user, setUser,setIsSeller,isSeller,showUserlogin,setShowUserlogin,products,currency,updateCardItem, 
        removeFromCart,addToCart,cartItems,setCartItems,setProducts,searchQuery , setSearchQuery, getCartCount, getCartAmount};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext=()=>{
   return useContext(AppContext)
}