import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputAvatarButton from "../components/buttons/InputAvatarButton";
import AnimeProfileCards from "../components/profile/AnimeProfileCards";


async function getUserDetail() {
  const session = await getServerSession(options);
  if (session) {
    const res = await fetch(
      `${process.env.API_URL}/user?email=${session?.user?.email}`,{
      cache:"no-store"
      }
    );
    if (!res.ok) {
      throw new Error("Could not fetch user");
    }
    return res.json();
  }
}

const ProfilePage = async () => {
  const userDetail = await getUserDetail();
  const session = await getServerSession(options);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-[80vh]">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-4xl dark:text-darkwhite">
          <span className="opacity-50 dark:text-darkwhite">Hello</span> {session?.user?.name}
        </h1>
        <div>
          <InputAvatarButton avatarUrl={userDetail?.data?.avatar} userEmail={userDetail?.data?.email}/>
        </div>
        <p className="dark:text-darkwhite">We hope u hav an good anime experience here! :b</p>
        <div className="mt-5 items-center flex flex-col gap-5">
          <p className="text-4xl font-bold dark:text-darkwhite">Your favorite Animes!</p>
          <AnimeProfileCards userEmail={userDetail?.data?.email}/>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
