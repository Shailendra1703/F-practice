import React from "react";
import {
  Route,
  useNavigate,
  redirect,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import SignIn from "./SignIn";

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return currentUser ? <Component {...props} /> : <SignIn />;
//       }}
//     ></Route>
//   );
// }

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
