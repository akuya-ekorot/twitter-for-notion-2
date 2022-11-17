const HeroCopy = ({ expand }) => {
  return (
    <div
      className={`${
        expand ? "opacity-0" : "opacity-100"
      } flex flex-col gap-10 relative items-center max-w-xl text-center ease-out duration-300`}
    >
      <h1
        className={`${
          expand ? "opacity-0" : "opacity-100"
        } ease-out duration-700 text-4xl font-bold`}
      >
        Plan, Schedule and Publish your Tweets Directly from Notion
      </h1>
      <p
        className={`${
          expand ? "opacity-0" : "opacity-100"
        } ease-out duration-700 text-lg`}
      >
        Super charge your Twitter content creation workflow by scheduling and
        publishing directly from a custom Notion database.
        <br /> It takes less than a minute to set up!
      </p>
    </div>
  );
};

export default HeroCopy;
