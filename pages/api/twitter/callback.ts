import type { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initFirestore";
import TwitterApi from "twitter-api-v2";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { state, code } = req.query;
  const { sessionState, codeVerifier } = req.cookies;

  if (!codeVerifier || !state || !sessionState || !code) {
    return res
      .status(400)
      .send("You denied the app permission or your session expired");
  }

  if (state !== sessionState) {
    return res.status(400).send("Stored tokens did not match");
  }

  const client = new TwitterApi({
    clientId: process.env.TWITTER_OAUTH2_CLIENT_ID,
    clientSecret: process.env.TWITTER_OAUTH2_CLIENT_SECRET,
  });

  client
    .loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: process.env.CALLBACK_URL,
    })
    .then(
      async ({
        client: loggedClient,
        accessToken,
        refreshToken,
        expiresIn,
      }) => {
        const { data: user } = await loggedClient.v2.me();
        console.log(user);
      }
    );
  res.status(200).json({ name: "Thanks for calling back" });
}
