"use client";

import React, { useState, useEffect } from "react";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";

interface HeartIF {
  animeId: string;
  animeUrl: string;
  animeName: string;
}

const HeartFunc: React.FC<HeartIF> = ({ animeId, animeUrl, animeName }) => {
  const session = useSession();
  const userEmail = session.data?.user?.email;
  //   console.log(likeId);
  const [checked, setChecked] = useState(false);

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const {data} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/like?animeId=${animeId}&userEmail=${userEmail}`,fetcher)
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
    setChecked(!checked); 
    try {
      if (!checked && data.like === null) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ animeId, animeName, animeUrl, userEmail }),
        });
        const data = await res.json();
        console.log(data);
      } else if (checked && data.like!==null) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: data.like.id }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(checked)
  }, [checked]);
  console.log(data)
//   useEffect(() => {
//     console.log("Updated checked state:", checked); // Log the updated checked state
//   }, [checked]);
  return (
    <div>
      {session.status==="authenticated" && checked === true? (
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
