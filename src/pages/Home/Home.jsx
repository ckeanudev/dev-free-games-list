import React, { useState, useLayoutEffect, useContext } from "react";

import { AppContext } from "../../App";

import styles from "./Home.module.css";

import { ImSpinner10 } from "react-icons/im";

import Category from "../../components/Category/Category";
import CardGame from "../../components/CardGame/CardGame";

import { motion } from "framer-motion";

const Home = () => {
  const {
    allGameList,
    loadingHome,
    search,
    filteredGameList,
    setLoadingGameDetail,
  } = useContext(AppContext);

  const [seeMore, setSeeMore] = useState(12);

  useLayoutEffect(() => {
    setLoadingGameDetail("none");
  }, []);

  return (
    <div className={styles.home_container}>
      <h1 className={styles.h1_home_main}>
        Best Free Games for PC and Browser In 2022!
      </h1>
      <Category />

      {loadingHome ? (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exist={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.grid_view_games}
        >
          {filteredGameList.map((game, i) => {
            return i < seeMore && <CardGame key={i} game={game} />;
          })}
        </motion.div>
      ) : (
        <div className={styles.loading_container}>
          <p>
            <ImSpinner10 size={"3rem"} />
          </p>
        </div>
      )}
      <div className={styles.see_more_container}>
        {seeMore < filteredGameList.length && loadingHome && (
          <button
            className={styles.see_more}
            onClick={() => {
              setSeeMore(seeMore + 12);
            }}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
