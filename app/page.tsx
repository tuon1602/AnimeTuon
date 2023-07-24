import Image from "next/image";

import Swipper from "./components/home/Swipper";
import AnimeCards from "./components/home/AnimeCards";
import Line from "./components/wrapper/Line";


async function getAiringData() {
  const res = await fetch(`${process.env.ANIME_API}/top-airing`, {
   cache:"no-cache"
  });
  if (!res.ok) {
    throw new Error("failed to fetch top-airing");
  }
  return res.json();
}
async function getRecentAnimeData() {
  const res = await fetch(`${process.env.ANIME_API}/recent-episodes`, {
    cache:"no-cache"

  });
  if (!res.ok) {
    throw new Error("failed to fetch top-airing");
  }
  return res.json();
}
export default async function Home() {

  const topAiringData = await getAiringData();
  const recentAnimeData = await getRecentAnimeData();
  // console.log(swiperData);
  return (
    <main className="space-y-20 z-0">
      {/* <Swipper data={swiperData} /> */}
      <div className="space-y-4">
        <Line name="Most Popular" />
        <AnimeCards data={topAiringData.results.slice(0,5)} />
      </div>
      {/* <AnimeCards data={swiperData} /> */}
      <div className="space-y-4">
        <Line name="Recent Release" />
        <AnimeCards data={recentAnimeData.results.slice(0,10)} />
      </div>
    </main>
  );
}
