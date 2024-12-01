import React, { useRef, useState } from "react";
import BrowseHeader from "./authentication/BrowseHeader";
import { useDispatch, useSelector } from "react-redux";
import { GPT_IMG } from "../utils/constants";
import lang from "../utils/languageConstants";
import useGptSearchResulte from "../hooks/useGptSearchResulte";
import MovieCards from "./MovieCards";

const GPTSearchPage = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.gptSearch);
  const searchTextRef = useRef(null);
  const apiKeyRef = useRef(null);
  const { movieResults } = useSelector((store) => store?.gptMovies);
  const [gptKey, setGptKey] = useState(localStorage.getItem("gptKey"));

  const handleSearchOpenaiText = () => {
    const searchText1 = searchTextRef.current.value;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGptSearchResulte(searchText1, dispatch, gptKey);
  };

  const handleOpenaiKey = () => {
    if (apiKeyRef.current.value !== null) {
      const apiKey = apiKeyRef.current.value;
      localStorage.setItem("gptKey", apiKey);
      setGptKey(localStorage.getItem("gptKey"));
      apiKeyRef.current.value = "";
    }
  };
  const handleClearKey = () => {
    localStorage.removeItem("gptKey");
    setGptKey(null);
  };

  return (
    <div className="bg-black">
      <BrowseHeader />
      <div className="w-sreen lg:h-auto lg:aspect-video h-screen">
        <img className="w-full h-full" alt="gptimage" src={GPT_IMG} />
      </div>
      <div
        className={`lg:-mt-[38rem] -mt-[40rem] text-center relative z-20 lg:px-[24rem] px-4 ${
          gptKey === null ? "" : "hidden"
        } `}
      >
        <form
          className="signInput py-3 rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl text-zinc-300 font-bold">
            {lang[langKey].title}
          </h1>
          <div className="py-8 lg:px-0 px-4 flex-col justify-center">
            <input
              ref={apiKeyRef}
              placeholder="enter your OpenAi gpt-4o-mini API key to use GTP Search"
              className="py-2 px-3 rounded-xl lg:w-11/12 w-full"
            />
            <p className="py-2"></p>
            <button
              className="bg-red-600 text-white py-2 px-3 rounded-xl hover:bg-red-500 font-semibold"
              onClick={handleOpenaiKey}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div
        className={`lg:-mt-[38rem] -mt-[40rem] text-center relative z-20 lg:px-[24rem] px-4 ${
          gptKey === null ? "hidden" : ""
        } `}
      >
        <div className="signInput py-3 rounded-md">
          <div className="flex justify-center px-2">
            <h1 className="text-3xl text-zinc-300 font-bold">
              {lang[langKey].title}
            </h1>
            <button
              className="bg-red-600 text-white py-2 px-3 rounded-xl lg:ml-6 lg:my-0 my-4 hover:bg-red-500 font-semibold"
              onClick={handleClearKey}
            >
              Clear Key
            </button>
          </div>
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <div className="py-8 lg:px-0 px-4">
              <input
                ref={searchTextRef}
                placeholder={lang[langKey].searchPlaceHolder}
                className="py-2 px-3 rounded-xl lg:w-4/6 w-full"
              />
              <button
                className="bg-red-600 text-white py-2 px-3 rounded-xl lg:ml-6 lg:my-0 my-4 hover:bg-red-500 font-semibold"
                onClick={handleSearchOpenaiText}
              >
                {lang[langKey].search}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="px-1 pb-10 xl:mx-16 mx-6 pt-16 flex flex-wrap">
        {movieResults?.map((movie, index) => (
          <MovieCards key={index} movieDetails={movie[0]} />
        ))}
      </div>
    </div>
  );
};

export default GPTSearchPage;
