import React from "react";

import styles from "./ScreenshotViewer.module.css";

import { AiOutlineCloseCircle } from "react-icons/ai";

const ScreenshotViewer = ({ seeScreenshotImg, setSeeScreenshots }) => {
  return (
    <div
      className={styles.screenshot_viewer_container}
      onClick={() => {
        setSeeScreenshots(false);
      }}
    >
      <p
        className={styles.close_btn}
        onClick={() => {
          setSeeScreenshots(false);
        }}
      >
        <AiOutlineCloseCircle size={"2rem"} />
      </p>
      <div className={styles.inner_screenshot_viewer_container}>
        <img src={seeScreenshotImg} alt="" />
      </div>
    </div>
  );
};

export default ScreenshotViewer;
