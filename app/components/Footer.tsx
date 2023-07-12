import React from "react";
import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex gap-20 bg-pinkpastel justify-center mt-10 py-10 items-center">
      <p className="flex gap-1">
        <Copyright /> 2023 Copyright by Tuon, Iu Huyn Thúi :3
      </p>
    </div>
  );
};

export default Footer;
