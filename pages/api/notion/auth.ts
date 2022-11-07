import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res
    .status(200)
    .redirect(
      "https://api.notion.com/v1/oauth/authorize?client_id=40b91009-9771-41f8-8104-ed2f9856cac3&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fnotion%2Fauth"
    );
}
