import { createContext ,useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";


export const AppContext=createContext()

export const AppContextProvoder=({children})=>{
    
    const currency=import.meta.VITE_CURRENCY;
    const navigate=useNavigate();
    const [user, setUser]= useState(null);
    const [isSeller,setIsSeller]= useState(false);
    const [showUserlogin,setShowUserlogin]=useState(false);
    const [product,setProduct]=useState([]);

    const fetchProduct=async()=>{
        setProduct(dummyProducts);
    }
    useEffect(()=>{
        fetchProduct()
    },[]);

    const value={navigate,user, setUser,setIsSeller,isSeller,showUserlogin,setShowUserlogin,product,currency};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext=()=>{
   return useContext(AppContext)
}