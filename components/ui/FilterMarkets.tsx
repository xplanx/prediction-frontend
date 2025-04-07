"use client";

import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

const filters = createListCollection({
  items: [
    { label: "Trending", value: "trending" },
    { label: "New", value: "new" },
    { label: "Featured", value: "featured" },
    { label: "Closed", value: "closed" },
  ],
});

export default function FilterMarkets() {
  return (
    <SelectRoot
      size="md"
      variant="subtle"
      collection={filters}
      defaultValue={["trending"]}
      className="right-0 block max-w-28 self-end rounded-xl bg-slate-800 text-sm text-slate-100 md:absolute md:self-start lg:max-w-36 lg:text-base"
    >
      <SelectTrigger>
        <span className="w-full px-4">
          <SelectValueText />
        </span>
      </SelectTrigger>
      <SelectContent className="flex flex-col gap-0.5 rounded-xl bg-slate-800 text-slate-100">
        {filters.items.map((filter) => (
          <SelectItem
            item={filter}
            key={filter.value}
            className="rounded hover:bg-slate-900 data-[state=checked]:bg-slate-900"
          >
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
