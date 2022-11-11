import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase/initFirestore";
import { Client } from "@notionhq/client";
import { TweetV2PostTweetResult, TwitterApi } from "twitter-api-v2";

const handler = async (req, res) => {
  //fetch twitter and notion data from the db specific to this user
  const id = req.query.id;
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  //query the notion db for pages in the publish option
  const notion = new Client({ auth: data?.notion.access_token });
  const response = await notion.databases.query({
    database_id: data?.notion.duplicated_template_id,
    filter: {
      property: "Status",
      status: {
        equals: "Publish",
      },
    },
  });

  //recursive function to get children of a notion block object
  const getChildren: any = async (block: any) => {
    const childBlocks = [];

    const children = await notion.blocks.children.list({
      block_id: block.id,
    });

    for (let i = 0; i < children.results.length; i++) {
      let child = children.results[i];
      let id = child.id;
      let hasChildren = child.has_children;
      let type = child.type;
      let content =
        type == "image"
          ? child.image.file.url
          : type == "child_page"
          ? child[type].title
          : child[type]?.rich_text[0].plain_text;

      const childBlock = {
        id,
        hasChildren,
        type,
        content,
        children: hasChildren ? await getChildren(child) : false,
      };

      childBlocks.push(childBlock);
    }

    return childBlocks;
  };

  const tweets: any = [];

  for (let x = 0; x < response.results.length; x++) {
    const tweet = await getChildren(response.results[x]);
    tweets.push(tweet);
  }

  //create a twitter client
  const twitter = new TwitterApi({
    clientId: process.env.TWITTER_OAUTH2_CLIENT_ID,
    clientSecret: process.env.TWITTER_OAUTH2_CLIENT_SECRET,
  });

  // refresh twitter client
  const {
    client: refreshedTwitter,
    accessToken,
    refreshToken,
  } = await twitter.refreshOAuth2Token(data?.twitter.refreshToken);

  // add new access token and refresh token to the db
  setDoc(
    docRef,
    {
      twitter: {
        accessToken,
        refreshToken,
      },
    },
    { merge: true }
  );

  const captions: string[] = [];

  tweets.forEach((tweet) => {
    //find the tweet caption
    const getCaption = (tweet) => {
      for (let i = 0; i < tweet.length; i++) {
        const twit = tweet[i];

        if (twit.type == "paragraph") {
          return tweet[i].content;
        }

        if (twit.hasChildren) {
          return getCaption(twit.children);
        }
      }
    };
    captions.push(getCaption(tweet));
  });

  const postResults: TweetV2PostTweetResult[] =
    await refreshedTwitter.v2.tweetThread(captions);

  res.status(200).send(postResults);
};

export default handler;
