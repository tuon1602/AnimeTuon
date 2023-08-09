"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AnimeCards from "@/app/components/home/AnimeCards";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationComponent from "@/app/components/pagination/PaginationComponent";
import CustomLoading from "@/app/components/customLoading/CustomLoading";

const TypeName = () => {
  const [getAllData, setAllData] = useState<any>([]);
  const [pageStatus, setPageStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const params: any = useParams();
  const searchParams = useSearchParams();
  // console.log(searchParams.get("nameType"));

  const pageNumberToFetch = 15;
  useEffect(() => {
    const allData: any = [];
    const fetchData = async () => {
      try {
        switch (params.id) {
          case "Most%20Popular":
            setLoading(true);
            const mostPopularRes = await fetch(
              `${process.env.NEXT_PUBLIC_ANIME_API}/top-airing?page=${params.page}`,
              {
                next: {
                  revalidate: 500,
                },
              }
            );
            const mostPopularData = await mostPopularRes.json();
            allData.push(...mostPopularData.results);
            setAllData(allData);
            // setPageStatus(mostPopularData.hasNextPage);
            setLoading(false);
            break;
          case "Recent%20Release":
            setLoading(true);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ANIME_API}/recent-episodes?page=${params.page}`,
              {
                next: {
                  revalidate: 500,
                },
              }
            );
            const data = await res.json();
            allData.push(...data.results);
            setAllData(allData);
            // setPageStatus(mostPopularData.hasNextPage)
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
      <p className="text-2xl text-center dark:text-darkwhite">{params.id.replace(/%20/g, " ")}</p>
      <div className="mt-5">
        {/* {getAllData?.map((item:any,index:any)=>(
            <AnimeCards/>
        ))} */}
        {loading ? (
          <CustomLoading />
        ) : getAllData.length === 0 ? (
          <div>No results found</div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <AnimeCards data={getAllData} />
            <PaginationComponent currentPageProps={params.page} />
          </div>
        )}
        {/* <AnimeCards data={getAllData}/> */}
      </div>
    </div>
  );
};

export default TypeName;
