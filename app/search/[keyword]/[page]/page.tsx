import AnimeCards from "@/app/components/home/AnimeCards";
import React from "react";
import PaginationComponent from "@/app/components/pagination/PaginationComponent";

async function getData(keyword: string,page:number) {
  const res = await fetch(`${process.env.ANIME_API}/${keyword}?page=${page}`, {
    next: { revalidate: 300 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const SearchPage = async ({ params }: { params: { keyword: string,page:number } }) => {
  const data = await getData(params.keyword,params.page);
  return (
    <div className="min-h-[80vh]">
      {/* <AnimeCards data={data.results}/>
        <div>

        </div> */}
      {data.results.length === 0 ? (
        <div className="flex items-center justify-center m-auto">
          <p className="m-auto">No results found, try to find again</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-10">
          <AnimeCards data={data.results} />
          {data.hasNextPage === true && <PaginationComponent currentPageProps={params.page}/>}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
