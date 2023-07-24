"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SmallCardSearchProps {
  image: string;
  title: string;
  id: string;
  releaseDate: string;
}


const SmallCardSearch = (props: SmallCardSearchProps) => {
  // console.log(props);
  return (
    <div>
      <Link href={`/watch/${props.id}`}>
        <div className="flex items-center gap-5 border-none cursor-pointer shadow-xl">
          <Image src={props.image} width={100} height={150} alt={props.title} />
          <div>
            <p className="font-bold">{props.title}</p>
            {props.releaseDate ? (
              <p className="text-sm text-gray">{props.releaseDate}</p>
            ) : (
              <p className="text-sm text-gray">Release Date: Unknown</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SmallCardSearch;
