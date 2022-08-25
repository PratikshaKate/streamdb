import React from "react";
import Pagination from "@mui/material/Pagination";
import "./CustomPagination.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
const innerTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    mode: "dark",
  },
});
const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  const handlePageChange = (e, page) => {
    setPage(page);
    window.scroll(1, 1);
  };
  return (
    <div className="container">
      <ThemeProvider theme={innerTheme}>
        <Pagination
          count={numberOfPages}
          onChange={handlePageChange}
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
