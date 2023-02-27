import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { AuthProvider } from "./context/AuthProvider";
import Form from "./Components/Form";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPass from "./Components/ForgotPass";
import Profile from "./Components/Profile";

const App = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <PrivateRoute path="/about" element={<About />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgotPass />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/form" element={<Form />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/profile" element={<Profile />} exact />
        {/* </Route> */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
