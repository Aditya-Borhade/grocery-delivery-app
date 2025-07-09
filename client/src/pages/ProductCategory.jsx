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

  const filteredProducts = products.filter(product => 
    product.category && 
    typeof product.category === 'string' && 
    product.category.toLowerCase() === normalizedCategory
  );

  return (
    <div className="mt-16 px-4 sm:px-6 md:px-8 lg:px-12">
      {searchCategory ? (
        <div className='flex flex-col items-end w-max mx-auto sm:mx-0'>
          <p className='text-2xl sm:text-3xl md:text-4xl font-semibold'>{searchCategory.text.toUpperCase()}</p>
          <div className='w-20 h-1 bg-primary rounded-full mt-1'></div>
        </div>
      ) : (
        <div className='flex flex-col items-end w-max mx-auto sm:mx-0'>
          <p className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
            {normalizedCategory 
              ? normalizedCategory.replace(/-/g, ' ').toUpperCase() 
              : 'CATEGORY'
            }
          </p>
          <div className='w-20 h-1 bg-primary rounded-full mt-1'></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 mt-6'>
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-48'>
          <p className='text-xl sm:text-2xl font-medium text-primary'>No products in this category</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
