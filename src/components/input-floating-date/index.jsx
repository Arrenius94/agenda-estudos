"use-client";

export function InputFloatingDate({ id = "input-time", label = "", value, onChange }) {
  return (
    <div className="relative w-full max-w-[160px] mt-4">
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer h-12 w-full border border-black rounded px-2 pt-5 text-sm bg-white focus:outline-none focus:border-b-black"
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
