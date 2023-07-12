import React from "react";
import { ThemeToggle } from "./buttons/ThemeToggle";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import Link from "next/link";
import Search from "./search/Search";
import LoginComPonent from "./Auth/LoginComponent/LoginComPonent";


const Header = () => {
  return (
    <div className="fixed border-b-2 z-50 border-grey-300 bg-pinkpastel w-full left-0 top-0 py-4 px-10">
      <div className="flex justify-between items-center">
        <Link href="/"> <h1 className="uppercase tracking-wider text-2xl">TuonAnime</h1></Link>
        <div className="flex items-center">
          <Search/>
        </div>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <LoginComPonent/>
        </div>
      </div>
    </div>
  );
};

export default Header;
