import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { publicRoutes, volunteerRoutes } from "./routes/routes";
import Cookies from "universal-cookie";

import Home from "./pages/Home";
import Login from "./pages/public/Login";
import NotFound from "./pages/public/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
// /volunteer
import Info from "./pages/volunteer/Info";
import { ToastContainer } from "react-toastify";
// Component mapping
const componentMap = {
  Home,
  Login,
  NotFound,
  Info,
};

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const cookies = new Cookies();
  const volunteer = cookies.get("volunteer", { path: "/" });
  if (!volunteer) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // if (requiredRole && volunteer.role !== requiredRole) {
  //   // Redirect to home if not authorized
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

const AppRouter = () => {
  const renderPublicRoute = (route) => {
    const Component = componentMap[route.element];
    if (!Component) {
      console.error(`Component ${route.element} not found`);
      return null;
    }

    return <Route key={route.path} path={route.path} element={<Component />} />;
  };

  const renderVolunteerRoute = (route) => {
    const Component = componentMap[route.element];
    if (!Component) {
      console.error(`Component ${route.element} not found`);
      return null;
    }
    // For volunteer login and register, render without protection
    if (route.path === "/login") {
      return (
        <Route key={route.path} path={route.path} element={<Component />} />
      );
    }

    // For other Volunteer routes, add protection
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <ProtectedRoute requiredRole="volunteer">
            <Component />
          </ProtectedRoute>
        }
      />
    );
  };

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ToastContainer />
      <Header />
      <Routes>
        {/* Public routes with header and footer */}
        <Route
          element={
            <main>
              <Outlet />
            </main>
          }
        >
          {publicRoutes.map(renderPublicRoute)}
        </Route>

        {/* Volunteer routes */}
        {volunteerRoutes.map(renderVolunteerRoute)}

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
