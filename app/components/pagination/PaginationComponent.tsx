"use client";

import React from "react";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface paginationIF {
  currentPageProps: number;
}

const PaginationComponent: React.FC<paginationIF> = ({ currentPageProps }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const handlePageNumberChange = (page: any, pageSize: any) => {
    // console.log(page)
    // console.log(pageSize)
    const parts: any = pathname.split("/"); // Split the pathname into parts
    const currentPagePartIndex = parts.length - 1; // Index of the current page part
    parts[currentPagePartIndex] = page; // Replace the current page part with the new page number
    const newPathName = parts.join("/");

    router.push(`${newPathName}`);
  };
  return (
    <Pagination
      defaultCurrent={currentPageProps}
      total={100}
      onChange={handlePageNumberChange}
    />
  );
};

export default PaginationComponent;
