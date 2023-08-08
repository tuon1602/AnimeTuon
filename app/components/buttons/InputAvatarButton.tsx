"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

interface InputAvatarButtonIF {
  avatarUrl: string;
  userEmail: string;
}

const InputAvatarButton: React.FC<InputAvatarButtonIF> = ({
  avatarUrl,
  userEmail,
}) => {
//   const [image, setImage] = useState("");
  const [cloudImage, setCloudImage] = useState("");
  const handleSubmitImage = async (event: any) => {
    const selectedImage = event.target.files[0];
    // setImage(selectedImage);
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "animetuon");
      formData.append("cloud_name", "dnmaspas5");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dnmaspas5/image/upload ",
          {
            method: "POST",
            body: formData,
          }
        );
        if (res.ok) {
          const data = await res.json();

          const updateAvatarRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/avatar`,
            {
              method: "PUT",
              body: JSON.stringify({ email: userEmail, avatar: data.url }),
            }
          );
          const avatarResData = await updateAvatarRes.json()
          if(avatarResData.status===200) {
            window.location.reload()
          }
          
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Label
        htmlFor="avatar"
        className="h-fit w-fit cursor-pointer hover:opacity-50"
      >
        <Avatar className="w-36 h-36">
          <AvatarImage src={`${avatarUrl}`} />
          <AvatarFallback className="border">Blank</AvatarFallback>
        </Avatar>
      </Label>
      <Input
        type="file"
        id="avatar"
        className="hidden"
        onChange={handleSubmitImage}
        accept="image/*"
      />
    </div>
  );
};

export default InputAvatarButton;
