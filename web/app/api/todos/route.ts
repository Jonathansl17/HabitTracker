import { NextResponse } from "next/server"

// Simulated API responses - replace with your actual API calls
export async function GET() {
  try {
    // Replace with your actual API endpoint
    const response = await fetch("http://localhost:3000/habits")
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Replace with your actual API endpoint
    const response = await fetch("http://localhost:3000/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
  }
}
