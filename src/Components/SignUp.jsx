import React, { useRef } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const SignUp = () => {
  const design = { padding: "5px", margin: "5px", width: "200px" };

  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const { signup, currentUser } = useAuth();

  async function handelSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      setError("Passwords are not same");
      return;
    }

    try {
      setLoding(true);
      setError("");
      signup(emailRef.current.value, passwordRef.current.value);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      usernameRef.current.value = "";
      confirmpasswordRef.current.value = "";
    } catch (error) {
      setError("signup failed");
    }
    setLoding(false);
  }

  return (
    <form
      onSubmit={handelSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Signup</h1>
      {currentUser && currentUser.email}
      {error && <p>{error}</p>}
      <label htmlFor="">Username</label>
      <input type="text" id="1" style={design} ref={usernameRef} />
      <label htmlFor="">Email</label>
      <input type="email" name="" id="2" style={design} ref={emailRef} />
      <label>Password</label>
      <input type="password" name="" id="3" style={design} ref={passwordRef} />
      <label>Confirm Password</label>
      <input
        type="password"
        name=""
        id=""
        style={design}
        ref={confirmpasswordRef}
      />
      <button disabled={loading} type="submit">
        Signup
      </button>
    </form>
  );
};

export default SignUp;
