import { useState } from "react";
import HeroCopy from "../components/HeroCopy";
import SocialCard from "../components/SocialCard";

const onboardingDetails = [
  {
    name: "twitter",
    details:
      "Let's start by connecting your Twitter account. This will give Twitter For Notion the necessary permissions to publish tweets on your behalf",
  },
  {
    name: "notion",
    details:
      "Connecting to Notion will give Twitter For Notion access to the database where you will be planning, scheduling and publishing your tweets.",
  },
];

const Home = ({ id }: any) => {
  const [expand, setExpand] = useState(() => (id ? true : false));

  const handleClick = () => {
    setExpand((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col w-screen h-[720px] justify-between text-gray-900 items-center p-16">
      <div
        className={`${
          expand ? "w-full grow" : "w-[250px]"
        } ease-in-out duration-300 flex gap-[50px] h-24`}
      >
        {onboardingDetails.map((details) => {
          return <SocialCard details={details} expand={expand} />;
        })}
      </div>
      <HeroCopy expand={expand} />
      <div
        role={`link`}
        onClick={handleClick}
        className={` ${
          expand ? "opacity-0 invisible" : "opacity-100"
        } cursor-pointer ease-out duration-300 bg-gray-900 text-gray-100 py-3 px-4 rounded`}
      >
        <p>Get Started</p>
      </div>
    </div>
  );
};

const getServerSideProps = (context: any) => {
  return {
    props: {
      id: context.query.id ? context.query.id : null,
    },
  };
};

export { getServerSideProps };
export default Home;
