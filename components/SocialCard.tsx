import Image from "next/image";
import Link from "next/link";

const SocialCard = ({ details, expand }: any) => {
  return (
    <div
      key={details.name}
      className={`${
        !expand && `bg-${details.name}`
      } bg-cover bg-no-repeat grow w-[100px] rounded`}
    >
      <div
        className={`${
          expand ? "opacity-100" : "opacity-0 invisible"
        } relative justify-between h-full ease-in-out duration-300 flex flex-col hover:shadow-md hover:shadow-gray-300 rounded items-center gap-10 p-10`}
      >
        <div className={`ease-in-out duration-300 w-20 h-20 relative`}>
          <Image
            src={`/${details.name}.svg`}
            layout="fill"
            alt={`${details.name}'s logo`}
          />
        </div>
        <div
          className={`${
            !expand ? "opacity-0 hidden" : "opacity-100"
          } ease-out duration-700 text-lg rounded w-full`}
        >
          <p>{details.details}</p>
        </div>
        <Link
          href="/api/twitter/auth"
          className={`${
            !expand ? "opacity-0 hidden" : "opacity-100"
          } ease-out duration-700 bg-gray-900 text-gray-100 py-3 px-4 rounded`}
        >
          <p>Connect to {details.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default SocialCard;
