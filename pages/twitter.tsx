import Section from "../components/Section";

const Twitter = () => {
  return (
    <Section
      title={`Connect your Twitter account`}
      buttonText={`Log in to Twitter`}
      id={`twitter`}
      link={`/api/twitter/auth`}
    />
  );
};

export default Twitter;
