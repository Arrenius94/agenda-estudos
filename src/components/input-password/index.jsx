import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { cn } from "../../app/helpers/cn";

export const MyPasswordInput = ({ placeholder = "", value, onChange, className = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputBaseClass =
    "block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500 pr-10 border rounded focus:border-green-600 text-sm p-3 bg-white focus:outline-none text-sm";

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(inputBaseClass, className)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black cursor-pointer"
        tabIndex={-1}
      >
        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
      </button>
    </div>
  );
};
