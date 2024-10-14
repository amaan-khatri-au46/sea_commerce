import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { toast } from 'react-toastify';
import { decreaseItemCount, removeItemFromCart, setCartItem } from '@/store/product/productSlice';
import { Product } from '@/@types/product';
import EmptyCart from '@/components/EmptyCart';
import { calculateTotalPrice } from '@/utils/common';

const CartItem = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.product);

  const handleRemoveItem = (item: any) => {
    if (item && item.id) {
      dispatch(removeItemFromCart(item.id));
      toast.success(`${item.title} has been removed from the cart`);
    } else {
      toast.error('Unable to remove item from the cart');
    }
  };
  
  
  return (
    <div className="container mx-auto p-4">
        {cartItems?.length < 0 && (
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
       )}
        {cartItems?.length === 0 ? (
         <EmptyCart />
        ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems?.map((item: any) => (
              <div key={item?.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item?.thumbnail} alt={item?.title} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h2 className="text-lg font-bold">{item?.title}</h2>
                    <p className="text-gray-600">${item?.price?.toFixed(2)}</p>
                  </div>
                </div>
                {/* Buttons and Price Section */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        dispatch(decreaseItemCount(item));
                      }}
                      disabled={item.count === 1} // Disable if count is 1
                      className={`h-10 w-10 flex items-center justify-center rounded-full text-lg ${
                        item.count === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item?.count}</span>
                    <button
                      onClick={() => {
                        dispatch(setCartItem(item));
                      }}
                      className="h-10 w-10 flex items-center justify-center bg-gray-300 rounded-full text-lg hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-800 font-semibold">
                  ${(item?.price * item?.count).toFixed(2)}
                  </div>
                </div>
                {/* Remove Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="h-10 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <h3 className="text-2xl font-semibold">
              Total: <span className="text-green-600">${calculateTotalPrice(cartItems)}</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
