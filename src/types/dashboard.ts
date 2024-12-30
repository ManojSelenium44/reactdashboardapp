export interface TestingData {
  projectName: string;
  moduleName: string;
  frameworkType: string;
  toolName: string;
  toolVersion: string;
  technologyStack: string;
  testingType: string;
  supportService: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalModules: number;
  uniqueFrameworks: number;
  uniqueTools: number;
  uniqueTechnology: number;
}