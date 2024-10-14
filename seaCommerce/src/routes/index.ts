import SignIn from "@/views/Auth/SignIn";
import CartItem from "@/views/CartItem";
import ProductList from "@/views/ProductList";

// Define routes
const authProtectedRoutes = [
  { path: "/", component: ProductList },
  { path: "/cart", component: CartItem },
];

const publicRoutes = [
  { path: "/sigin-in", component: SignIn },
];

export { authProtectedRoutes, publicRoutes };
