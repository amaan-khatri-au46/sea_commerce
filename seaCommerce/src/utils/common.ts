import { Product } from "@/@types/product";

export const parseJwt = (token: string): { exp?: number } | null => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  export const calculateTotalPrice = (cartItems:any) => {
    return cartItems?.reduce((total: any, item: any) => total + item.price * item.count, 0).toFixed(2);
  };