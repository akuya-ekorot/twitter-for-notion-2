import Head from "next/head";
import Image from "next/image";
import Section from "../components/Section";

const Home = () => {
  return (
    <>
      <Section
        title={`Welcome to Twitter for Notion`}
        buttonText={`Get Started`}
        id={`get-started`}
        linkToSection={`twitter`}
      />
      <Section
        title={`Connect your Twitter account`}
        buttonText={`Log in to Twitter`}
        id={`twitter`}
        linkToSection={`notion`}
      />
      <Section
        title={`Let's set up your Notion`}
        buttonText={`Connect to Notion`}
        id={`notion`}
      />
    </>
  );
};

export default Home;
