import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Listings from "./pages/listings/Listings";
import Listing from "./pages/listing/Listing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyListings from "./pages/myListings/MyListings";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Success from "./pages/success/Success";
import MyProfile from "./pages/myProfile/MyProfile";
function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/listings",
          element: <Listings />,
        },
        {
          path: "/myListings",
          element: <MyListings />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/listing/:id",
          element: <Listing />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/success",
          element: <Success />,
        },
        {path:"/myprofile",element: <MyProfile/>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;