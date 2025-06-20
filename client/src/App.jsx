// import React from 'react'
// import Navbar from './components/Navbar'
// import Login from './components/Login'
// import Home from './pages/Home'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Footer from './components/Footer'
// import { Toaster } from 'react-hot-toast'
// import { useAppContext } from './context/AppContext'
// import AllProducts from './pages/AllProducts'
// import ProductCategory from './pages/ProductCategory'
// import ProductDetails from './pages/ProductDetails'

// const App = () => {
//    const {showUserlogin} =useAppContext()
//   const isSellerPath=useLocation().pathname.includes("seller");
//   return (
//     <div>
//       {isSellerPath ? null : <Navbar/>}

//       {showUserlogin ? <Login/> : null}
//          <Toaster/>

//       <div className= {`${isSellerPath ? '' : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/products" element={<AllProducts/>}/>
//           <Route path="/products/:category" element={<ProductCategory/>}/>
//           <Route path="/products/:category/:id" element={<ProductDetails/>}/>
//         </Routes>
//       </div>
//        { !isSellerPath && <Footer/> }
//     </div>
//   )
// }

// export default App

import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'

const App = () => {
  const { showUserlogin } = useAppContext();
  const isSellerPath = useLocation().pathname.includes("seller");
  
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      
      {showUserlogin ? <Login /> : null}
      <Toaster />
      
      <div className={`${isSellerPath ? '' : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
         
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/add-address" element={<AddAddress/>} />
          <Route path="/my-orders" element={<MyOrders/>} />
        </Routes>
      </div>
      
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App;