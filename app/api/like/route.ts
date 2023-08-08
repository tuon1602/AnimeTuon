import { Prisma, PrismaClient } from "@prisma/client";
import { Trophy } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const animeId = searchParams.get("animeId");
    const userEmail = searchParams.get("userEmail");
    if (animeId && userEmail) {
      const like = await prisma.like.findFirst({
        where: {
          animeId: animeId,
          userEmail: userEmail,
        },
        include: {
          user: true,
        },
      });
      return NextResponse.json({ status: 200, like });
    } else {
      return NextResponse.json({ status: 404, message: "missing parameter" });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    if (data) {
      const likeCheck = await prisma.like.findFirst({
        where: {
          AND:[
            { animeId: data.animeId }, // Condition 1: Check if the username matches
            { userEmail: data.userEmail }, // Condition 2: Check if
          ]
        },
      });
      if (likeCheck) {
        return NextResponse.json({ status: 401, error: "like created" });
      }
      const like = await prisma.like.create({ data: data });
      return NextResponse.json({ status: 200, like });
    }
  } catch (error) {
    // return NextResponse.json({ status: 500, message: error });
    console.error(error);
  }
}
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    if (data) {
      const like = await prisma.like.delete({
        where: {
          id: data.id,
        },
      });
      return NextResponse.json({ status: 200, message: "deleted" });
    }
  } catch (error) {
    // return NextResponse.json({ status: 500, message: error });
    console.error(error);
  }
}
