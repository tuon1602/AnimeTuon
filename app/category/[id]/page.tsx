"use client";

import React from "react";
import { useSelectedLayoutSegment, useParams } from "next/navigation";
import useSWR from "swr";
import AnimeCards from "@/app/components/home/AnimeCards";
import NotFound from "@/app/components/NotFound/NotFound";
import CustomLoading from "@/app/components/customLoading/CustomLoading";

const CategoryPage = () => {
  const params = useParams();
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);
    return res.json();
  };

  const { data, error, isLoading } = useSWR(
    `/api/category?c=${params.id}`,
    fetcher
  );
  if (error)
    return (
      <div className="min-h-[80vh]">
        <NotFound />
      </div>
    );
  if (isLoading)
    return (
      <div className="min-h-[80vh]">
        <CustomLoading />
      </div>
    );
  return (
    <div className="min-h-[80vh]">
      <AnimeCards data={data.allData} />
    </div>
  );
};

export default CategoryPage;
