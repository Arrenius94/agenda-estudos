import { cn } from "../../app/helpers/cn";

export const MyTextArea = ({ placeholder, rows, className = "", value, onChange, ...props }) => {
  const defaultTextAreaClass = "w-98 border border-black p-1.5 rounded focus:border-green-600 focus:outline-none";
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
      className={cn(defaultTextAreaClass, className)}
      {...props}
    />
  );
};
