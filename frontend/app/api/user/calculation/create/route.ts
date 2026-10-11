import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const reqbody = req.body;
        if (
  !reqbody?.facilityArea ||
  !reqbody?.gpuModel ||
  !reqbody?.gpuCount ||
  !reqbody?.hoursUsed ||
  reqbody?.renewableEnergyPercent == null ||
  reqbody?.pue == null ||
  reqbody?.wue == null
) {
  return NextResponse.json(
    { message: "All calculation fields are required" },
    { status: 400 }
  );
}

        const token = req.cookies.get("token")?.value;
        if(!token) return NextResponse.json(
            {
                message : "User not Authenticated"
            },{
                status: 401,
            }
        );
        const response = await fetch(`${process.env.API_URL}/api/v1/calculation/create`,{
            method: "POST",
            body: JSON.stringify(reqbody),
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
                status: 201
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