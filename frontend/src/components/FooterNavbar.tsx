import React from "react";
import { FaHome, FaBell, FaPlusSquare, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./FooterNavbar.module.css";

const FooterNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className={styles.footer}>
      <div
        className={`${styles.navItem} ${isActive("/home") ? styles.active : ""}`}
        onClick={() => navigate("/home")}>
        <FaHome size={28} />
      </div>
      <div
        className={`${styles.navItem} ${isActive("/notifications") ? styles.active : ""}`}
        onClick={() => navigate("/notifications")}>
        <FaBell size={28} />
      </div>
      <div
        className={`${styles.navItem} ${isActive("/create") ? styles.active : ""}`}
        onClick={() => navigate("/create")}>
        <FaPlusSquare size={28} />
      </div>
      <div
        className={`${styles.navItem} ${isActive("/profile") ? styles.active : ""}`}
        onClick={() => navigate("/profile")}>
        <FaUser size={28} />
      </div>
    </footer>
  );
};

export default FooterNavbar;
