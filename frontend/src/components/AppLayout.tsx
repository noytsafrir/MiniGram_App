import React from "react";
import { useNavigate } from "react-router-dom";
import FooterNavbar from "./FooterNavbar";
import styles from "./AppLayout.module.css";
import { FiLogOut } from 'react-icons/fi'; // Feather icon

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className={styles.appLayout}>
        <header className={styles.appHeader}>
            <img className={styles.appLogo} src="/minigram-logo.png" alt="Minigram Logo" onClick={() => navigate('/home')} />
            <button className={styles.logoutButton} onClick={handleLogout}>
                <FiLogOut />
                Logout 
            </button>
        </header>
      <main style={{  paddingTop: '75px',paddingBottom: '60px' }}>{children}</main>
      <FooterNavbar />
    </div>
  );
};

export default AppLayout;