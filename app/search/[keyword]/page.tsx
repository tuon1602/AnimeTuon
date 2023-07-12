import AnimeCards from "@/app/components/home/AnimeCards";
import React from "react";

async function getData(keyword: string) {
  const res = await fetch(`${process.env.ANIME_API}/${keyword}`, {
    next: { revalidate: 3600 },
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

const SearchPage = async ({ params }: { params: { keyword: string } }) => {
  const data = await getData(params.keyword);
  return (
    <div className="min-h-[80vh]">
      {/* <AnimeCards data={data.results}/>
        <div>

        </div> */}
      {data.results.length === 0 ? (
        <div className="flex items-center justify-center min-h-full">
          <p className="m-auto">No results found, try to find again</p>
        </div>
      ) : (
        <AnimeCards data={data.results} />
      )}
    </div>
  );
};

export default SearchPage;
