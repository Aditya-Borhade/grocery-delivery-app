import { useEffect, useState } from 'react';
import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const inputField = (type, name, placeholder, handleChange, address) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {

 const {axios, user, navigate} = useAppContext();

  const [address, setAddress] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    address1: '',
    address2: '',
    postalcode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async(e) => {
       e.preventDefault();
    try{
         const {data} = await axios.post('/api/address/add',{address});

         if(data.success){
             toast.success(data.message);
             navigate('/cart');
         }else{
             toast.error(data.message);
         }
    }catch(error){
            toast.error(error.message);
    }
    
  };


  useEffect(()=>{
      if(!user){
        navigate('/cart');
      }
  },[]);

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

            <div className='grid grid-cols-2 gap-4'>
              {inputField('text', 'firstname', 'First Name', handleChange, address)}
              {inputField('text', 'lastname', 'Last Name', handleChange, address)}
            </div>

            {inputField('email', 'email', 'Email Address', handleChange, address)}
            {inputField('text', 'street', 'Street', handleChange, address)}

            <div className='grid grid-cols-2 gap-4'>
              {inputField('text', 'city', 'City', handleChange, address)}
              {inputField('text', 'state', 'State', handleChange, address)}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {inputField('number', 'zipcode', 'Zip Code', handleChange, address)}
              {inputField('text', 'country', 'Country', handleChange, address)}
            </div>

            {inputField('text', 'phone', 'Phone', handleChange, address)}

            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
              Save Address
            </button>

          </form>
        </div>

        <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
      </div>
    </div>
  );
};

export default AddAddress;

