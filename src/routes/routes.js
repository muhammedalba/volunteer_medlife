// Public Routes
export const publicRoutes = [
  {
    path: "/",
    element: "Home",
    isPublic: true,
  },
  {
    path: "/login",
    element: "Login",
    isPublic: true,
  },
  {
    path: "*",
    element: "NotFound",
    isPublic: true,
  },
];

// volunteer Routes
export const volunteerRoutes = [
  {
    path: "/volunteer/Info",
    element: "Info",
    isPublic: true,
  },
  {
    path: "/volunteer/evaluations/:id",
    element: "EvaluationDetails",
    isPublic: false,
  },
];
