import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/initFirestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getNotionData = async () => {
    const notionData = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        code: req.query.code,
        grant_type: "authorization_code",
      },
      {
        auth: {
          username: String(process.env.NOTION_OAUTH_CLIENT_ID),
          password: String(process.env.NOTION_OAUTH_CLIENT_SECRET),
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(notionData);
    return notionData;
  };

  const notionData = await getNotionData();

  const docRef = doc(db, "users", String(req.query.state));

  setDoc(
    docRef,
    {
      notion: {
        ...notionData.data,
      },
    },
    { merge: true }
  );

  res.status(200).redirect(`/api/server?id=${docRef.id}`);
}
