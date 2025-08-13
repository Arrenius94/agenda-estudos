import { cn } from "../../app/helpers/cn";

export const MyTextArea = ({ placeholder, disabled, rows, className = "", value, onChange, ...props }) => {
  const defaultTextAreaClass = `
  w-full  
  border border-black p-1.5 rounded 
  focus:border-green-600 focus:outline-none
`;

  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={cn(defaultTextAreaClass, className)}
      {...props}
    />
  );
};
