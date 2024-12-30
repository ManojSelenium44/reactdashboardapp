import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats as Stats } from "@/types/dashboard";
import { Database, FolderKanban, GitFork, Cpu, Wrench } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DashboardStatsProps {
  stats: Stats;
  data: any[];
  onProjectClick?: (projectName: string) => void;
  onModuleClick?: (moduleName: string) => void;
  onFrameworkClick?: (framework: string) => void;
  onToolClick?: (tool: string) => void;
  onTechnologyClick?: (technology: string) => void;
}

export const DashboardStats = ({ 
  stats, 
  data, 
  onProjectClick,
  onModuleClick,
  onFrameworkClick,
  onToolClick,
  onTechnologyClick
}: DashboardStatsProps) => {
  // Get unique lists for hover content
  const uniqueProjects = Array.from(new Set(data.map(item => item.projectName))).filter(name => name.trim() !== '');
  const uniqueModules = Array.from(new Set(data.map(item => item.moduleName))).filter(name => name.trim() !== '');
  const uniqueFrameworks = Array.from(new Set(data.map(item => item.frameworkType))).filter(name => name.trim() !== '');
  const uniqueTools = Array.from(new Set(data.map(item => item.toolName))).filter(name => name.trim() !== '');
  const uniqueTechnology = Array.from(new Set(data.map(item => item.technologyStack))).filter(name => name.trim() !== '');

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FolderKanban className="h-4 w-4 text-primary hover:text-primary/80" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of unique projects</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">Active projects in testing</p>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Project List</h4>
            <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
              {uniqueProjects.map((project, index) => (
                <li 
                  key={index} 
                  className="hover:bg-accent/50 px-2 py-1 rounded cursor-pointer"
                  onClick={() => onProjectClick?.(project)}
                >
                  {project}
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <GitFork className="h-4 w-4 text-primary hover:text-primary/80" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of unique modules</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalModules}</div>
              <p className="text-xs text-muted-foreground">Modules under testing</p>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Module List</h4>
            <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
              {uniqueModules.map((module, index) => (
                <li 
                  key={index} 
                  className="hover:bg-accent/50 px-2 py-1 rounded cursor-pointer"
                  onClick={() => onModuleClick?.(module)}
                >
                  {module}
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frameworks</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Database className="h-4 w-4 text-primary hover:text-primary/80" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of unique testing frameworks</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueFrameworks}</div>
              <p className="text-xs text-muted-foreground">Testing frameworks in use</p>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Framework List</h4>
            <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
              {uniqueFrameworks.map((framework, index) => (
                <li 
                  key={index} 
                  className="hover:bg-accent/50 px-2 py-1 rounded cursor-pointer"
                  onClick={() => onFrameworkClick?.(framework)}
                >
                  {framework}
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testing Tools</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Wrench className="h-4 w-4 text-primary hover:text-primary/80" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of unique testing tools</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueTools}</div>
              <p className="text-xs text-muted-foreground">Different tools utilized</p>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Tools List</h4>
            <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
              {uniqueTools.map((tool, index) => (
                <li 
                  key={index} 
                  className="hover:bg-accent/50 px-2 py-1 rounded cursor-pointer"
                  onClick={() => onToolClick?.(tool)}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Technology Stack</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Cpu className="h-4 w-4 text-primary hover:text-primary/80" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of unique Technologies</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{/* Remove or comment out this line if uniqueTechnology is not valid */}{stats.uniqueTechnology}</div>
              <p className="text-xs text-muted-foreground">Different technologies utilized</p>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Technologies List</h4>
            <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
              {uniqueTechnology.map((technology, index) => (
                <li 
                  key={index} 
                  className="hover:bg-accent/50 px-2 py-1 rounded cursor-pointer"
                  onClick={() => onTechnologyClick?.(technology)}
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>

    </div>
  );
};
