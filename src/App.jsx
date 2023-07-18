import { createBrowserRouter, RouterProvider } from "react-router-dom";

// All the pages will be in the AppLayout
import AppLayout from "./ui/pages/AppLayout";

// get the loader function that will fetch the menu from the api
import { loader as menuLoader } from "./features/menu/Menu";
// get the loader function that will fetch the order from the api
import { loader } from "./features/order/Order";

// get the action that action function from the CreateOrder page
import { action as createOrderAction } from "./features/order/CreateOrder";

// get all the pages
import Home from "./ui/pages/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import Error from "./ui/Error";

// create the router using createBrowserRouter and make the AppLayout the parent of all the pages
const Router = createBrowserRouter([
  {
    name: "App",
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { name: "Home", path: "/", element: <Home /> },
      {
        name: "Menu",
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { name: "Cart", path: "/cart", element: <Cart /> },
      {
        name: "CreateOrder",
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        name: "Order",
        path: "/order/:orderId",
        element: <Order />,
        loader: loader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
