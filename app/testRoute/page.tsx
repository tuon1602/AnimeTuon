"use client"

import React,{useState} from "react";
import { Input } from "@/components/ui/input";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {AdvancedImage} from "@cloudinary/react";




const TestRoute = () => {
    const [image,setImage] = useState('')
    const handleSubmitImage = async ()=>{
        const formData = new FormData()
        formData.append('file',image)
        formData.append('upload_preset',"animetuon")
        formData.append('cloud_name','dnmaspas5')
        const res = await fetch('https://api.cloudinary.com/v1_1/dnmaspas5/image/upload',{
            method: 'POST',
            body: formData
        })
        console.log(await res.json())
    }
  return (
    <div className="min-h-[80vh]">
        <Input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        <button onClick={handleSubmitImage}>Upload</button>
    </div>
  );
};

export default TestRoute;
