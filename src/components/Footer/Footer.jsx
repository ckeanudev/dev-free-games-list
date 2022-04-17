import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer_bar}>
      <div className={styles.inner_footer_bar}>
        <p>
          Data From{" "}
          <a
            href="https://www.freetogame.com/api-doc"
            target="_blank"
            rel="noopener noreferrer"
          >
            FreeToGame
          </a>
        </p>

        <p>
          Coded & Desined by{" "}
          <a
            href="https://ckn-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ckeanu
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
