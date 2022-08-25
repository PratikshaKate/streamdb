import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
const Genres = ({
  type,
  selectedGenres,
  setselectedGenres,
  allGenres,
  setallGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setselectedGenres([...selectedGenres, genre]);
    setallGenres(allGenres.filter((ele) => ele.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    console.log("REMOVE");
    console.log(selectedGenres.filter((ele) => ele.id !== genre.id));
    setselectedGenres(selectedGenres.filter((ele) => ele.id !== genre.id));
    setallGenres([...allGenres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setallGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setallGenres([]);
    };
  }, []);

  return (
    <div style={{ padding: "2px 0px" }}>
      {selectedGenres &&
        selectedGenres.map((ele) => (
          <Chip
            label={ele.name}
            size="medium"
            key={ele.id}
            style={{ margin: "2px" }}
            color="primary"
            clickable
            onDelete={() => {
              handleRemove(ele);
            }}
          />
        ))}
      {allGenres &&
        allGenres.map((ele) => (
          <Chip
            label={ele.name}
            size="medium"
            key={ele.id}
            style={{ margin: "2px", backgroundColor: "white" }}
            clickable
            onClick={() => {
              handleAdd(ele);
            }}
          />
        ))}
    </div>
  );
};

export default Genres;
