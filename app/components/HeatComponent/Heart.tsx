"use client";

import React, { useState, useEffect } from "react";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { useSWRConfig } from "swr";

interface HeartIF {
  animeId: string;
  animeUrl: string;
  animeName: string;
}

const HeartFunc: React.FC<HeartIF> = ({ animeId, animeUrl, animeName }) => {
  const session = useSession();
  const userEmail = session.data?.user?.email;
  const {mutate} = useSWRConfig()

  const fetcher = async (...args: Parameters<typeof fetch>): Promise<any> => {
    const response = await fetch(...args);
    const data = await response.json();
    return data;
  };
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/like?animeId=${animeId}&userEmail=${userEmail}`,
    fetcher
  );
  //   const getLikeDetail = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/like?animeId=${animeId}&userEmail=${userEmail}`
  //       );
  //       const data = await res.json();
  //       setLikeData(data.like)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  const handleLikeChecked = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ animeId, animeName, animeUrl, userEmail }),
      });
      const likeData = await res.json();
      console.log(likeData);
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/like?animeId=${animeId}&userEmail=${userEmail}`)
    } catch (error) {
      console.error(error);
    }
  };
  const handleLikeDeleted = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: data?.like.id }),
      });
      const deleteLikeData = await res.json();
      console.log(deleteLikeData);
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/like?animeId=${animeId}&userEmail=${userEmail}`)

    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data);
  //   useEffect(() => {
  //     console.log("Updated checked state:", checked); // Log the updated checked state
  //   }, [checked]);
  return (
    <div>
      {/* {session.status==="authenticated" && checked === true? (
        <div className="flex gap-2">
          <Heart
            className="text-warning transition-all duration-200 ease-in-out"
            onClick={handleLikeChecked}
          />
          <p className="transition-all duration-200 ease-in-out">
            It's your favorite anime!
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <Heart
            className="transition-all duration-200 ease-in-out"
            onClick={handleLikeChecked}
          />
          <p className="transition-all duration-200 ease-in-out">
            Save this to your favorite anime!
          </p>
        </div>
      )} */}
      {session.status === "authenticated" && data?.like !== null && (
        <div className="flex gap-2 cursor-pointer" onClick={handleLikeDeleted}>
          <Heart className="text-warning transition-all duration-200 ease-in-out " />
          <p className="transition-all duration-200 ease-in-out dark:text-darkwhite">
            It's your favorite anime!
          </p>
        </div>
      )}
      {session.status === "authenticated" && data?.like === null && (
        <div className="flex gap-2 cursor-pointer " onClick={handleLikeChecked}>
          <Heart className="transition-all duration-200 ease-in-out dark:text-darkwhite" />
          <p className="transition-all duration-200 ease-in-out dark:text-darkwhite">
            Save this to your favorite anime!
          </p>
        </div>
      )}
      {session.status === "unauthenticated" && (
        <div className="flex gap-2 cursor-pointer disabled">
          <Heart
            className="transition-all duration-200 ease-in-out dark:text-darkwhite"
            onClick={handleLikeChecked}
          />
          <p className="transition-all duration-200 ease-in-out dark:text-darkwhite">
            You must login to like anime!
          </p>
        </div>
      )}
    </div>
    // <div>
    //   {session.status === "authenticated" && data ? (
    //     <div className="flex gap-2">
    //       <Heart
    //         className={`transition-all duration-200 ease-in-out ${
    //           data.like !== null && "text-warning"
    //         }`}
    //         onClick={handleLikeChecked}
    //       />
    //       <p className="transition-all duration-200 ease-in-out">
    //         {data.like !== null
    //           ? "It's your favorite anime!"
    //           : "Save this to your favorite anime!"}
    //       </p>
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
  );
};

export default HeartFunc;
