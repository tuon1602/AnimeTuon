import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DetailsName {
  name: string;
  data?: any;
  episode?: Array<object>;
  animeId?: string;
  genres?: Array<string>;
}

const DetailsButton = (props: DetailsName) => {
  // console.log(props.genres)
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="outline" className="bg-pinkpastel text-center ">
        {props.name}
      </Badge>
      <p className="dark:text-lightWhite">{props.data}</p>
      {props.genres?.map((item,index)=>(
        <Link href={`/category/${item}`} key={index} className="dark:text-lightWhite">{item}</Link>
      ))}
      <div className="flex flex-wrap gap-2">
        {props.episode?.map((item: any, index: any) => (
          <Link
          key={index}
            href={`/watch/${props.animeId}/${item.id}`}
            className="px-4 bg-pinkpastel hover:opacity-75 rounded-lg"
          >
            {item.number}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DetailsButton;
