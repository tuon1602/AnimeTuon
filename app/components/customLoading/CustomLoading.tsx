"use client"

import React from 'react'
import Icon from "@/public/icon.png"
import Image from "next/image"
import { motion } from 'framer-motion'

const CustomLoading = () => {
  return (
    <div className=" min-h-[80vh] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="w-fit"
      >
        <Image src={Icon} height={350} width={350} alt="loading" />
      </motion.div>
    </div>
  );
};

export default CustomLoading;
