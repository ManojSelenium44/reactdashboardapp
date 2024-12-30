import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TestingData } from "@/types/dashboard";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpDown, ChevronDown, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface ProjectsTableProps {
  data: TestingData[];
  filter: { type: string; value: string } | null;
  onClearFilter: () => void;
}

export const ProjectsTable = ({ data, filter, onClearFilter }: ProjectsTableProps) => {
  const [sortField, setSortField] = useState<keyof TestingData>("projectName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  const [dropdownSearch, setDropdownSearch] = useState<Record<string, string>>({});

  const getUniqueValues = (field: keyof TestingData) => {
    return Array.from(new Set(data.map(item => item[field]))).sort();
  };

  const filteredData = [...data].filter(row => {
    return Object.entries(columnFilters).every(([key, values]) => {
      if (!values || values.length === 0) return true;
      return values.includes(row[key as keyof TestingData]);
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === "asc" 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (field: keyof TestingData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleFilter = (field: keyof TestingData, value: string) => {
    setColumnFilters(prev => {
      const currentValues = prev[field] || [];
      const valueExists = currentValues.includes(value);
      
      if (valueExists) {
        // Remove the value if it exists
        return {
          ...prev,
          [field]: currentValues.filter(v => v !== value)
        };
      } else {
        // Add the value if it doesn't exist
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };

  const clearColumnFilter = (field: keyof TestingData) => {
    setColumnFilters(prev => ({
      ...prev,
      [field]: []
    }));
    setDropdownSearch(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const renderColumnFilter = (field: keyof TestingData) => {
    const uniqueValues = getUniqueValues(field);
    const filteredValues = uniqueValues.filter(value =>
      value.toLowerCase().includes(dropdownSearch[field]?.toLowerCase() || '')
    );
    const selectedValues = columnFilters[field] || [];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 w-full">
            {selectedValues.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-[200px] overflow-hidden">
                {selectedValues.map((value, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {value}
                  </Badge>
                ))}
              </div>
            ) : (
              `Filter ${field}`
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <div className="p-2">
            <Input
              placeholder="Search..."
              value={dropdownSearch[field] || ''}
              onChange={(e) => setDropdownSearch(prev => ({
                ...prev,
                [field]: e.target.value
              }))}
              className="h-8"
            />
          </div>
          <DropdownMenuSeparator />
          <div className="max-h-[200px] overflow-y-auto">
            {filteredValues.map((value) => (
              <DropdownMenuItem
                key={value}
                onClick={() => toggleFilter(field, value)}
                className="flex items-center justify-between"
              >
                <span>{value}</span>
                {selectedValues.includes(value) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
          {selectedValues.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => clearColumnFilter(field)}
                className="justify-center text-destructive"
              >
                Clear Filter
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderSortableHeader = (field: keyof TestingData, label: string) => (
    <TableHead>
      <div className="space-y-2">
        <div 
          className="cursor-pointer hover:bg-accent/50 transition-colors flex items-center space-x-2"
          onClick={() => handleSort(field)}
        >
          <span>{label}</span>
          <ArrowUpDown className="h-4 w-4" />
        </div>
        {renderColumnFilter(field)}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      {filter && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">
            Filtered by {filter.type}: {filter.value}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilter}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="rounded-md border bg-white/5 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {renderSortableHeader("projectName", "Project")}
              {renderSortableHeader("moduleName", "Module")}
              {renderSortableHeader("frameworkType", "Framework")}
              {renderSortableHeader("toolName", "Tool")}
              {renderSortableHeader("testingType", "Testing Type")}
              {renderSortableHeader("technologyStack", "Technology")}
              {renderSortableHeader("supportService", "Support")}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow 
                key={index} 
                className={`
                  hover:bg-accent/50 transition-colors cursor-pointer
                  ${selectedRow === index ? 'bg-accent/30' : ''}
                `}
                onClick={() => setSelectedRow(index === selectedRow ? null : index)}
              >
                <TableCell className="font-medium">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{row.projectName}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-2">
                        <p className="font-semibold">Project Details</p>
                        <p>Technology Stack: {row.technologyStack}</p>
                        <p>Tool Version: {row.toolVersion}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.moduleName}</TableCell>
                <TableCell>{row.frameworkType}</TableCell>
                <TableCell>{row.toolName}</TableCell>
                <TableCell>{row.testingType}</TableCell>
                <TableCell>{row.technologyStack}</TableCell>
                <TableCell>{row.supportService}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};