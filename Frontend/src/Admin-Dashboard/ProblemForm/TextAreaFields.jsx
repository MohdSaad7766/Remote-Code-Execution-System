const TextAreaField = ({ label, placeholder, value, onChange }) => (
    <div className="flex flex-col">
        {label && <label className="text-lg font-semibold text-white">{label}</label>}
        <textarea
            className="border h-15 border-gray-600 bg-gray-800 p-2 rounded text-white placeholder-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        ></textarea>
    </div>
);
export default TextAreaField;