import React from 'react'

const ProductSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-between mt-5 animate-pulse">
    <div className="relative h-48 bg-gray-300 rounded-md"></div> {/* Image placeholder */}
    <div className="flex-grow mt-4">
      <div className="h-6 bg-gray-300 rounded-md mb-2"></div> {/* Title placeholder */}
      <div className="h-6 bg-gray-300 rounded-md w-1/2 mb-2"></div> {/* Price placeholder */}
    </div>
    <div className="h-10 bg-gray-300 rounded-md"></div> {/* Button placeholder */}
  </div>
  )
}

export default ProductSkeleton
