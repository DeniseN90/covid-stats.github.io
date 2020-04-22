export interface CountryRow {
    cases: Cases;
    country: string;
    day: Date;
    deaths: Deaths;
    test: Tests;
    time: Date;
  }
  
export  interface Cases {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    total: number;
  }
  
export  interface Deaths {
    new: number;
    total: number;
  }
  
export  interface Tests {
    total: number;
  }