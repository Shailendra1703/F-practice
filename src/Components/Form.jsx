import React from "react";
import { useState } from "react";

const Form = () => {
  const [Data, SetData] = useState({
    Full_Name: "",
    Email: "",
    Message: "",
  });

  let name, value;
  const handelChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    SetData({ ...Data, [name]: value });
    console.log(name, value);
  };

  const SubmitData = async (e) => {
    e.preventDefault();

    const { Full_Name, Email, Message } = Data;

    const res = await fetch(
      "https://contact-form-92728-default-rtdb.firebaseio.com/form.json",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Full_Name,
          Email,
          Message,
        }),
      }
    );

    if (res) {
      alert("Data Stored");

      SetData({
        Full_Name: "",
        Email: "",
        Message: "",
      });
    } else alert("Nikal");
  };

  return (
    <div>
      <form
        action="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label htmlFor="">Full Name</label>
        <input
          type="text"
          name="Full_Name"
          id=""
          value={Data.Full_Name}
          onChange={handelChange}
          required
        />
        <label htmlFor="">E-mail</label>
        <input
          type="email"
          name="Email"
          id=""
          value={Data.Email}
          onChange={handelChange}
          required
        />
        <label htmlFor="">Message</label>
        <textarea
          type="text"
          name="Message"
          id=""
          rows="5"
          cols="25"
          value={Data.Message}
          onChange={handelChange}
          required
        />
        <button type="submit" onClick={SubmitData}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
