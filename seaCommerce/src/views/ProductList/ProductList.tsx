import { useAppDispatch, useAppSelector } from '@/store';
import { getProductList, setCartItem } from '@/store/product/productSlice';
import React, { useEffect, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import ProductSkeleton from '@/components/ProductSkeleton';
import { Product } from '@/@types/product';
import { toast } from 'react-toastify';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { productList, loading } = useAppSelector((state) => state.product);

  // Memoized value to determine whether to call the API
  const shouldFetchProducts = useMemo(() => productList?.length === 0, [productList]);

  useEffect(() => {
    if (shouldFetchProducts) {
      dispatch(getProductList());
    }
  }, [dispatch, shouldFetchProducts]);


  const handleAddToCart = async (product: Product) => {
    if (product) {
        await dispatch(setCartItem(product));  // Dispatch the product to cart
        toast.success(`${product.title} has been added to your cart!`);
    } else {
        toast.error('Failed to add the product to your cart.');
    }
};

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)?.fill(0)?.map((_, index) => (
            <ProductSkeleton key={index}/>
          ))}
        </div>
      ) : productList && productList?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList?.map((product: any) => (
            <Card key={product?.id} className="w-full flex flex-col justify-between mt-5">
              <CardHeader color="blue-gray" className="relative h-48">
                <img
                  src={product?.thumbnail || "https://via.placeholder.com/150"}
                  alt={product?.title}
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className="flex-grow">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {product?.title}
                </Typography>
                <Typography className="text-blue-500 font-semibold mb-2">
                  ${product?.price}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  onClick={() => handleAddToCart(product)}
                  className="shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Add To Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Typography
            variant="h6"
            color="red"
            className="text-center"
          >
            No Products Available
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProductList;
