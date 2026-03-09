import { IMonthData } from "./month-data.interface";

 export interface IDashboardResponse {
  stats?: any;
  salesOverview?: IMonthData[];
  topAreas?: any[];
  topSalesAgents?: any[];
  recentActivity?: any[];
}