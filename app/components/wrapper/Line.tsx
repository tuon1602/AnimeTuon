import React from "react";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
interface LineProps {
  name: string;
}

const Line: React.FC<LineProps> = ({ name }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-xl text-gray dark:text-lightWhite">{name}</p>
        <Link
          href={`/type/${name}/1`}
          className="flex hover:opacity-60 dark:text-lightWhite"
        >
          View more
          <ChevronsRight />
        </Link>
        {/* <PaginationComponent defaultCurrent={1} total={50} /> */}
      </div>
      <div className="border w-full border-b border-black dark:border-lightWhite"></div>
    </div>
  );
};

export default Line;
