import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest, response: NextResponse) => {
  return Response.json({ message: "User api" });
};
