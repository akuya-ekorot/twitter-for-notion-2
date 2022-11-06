const Section = ({ title, buttonText }) => {
  return (
    <div className="flex flex-col text-2xl gap-6 w-screen h-screen items-center justify-center">
      <h1>{title}</h1>
      <a className="px-5 py-4 rounded text-base bg-black text-white">
        {buttonText}
      </a>
    </div>
  );
};

export default Section;
