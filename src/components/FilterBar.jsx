import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DESTINATIONS = [
  { label: "All Destinations", value: "ALL" },
  { label: "Atlanta, GA", value: "ATL" },
  { label: "Newark, NJ", value: "EWR" },
  { label: "Dallas, TX", value: "DFW" },
  { label: "Los Angeles, CA", value: "LAX" },
  { label: "Orlando, FL", value: "MCO" },
  { label: "Delhi, India", value: "DEL" },
];


const travelStyles = [
  "All Styles",
  "Adventure",
  "Luxury",
  "Budget",
  "Backpacking",
  "Cultural",
  "Relaxation",
  "Photography",
  "Foodie"
];

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedDestination,
  onDestinationChange,
  selectedStyle,
  onStyleChange
}) {
  const hasActiveFilters = selectedDestination !== "All Destinations" || selectedStyle !== "All Styles";

  const clearFilters = () => {
    onDestinationChange("All Destinations");
    onStyleChange("All Styles");
  };

  return (
    <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, destination, or interests..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Filters:</span>
          </div>

          <Select value={selectedDestination} onValueChange={onDestinationChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              {DESTINATIONS.map((dest) => (
                <SelectItem key={dest.value} value={dest.value}>
                  {dest.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStyle} onValueChange={onStyleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Travel Style" />
            </SelectTrigger>
            <SelectContent>
              {travelStyles.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
