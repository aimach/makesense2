import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import "./index.scss";
import LoginPage from "./pages/LoginPage.tsx";
import Home from "./pages/Home/Home.tsx";
import DecisionCreate from "./pages/DecisionCreate/DecisionCreate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "decisions/",
        children: [
          {
            path: "create",
            element: <DecisionCreate />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
