// import { useState } from 'react'
// import React from 'react'
// import { assets } from '../assets/assets'

// const inputField = (type,name, placeholder , handleChange,address)=>(
//     <input  className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
//     type={type} 
//     placeholder={placeholder}
//     name={name}
//     onChange={handleChange}
//     value={address[name]}
//     required
// />
// )
// const AddAddress = () => {
  
//   const [address, setAddress] = useState({
//     firstname:'',
//     lastname:'',
//     email:'',
//     street:'',
//     city:'',
//     state:'',
//     zipcode:'',
//     country:'',
//     phone:'',
//     address1:'',
//     address2:'',
//     postalcode:'',
//   })

//   const handleChange=(e)=>{
//     const {name, value} = e.target;

//     setAddress(()=>({
//       ...AddAddress,
//       [name]:value
//     }))
//   }



//   const onSubmitHandler=(e)=>{
//     e.preventDefault();
//   }
//   return (
//     <div className='mt-16 pb-16'>
//          <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping
//             <span className='font-semibold text-primary'>Address</span></p>

//         <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
//              <div className='flex-1 max-w-md'>
//                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

//                   <div className='grid grid-cols-2 gap-4'>
//                     <inputField handleChange={handleChange} address={address} name='firsttname' type='text' placeholder='first name' />
//                     <inputField handleChange={handleChange} address={address} name='lasttname' type='text' placeholder='Last name' />
//                   </div>

//                      <inputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Email Address' />
//                      <inputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street' />

//                    <div className='grid grid-cols-2 gap-4 '>
//                      <inputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City' />
//                      <inputField handleChange={handleChange} address={address} name='State' type='text' placeholder='State' />
//                     </div>  

//                     <div className='grid grid-cols-2 gap-4 '>
//                      <inputField handleChange={handleChange} address={address} name='zipcode' type='number' placeholder='Zip Code' />
//                      <inputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country' />
//                     </div>  

//                     <inputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Phone' />

//                     <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
//                          Save Address
//                     </button>
                     
                  
//                </form>
//              </div>
//              <img  className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
//         </div>    
//     </div>
//   )
// }

// export default AddAddress



import { useState } from 'react';
import React from 'react';
import { assets } from '../assets/assets';

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Handle submission here (e.g., send data to API)
    console.log(address);
  };

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

