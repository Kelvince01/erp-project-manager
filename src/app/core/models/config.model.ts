export interface IConfig {
    isServed: boolean;
    withError?: boolean; // new to distinguish error in config loading
    API: {
      apiRoot: string;
    };
    MyKey: string;
  }
