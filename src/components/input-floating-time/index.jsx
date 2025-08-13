import { cn } from "../../app/helpers/cn";

export function InputFloatingTime({
  id = "input-time",
  disabled,
  label = "",
  value,
  className = "",
  onChange,
  ...props
}) {
  const inputBaseClass =
    "peer w-full border border-black rounded-md px-2 pt-5 pb-2 text-sm bg-white focus:outline-none focus:border-green-600";

  const labelBaseClass =
    "absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600 transition-all peer-focus:text-green-600";

  return (
    <div className={cn("relative mt-5", className)}>
      <input
        type="time"
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder=" "
        className={inputBaseClass}
        {...props}
      />
      <label htmlFor={id} className={labelBaseClass}>
        {label}
      </label>
    </div>
  );
}
