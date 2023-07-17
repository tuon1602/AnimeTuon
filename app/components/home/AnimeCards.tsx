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
import { Pagination } from "antd";
import Link from "next/link";

interface recentAnimeDataProps {
  data: any;
}

const AnimeCards: React.FC<recentAnimeDataProps> = ({ data }) => {
  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center">
        {data?.map((item: any, index: string | number) => (
          <Link href={`/watch/${item.id}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Card className="w-[250px] rounded-xl flex flex-col gap-5 bg-pinkpastel relative cursor-pointer drop-shadow-xl transition duration-300 ease-in-out border-none hover:opacity-50">
                    <CardHeader className="relative h-[300px]">
                      <Image
                        src={item.image}
                        alt="card image"
                        fill
                        className="rounded-t-xl"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="break-all truncate text-md">
                        {item.title}
                      </CardDescription>
                      {item.episodeNumber && (
                        <p className="text-center mt-5">
                          Latest Episode {item.episodeNumber}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="bg-lightgreen max-w-[200px] text-sm"><p>{item.title}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AnimeCards;
