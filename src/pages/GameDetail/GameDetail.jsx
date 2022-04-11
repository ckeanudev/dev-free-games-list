import React, { useState, useContext, useLayoutEffect } from "react";
import styles from "./GameDetail.module.css";
import { AppContext } from "../../App";
import { useParams } from "react-router-dom";
import { headers } from "../../api";
import Axios from "axios";
import { ImSpinner10 } from "react-icons/im";
import ScreenshotViewer from "../../components/ScreenshotViewer/ScreenshotViewer";

import { motion } from "framer-motion";

const GameDetail = () => {
  let params = useParams();

  const { loadingGameDetail, setLoadingGameDetail } = useContext(AppContext);

  const [gameData, setGameData] = useState([]);
  const [seeMoreDescription, setSeeMoreDescription] = useState(false);
  const [seeScreenshots, setSeeScreenshots] = useState(false);
  const [seeScreenshotImg, setSeeScreenshotImg] = useState(false);

  const getGameFullDetail = {
    method: "GET",
    url: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${params.id}`,
    headers: headers,
  };

  useLayoutEffect(() => {
    setLoadingGameDetail("none");

    document.title = `Game Info`;

    setTimeout(() => {
      getGameData();
    }, 300);
  }, []);

  const getGameData = () => {
    Axios.request(getGameFullDetail)
      .then(function (response) {
        setGameData(response.data);

        setTimeout(() => {
          setLoadingGameDetail("loaded");
        }, 300);
      })
      .catch(function (error) {
        console.error(error);
        setLoadingGameDetail("error");
      });
  };

  const backgroundPic = {
    backgroundImage: `linear-gradient(rgba(52, 58, 64, 0.88),
     rgba(52, 58, 64, 0.93),
     rgba(52, 58, 64, 1),
     rgba(52, 58, 64, 1),
     rgba(52, 58, 64, 1)),url(${
       gameData.screenshots && gameData.screenshots.length > 0
         ? gameData.screenshots[0].image
         : ""
     })`,
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };

  // ---------------------------- Convert Timestamp to Date Object ----------------------------
  const convertTimestamp = (time) => {
    let dateObj = new Date(time);
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let date = String(dateObj.getDate()).padStart(2, "0");

    const monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${monthName[month]} ${date}, ${year}`;
  };

  return (
    <div
      className={styles.game_detail_container}
      style={loadingGameDetail === "loaded" ? backgroundPic : {}}
    >
      {seeScreenshots && (
        <ScreenshotViewer
          seeScreenshotImg={seeScreenshotImg}
          setSeeScreenshots={setSeeScreenshots}
        />
      )}
      {loadingGameDetail === "loaded" ? (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exist={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.inner_game_detail_container}
        >
          <div className={styles.left_detail}>
            <img src={gameData.thumbnail || ""} alt="" />
            <div className={styles.grid_left_content}>
              <div className={styles.left_grid}>
                <p>FREE</p>
              </div>

              <a
                href={gameData.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rightt_grid_button}
              >
                Play Now
              </a>
            </div>
          </div>
          <div className={styles.right_detail}>
            {/* ------------------ TITLE DESCRIPTION ------------------ */}
            <h1 className={styles.game_title}>{gameData.title || ""}</h1>

            {/* ------------------ SHORT DESCRIPTION ------------------ */}
            <p className={styles.short_description}>
              {gameData.short_description || ""}
            </p>

            {/* ------------------ GRID DESCRIPTION ------------------ */}
            <div className={styles.grid_description}>
              <div className={styles.grid_info}>
                <label htmlFor="">Developer</label>
                <p className={styles.grid_info_detail}>
                  {gameData.developer || ""}
                </p>
              </div>

              <div className={styles.grid_info}>
                <label htmlFor="">Publisher</label>
                <p className={styles.grid_info_detail}>
                  {gameData.publisher || ""}
                </p>
              </div>

              <div className={styles.grid_info}>
                <label htmlFor="">Release Date</label>
                <p className={styles.grid_info_detail}>
                  {convertTimestamp(gameData.release_date || "0000-00-00")}
                </p>
              </div>

              <div className={styles.grid_info}>
                <label htmlFor="">Genre</label>
                <p className={styles.grid_info_detail}>
                  {gameData.genre || ""}
                </p>
              </div>

              <div className={styles.grid_info}>
                <label htmlFor="">Platform</label>
                <p className={styles.grid_info_detail}>
                  {gameData.platform || ""}
                </p>
              </div>
            </div>

            {/* ------------------ ABOUT ------------------ */}
            <div
              className={styles.game_about_container}
              style={
                gameData.description.length > 1800 && !seeMoreDescription
                  ? {
                      height: "500px",
                      background: `linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 180, 216, 0.15)
  )`,
                    }
                  : {
                      height: "auto",
                      background: "none",
                      marginBottom: "2rem",
                    }
              }
            >
              <h2>About the game</h2>
              <p>{gameData.description || ""}</p>
            </div>
            {gameData.description.length > 1800 && !seeMoreDescription && (
              <div className={styles.see_more_description_btn}>
                <button
                  onClick={() => {
                    setSeeMoreDescription(true);
                  }}
                >
                  See More
                </button>
              </div>
            )}

            {/* ------------------ SYSTEM REQ ------------------ */}
            {gameData.minimum_system_requirements && (
              <div className={styles.system_requirement_container}>
                <h2>Minimum System Requirements</h2>
                <div className={styles.inner_system_requirement_container}>
                  <div className={styles.system_info}>
                    <label htmlFor="">Operating System</label>
                    <p>{gameData.minimum_system_requirements.os || ""}</p>
                  </div>

                  <div className={styles.system_info}>
                    <label htmlFor="">Processor</label>
                    <p>
                      {gameData.minimum_system_requirements.processor || ""}
                    </p>
                  </div>

                  <div className={styles.system_info}>
                    <label htmlFor="">Memory</label>
                    <p>{gameData.minimum_system_requirements.memory || ""}</p>
                  </div>

                  <div className={styles.system_info}>
                    <label htmlFor="">Graphics</label>
                    <p>{gameData.minimum_system_requirements.graphics || ""}</p>
                  </div>

                  <div className={styles.system_info}>
                    <label htmlFor="">Storage</label>
                    <p>{gameData.minimum_system_requirements.storage || ""}</p>
                  </div>
                </div>
              </div>
            )}

            {gameData.screenshots && gameData.screenshots.length > 0 && (
              <div className={styles.screenshot_container}>
                <h2>{gameData.title} Screenshots</h2>
                <div className={styles.inner_screenshot_container}>
                  {gameData.screenshots.map((shot, i) => {
                    return (
                      <div
                        className={styles.screenshot_image}
                        key={i}
                        onClick={() => {
                          setSeeScreenshots(true);
                          setSeeScreenshotImg(shot.image);
                        }}
                      >
                        <img src={shot.image} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : loadingGameDetail === "none" ? (
        <div className={styles.loading_container}>
          <p>
            <ImSpinner10 size={"3rem"} />
          </p>
        </div>
      ) : (
        "Nice"
      )}
    </div>
  );
};

export default GameDetail;
