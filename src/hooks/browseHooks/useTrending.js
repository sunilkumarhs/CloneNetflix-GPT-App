import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../../utils/constants";
import { addTrending } from "../../utils/moviesSlice";
import { useEffect } from "react";

const useTrending = () => {
  const dispatch = useDispatch();

  const getTrending = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/all/week?",
      API_OPTIONS
    );

    const jsonData = await data.json();
    console.log(jsonData.results);
    dispatch(addTrending(jsonData.results));
  };

  useEffect(() => {
    getTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTrending;