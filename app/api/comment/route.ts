import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: Request) {
    try{
        const {searchParams} = new URL(req.url)
        const email = searchParams.get('email')
        const animeId = searchParams.get("animeId")
        const chapterId = searchParams.get("chapterId")
        if(animeId){
            const commentDataByAnimeId = await prisma.comment.findMany({
                where:{
                    animeId : animeId, 
                },
                include:{
                    user:true
                },
            })
            return NextResponse.json({ status:200,commentDataByAnimeId});
        }
        else if(chapterId){
            const commentData = await prisma.comment.findMany({
                where:{
                    // animeId : animeId,
                    animeChapterId: chapterId,
                },
                include:{
                    user:true
                }
            })
            return NextResponse.json({status:200, commentData });
        }
    }catch(error:any){
    return NextResponse.json({ status: 500, error: error.message });

    }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data)
    if (data) {
      const comment = await prisma.comment.create({ data: data });
      return NextResponse.json({ status:200,comment });
    }
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}
