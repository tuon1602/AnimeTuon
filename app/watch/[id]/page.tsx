import React from "react";
import Image from "next/image";
import DetailsButton from "@/app/components/buttons/DetailsButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Comment from "@/app/components/Comments/Comment";
import { notFound } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
// import { Heart } from "lucide-react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import HeartFunc from "@/app/components/HeatComponent/Heart";

const getAnimeDetail = async (id: string) => {
  try {
    const resAnimeDetail = await fetch(`${process.env.ANIME_API}/info/${id}`, {
      next: {
        revalidate: 300,
      },
    });
    return await resAnimeDetail.json();
  } catch (error) {
    console.error(error);
  }
};



const AnimeDetail = async ({ params }: { params: { id: string } }) => {
  const dataAnimeDetail = await getAnimeDetail(params.id);
  // const dataLikeDetail = await getLikeDetail(params.id)
  if (!dataAnimeDetail) {
    notFound();
  }
  // try {
  //   const resAnimeDetail = await fetch(
  //     `${process.env.ANIME_API}/info/${params.id}`
  //   );
  //   const dataAnimeDetail = await resAnimeDetail.json();
  // } catch (error) {

  // }

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
          <p className="tracking-wider text-xl dark:text-lightWhite">{dataAnimeDetail?.title}</p>
          <p className="text-sm text-gray dark:text-lightWhite">{dataAnimeDetail?.otherName}</p>
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
              episode={
                dataAnimeDetail?.episodes.length >= 2
                  ? dataAnimeDetail?.episodes.slice(-2)
                  : dataAnimeDetail?.episodes
              }
              animeId={params.id}
            />
          <HeartFunc animeId={params.id} animeUrl={dataAnimeDetail?.image} animeName={dataAnimeDetail?.title}/>
            <Link
              href={`/watch/${params.id}/${dataAnimeDetail.episodes[0].id}`}
              className="w-[150px]"
            >
              <Button className="bg-lightyellow w-full hover:opacity-50 ease-in-out transition-all">
                Watch now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="dark:text-lightWhite">Description: {dataAnimeDetail?.description}</p>
      </div>
      <div>
        <Comment animeId={params.id} />
      </div>
    </div>
  );
};

export default AnimeDetail;
