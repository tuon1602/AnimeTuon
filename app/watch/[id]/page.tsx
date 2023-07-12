import React from "react";
import Image from "next/image";
import DetailsButton from "@/app/components/buttons/DetailsButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AnimeDetail = async ({ params }: { params: { id: string } }) => {
  const resAnimeDetail = await fetch(
    `${process.env.ANIME_API}/info/${params.id}`
  );
  const dataAnimeDetail = await resAnimeDetail.json();
    console.log(dataAnimeDetail.episodes[0].id);
  return (
    <div className="min-h-[80vh]">
      <div className="flex gap-5">
        <div className="">
          <Image
            src={dataAnimeDetail?.image}
            alt="detailimage"
            height={350}
            width={350}
          />
        </div>
        <div className="">
          <p className="tracking-wider text-xl">{dataAnimeDetail?.title}</p>
          <p className="text-sm text-gray">{dataAnimeDetail?.otherName}</p>
          <div className="flex flex-col gap-2 mt-2 flex-wrap">
            <DetailsButton name="Category" genres={dataAnimeDetail?.genres} />
            <DetailsButton name="Released Date" data={dataAnimeDetail?.type} />
            <DetailsButton
              name="Chapters"
              data={dataAnimeDetail?.totalEpisodes}
            />
            <DetailsButton name="Status" data={dataAnimeDetail?.status} />
            {/* {dataAnimeDetail.episodes.length >= 2 ? (
              <DetailsButton
                name="Lastest Episode"
                episode={dataAnimeDetail?.episodes.slice(-2)}
                animeId={params.id}
              />
            ) : (
              <DetailsButton
                name="Lastest Episode"
                episode={dataAnimeDetail?.episodes}
                animeId={params.id}
              />
            )} */}
            <DetailsButton
              name="Latest Episode"
              episode={dataAnimeDetail?.episodes.length>=2 ?dataAnimeDetail?.episodes.slice(-2):dataAnimeDetail?.episodes}
              animeId={params.id}
            />
            <Link href={`/watch/${params.id}/${dataAnimeDetail.episodes[0].id}`} className="w-[150px]"><Button className="bg-lightyellow w-full">Watch now</Button></Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
            <p>Description: {dataAnimeDetail?.description}</p>
      </div>
    </div>
  );
};

export default AnimeDetail;
