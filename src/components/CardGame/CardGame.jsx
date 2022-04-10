import React from "react";
import styles from "./CardGame.module.css";

import { NavLink } from "react-router-dom";

const CardGame = ({ game }) => {
  return (
    <NavLink to={`/game/${game.id}`} style={{ textDecoration: "none" }}>
      <div className={styles.card_game_container}>
        <div className={styles.top}>
          <img src={game.thumbnail} alt={game.title} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.inner_bottom}>
            <h3>{game.title}</h3>
            <p className={styles.game_genre}>{game.genre}</p>
          </div>

          <p className={styles.game_developer}>By {game.developer}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default CardGame;
