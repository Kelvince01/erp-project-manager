import { environment } from '@envs/environment';

// fall back configurations
export const Config = {
  isServed: false,
  API: {
    apiRoot: environment.apiUrl,
  },
  MyKey: 'default value',
  ExtraKeys: 'wont harm',
};
