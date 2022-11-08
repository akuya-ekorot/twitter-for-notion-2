import Section from "../components/Section";

const Notion = ({ username }: any) => {
  console.log(username);
  return (
    <>
      <h1>{username.id}</h1>
      <Section
        title={`Let's connect to Notion`}
        buttonText={`Log in to Notion`}
        id={`notion`}
        link={`https://api.notion.com/v1/oauth/authorize?client_id=40b91009-9771-41f8-8104-ed2f9856cac3&response_type=code&owner=user&state=${username.id}`}
      />
    </>
  );
};

const getServerSideProps = async (context: any) => {
  console.log(context.query);
  return {
    props: {
      username: context.query,
    },
  };
};

export { getServerSideProps };
export default Notion;
