export default function Constraints({ list }) {
  return (
    <ul className="list-disc ml-6 text-[15px] space-y-1 text-gray-300">
      {list?.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
