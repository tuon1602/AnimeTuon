import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Image from "next/image";
import Link from "next/link";

interface AnimeProfileCardsIF {
  userEmail: string;
}

async function getUserLikeData(userEmail: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/user?email=${userEmail}`,{
        cache:"no-cache"
    });
    if (res.ok) {
      const userData = await res.json();
      return userData.data.likes;
    }
  } catch (error) {
    console.error(error);
  }
}

const AnimeProfileCards: React.FC<AnimeProfileCardsIF> = async ({
  userEmail,
}) => {
  const userData = await getUserLikeData(userEmail);
  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-center">
        {userData?.map((item: any, index: string | number) => (
          <Link href={`/watch/${item.animeId}`} key={index}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Card className="w-[250px] rounded-xl flex flex-col gap-5 bg-pinkpastel relative cursor-pointer drop-shadow-xl transition duration-300 ease-in-out border-none hover:opacity-50">
                    <CardHeader className="relative h-[300px]">
                      <Image
                        src={item.animeUrl}
                        alt="card image"
                        fill
                        className="rounded-t-xl"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="break-all truncate text-md">
                        {item.animeName}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="bg-lightgreen max-w-[200px] text-sm">
                  <p>{item.animeName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default AnimeProfileCards;
