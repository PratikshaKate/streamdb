import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGenres, setselectedGenres] = useState([]);
  const [allGenres, setallGenres] = useState([]);
  const genre_for_URL = useGenres(selectedGenres);
  const fetchMovies = async (page = 1) => {
    const { data } = await axios.get(`
  https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genre_for_URL}`);
    setContent(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page, genre_for_URL]);
  return (
    <div>
      <span className="pagetitle">TV Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setselectedGenres={setselectedGenres}
        allGenres={allGenres}
        setallGenres={setallGenres}
        setPage={setPage}
      />

      <div className="trending">
        {content &&
          content.map((ele) => (
            <SingleContent
              key={ele.id}
              id={ele.id}
              poster={ele.poster_path}
              title={ele.title || ele.name}
              releaseDate={ele.first_air_date || ele.release_date}
              media_type={ele.media_type}
              rating_average={ele.vote_average}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={totalPages} />
      )}
    </div>
  );
};

export default Series;
