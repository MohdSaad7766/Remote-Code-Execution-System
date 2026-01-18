const InputField = ({ label, placeholder, value, onChange }) => (
    <div className="flex flex-col">
        {label && <label className="text-lg font-semibold text-white">{label}</label>}
        <input
            type="text"
            className="border border-gray-600 bg-gray-800 p-2 rounded text-white placeholder-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);
export default InputField;