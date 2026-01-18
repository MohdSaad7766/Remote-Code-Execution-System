import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Fequently_ask({ que, ans, isOpen, setIsOpen }) {
  return (
    <div className="p-4 border-b border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between"
      >
        <span className="text-sm font-medium text-white">{que}</span>
        <ChevronDownIcon
          className={`size-5 fill-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 text-sm text-white/80">
          {ans?.map((item, index) => (
            <span key={index} className="mr-1">
              {item}
              {index < ans.length - 1 && ','}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
