import { getDoc, doc } from "firebase/firestore";
import { db } from "./api/firebase/initFirestore";

const Dashboard = (props: any) => {
  return (
    <>
      <img src={props.workspaceIcon} height="30px" width="30px" />
      <h1>Welcome to the Dashboard {props.name}</h1>
      <h2>Notion Workspace: {props.workspace}</h2>
    </>
  );
};

const getServerSideProps = async (context: any) => {
  const username = context.query.id;
  const userRef = doc(db, "users", username);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();

  console.log(user);

  return {
    props: {
      username,
      name: user?.twitter.user.name,
      workspace: user?.notion.workspace_name,
      workspaceIcon: user?.notion.workspace_icon,
    },
  };
};

export { getServerSideProps };
export default Dashboard;
