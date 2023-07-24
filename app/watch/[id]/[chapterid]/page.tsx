"use client";

import Player from "@/app/components/Player/Player";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Comment from "@/app/components/Comments/Comment";
import useSWR from "swr"



const ChapterId = () => {
  const params = useParams();
  // console.log(params);
  const [serverDataState, setServerDataState] = useState([]);
  const [titleData, setTitleData] = useState("");
  const [serverURLState, setServerURLState] = useState("");
  const [firstServerURL, setFirstServerURL] = useState("");
  const [chapters, setChapters] = useState([]);
  const fetchData = async () => {
    try {
      const getServersRes = await fetch(
        `${process.env.NEXT_PUBLIC_ANIME_API}/servers/${params.chapterid}`
      );
      const serverData = await getServersRes.json();
      setServerDataState(serverData);
      setFirstServerURL(serverData[0].url);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchTitleData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANIME_API}/info/${params.id}`
      );
      const getTitleData = await res.json();
      console.log(getTitleData);

      setTitleData(getTitleData.title);
      setChapters(getTitleData.episodes);
    } catch (e) {
      console.error(e);
    }
  };
  const handleGetUrl = (serverURL: string) => {
    setServerURLState(serverURL);

    // console.log(serverURLState);
  };
  useEffect(() => {
    fetchData();
    fetchTitleData();
  }, []);

  return (
    <div>
      <div>
        <Link
          href={`/watch/${params.id}`}
          className="flex justify-center mb-5 cursor-pointer text-2xl hover:opacity-80"
        >
          {titleData}
        </Link>
        <Player
          animeId={params.id}
          chapterId={params.chapterid}
          playerURL={serverURLState}
          defaultPlayerURL={firstServerURL}
        />
        <p className="text-sm text-center mt-2">
          Please report when there is issues{" "}
          <Link className="text-blue" href="/Faq">
            Click Here
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center mt-5">
        <Card className="max-w-[400px]">
          <CardHeader>Choose your server</CardHeader>
          <CardDescription className="text-gray pl-6 mb-2">
            {`If your anime could not run, try some servers`}
          </CardDescription>
          <CardContent className="flex flex-wrap gap-2">
            {serverDataState?.map((item: any, index: any) => (
              <Button
              key={index}
                variant="default"
                className="bg-pinkpastel"
                onClick={() => handleGetUrl(item.url)}
              >
                {item.name}
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card className="mt-5 w-1/2 max-h-[500px] overflow-auto">
          <CardHeader>Choose your chapter</CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {chapters?.map((item: any, index: any) => (
              <Link href={`/watch/${params.id}/${item.id}`} key={index}>
                <p
                  className={
                    params.chapterid === item.id
                      ? `bg-pinkpastel px-4 py-2 opacity-100`
                      : `bg-pinkpastel px-4 py-2 opacity-30 hover:opacity-100`
                  }
                >
                  {item.number}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
      <div>
        <Comment animeId={params.id} animeChapterId={params.chapterid}/>
      </div>
    </div>
  );
};

export default ChapterId;
