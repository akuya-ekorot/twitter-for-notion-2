import type { NextApiRequest, NextApiResponse } from "next";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/initFirestore";
import TwitterApi from "twitter-api-v2";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { state, code } = req.query;
  code = String(code);
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

  const {
    client: loggedClient,
    accessToken,
    refreshToken,
    expiresIn,
  } = await client.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: String(process.env.CALLBACK_URL),
  });

  const { data: user } = await loggedClient.v2.me();

  const docRef = doc(db, "users", `${user.username}`);

  setDoc(
    docRef,
    {
      twitter: {
        accessToken,
        refreshToken,
        expiresIn,
        user,
      },
    },
    { merge: true }
  );

  res.status(200).redirect(`/notion?id=${user.username}`);
}
