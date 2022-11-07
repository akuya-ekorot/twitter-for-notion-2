interface SectionProps {
  title: string;
  buttonText: string;
  id: string;
  link?: string;
}

const Section = ({ title, buttonText, id, link }: SectionProps) => {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center w-screen h-screen text-2xl gap-6"
    >
      <h1>{title}</h1>
      <a
        href={link && `${link}`}
        className="px-5 py-4 text-base text-white bg-black rounded"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default Section;
