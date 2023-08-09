import React from "react";
import { ThemeToggle } from "./buttons/ThemeToggle";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import Link from "next/link";
import Search from "./search/Search";
import LoginComPonent from "./Auth/LoginComponent/LoginComPonent";
import Filter from "./Filter/Filter";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <div className="fixed border-b-2 z-50 border-grey-300 bg-pinkpastel w-full left-0 top-0 py-4 px-2 lg:px-10">
      <div className="flex justify-between items-center">
        <Link href="/">
          {" "}
          <h1 className="uppercase tracking-wider xl:text-2xl sm:text-xl">
            TuonAnime
          </h1>
        </Link>
        <div className="hidden sm:block">
          <div className="flex items-center gap-5">
            <Filter />
            <Search />
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <LoginComPonent />
          </div>
        </div>
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger><Menu/></DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 bg-pinkpastel">
              <DropdownMenuLabel>Anime Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
