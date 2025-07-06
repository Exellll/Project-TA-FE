import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchBox = ({ className }: { className: string }) => {
  return (
    <div className="relative">
      <div
        className={`flex md:rounded-xl items-center px-5 gap-3 bg-white shadow-md w-full rounded-full ${className}`}
      >
        <input
          type="text"
          className="outline-none bg-white placeholder:text-[#AAAAAA] md:w-full w-[100px] lg:w-[250px] caret-blue-ribbon"
          placeholder="Search"
        />
        <MagnifyingGlassIcon className="w-6 h-6 text-blue-ribbon" />
      </div>
    </div>
  );
};
