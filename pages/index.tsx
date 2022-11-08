import Section from "../components/Section";

const Home = () => {
  return (
    <>
      <Section
        title={`Welcome to Twitter for Notion`}
        buttonText={`Get Started`}
        id={`get-started`}
        link={`/twitter`}
      />
    </>
  );
};

export default Home;
