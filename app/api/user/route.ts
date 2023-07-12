import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient()

async function hashPassword(password:string) {
    const saltRounds = 10
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return console.error("hash failed",error);
  }
}

export async function GET(req: Request){
    try{
        const {searchParams} = new URL(req.url)
        const email = searchParams.get("email")
        if(email){
            const data = await prisma.user.findUnique({
                where:{
                    email: email
                },
                include:{
                    comments:true
                },
            })
            return NextResponse.json({status:200,data})
        }
        else{
        return NextResponse.json({status:404,message:"email not found"});

        }
    }
    catch(error:any){
        return NextResponse.json({status:500,error:error.message});
    }
}

//register user 
export async function POST(req: Request ){
    try{
        const data = await req.json();
        if(data){
            const email = data.email
            const username = data.username
            const password = data.password
            if(password){
                const hashedPassword = await hashPassword(password)
                data.password = hashedPassword
            }
            const userEmailCheck = await prisma.user.findUnique({
                where:{
                  email:email
                }
              })
                if(userEmailCheck){
                  return NextResponse.json({status: 401,error:"user created"})
                }
            const user = await prisma.user.create({data:data})
            if(user){
                return NextResponse.json({status:200, user });
            }
        }
    }
    catch(error){
        return NextResponse.json({ status:500,error });
    }
}
