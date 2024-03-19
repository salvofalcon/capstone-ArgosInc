import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Assistant from "./pages/AssistantPage/Assistant.tsx";
import { NotFound } from "./pages/NotFoundPage/NotFound.tsx";
import { Login } from "./pages/LoginPage/Login.tsx";
import { SignUp } from "./pages/SignUpPage/SignUp.tsx";
import { UserHome } from "./pages/UserHomePage/UserHome.tsx";
import { ForgotPasswordPage } from "./pages/ForgotPassword/ForgotPasswordPage.tsx";
import { FoodLookup } from "./pages/FoodLookupPage/FoodLookup.tsx";
import CalorieGoalCalculator from "./pages/CalorieGoal/CalorieGoalCalculator.tsx";
import BMRCalculator from "./pages/CalorieGoal/CalorieGoalCalculator.tsx";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const isLoggedIn = window.localStorage.getItem("loggedIn");

const router = createBrowserRouter([
  {
    path: "/",
    element: isLoggedIn == "true" ? <UserHome /> : <LandingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/assistant",
    element: isLoggedIn == "true" ? <Assistant /> : <Navigate to="/login" />,
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
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/foodLookup",
    element: isLoggedIn == "true" ? <FoodLookup /> : <Navigate to="/login" />,
  },
  {
    path: "/bmr-calculator",
    element: <BMRCalculator />,
  },

]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MantineProvider>
);
