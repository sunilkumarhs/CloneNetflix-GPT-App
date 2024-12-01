import React, { useRef, useState } from "react";
import MovieCards from "./MovieCards";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const MovieList = ({ moviesList }) => {
  const ref1 = useRef(null);
  const [scrollvalue, setScrollValue] = useState(0);
  const [mouseState, setMouseState] = useState(false);
  const scrollOffers = (scrollOffset) => {
    ref1.current.scrollLeft += scrollOffset;
    console.log(ref1);
    setScrollValue(ref1.current.scrollLeft);
  };
  const mouseIn = () => {
    setMouseState(true);
  };
  const mouseOut = () => {
    setMouseState(false);
  };
  return (
    <div>
      <div
        className="flex overflow-x-scroll no-scrollbar cursor-pointer lg:pl-12 pl-4"
        ref={ref1}
        onMouseOver={mouseIn}
        onMouseOut={mouseOut}
      >
        {moviesList?.map((movie) => (
          <MovieCards key={movie.id} movieDetails={movie} />
        ))}
      </div>
      <button
        className="lg:block hidden signInput -mt-64 relative z-20 float-left py-20 w-20 h-64"
        onMouseOver={mouseIn}
        onClick={() => scrollOffers(-1090)}
      >
        {mouseState && scrollvalue > 0 ? (
          <IoIosArrowBack className="text-white text-8xl" />
        ) : (
          ""
        )}
      </button>
      <button
        className="lg:block hidden float-right signInput -mt-64 relative z-20  py-20 w-20 h-64"
        onMouseOver={mouseIn}
        onClick={() => scrollOffers(1090)}
      >
        {mouseState ? (
          <IoIosArrowForward className="text-white text-8xl" />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default MovieList;
