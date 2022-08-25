import "./App.css";
import Header from "./components/Header/Header";
import BottomNav from "./components/Navigation/BottomNavigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Trending from "../src/pages/Trending/Trending";
import Movies from "../src/pages/Movies/Movies";
import Search from "./pages/Search/Search";
import Series from "./pages/Series/Series";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
