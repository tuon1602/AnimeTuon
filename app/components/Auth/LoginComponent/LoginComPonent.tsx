"use client";

import React from "react";
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

const LoginComPonent = () => {
  const session = useSession();
  console.log(session.data?.user);
  return (
    <div>
      {session.status === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            {session?.data?.user?.image && (
              <Avatar>
                <AvatarImage src={session.data?.user?.image} />
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
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
