import { createBrowserRouter, useNavigate, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import EmployeeList from '../components/EmployeeList.jsx'
import TableList from "../components/TableList.jsx";
import FoodList from "../components/FoodList.jsx";
import OrderList from "../components/OrderList.jsx";
import AllOrdersList from "../components/AllOrdersList.jsx";
import Login from "../pages/Login.jsx";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute.jsx";
import ErrorePage from "../pages/ErrorePage.jsx";
import App from './../App';

const token = localStorage.getItem("token");


const routes = createBrowserRouter([
    {
        path: "/",
        element: (token ? <Navigate to="/admin" /> : <Login />),
        errorElement: <ErrorePage/>,

    },
    {
        path: "/admin",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        
        children: [
            {
                // path: "",
                index: true,
                element: <EmployeeList />,
            },
            {
                path: "table-list",
                element: <TableList />,

            },
            {
                path: "food-list",
                element: <FoodList />,

            },
            {
                path: "order-list",
                element: <OrderList />,

            }
            ,
            {
                path: "all-orders-list",
                element: <AllOrdersList />,

            }

        ]

    },
])

export default routes;