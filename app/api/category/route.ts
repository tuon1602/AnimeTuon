import { NextResponse } from "next/server";

export async function GET(req: Request){
    const {searchParams} = new URL(req.url)
    const category = searchParams.get('c')
    let startPage = Number(searchParams.get('startPage')) 
    let endPage = Number(searchParams.get('endPage')) 
    // const pages = 50
    console.log(category)
    const allData = []
    if(!category){
        return NextResponse.json({status:404,message:"No category specified"})
    }
    try{
        if(category && startPage && endPage)
        for(let pageNumber = startPage; pageNumber <= endPage; pageNumber++){
             const res = await fetch(`${process.env.ANIME_API}/top-airing?page=${pageNumber}`)
             const rawData = await res.json()
             allData.push(...rawData.results.filter((anime:any)=>anime.genres.includes(category)))
            // allData.push(...rawData.results)
        }
        else if(category && !startPage && !endPage){
            for(let pageNumber = 1; pageNumber <= 10; pageNumber++){
                const res = await fetch(`${process.env.ANIME_API}/top-airing?page=${pageNumber}`)
                const rawData = await res.json()
                allData.push(...rawData.results.filter((anime:any)=>anime.genres.includes(category)))
               // allData.push(...rawData.results)
           }
        }
    }
    catch(error){
        return NextResponse.json({status:500, error:error})
    }

    // return NextResponse.json(allData.filter((anime)=>anime.genres.includes(category)))
    return NextResponse.json({status:200,allData})
}