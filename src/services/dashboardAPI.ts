import { DashboardData, TimePeriod } from '../types/dashboard';

// API configuration - Backend developers can modify these endpoints
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

interface DashboardAPIParams {
  period: TimePeriod;
  search?: string;
}

export class DashboardAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Get dashboard data
  async getData(params: DashboardAPIParams): Promise<{ data: DashboardData }> {
    const searchParams = new URLSearchParams({
      period: params.period,
      ...(params.search && { search: params.search })
    });

    const response = await fetch(`${this.baseURL}/dashboard?${searchParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers here
        // 'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Dashboard API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get real-time stats
  async getStats(period: TimePeriod): Promise<{ data: any }> {
    const response = await fetch(`${this.baseURL}/dashboard/stats?period=${period}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Stats API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const dashboardAPI = new DashboardAPI();