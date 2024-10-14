import React from 'react'

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh]">
    <img
      src="/images/emptyCart.png" // Add the path to your empty cart image
      alt="Empty Cart"
      className="w-64 h-64 object-contain" // Adjust width and height as needed
    />
    <p className="text-3xl font-semibold mt-4">Your cart is empty.</p>
    <p className="text-3xl text-gray-500 mt-2">Add something to make me happy 😊</p>
  </div>     
  )
}

export default EmptyCart
