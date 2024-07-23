import { NextRequest } from "next/server";

export const GET = (
  request: NextRequest,
  { params }: { params: { username: string } }
) => {
  const username = params.username;

  return Response.json({ username: `Username api's username ${username}` });
};
