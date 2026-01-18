const DynamicInputGroup = ({ label, fields, onAdd,onRemove, renderFields }) => (
    <div>
        <h3 className="text-white text-xl font-semibold mb-2">{label}</h3>
        {fields.map((field, index) => (
            <div key={index} className="flex flex-col gap-2 mb-4">
                {renderFields(field, index)}
            </div>
        ))}
        <button type="button" onClick={onAdd} className="text-green-400 hover:underline mr-3">+ Add</button>
        <button type="button" onClick={onRemove} className="text-green-400 hover:underline">- Remove</button>

    </div>
);
export default DynamicInputGroup;