import OpenAI from "openai";
import { API_OPTIONS } from "../utils/constants";
import { addSearchMovies } from "../utils/redux/gptSearchMoviesSllice";

const searchMovies = async (movie) => {
  const movieArray = movie.split("-");
  const data = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      movieArray[0] +
      "&include_adult=false&page=1&year=" +
      movieArray[1],
    API_OPTIONS
  );
  const json = await data.json();
  return json.results;
};

const useGptSearchResulte = async (searchText1, dispatch, gptKey) => {
  const openai = new OpenAI({
    apiKey: gptKey,
    dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
  });
  const searchText =
    "Act as a Movie Recommendation system and suggest some movies for the query :" +
    searchText1 +
    ". Only give me names and released year of 6 movies, comma seperated like the example result given ahead. Example Results: 	Kaatera-2023,Kantara-2023,Roberrt-2022,K.G.F: Chapter 2-2022,777 Charlie-2023,Raajakumara-2020";
  try {
    const gptSearchResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: searchText }],
      model: "gpt-4o-mini",
    });

    if (!gptSearchResults.choices) {
      //TODO : GPT Search Failed to fetch your results
    }

    const movies = gptSearchResults.choices[0].message.content.split(",");

    const promiseArray = movies?.map((movie) => searchMovies(movie));

    const moviesResult = await Promise.all(promiseArray);

    dispatch(
      addSearchMovies({ movieNames: movies, movieResults: moviesResult })
    );
  } catch (error) {
    alert("Your OpenAi Error:" + error);
  }
};

export default useGptSearchResulte;
