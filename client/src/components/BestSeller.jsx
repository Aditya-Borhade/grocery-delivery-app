import React from 'react'
import ProductCard from './ProductCard'

const BestSeller = () => {
  return (
    <div className='mt-16'>
        <p class="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div>
          <ProductCard/>
      </div>
    </div>
  )
}

export default BestSeller
