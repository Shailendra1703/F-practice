import React, { useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn, currentUser } = useAuth();
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);

  const handelPassword = () => {
    setVisible(!visible);
    // inputType = visible ? "text" : "password";
  };

  const handelSignIn = async (event) => {
    event.preventDefault();

    try {
      setLoding(true);
      setError("");
      signIn(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Invalid credentials");
    }
    setLoding(false);
    <Navigate to={"/about"} />;
  };
  return (
    <>
      <form
        onSubmit={handelSignIn}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>SignIn</h1>
        {error && <p>{error}</p>}
        {currentUser && currentUser.email}
        <label htmlFor="">Email</label>
        <input
          type="email"
          name=""
          id=""
          style={{ padding: "5px", margin: "5px", width: "200px" }}
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type={visible ? "text" : "password"}
          name=""
          id=""
          style={{ padding: "5px", margin: "5px", width: "200px" }}
          ref={passwordRef}
        ></input>
        <button onClick={handelPassword}>Show</button>
        <button disabled={loading} type="submit">
          SignIn
        </button>
        <Link to="/forget-password">Forget Password</Link>
      </form>
    </>
  );
};

export default SignIn;
