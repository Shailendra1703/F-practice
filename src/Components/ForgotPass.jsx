import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthProvider";

const ForgotPass = () => {
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let email = emailRef.current.value;
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setMessage("Failed to reset password");
    }
  }
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      {message && <p>Check inbox for change</p>}
      <p>Email</p>
      <input type="email" ref={emailRef}></input>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default ForgotPass;
