
export default function CheckBox({ title, en, seten }) {
    return (
      <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-700">
        <input
          type="checkbox"
          checked={en}
          onChange={() => seten(!en)}
          className="form-checkbox h-4 w-4 text-blue-500"
        />
        <span>{title}</span>
      </label>
    );
}