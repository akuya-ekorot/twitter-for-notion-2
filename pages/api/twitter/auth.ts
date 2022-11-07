import TwitterApi from "twitter-api-v2";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/initFirestore";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const twitterClient = new TwitterApi({
    clientId: process.env.TWITTER_OAUTH2_CLIENT_ID,
    clientSecret: process.env.TWITTER_OAUTH2_CLIENT_SECRET,
  });

  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    process.env.CALLBACK_URL,
    { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
  );

  try {
    const docRef = await addDoc(collection(db, "users"), {
      url,
      codeVerifier,
      state,
    });

    const codeVerifierCookie = cookie.serialize("codeVerifier", codeVerifier, {
      httpOnly: true,
      maxAge: 60 * 60,
      secure: false,
    });

    const stateCookie = cookie.serialize("sessionState", state, {
      httpOnly: true,
      maxAge: 60 * 60,
      secure: false,
    });

    console.log(codeVerifier);
    res.setHeader("Set-Cookie", [codeVerifierCookie, stateCookie]);
    res.status(200).redirect(url);
  } catch (e) {
    console.log("Error adding document: ", e);
  }
}
