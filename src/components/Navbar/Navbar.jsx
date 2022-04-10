import React from "react";

import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { MdGames } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className={styles.nav_container}>
      <div className={styles.inner_nav_container}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div className={styles.left_side_nav}>
            <MdGames size={window.innerWidth < 500 ? "1.2rem" : "1.5rem"} />{" "}
            <h1>Free / Games</h1>
          </div>
        </NavLink>
        <div className={styles.right_side_nav}></div>
      </div>
    </nav>
  );
};

export default Navbar;
