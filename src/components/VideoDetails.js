import React from "react";
import { FaPlay } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";

const VideoDetails = ({ title, overview }) => {
  return (
    <div className="absolute w-screen lg:h-auto lg:aspect-video browseBg1 h-[25rem]">
      <div className="md:pl-12 pl-4 md:pt-[10%] pt-[30%]">
        <h1 className="md:text-5xl text-2xl font-bold text-slate-300">
          {title?.original_title || title?.name || title}
        </h1>
        <p className="font-semibold w-[30%] h-44 py-3 text-white md:block hidden overflow-y-hidden text-ellipsis">
          {title?.overview || overview}
        </p>
        <div className="md:pt-8 pt-4 flex">
          <button className="flex bg-red-500 hover:bg-red-400 rounded-md md:px-5 px-3 py-2">
            <FaPlay className="md:text-3xl text-xl text-white" />
            <span className="pl-2 md:text-xl text-sm text-white">Play</span>
          </button>
          <button className="flex bg-stone-500 hover:bg-stone-400 rounded-md md:px-5 px-3 py-2 mx-8">
            <IoInformationCircleOutline className="md:text-3xl text-xl text-white" />
            <span className="pl-2 md:text-xl text-sm text-white">
              More Info
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
