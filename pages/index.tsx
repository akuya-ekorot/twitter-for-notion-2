import Head from "next/head";
import Image from "next/image";
import Section from "../components/Section";

const Home = () => {
  return (
    <Section
      title={`Welcome to Twitter for Notion`}
      buttonText={`Get Started`}
    />
  );
};

export default Home;
