
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Registration failed" },
        { status: response.status }
      );
    }
    const res = NextResponse.json(
      {
        message: "Registration successful",
        user: data.user || data.data?.user || null,
      },
      { status: 201 }
    );

    return res;
  } catch (error) {
    console.error("Register route error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
