import Section from "../components/Section";

const Home = () => {
  return (
    <>
      <Section
        title={`Welcome to Twitter for Notion`}
        buttonText={`Get Started`}
        id={`get-started`}
        link={`#twitter`}
      />
      <Section
        title={`Connect your Twitter account`}
        buttonText={`Log in to Twitter`}
        id={`twitter`}
        link={`/api/twitter/auth`}
      />
      <Section
        title={`Let's set up your Notion`}
        buttonText={`Connect to Notion`}
        id={`notion`}
        link={process.env.NOTION_AUTH_URL}
      />
    </>
  );
};

export default Home;
