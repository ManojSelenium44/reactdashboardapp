import { Button } from "@/components/ui/button";
import { FileUpload } from "./FileUpload";
import { TestingData } from "@/types/dashboard";
import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  onFileUpload: (file: File) => void;
  data: TestingData[] | null;
  onReset: () => void;
}

export const DashboardHeader = ({ onFileUpload, data, onReset }: DashboardHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Project Analytics Dashboard</h1>
        {data && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              Export Report
            </Button>
            <Button variant="outline" onClick={onReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      {!data && <FileUpload onFileUpload={onFileUpload} />}
    </div>
  );
};