"use client";

import React,{useState,useEffect} from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import useStore from "@/store";

const LoginComPonent = () => {
  const setUserEmail = useStore((state:any)=>state.setUserEmail)
  const avatarData = useStore((state:any)=>state.avatarData)
  const fetchAvatarData = useStore((state:any)=>state.fetchAvatarData)
  const session = useSession();
  const router = useRouter();
  useEffect(()=>{
    setUserEmail(session?.data?.user?.email)
  },[session?.data?.user?.email])
  useEffect(()=>{
    fetchAvatarData()
  },[avatarData])
  return (
    <div>
      {session.status === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            {session?.data?.user?.image && (
              <Avatar>
                <AvatarImage src={avatarData} />
                {/* <AvatarFallback>CN</AvatarFallback> */}
              </Avatar>
            )}
            {!session?.data?.user?.image && (
              <User/>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-pinkpastel">
            <DropdownMenuLabel>
              Hi {session?.data?.user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>router.push('/profile')} className="cursor-pointer">Profile</DropdownMenuItem>
            
             {/* <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button className="bg-lightgreen hover:opacity-80" variant="outline">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default LoginComPonent;
