"use client";

import React from "react";
import ReactPlayer from "react-player/lazy";

interface PlayerProps {
  animeId: string;
  chapterId: string;
  playerURL:string
  defaultPlayerURL:string
}

const Player = (props: PlayerProps) => {
  return (
    <>
      {/* <ReactPlayer
        pip
        controls
        url="https://sbani.pro/e/h4gobpwz7s3n"
        width="100%"
        height="auto"
        config={{
          file: {
            forceHLS: true,
          },
        }}
      /> */}
      <div className="w-full h-[800px]">
        <iframe
          src={`${props.playerURL? props.playerURL : props.defaultPlayerURL}`}
          allowFullScreen
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
};

export default Player;
