import { Link } from "react-router-dom";

export default function Button({ label, to, onClick,textColor="", classname = "", bgColor = "bg-white", hoverColor = "hover:bg-gray-300" }) {
  const defaultClasses = `outline pt-2.5 pb-2.5 pl-4 pr-4 transition duration-300 ease-in-out text-black font-medium rounded-xl`;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${defaultClasses} ${bgColor} ${textColor} ${hoverColor} ${classname}`}
    >
      {label}
    </Link>
  );
}
