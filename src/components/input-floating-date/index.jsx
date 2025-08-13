import { cn } from "../../app/helpers/cn";

export function InputFloatingDate({
  id = "input-date",
  disabled,
  label = "",
  className = "",
  value,
  onChange,
  ...props
}) {
  const inputBaseClass =
    "peer w-full border border-black rounded-md px-2 pt-5 pb-2 text-sm bg-white focus:outline-none focus:border-green-600";

  const labelBaseClass =
    "absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600 transition-all peer-focus:text-green-600";

  return (
    <div className={cn("relative mt-5 max-w-[160px] w-full", className)}>
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
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
