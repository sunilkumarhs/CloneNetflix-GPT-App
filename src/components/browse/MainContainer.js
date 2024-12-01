import React, { useEffect, useState } from "react";
import VideoDetails from "../VideoDetails";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
// import MovieList from "./MovieList";

const MainContainer = () => {
  const trend = useSelector((store) => store.movies?.trending);
  const [playMovie, setPlayMovie] = useState(null);
  useEffect(() => {
    if (!trend) return;
    const displayList = [...trend].sort(() => Math.random() - 0.5);
    setPlayMovie(displayList[0]);
  }, [trend]);

  return playMovie === null ? (
    ""
  ) : (
    <div>
      <VideoDetails title={playMovie} />
      <VideoBackground id={playMovie?.id} />
    </div>
  );
};

export default MainContainer;
