import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { genre } from "./genre";
import styles from "./Category.module.css";
import { AppContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import { headers } from "../../api";

const Category = () => {
  const { platformCategory, setPlatformCategory } = useContext(AppContext);

  const { genreCategory, setGenreCategory } = useContext(AppContext);

  const { sortbyCategory, setSortbyCategory } = useContext(AppContext);

  const { search, setSearch } = useContext(AppContext);

  const { setAllGameList, setLoadingHome } = useContext(AppContext);

  useEffect(() => {
    setLoadingHome(false);
    getAllGamesBy(platformCategory, genreCategory, sortbyCategory);
  }, [genreCategory, sortbyCategory]);

  const getAllGamesBy = async (
    platformCategory,
    genreCategory,
    sortbyCategory
  ) => {
    const getAllGamesSortBy = {
      method: "GET",
      url: `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortbyCategory}`,
      headers: headers,
    };

    const getAllGamesGenreAndSortBy = {
      method: "GET",
      url: `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=all&category=${genreCategory}&sort-by=${sortbyCategory}`,

      headers: headers,
    };

    if (genreCategory === "all") {
      Axios.request(getAllGamesSortBy)
        .then(function (response) {
          setAllGameList(response.data);
          setLoadingHome(true);
        })
        .catch(function (error) {
          alert("Oops! something went wrong");
          console.error(error);
          setLoadingHome(true);
        });
    } else {
      Axios.request(getAllGamesGenreAndSortBy)
        .then(function (response) {
          setAllGameList(response.data);
          setLoadingHome(true);
        })
        .catch(function (error) {
          console.error(error);
          setLoadingHome(true);
        });
    }
  };

  return (
    <div className={styles.select_category_container}>
      <div className={styles.left_category}>
        <div className={styles.select_content}>
          <label htmlFor="platform">Genre/Tag:</label>
          <select
            id="platform"
            value={genreCategory}
            onChange={(e) => {
              setGenreCategory(e.target.value);
            }}
          >
            <option value="all" hidden>
              All Genres
            </option>
            {genre.map((genre, i) => {
              return (
                <option value={genre.toLowerCase()} key={i}>
                  {genre}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.select_content}>
          <label htmlFor="platform">Sort By: </label>
          <select
            id="platform"
            value={sortbyCategory}
            onChange={(e) => {
              setSortbyCategory(e.target.value);
            }}
          >
            <option value="relevance">Relevance</option>
            <option value="popularity ">Popularity</option>
            <option value="release-date ">Release Date</option>
            <option value="alphabetical ">Alphabetical </option>
          </select>
        </div>
      </div>

      <div className={styles.right_category}>
        <input
          className={styles.search_text}
          type="text"
          placeholder="Search a game..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className={styles.search_button}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Category;
