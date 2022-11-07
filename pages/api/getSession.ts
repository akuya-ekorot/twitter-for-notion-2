import nextSession from "next-session";

const getSession = nextSession({ autoCommit: false });

export default async function handler(req, res) {
  const session = await getSession(req, res);

  await session.commit();
}
