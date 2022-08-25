import React from "react";
import { img_300, unavailable } from "../../config/config";
import { Badge } from "@mui/material";
import "./SingleContent.css";
const SingleContent = ({
  id,
  poster,
  title,
  releaseDate,
  media_type,
  rating_average,
}) => {
  return (
    <div className="media">
      <Badge
        badgeContent={rating_average}
        color={rating_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt="Poster"
      />
      <b className="title">{title}</b>
      <span className="subtitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="date">{releaseDate}</span>
      </span>
    </div>
  );
};

export default SingleContent;
