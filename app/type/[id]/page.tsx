"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AnimeCards from "@/app/components/home/AnimeCards";
import { Skeleton } from "@/components/ui/skeleton";

const TypeName = () => {
  const [getAllData, setAllData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  // console.log(params.id);
  // console.log(searchParams.get("nameType"));

  const pageNumberToFetch = 15;
  useEffect(() => {
    const allData: any = [];
    const fetchData = async () => {
      try {
        switch (searchParams.get("nameType")) {
          case "Most Popular":
            setLoading(true);
            for (let eachPage = 1; eachPage <= pageNumberToFetch; eachPage++) {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_ANIME_API}/top-airing?page=${eachPage}`,
                {
                  next:{
                    revalidate:500
                  }
                }
              );
              const data = await res.json();
              allData.push(...data.results);
            }
            setAllData(allData);
            setLoading(false);
            break;
          case "Recent Release":
            setLoading(true);
            for (let eachPage = 1; eachPage <= pageNumberToFetch; eachPage++) {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_ANIME_API}/recent-episodes?page=${eachPage}`,
                {
                  next:{
                    revalidate:500
                  }
                }
              );
              const data = await res.json();
              allData.push(...data.results);
              console.log(allData);
            }
            setAllData(allData);
            setLoading(false);
            break;
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-[80vh]">
      <p className="text-2xl text-center">
        {searchParams.get("nameType")} Anime
      </p>
      <div className="mt-5">
        {/* {getAllData?.map((item:any,index:any)=>(
            <AnimeCards/>
        ))} */}
        {loading ? (
          <p>Loading....</p>
        ) : (
          <AnimeCards data={getAllData} />
        )}
        {/* <AnimeCards data={getAllData}/> */}
      </div>
    </div>
  );
};

export default TypeName;
