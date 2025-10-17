import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/book/CartPage.jsx";
import CheckoutPage from "../pages/book/CheckoutPage.jsx";
import SingleBook from "../pages/book/SingleBook.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import OrderPage from "../pages/book/OrderPage.jsx";

const router = createBrowserRouter([ 
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,   
                element: <Home />
            },
            {
                path: "order",   // ❌ fixed (removed /)
                element: <OrderPage/>  
            },
            {
                path: "about",
                element: <div>About</div>
            },
            {
                path: "cart",   
                element: <CartPage/>
            },
            {
                path: "checkout",
                element: <PrivateRoutes> <CheckoutPage/> </PrivateRoutes> 
            },
            {
                path: "login",   
                element: <Login/>
            },
            {
                path: "register", 
                element: <Register/>
            },
            {
                path: "book/:id",
                element: <SingleBook/>  
            }
        ]
    }
]);

export default router;
