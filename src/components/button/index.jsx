import { cn } from "../../app/helpers/cn";

// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

export const MyButton = ({ children, type, disabled, color = "green", className = "", ...props }) => {
  const defaultButtonClass = "flex items-center px-4 py-2.5 text-md rounded-lg ";
  const colors = {
    green:
      "bg-green-500 text-black rounded hover:bg-green-400 transition active:opacity-75 cursor-pointer flex items-center gap-1",
    red: "bg-red-500 text-black rounded hover:bg-red-400 transition active:opacity-75 cursor-pointer flex items-center gap-1",
    transparent:
      "bg-transparent text-black rounded hover:bg-gray-100 transition active:opacity-75 cursor-pointer flex items-center gap-1",
  };

  const colorClass = colors[color] || colors.green;

  return (
    <button className={cn(defaultButtonClass, colorClass, className)} {...props} disabled={disabled} type={type}>
      {children}
    </button>
  );
};
