import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import categoryData from "@/store/category.json"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const Filter = () => {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger><Button className="bg-lightgreen border">Category<ArrowDown className="w-5 h-5"/></Button></HoverCardTrigger>
        <HoverCardContent className="bg-lightyellow flex flex-wrap gap-10 min-w-[400px] border-none shadow-md">
          {categoryData.category.map((category,index) =>(
            <Link key={index} href={`/category/${category.name}`} className="cursor-pointer shadow-lg px-2">{category.name}</Link>
          ))}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Filter;
