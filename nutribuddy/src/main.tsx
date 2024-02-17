import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/HomePage/App.tsx";
import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Assistant from "./pages/AssistantPage/Assistant.tsx";
import { NotFound } from "./pages/NotFoundPage/NotFound.tsx";
import { Login } from "./pages/LoginPage/Login.tsx";
import { SignUp } from "./pages/SignUpPage/SignUp.tsx";
import { UserHome } from "./pages/UserHomePage/UserHome.tsx";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/assistant",
    element: <Assistant />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/userhome",
    element: <UserHome />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MantineProvider>
);
