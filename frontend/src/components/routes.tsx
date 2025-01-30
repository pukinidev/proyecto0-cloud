import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { ProtectedRoute } from "./protected-route";
import Login from "@/pages/auth/Login";
import { Home } from "@/pages/home/home";
import SignUp from "@/pages/auth/SignUp";
import NotFound from "./not-found";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, 
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ];


  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    }
  ];

  const commonRoutes = [
    {
      path: "*",
      element: <NotFound />, // Catch-all route for non-existing pages
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ...commonRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
