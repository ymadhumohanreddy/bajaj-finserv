import React, { useState } from "react";
import Login from "./components/Login";
import DynamicForm from "./components/DynamicForm";
import "./styles.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [formData, setFormData] = useState(null);

  const handleLogin = async (rollNumber, name) => {
    const res = await fetch(
      "https://dynamic-form-generator-9rl7.onrender.com/create-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber, name }),
      }
    );

    console.log(res);
    if (res.status == 409) {
      setRollNumber(rollNumber);
      setIsLoggedIn(true);
      const formRes = await fetch(
        `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
      );
      const data = await formRes.json();
      setFormData(data.form);
    } else {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        formData && <DynamicForm form={formData} />
      )}
    </div>
  );
};

export default App;
