"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axiosInstance";
import styles from "./Auth.module.scss";

const AuthForm = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePhone = (phone: string) => {
    const regex = /^09(0[1-5]|1[0-9]|2[0-2]|3[0-9]|9[0-9])\d{7}$/;
    return regex.test(phone);
  };

  const handlePhoneChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleLogin = async () => {
    if (!validatePhone(phone)) {
      setError("Phone number is not valid");
      return;
    }

    try {
      const response = await axios.get("?results=1&nat=us");
      const userData = response.data.results[0];

      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (err) {
      console.error("API error:", err);
      setError("Error in getting information");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Auth</h2>
        <input
          type="text"
          placeholder="Phone number"
          maxLength={11}
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleLogin} className={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
