export interface FinancialData {
    date: string;
    revenue: number;
    netIncome: number;
    grossProfit: number;
    eps: number;
    operatingIncome: number;
  }
  
  export interface APIResponse {
    date: string;
    revenue: number;
    netIncome: number;
    grossProfit: number;
    eps: number;
    operatingIncome: number;
    [key: string]: any;
  }

  