import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const token = req.cookies.get("token")?.value;
        if(!token) return NextResponse.json(
            {
                message : "User not Authenticated"
            },{
                status: 401,
            }
        );
        const response = await fetch(`${process.env.API_URL}/api/v1/user/get`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            cache: "no-store"
        });
        const data = await response.json();

        return NextResponse.json(
            {
                data: data
            },
            {
                status: 200
            }
        )
    } catch(error){
         console.error("User request error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    }
}