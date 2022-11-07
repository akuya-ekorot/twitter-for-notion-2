import TwitterApi from "twitter-api-v2";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/initFirestore";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

type Data = {
  name: string;
};

const clientId: string = process.env.TWITTER_OAUTH2_CLIENT_ID;
const clientSecret: string = process.env.TWITTER_OAUTH2_CLIENT_SECRET;
const callbackUrl: string = process.env.CALLBACK_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const twitterClient = new TwitterApi({
    clientId,
    clientSecret,
  });

  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackUrl,
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
