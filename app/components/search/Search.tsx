"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import SmallCardSearch from "./SmallCardSearch";
import { useRouter } from "next/navigation";
import ReactLoading from "react-loading";

const Search = () => {
  const nextRouter = useRouter();
  const [keyword, setKeyword] = useState("");
  const [dataAfterSearch, setDataAfterSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleKeyChange = (e: any) => {
    setKeyword(e.target.value);
  };
  const HandleEnterPress = (e: any) => {
    if (
      e.key === "Enter" &&
      keyword.length >= 3 &&
      dataAfterSearch.length > 0
    ) {
      nextRouter.push(`/search/${keyword}`);
      setKeyword("");
    } else {
      return false;
    }
  };
  const handleBlur = () => {
    setFocus(false);
  };
  const handleFocus = () => {
    setFocus(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      //   if (keyword.length) {
      //     setLoading(true);
      //   }
      //   else{
      //     setLoading(false)
      //   }
      if (keyword.length >= 3) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_ANIME_API}/${keyword}`
          );
          const data = await res.json();
          setDataAfterSearch(data.results);
          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      } else if (keyword && keyword.length < 3) {
        setLoading(true);
      }
    };
    fetchData();
  }, [keyword]);
  return (
    <div>
      <div className="relative w-[500px]">
        <Input
          value={keyword}
          type="text"
          placeholder="Search anime (Must be more than 3 characters)"
          className="w-full"
          onChange={handleKeyChange}
          onKeyDown={HandleEnterPress}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <div className="absolute top-2 right-0">
          {loading === true && keyword.length > 0 && (
            <ReactLoading type="spin" height={25} width={25} color="#87CEEB" />
          )}
        </div>
      </div>
      {loading === false && keyword.length >= 3 && (
        <div
          className={
            focus
              ? `absolute w-[500px] max-h-[500px] bg-lightyellow z-60 top-full -mt-4 overflow-auto duration-300 ease-in-out transition-all`
              : `hidden`
          }
          onMouseDown={(e) => e.preventDefault()}
        >
          {dataAfterSearch.length>0 && keyword.length >= 3 ? (
            <div className="flex flex-col gap-2">
              {dataAfterSearch.slice(0, 10).map((item: any, index: any) => (
                <SmallCardSearch
                key={index}
                  image={item.image}
                  title={item.title}
                  id={item.id}
                  releaseDate={item.releaseDate}
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-5">Not found any result</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
