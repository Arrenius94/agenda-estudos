import { cn } from "../../app/helpers/cn";

export const MyInput = ({ placeholder, type = "", onChange, value, className = "", ...props }) => {
  const defaultInputClass = "border border-black rounded focus:border-green-500 text-sm p-3 bg-white";
  return (
    <input
      className={cn(defaultInputClass, className)}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    ></input>
  );
};
