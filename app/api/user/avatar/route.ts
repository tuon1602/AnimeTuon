import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const data = await req.json();
  console.log(data)
  try {
    if (data) {
      const email = data.email;
      const avatar = data.avatar;
      if (email && avatar) {
        const user = await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            avatar: avatar,
          },
        });
        return NextResponse.json({ status: 200, data: "user updated" });
      } else {
        return NextResponse.json({ status: 404, error: "no data" });
      }
    }
  } catch (error) {
    return NextResponse.json({ status: 500, error: "There is an error" });
  }
}
