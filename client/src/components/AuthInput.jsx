const AuthInput = ({
  label,
  type,
  icon: Icon,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <div className="flex items-center bg-gray-100 rounded-md mt-1 px-2focus-within:ring-2 focus-within:ring-black transition">
        <Icon className="text-gray-400" />

        <input
          type={type}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent w-full h-10 px-2 outline-none"
        />
      </div>
    </div>
  );
};

export default AuthInput;
