import { getDoc, doc } from "firebase/firestore";
import { db } from "./api/firebase/initFirestore";
import { useState } from "react";

const Dashboard = (props: any) => {
  const [toggle, setToggle] = useState(() => false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="p-10 w-screen h-screen flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold">
        Welcome to the Dashboard {props.name}
      </h1>
      <p>Use this button to toggle Twitter for Notion on or off</p>
      <button
        className="rounded-lg p-5 bg-black text-white"
        onClick={handleToggle}
      >
        Turn {toggle ? "off" : "on"}
      </button>
    </div>
  );
};

const getServerSideProps = async (context: any) => {
  const username = context.query.id;
  const userRef = doc(db, "users", username);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();

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
