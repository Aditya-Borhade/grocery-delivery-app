


import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const normalizedCategory = category?.toLowerCase();

  if (!products) {
    return <p className='text-center mt-20'>Loading...</p>;
  }

  const searchCategory = categories.find(
    item => item.path.toLowerCase() === normalizedCategory
  );

  // Debugging: Log values to console
  console.log("Category from URL:", normalizedCategory);
  console.log("Matching category object:", searchCategory);
  console.log("All categories:", categories);

  const filteredProducts = products.filter(product => 
    product.path && 
    typeof product.path === 'string' && 
    product.path.toLowerCase() === normalizedCategory
  );

  return (
    

    <div className='mt-16'>
    
      {searchCategory ? (
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      ) : (
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>
            {normalizedCategory 
              ? normalizedCategory.replace(/-/g, ' ').toUpperCase() 
              : 'CATEGORY'
            }
          </p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-48'>
          <p className='text-2xl font-medium text-primary'>No products in this category</p>
        </div>
      )}
    </div>
    
  );
};

export default ProductCategory;