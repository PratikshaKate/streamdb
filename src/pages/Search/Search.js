import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import axios from "axios";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
const innerTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [numberOfPages, setnumberOfPages] = useState();
  const [searchText, setsearchText] = useState("");
  const [content, setContent] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setnumberOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchSearch();
    window.scroll(0, 0);
  }, [page, type]);

  return (
    <div style={{ textAlign: "center" }}>
      <ThemeProvider theme={innerTheme}>
        <div style={{ display: "flex", margin: "10px 0px" }}>
          <TextField
            id="search"
            label="Search"
            variant="filled"
            style={{ flex: 1 }}
            onChange={(e) => setsearchText(e.target.value)}
          />
          <Button variant="contained" onClick={fetchSearch()}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, type) => {
            setPage(1);
            setType(type);
          }}
        >
          <Tab label="Search Movies" style={{ width: "50%" }} />
          <Tab label="Search Tv Series" style={{ width: "50%" }} />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
        {content &&
          content.map((ele) => (
            <SingleContent
              key={ele.id}
              id={ele.id}
              poster={ele.poster_path}
              title={ele.title || ele.name}
              releaseDate={ele.first_air_date || ele.release_date}
              media_type={type ? "tv" : "movie"}
              rating_average={ele.vote_average}
            />
          ))}
      </div>
      {searchText &&
        !content &&
        (type ? <h2>No Tv Series Found</h2> : <h2>No Movies Found</h2>)}
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Search;
