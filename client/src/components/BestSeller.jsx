import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();

  console.log("Products from context:", products);

  return (
    <div className='mt-16'>
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-12 lg:grid-cols-4  mt-6'>
        {products.filter((product)=>product).slice(0,4).map((product,index)=>(
               <ProductCard  key={index} product={product} />
        ))}
          
      </div>
    </div>
  )
}

export default BestSeller;

