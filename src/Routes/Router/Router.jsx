import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from '../../Pages/Home/Home/Home';
import Root from '../Root/Root';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';
import PrivateRoute from '../../Sharde/PrivateRoute/PrivateRoute';
import Dashboard from '../../Dashboard/Dashboard';
import AdminHome from '../../Dashboard/AdminHome/AdminHome';
import UserHome from '../../Dashboard/UserHome/UserHome';
import BookParcel from '../../Dashboard/BookParcel/BookParcel';
import MyParcels from '../../Dashboard/MyParcels/MyParcels';
import MyProfile from '../../Dashboard/MyProfile/MyProfile';
import UpdateBooking from '../../Dashboard/MyParcels/UpdateBooking';
import AllUsers from '../../Dashboard/Admin/AllUsers/AllUsers';
import AllParcel from '../../Dashboard/AllParcel/AllParcel';
import DaliveryMans from '../../Dashboard/DaliveryMans/DaliveryMans';
import DeliveryManHome from '../../Dashboard/DeliveryMan/DeliveryManHome/DeliveryManHome';
import DeliveryList from '../../Dashboard/DeliveryMan/DeliveryList/DeliveryList';
import Reviews from '../../Dashboard/DeliveryMan/Reviews/Reviews';
import AdminRoute from '../../Sharde/AdminRoute/AdminRoute';

const Router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'bookParcel',
          element: <BookParcel></BookParcel>
        },
        {
          path: 'myParcel',
          element: <MyParcels></MyParcels>
        },
        {
          path: 'parcelupdate/:id',
          element: <UpdateBooking></UpdateBooking>,
          loader: ({params})=> fetch(`https://percel-management-web-server.vercel.app/parcelBooks/update/${params.id}`)

        },
        {
          path: 'myProfile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute> 
        },
        {
          path: 'allusers',
          element:  <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: 'deliverymans',
          element: <AdminRoute><DaliveryMans></DaliveryMans></AdminRoute>,
        },
        {
          path: 'allparcel',
          element: <AdminRoute><AllParcel></AllParcel></AdminRoute>
        },
        {
          path: 'deliveryManHome',
          element: <DeliveryManHome></DeliveryManHome>
        },
        {
          path: 'deliveryList',
          element: <DeliveryList></DeliveryList>
        },
        {
          path: 'reviews',
          element: <Reviews></Reviews>
        },
      ]
    }
  ]);

export default Router;