import { useState, useRef } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { ProjectsTable } from "@/components/ProjectsTable";
import { FrameworkChart } from "@/components/charts/FrameworkChart";
import { TestingTypeChart } from "@/components/charts/TestingTypeChart";
import { ModulesChart } from "@/components/charts/ModulesChart";
import { ToolsChart } from "@/components/charts/ToolsChart";
import { parseExcelFile, calculateStats } from "@/utils/excelParser";
import { TestingData } from "@/types/dashboard";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [data, setData] = useState<TestingData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{type: string, value: string} | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const parsedData = await parseExcelFile(file);
      setData(parsedData);
      toast({
        title: "Success",
        description: "Data loaded successfully",
      });
    } catch (error) {
      console.error('Error handling file upload:', error);
      toast({
        title: "Error",
        description: "Failed to parse Excel file. Please check the file format.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChartClick = (type: string, value: string) => {
    setSelectedFilter({ type, value });
    setSelectedProject(null);
    tableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectClick = (projectName: string) => {
    setSelectedProject(projectName === selectedProject ? null : projectName);
    setSelectedFilter(null);
  };

  const handleModuleClick = (moduleName: string) => {
    setSelectedFilter({ type: 'module', value: moduleName });
    setSelectedProject(null);
  };

  const handleFrameworkClick = (framework: string) => {
    setSelectedFilter({ type: 'framework', value: framework });
    setSelectedProject(null);
  };

  const handleToolClick = (tool: string) => {
    setSelectedFilter({ type: 'tool', value: tool });
    setSelectedProject(null);
  };

  const handleReset = () => {
    setSelectedFilter(null);
    setSelectedProject(null);
  };

  const filteredData = selectedProject
    ? data?.filter(item => item.projectName === selectedProject)
    : selectedFilter
    ? data?.filter(item => {
        switch (selectedFilter.type) {
          case 'framework':
            return item.frameworkType === selectedFilter.value;
          case 'module':
            return item.moduleName === selectedFilter.value;
          case 'tool':
            return item.toolName === selectedFilter.value;
          case 'testingType':
            return item.testingType === selectedFilter.value;
          default:
            return true;
        }
      })
    : data;

  const uniqueProjects = data 
    ? Array.from(new Set(data.map(item => item.projectName))).filter(name => name.trim() !== '')
    : [];

  return (
    <div className="container mx-auto py-10 space-y-8">
      <DashboardHeader onFileUpload={handleFileUpload} data={data} onReset={handleReset} />
      
      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {data && !loading && (
        <>
          {selectedProject && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">
                Filtered by Project: {selectedProject}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProject(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {uniqueProjects.map((project) => (
              <Button
                key={project}
                variant={selectedProject === project ? "default" : "outline"}
                size="sm"
                onClick={() => handleProjectClick(project)}
                className="transition-colors"
              >
                {project}
              </Button>
            ))}
          </div>

          <DashboardStats 
            stats={calculateStats(filteredData || [])} 
            data={filteredData || []}
            onProjectClick={handleProjectClick}
            onModuleClick={handleModuleClick}
            onFrameworkClick={handleFrameworkClick}
            onToolClick={handleToolClick}
          />
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
            <FrameworkChart 
              data={filteredData || []} 
              onFrameworkClick={(framework) => handleChartClick('framework', framework)} 
            />
            <TestingTypeChart 
              data={filteredData || []} 
              onTestingTypeClick={(testingType) => handleChartClick('testingType', testingType)} 
            />
            {/* <ModulesChart 
              data={filteredData || []} 
              onModuleClick={(module) => handleChartClick('module', module)} 
            /> */}
            <ToolsChart 
              data={filteredData || []} 
              onToolClick={(tool) => handleChartClick('tool', tool)} 
            />
          </div>

          <div ref={tableRef}>
            <ProjectsTable 
              data={filteredData || []} 
              filter={selectedFilter}
              onClearFilter={() => setSelectedFilter(null)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;