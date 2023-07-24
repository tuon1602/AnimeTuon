import React from "react";
import PaginationComponent from "../buttons/PaginationComponent";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
interface LineProps {
  name: string;
}

const Line: React.FC<LineProps> = ({ name }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-xl text-gray">{name}</p>
        <Link
          href={{
            pathname: `/type/${name}`,
            query: { nameType: name },
          }}
          className="flex hover:opacity-60"
        >
          View more
          <ChevronsRight />
        </Link>
        {/* <PaginationComponent defaultCurrent={1} total={50} /> */}
      </div>
      <div className="border w-full border-b border-black"></div>
    </div>
  );
};

export default Line;
