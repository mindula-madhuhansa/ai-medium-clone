import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="flex items-center rounded-full bg-gray-200/30 px-2 py-1">
      <SearchIcon className="size-6 text-muted-foreground" />
      <Input
        placeholder="Search"
        className="bg-transparent shadow-none border-none focus-visible:ring-0 focus-visible:outline-none"
      />
    </div>
  );
};

export { SearchBar };
