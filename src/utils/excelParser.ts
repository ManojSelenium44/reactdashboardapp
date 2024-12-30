import * as XLSX from 'xlsx';
import { TestingData, DashboardStats } from '@/types/dashboard';

export const parseExcelFile = (file: File): Promise<TestingData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        // Validate and transform the data
        const parsedData = jsonData.map((row: any) => ({
          projectName: row['Project Name'] || row.projectName || '',
          moduleName: row['Module Name'] || row.moduleName || '',
          frameworkType: row['Framework Type'] || row.frameworkType || '',
          toolName: row['Tool Name'] || row.toolName || '',
          toolVersion: row['Tool Version']?.toString() || row.toolVersion || '',
          technologyStack: row['Technology Stack'] || row.technologyStack || '',
          testingType: row['Testing Type'] || row.testingType || '',
          supportService: row['Support Service'] || row.supportService || ''
        }));

        console.log('Parsed Excel Data:', parsedData);
        resolve(parsedData);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
};

export const calculateStats = (data: TestingData[]): DashboardStats => {
  // Use Set to get unique values and filter out empty strings
  const uniqueProjects = new Set(data.filter(item => item.projectName.trim() !== '').map(item => item.projectName));
  const uniqueModules = new Set(data.filter(item => item.moduleName.trim() !== '').map(item => `${item.projectName}-${item.moduleName}`));
  const uniqueFrameworks = new Set(data.filter(item => item.frameworkType.trim() !== '').map(item => item.frameworkType));
  const uniqueTools = new Set(data.filter(item => item.toolName.trim() !== '').map(item => item.toolName));
  const uniqueTechnology = new Set(data.filter(item => item.technologyStack.trim() !== '').map(item => item.technologyStack));

  return {
    totalProjects: uniqueProjects.size,
    totalModules: uniqueModules.size,
    uniqueFrameworks: uniqueFrameworks.size,
    uniqueTools: uniqueTools.size,
    uniqueTechnology : uniqueTechnology.size
  };
};