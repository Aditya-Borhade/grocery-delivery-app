import React from 'react'
import ProductCard from './ProductCard'

import { useAppContext } from '../context/AppContext';
import Navbar from './Navbar';

const BestSeller = () => {
  const {product} = useAppContext();
  return (
    <div className='mt-16'>
        <p class="text-2xl md:text-3xl font-medium">Best Sellers</p>
      
    </div>
  )
}

export default BestSeller
