import React from "react";
import { Copyright } from "lucide-react";
import Link from "next/link";
import { Github ,Facebook} from "lucide-react";

const Footer = () => {
  return (
    <div className="flex bg-pinkpastel justify-center mt-10 py-10 items-center flex-col gap-3">
      <p className="flex gap-1">
        <Copyright /> 2023 Copyright by Tuon, Iu Huyn Thúi :3
      </p>
      <div className="flex gap-4">
        <Link href="https://github.com/tuon1602/AnimeTuon" className="duration-300 transition-all ease-in-out hover:opacity-50"><Github/></Link>
        <Link href="https://www.facebook.com/TuonNguyen1602/" className="duration-300 transition-all ease-in-out hover:opacity-50"><Facebook/></Link>
      </div>
    </div>
  );
};

export default Footer;
