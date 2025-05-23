import { cn } from "../../app/helpers/cn";

export function InputFloatingDate({ id = "input-time", label = "", className = "", value, onChange, ...props }) {
  const defaultFloartingDate =
    "peer h-12 w-full border border-black rounded px-2 pt-5 text-sm bg-white focus:outline-none focus:border-green-600";
  return (
    <div className="relative w-full max-w-[160px] mt-4">
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        {...props}
        placeholder=" "
        className={cn(defaultFloartingDate, className)}
      />
      <label
        htmlFor={id}
        className="absolute left-2 top-2 text-xs text-gray-600 bg-white px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all"
      >
        {label}
      </label>
    </div>
  );
}
