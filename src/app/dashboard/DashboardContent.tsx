"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.scss";

const DashboardContent = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/auth");
    } else {
      try {
        const parsed = JSON.parse(stored);
        const name = parsed?.name?.first || "User";
        setUserName(name);
      } catch (e) {
        router.push("/auth");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Hello dear {userName} 👋 </h1> 
        <p className={styles.message}>Welcome to dashboard!</p>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardContent;
