import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import "./index.scss";
import Home from "./pages/Home/Home.tsx";
import DecisionCreate from "./pages/DecisionCreate/DecisionCreate.tsx";
import LoginPage from "./pages/ConnexionPage/LoginPage.tsx";
import RegisterPage from "./pages/ConnexionPage/RegisterPage.tsx";
import { DecisionType } from "./utils/types.ts";
import axios from "axios";
import DecisionPage from "./pages/DecisionPage/DecisionPage.tsx";
import DecisionResult from "./pages/DecisionResult.tsx/DecisionResult.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: (): Promise<DecisionType[] | void> => {
          return axios
            .get<DecisionType[]>(
              `${import.meta.env.VITE_BACKEND_URL as string}/decisions`
            )
            .then((res) => res.data)
            .catch((err) => console.error(err));
        },
      },
      {
        path: "decisions/",
        children: [
          {
            path: "create",
            element: <DecisionCreate />,
          },
          {
            path: "search",
            element: <DecisionResult />,
          },
          {
            path: ":decisionId",
            element: <DecisionPage />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
